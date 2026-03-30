import { type FC } from "react";
import { BellRing, BadgeCheck, ShieldAlert, Tag } from "lucide-react";
import { DashboardPanel } from "../../shared/DashboardContent";

interface SettingsAlertsPanelProps {
  isVerified: boolean;
  playerTag: string;
  marketingAccepted: boolean;
}

export const SettingsAlertsPanel: FC<SettingsAlertsPanelProps> = ({
  isVerified,
  playerTag,
  marketingAccepted,
}) => {
  const alerts = [
    !isVerified
      ? {
          title: "Weryfikacja konta",
          description: "Konto wymaga potwierdzenia adresu email.",
          icon: ShieldAlert,
          tone: "error",
        }
      : {
          title: "Weryfikacja konta",
          description: "Adres email jest potwierdzony.",
          icon: BadgeCheck,
          tone: "success",
        },
    playerTag
      ? {
          title: "Tag gracza",
          description: `Polaczony tag: ${playerTag}`,
          icon: Tag,
          tone: "success",
        }
      : {
          title: "Tag gracza",
          description: "Brak przypisanego tagu Clash of Clans.",
          icon: Tag,
          tone: "warning",
        },
    marketingAccepted
      ? {
          title: "Komunikacja",
          description: "Powiadomienia marketingowe sa wlaczone.",
          icon: BellRing,
          tone: "success",
        }
      : {
          title: "Komunikacja",
          description: "Powiadomienia marketingowe sa wylaczone.",
          icon: BellRing,
          tone: "warning",
        },
  ];

  return (
    <DashboardPanel
      title="Alerty i Zdarzenia"
      subtitle="Podglad najwazniejszych sygnalow"
      icon={BellRing}
    >
      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          const toneClassName =
            alert.tone === "success"
              ? "border-success/20 bg-success/10 text-success"
              : alert.tone === "warning"
                ? "border-brand/20 bg-brand/10 text-brand"
                : "border-error/20 bg-error/10 text-error";

          return (
            <div
              key={alert.title}
              className="rounded-2xl border border-ui-border/70 bg-bg-muted/55 p-4"
            >
              <div className="flex items-start gap-3">
                <div className={`rounded-2xl border p-3 ${toneClassName}`}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-black text-text-main">{alert.title}</p>
                  <p className="mt-2 text-sm leading-6 text-text-dim">
                    {alert.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardPanel>
  );
};
