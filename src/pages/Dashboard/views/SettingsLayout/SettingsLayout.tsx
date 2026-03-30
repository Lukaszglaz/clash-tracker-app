import { useCallback, useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

import { api } from "../../../../api/axios";
import { getApiErrorMessage } from "../../../../api/errors";
import { checkValidation } from "../../../../schemas";
import { settingsSchema } from "../../../../schemas/settings.schema";
import { Button } from "../../../../components/shared/Button/Button";
import { BulletList, DashboardHero, DashboardPanel } from "../shared/DashboardContent";
import { SettingsIntegrationsPanel } from "./components/SettingsIntegrationsPanel";
import { SettingsAlertsPanel } from "./components/SettingsAlertsPanel";
import { SettingsLocalOptionsPanel } from "./components/SettingsLocalOptionsPanel";
import { SettingsOverviewGrid } from "./components/SettingsOverviewGrid";
import { SettingsProfileForm } from "./components/SettingsProfileForm";
import { SettingsSecurityPanel } from "./components/SettingsSecurityPanel";
import { SettingsStatusPanel } from "./components/SettingsStatusPanel";
import { SettingsSyncPanel } from "./components/SettingsSyncPanel";
import { SettingsSystemInfoPanel } from "./components/SettingsSystemInfoPanel";
import {
  buildSettingsHeroStats,
  buildSettingsSummaryCards,
  settingsMissingModules,
  type SettingsOptionCardData,
} from "./settings.data";
import type {
  NestUserSettings,
  SettingsFieldErrors,
  SettingsPanelOptions,
} from "./settings.types";
import {
  arePanelOptionsEqual,
  getMarketingAcceptedValue,
  getSettingsEndpoint,
  getStoredPanelOptions,
  normalizePlayerTag,
  savePanelOptions,
  splitPlayerName,
} from "./settings.utils";

const defaultLocalSettings: SettingsPanelOptions = {
  emailAlertsEnabled: true,
  apiSyncEnabled: true,
  advancedPanelsEnabled: true,
  customSystemsEnabled: true,
};

export const SettingsLayout: FC = () => {
  const navigate = useNavigate();
  const settingsEndpoint = getSettingsEndpoint(api.defaults.baseURL);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [playerTag, setPlayerTag] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [savedLocalSettings, setSavedLocalSettings] =
    useState<SettingsPanelOptions>(() => getStoredPanelOptions(defaultLocalSettings));
  const [localSettings, setLocalSettings] =
    useState<SettingsPanelOptions>(savedLocalSettings);
  const [fullData, setFullData] = useState<NestUserSettings | null>(null);
  const [fieldErrors, setFieldErrors] = useState<SettingsFieldErrors>({});

  const updateLocalSetting = (
    key: SettingsOptionCardData["key"],
    value: boolean,
  ) => {
    setLocalSettings((currentSettings) => ({
      ...currentSettings,
      [key]: value,
    }));
  };

  const persistLocalSettings = (nextSettings: SettingsPanelOptions) => {
    savePanelOptions(nextSettings);
    setSavedLocalSettings({ ...nextSettings });
  };

  const hydrateForm = (data: NestUserSettings) => {
    setFullData(data);
    setPlayerTag(normalizePlayerTag(data.playerTag || ""));
    setMarketingAccepted(
      getMarketingAcceptedValue(data.marketingAccepted, data.marketingConsent),
    );

    const parsedName = splitPlayerName(data.playerName);
    setFirstName(parsedName.firstName);
    setLastName(parsedName.lastName);
    setFieldErrors({});
  };

  const fetchSettings = useCallback(
    async ({ silent = false }: { silent?: boolean } = {}) => {
      if (!silent) {
        setLoadError(null);
      }

      try {
        const response = await api.get<NestUserSettings>(settingsEndpoint);
        hydrateForm(response.data);
        setLastSyncedAt(new Date().toISOString());
      } catch (error: unknown) {
        const errorMessage = getApiErrorMessage(
          error,
          "Blad podczas pobierania danych",
        );

        if (!silent) {
          setLoadError(errorMessage);
          toast.error(errorMessage);
        }
      } finally {
        setFetching(false);
      }
    },
    [settingsEndpoint],
  );

  useEffect(() => {
    void fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    if (!localSettings.apiSyncEnabled) return;

    const syncInterval = window.setInterval(() => {
      void fetchSettings({ silent: true });
    }, 60_000);

    return () => window.clearInterval(syncInterval);
  }, [fetchSettings, localSettings.apiSyncEnabled]);

  const hasPendingLocalSettings = !arePanelOptionsEqual(
    localSettings,
    savedLocalSettings,
  );

  const handleSaveLocalSettings = () => {
    persistLocalSettings(localSettings);
    toast.success("Ustawienia panelu zapisane.");
  };

  const handleResetLocalSettings = () => {
    setLocalSettings(savedLocalSettings);
    toast.info("Przywrocono ostatnio zapisane ustawienia panelu.");
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setFieldErrors({});

    const normalizedTag = normalizePlayerTag(playerTag);
    const validationErrors = checkValidation(
      {
        firstName,
        lastName,
        playerTag: normalizedTag,
        marketingConsent: marketingAccepted,
      },
      settingsSchema,
    );

    if (validationErrors?.length) {
      const nextErrors: SettingsFieldErrors = {};

      validationErrors.forEach((validationError) => {
        const fieldName = validationError.key as keyof SettingsFieldErrors;
        nextErrors[fieldName] = validationError.error;
      });

      setFieldErrors(nextErrors);
      toast.warning("Popraw bledy w formularzu");
      return;
    }

    setLoading(true);

    try {
      await api.patch(settingsEndpoint, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        playerTag: normalizedTag || null,
        marketingConsent: marketingAccepted,
      });

      if (hasPendingLocalSettings) {
        persistLocalSettings(localSettings);
      }

      toast.success(
        hasPendingLocalSettings
          ? "Zmiany konta i panelu zostaly zapisane."
          : "Zmiany konta zostaly zapisane.",
      );
      setPlayerTag(normalizedTag);
      await fetchSettings();
    } catch (error: unknown) {
      const errorMessage = getApiErrorMessage(error, "Blad zapisu danych");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fullName =
    [firstName, lastName].filter(Boolean).join(" ") || fullData?.playerName || "---";
  const profileCompletion = [
    fullData?.email,
    playerTag,
    fullName !== "---",
    fullData?.isVerified,
  ].filter(Boolean).length;
  const profileCompletionPercent = Math.round((profileCompletion / 4) * 100);
  const securityScore =
    (fullData?.isVerified ? 55 : 25) +
    (playerTag ? 20 : 0) +
    (marketingAccepted ? 10 : 0) +
    (localSettings.emailAlertsEnabled ? 15 : 0);
  const isApiSyncReady = localSettings.apiSyncEnabled && Boolean(playerTag);

  if (fetching) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-brand">
        <div className="relative">
          <Loader2 className="h-16 w-16 animate-spin opacity-20" />
          <Loader2
            className="absolute left-0 top-0 h-16 w-16 animate-spin text-brand"
            style={{ animationDuration: "3s" }}
          />
        </div>
        <span className="text-[0.72rem] font-black uppercase tracking-[0.18em]">
          Pobieranie profilu
        </span>
      </div>
    );
  }

  if (loadError && !fullData) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="w-full max-w-xl rounded-4xl border border-error/20 bg-error/10 p-8 text-left shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-error/15 p-3 text-error">
              <AlertCircle size={22} />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-black tracking-tight text-text-main">
                Nie udalo sie pobrac ustawien
              </h2>
              <p className="text-sm leading-7 text-text-dim">{loadError}</p>
              <Button onClick={() => fetchSettings()}>Sprobuj ponownie</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pb-20 text-left">
      <DashboardHero
        eyebrow="Ustawienia i integracje"
        title="Panel"
        accent="Konta"
        description="Dane profilu, status konta, ustawienia panelu i informacje systemowe."
        badge="Account settings"
        stats={buildSettingsHeroStats({
          profileCompletionPercent,
          securityScore,
          playerTag,
          isVerified: Boolean(fullData?.isVerified),
        })}
      />

      <div
        className={`grid gap-6 ${
          localSettings.advancedPanelsEnabled
            ? "xl:grid-cols-[1.4fr_0.9fr]"
            : "xl:grid-cols-1"
        }`}
      >
        <div className="space-y-6">
          <SettingsOverviewGrid
            items={buildSettingsSummaryCards({
              fullName,
              email: fullData?.email || "",
              updatedAt: fullData?.updatedAt,
              advancedPanelsEnabled: localSettings.advancedPanelsEnabled,
            })}
          />

          <DashboardPanel
            title="Dane Konta"
            subtitle="Glowna sekcja zapisu profilu"
            icon={ShieldCheck}
          >
            <SettingsProfileForm
              firstName={firstName}
              lastName={lastName}
              playerTag={playerTag}
              marketingAccepted={marketingAccepted}
              emailAlertsEnabled={localSettings.emailAlertsEnabled}
              isVerified={Boolean(fullData?.isVerified)}
              termsAccepted={Boolean(fullData?.termsAccepted)}
              loading={loading}
              fieldErrors={fieldErrors}
              onSubmit={handleSave}
              onFirstNameChange={(value) => {
                setFirstName(value);
                setFieldErrors((currentErrors) => ({
                  ...currentErrors,
                  firstName: undefined,
                }));
              }}
              onLastNameChange={(value) => {
                setLastName(value);
                setFieldErrors((currentErrors) => ({
                  ...currentErrors,
                  lastName: undefined,
                }));
              }}
              onPlayerTagChange={(value) => {
                setPlayerTag(normalizePlayerTag(value));
                setFieldErrors((currentErrors) => ({
                  ...currentErrors,
                  playerTag: undefined,
                }));
              }}
              onMarketingChange={(value) => setMarketingAccepted(value)}
              onEmailAlertsChange={(value) => {
                updateLocalSetting("emailAlertsEnabled", value);
              }}
            />
          </DashboardPanel>

          <SettingsLocalOptionsPanel
            localSettings={localSettings}
            playerTag={playerTag}
            hasPendingChanges={hasPendingLocalSettings}
            onOptionChange={updateLocalSetting}
            onSave={handleSaveLocalSettings}
            onReset={handleResetLocalSettings}
          />

          {localSettings.customSystemsEnabled ? <SettingsIntegrationsPanel /> : null}
        </div>

        {localSettings.advancedPanelsEnabled ? (
          <div className="space-y-6">
            <SettingsStatusPanel
              isVerified={Boolean(fullData?.isVerified)}
              playerTag={playerTag}
              emailAlertsEnabled={localSettings.emailAlertsEnabled}
              apiSyncEnabled={isApiSyncReady}
            />

            <SettingsSystemInfoPanel
              email={fullData?.email || ""}
              createdAt={fullData?.createdAt}
              updatedAt={fullData?.updatedAt}
            />

            {localSettings.apiSyncEnabled ? (
              <SettingsSyncPanel
                isEnabled={isApiSyncReady}
                lastSyncedAt={lastSyncedAt}
                playerTag={playerTag}
              />
            ) : null}

            {localSettings.emailAlertsEnabled ? (
              <SettingsAlertsPanel
                isVerified={Boolean(fullData?.isVerified)}
                playerTag={playerTag}
                marketingAccepted={marketingAccepted}
              />
            ) : null}

            <SettingsSecurityPanel
              onResetPassword={() =>
                navigate("/forgot-password", {
                  state: { email: fullData?.email || undefined },
                })
              }
            />

            {localSettings.customSystemsEnabled ? (
              <DashboardPanel
                title="Brakujace Moduly Gry"
                subtitle="Kolejne naturalne sekcje dashboardu"
                icon={ShieldCheck}
              >
                <BulletList items={settingsMissingModules} />
              </DashboardPanel>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
