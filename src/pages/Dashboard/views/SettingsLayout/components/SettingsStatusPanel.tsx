import { type FC } from "react";
import { BadgeCheck, ShieldCheck, ShieldX } from "lucide-react";
import clsx from "clsx";
import { DashboardPanel } from "../../shared/DashboardContent";

interface SettingsStatusPanelProps {
  isVerified: boolean;
  playerTag: string;
  emailAlertsEnabled: boolean;
  apiSyncEnabled: boolean;
}

export const SettingsStatusPanel: FC<SettingsStatusPanelProps> = ({
  isVerified,
  playerTag,
  emailAlertsEnabled,
  apiSyncEnabled,
}) => {
  return (
    <DashboardPanel
      title="Status Konta"
      subtitle="Najwazniejsze informacje po prawej stronie"
      icon={ShieldCheck}
    >
      <div className="space-y-4">
        <div
          className={clsx(
            "rounded-3xl border p-5",
            isVerified
              ? "border-success/25 bg-success/10"
              : "border-error/25 bg-error/10",
          )}
        >
          <div className="flex items-start gap-3">
            {isVerified ? (
              <BadgeCheck className="shrink-0 text-success" size={22} />
            ) : (
              <ShieldX className="shrink-0 text-error" size={22} />
            )}
            <div>
              <p className="text-sm font-black text-text-main">
                {isVerified ? "Konto aktywne" : "Brak weryfikacji"}
              </p>
              <p className="mt-2 text-sm leading-6 text-text-dim">
                {isVerified
                  ? "Status konta pozwala korzystac z pelnego zakresu sekcji."
                  : "Weryfikacja pozostaje glownym krokiem do domkniecia."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-ui-border/70 bg-bg-muted/55 p-4">
            <span className="text-sm font-bold text-text-main">Tag gracza</span>
            <span className="text-sm font-black uppercase tracking-[0.1em] text-brand">
              {playerTag || "---"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-ui-border/70 bg-bg-muted/55 p-4">
            <span className="text-sm font-bold text-text-main">Alerty email</span>
            <span className="text-sm font-black text-text-main">
              {emailAlertsEnabled ? "Aktywne" : "Wylaczone"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-ui-border/70 bg-bg-muted/55 p-4">
            <span className="text-sm font-bold text-text-main">Synchronizacja</span>
            <span className="text-sm font-black text-text-main">
              {apiSyncEnabled ? "Automatyczna" : "Reczna"}
            </span>
          </div>
        </div>
      </div>
    </DashboardPanel>
  );
};
