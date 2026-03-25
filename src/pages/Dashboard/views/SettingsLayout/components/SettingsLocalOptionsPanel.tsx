import { type FC } from "react";
import { Sparkles } from "lucide-react";
import { DashboardPanel } from "../../shared/DashboardContent";
import {
  settingsOptionCards,
  type SettingsOptionCardData,
} from "../settings.data";
import { SettingsToggleCard } from "./SettingsToggleCard";

interface LocalSettingsOptions {
  emailAlertsEnabled: boolean;
  apiSyncEnabled: boolean;
  advancedPanelsEnabled: boolean;
  customSystemsEnabled: boolean;
}

interface SettingsLocalOptionsPanelProps {
  localSettings: LocalSettingsOptions;
  onOptionChange: (
    key: SettingsOptionCardData["key"],
    value: boolean,
  ) => void;
}

export const SettingsLocalOptionsPanel: FC<SettingsLocalOptionsPanelProps> = ({
  localSettings,
  onOptionChange,
}) => {
  return (
    <DashboardPanel
      title="Opcje Panelu"
      subtitle="Ustawienia lokalne i systemowe"
      icon={Sparkles}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {settingsOptionCards.map((optionCard) => (
          <SettingsToggleCard
            key={optionCard.key}
            title={optionCard.title}
            description={optionCard.description}
            label={optionCard.label}
            icon={optionCard.icon}
            checked={localSettings[optionCard.key]}
            onChange={(value) => onOptionChange(optionCard.key, value)}
          />
        ))}
      </div>
    </DashboardPanel>
  );
};
