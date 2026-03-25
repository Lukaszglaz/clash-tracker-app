import { type FC } from "react";
import { LockKeyhole, ShieldAlert } from "lucide-react";
import { Button } from "../../../../../components/shared/Button/Button";
import { DashboardPanel } from "../../shared/DashboardContent";

interface SettingsSecurityPanelProps {
  onResetPassword: () => void;
}

export const SettingsSecurityPanel: FC<SettingsSecurityPanelProps> = ({
  onResetPassword,
}) => {
  return (
    <DashboardPanel
      title="Bezpieczenstwo"
      subtitle="Haslo i dostep"
      icon={LockKeyhole}
    >
      <div className="space-y-4">
        <div className="rounded-3xl border border-error/20 bg-error/10 p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert className="shrink-0 text-error" size={22} />
            <div>
              <p className="text-sm font-black text-text-main">
                Reset hasla i kontrola dostepu
              </p>
              <p className="mt-2 text-sm leading-6 text-text-dim">
                Sekcja obejmuje operacje zwiazane z haslem i dostepem do konta.
              </p>
            </div>
          </div>
        </div>

        <Button variant="secondary" fullWidth onClick={onResetPassword}>
          Zresetuj haslo
        </Button>
      </div>
    </DashboardPanel>
  );
};
