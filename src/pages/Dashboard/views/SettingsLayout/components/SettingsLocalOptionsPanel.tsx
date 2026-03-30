import { type FC } from "react";
import { Sparkles } from "lucide-react";
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
  onOptionChange: (
    key: SettingsOptionCardData["key"],
    value: boolean,
  ) => void;
}

export const SettingsLocalOptionsPanel: FC<SettingsLocalOptionsPanelProps> = ({
  localSettings,
  playerTag,
  onOptionChange,
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
            Te opcje steruja widokiem panelu i sa zapisywane lokalnie w przegladarce.
          </p>
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
