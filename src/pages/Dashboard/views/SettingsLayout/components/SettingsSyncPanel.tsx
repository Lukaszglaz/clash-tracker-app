import { type FC } from "react";
import { Clock3, RefreshCcw, Wifi } from "lucide-react";
import { DashboardPanel } from "../../shared/DashboardContent";

interface SettingsSyncPanelProps {
  isEnabled: boolean;
  lastSyncedAt?: string | null;
  playerTag: string;
}

export const SettingsSyncPanel: FC<SettingsSyncPanelProps> = ({
  isEnabled,
  lastSyncedAt,
  playerTag,
}) => {
  return (
    <DashboardPanel
      title="Synchronizacja Danych"
      subtitle="Status odswiezania panelu"
      icon={RefreshCcw}
    >
      <div className="space-y-4">
        <div className="rounded-3xl border border-ui-border/70 bg-bg-muted/55 p-5">
          <div className="flex items-start gap-3">
            <Wifi
              className={isEnabled ? "shrink-0 text-success" : "shrink-0 text-text-dim"}
              size={20}
            />
            <div>
              <p className="text-sm font-black text-text-main">
                {isEnabled ? "Auto-sync aktywny" : "Auto-sync wylaczony"}
              </p>
              <p className="mt-2 text-sm leading-6 text-text-dim">
                {isEnabled
                  ? "Panel automatycznie odswieza dane ustawien w tle."
                  : "Dane beda odswiezane tylko po recznym wejsciu lub zapisie."}
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
            <span className="flex items-center gap-2 text-sm font-bold text-text-main">
              <Clock3 size={14} />
              Ostatnia synchronizacja
            </span>
            <span className="text-sm font-black text-text-main">
              {lastSyncedAt
                ? new Date(lastSyncedAt).toLocaleTimeString("pl-PL", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "---"}
            </span>
          </div>
        </div>
      </div>
    </DashboardPanel>
  );
};
