import { type FC } from "react";
import { Calendar, Clock, Info, Mail } from "lucide-react";
import { DashboardPanel } from "../../shared/DashboardContent";
import { SettingsInfoTile } from "./SettingsInfoTile";

interface SettingsSystemInfoPanelProps {
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export const SettingsSystemInfoPanel: FC<SettingsSystemInfoPanelProps> = ({
  email,
  createdAt,
  updatedAt,
}) => {
  return (
    <DashboardPanel title="Dane Systemowe" subtitle="Metadata konta" icon={Info}>
      <div className="space-y-4">
        <SettingsInfoTile label="Adres email" value={email || "---"} icon={Mail} breakAll />
        <SettingsInfoTile
          label="Data rejestracji"
          value={
            createdAt
              ? new Date(createdAt).toLocaleDateString("pl-PL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "---"
          }
          icon={Calendar}
        />
        <SettingsInfoTile
          label="Ostatnia aktualizacja"
          value={
            updatedAt
              ? new Date(updatedAt).toLocaleString("pl-PL")
              : "Brak aktualizacji"
          }
          icon={Clock}
        />
      </div>
    </DashboardPanel>
  );
};
