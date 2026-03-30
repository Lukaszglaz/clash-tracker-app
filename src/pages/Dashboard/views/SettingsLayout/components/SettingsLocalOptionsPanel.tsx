import { type FC } from "react";
import { RotateCcw, Save, Sparkles } from "lucide-react";
import { Button } from "../../../../../components/shared/Button/Button";
import { DashboardPanel } from "../../shared/DashboardContent";
import {
  settingsOptionCards,
  type SettingsOptionCardData,
} from "../settings.data";
import { SettingsPanelPreview } from "./SettingsPanelPreview";
import { SettingsToggleCard } from "./SettingsToggleCard";

interface LocalSettingsOptions {
  emailAlertsEnabled: boolean;
  apiSyncEnabled: boolean;
  advancedPanelsEnabled: boolean;
  customSystemsEnabled: boolean;
}

interface SettingsLocalOptionsPanelProps {
  localSettings: LocalSettingsOptions;
  playerTag: string;
  hasPendingChanges: boolean;
  onOptionChange: (
    key: SettingsOptionCardData["key"],
    value: boolean,
  ) => void;
  onSave: () => void;
  onReset: () => void;
}

export const SettingsLocalOptionsPanel: FC<SettingsLocalOptionsPanelProps> = ({
  localSettings,
  playerTag,
  hasPendingChanges,
  onOptionChange,
  onSave,
  onReset,
}) => {
  return (
    <DashboardPanel
      title="Opcje Panelu"
      subtitle="Ustawienia lokalne i systemowe"
      icon={Sparkles}
    >
      <div className="space-y-4">
        <div className="rounded-3xl border border-ui-border bg-bg-muted/55 p-5">
          <p className="text-[0.72rem] font-black uppercase tracking-[0.14em] text-text-dim">
            Preferencje lokalne
          </p>
          <p className="mt-2 text-sm leading-7 text-text-dim">
            Te opcje steruja widokiem panelu i sa zapisywane lokalnie w tej
            przegladarce po kliknieciu przycisku zapisu.
          </p>

          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-brand/15 bg-brand/8 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[0.72rem] font-black uppercase tracking-[0.14em] text-brand">
                {hasPendingChanges
                  ? "Masz niezapisane zmiany"
                  : "Wszystkie zmiany sa zapisane"}
              </p>
              <p className="mt-1 text-sm leading-6 text-text-dim">
                {hasPendingChanges
                  ? "Zapisz preferencje panelu, aby nie cofaly sie po odswiezeniu strony."
                  : "Mozesz bezpiecznie odswiezyc strone bez utraty ustawien panelu."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={onReset}
                disabled={!hasPendingChanges}
              >
                <RotateCcw size={16} className="mr-2" />
                Cofnij zmiany
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={onSave}
                disabled={!hasPendingChanges}
              >
                <Save size={16} className="mr-2" />
                Zapisz ustawienia panelu
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {settingsOptionCards.map((optionCard) => (
            <SettingsToggleCard
              key={optionCard.key}
              title={optionCard.title}
              description={optionCard.description}
              label={optionCard.label}
              statusMessage={
                localSettings[optionCard.key]
                  ? optionCard.enabledMessage
                  : optionCard.disabledMessage
              }
              icon={optionCard.icon}
              checked={localSettings[optionCard.key]}
              onChange={(value) => onOptionChange(optionCard.key, value)}
            />
          ))}
        </div>

        <SettingsPanelPreview
          advancedPanelsEnabled={localSettings.advancedPanelsEnabled}
          apiSyncEnabled={localSettings.apiSyncEnabled}
          emailAlertsEnabled={localSettings.emailAlertsEnabled}
          customSystemsEnabled={localSettings.customSystemsEnabled}
          playerTag={playerTag}
        />
      </div>
    </DashboardPanel>
  );
};
