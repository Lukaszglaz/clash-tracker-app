import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

import { api } from "../../../../api/axios";
import { BulletList, DashboardHero, DashboardPanel } from "../shared/DashboardContent";
import { SettingsIntegrationsPanel } from "./components/SettingsIntegrationsPanel";
import { SettingsLocalOptionsPanel } from "./components/SettingsLocalOptionsPanel";
import { SettingsOverviewGrid } from "./components/SettingsOverviewGrid";
import { SettingsProfileForm } from "./components/SettingsProfileForm";
import { SettingsSecurityPanel } from "./components/SettingsSecurityPanel";
import { SettingsStatusPanel } from "./components/SettingsStatusPanel";
import { SettingsSystemInfoPanel } from "./components/SettingsSystemInfoPanel";
import {
  buildSettingsHeroStats,
  buildSettingsSummaryCards,
  settingsMissingModules,
  type SettingsOptionCardData,
} from "./settings.data";

interface NestUserSettings {
  email: string;
  playerTag: string | null;
  playerName: string;
  marketingAccepted: boolean;
  termsAccepted: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface LocalSettingsOptions {
  emailAlertsEnabled: boolean;
  apiSyncEnabled: boolean;
  advancedPanelsEnabled: boolean;
  customSystemsEnabled: boolean;
}

const defaultLocalSettings: LocalSettingsOptions = {
  emailAlertsEnabled: true,
  apiSyncEnabled: true,
  advancedPanelsEnabled: true,
  customSystemsEnabled: true,
};

export const SettingsLayout: FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [playerTag, setPlayerTag] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [localSettings, setLocalSettings] =
    useState<LocalSettingsOptions>(defaultLocalSettings);
  const [fullData, setFullData] = useState<NestUserSettings | null>(null);

  const updateLocalSetting = (
    key: SettingsOptionCardData["key"],
    value: boolean,
  ) => {
    setLocalSettings((currentSettings) => ({
      ...currentSettings,
      [key]: value,
    }));
  };

  const hydrateForm = (data: NestUserSettings) => {
    setFullData(data);
    setPlayerTag(data.playerTag || "");
    setMarketingAccepted(data.marketingAccepted);

    if (data.playerName) {
      const [currentFirstName = "", ...lastNameParts] = data.playerName.split(" ");
      setFirstName(currentFirstName);
      setLastName(lastNameParts.join(" "));
    } else {
      setFirstName("");
      setLastName("");
    }

    setLocalSettings({
      emailAlertsEnabled: data.isVerified,
      apiSyncEnabled: Boolean(data.playerTag),
      advancedPanelsEnabled: true,
      customSystemsEnabled: true,
    });
  };

  const fetchSettings = async () => {
    try {
      const response = await api.get<NestUserSettings>("/api/users/settings");
      hydrateForm(response.data);
    } catch (error: any) {
      toast.error("Blad podczas pobierania danych");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await api.patch("/api/users/settings", {
        firstName,
        lastName,
        playerTag,
        marketingConsent: marketingAccepted,
      });

      toast.success("Baza danych zaktualizowana");
      await fetchSettings();
    } catch (error: any) {
      toast.error("Blad zapisu danych");
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

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
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
              onSubmit={handleSave}
              onFirstNameChange={setFirstName}
              onLastNameChange={setLastName}
              onPlayerTagChange={(value) => setPlayerTag(value.toUpperCase())}
              onMarketingChange={setMarketingAccepted}
              onEmailAlertsChange={(value) =>
                updateLocalSetting("emailAlertsEnabled", value)
              }
            />
          </DashboardPanel>

          <SettingsLocalOptionsPanel
            localSettings={localSettings}
            onOptionChange={updateLocalSetting}
          />

          <SettingsIntegrationsPanel />
        </div>

        <div className="space-y-6">
          <SettingsStatusPanel
            isVerified={Boolean(fullData?.isVerified)}
            playerTag={playerTag}
            emailAlertsEnabled={localSettings.emailAlertsEnabled}
            apiSyncEnabled={localSettings.apiSyncEnabled}
          />

          <SettingsSystemInfoPanel
            email={fullData?.email || ""}
            createdAt={fullData?.createdAt}
            updatedAt={fullData?.updatedAt}
          />

          <SettingsSecurityPanel
            onResetPassword={() => navigate("/reset-password")}
          />

          <DashboardPanel
            title="Brakujace Moduly Gry"
            subtitle="Kolejne naturalne sekcje dashboardu"
            icon={ShieldCheck}
          >
            <BulletList items={settingsMissingModules} />
          </DashboardPanel>
        </div>
      </div>
    </div>
  );
};
