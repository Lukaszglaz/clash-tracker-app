import { type FC } from "react";
import { BadgeCheck, Fingerprint, Save, ShieldX, User } from "lucide-react";
import { Button } from "../../../../../components/shared/Button/Button";
import { Checkbox } from "../../../../../components/shared/Checkbox/Checkbox";
import { InputBase } from "../../../../../components/shared/InputBase/InputBase";
import { type SettingsFieldErrors } from "../settings.types";

interface SettingsProfileFormProps {
  firstName: string;
  lastName: string;
  playerTag: string;
  marketingAccepted: boolean;
  emailAlertsEnabled: boolean;
  isVerified: boolean;
  termsAccepted: boolean;
  loading: boolean;
  fieldErrors: SettingsFieldErrors;
  onSubmit: (event: React.FormEvent) => void;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onPlayerTagChange: (value: string) => void;
  onMarketingChange: (value: boolean) => void;
  onEmailAlertsChange: (value: boolean) => void;
}

export const SettingsProfileForm: FC<SettingsProfileFormProps> = ({
  firstName,
  lastName,
  playerTag,
  marketingAccepted,
  emailAlertsEnabled,
  isVerified,
  termsAccepted,
  loading,
  fieldErrors,
  onSubmit,
  onFirstNameChange,
  onLastNameChange,
  onPlayerTagChange,
  onMarketingChange,
  onEmailAlertsChange,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputBase
          label="Imie"
          value={firstName}
          onChange={(event) => onFirstNameChange(event.target.value)}
          placeholder="Twoje imie"
          leftIcon={<User />}
          error={fieldErrors.firstName}
        />
        <InputBase
          label="Nazwisko"
          value={lastName}
          onChange={(event) => onLastNameChange(event.target.value)}
          placeholder="Twoje nazwisko"
          error={fieldErrors.lastName}
        />
        <div className="md:col-span-2">
          <InputBase
            label="Clash of Clans Player Tag"
            value={playerTag}
            onChange={(event) => onPlayerTagChange(event.target.value)}
            placeholder="#P8Y2L9VPP"
            className="font-black uppercase tracking-[0.12em] text-brand"
            leftIcon={<Fingerprint />}
            error={fieldErrors.playerTag}
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-ui-border bg-bg-muted/55 p-5">
          <p className="text-[0.72rem] font-black uppercase tracking-[0.14em] text-text-dim">
            Zgody i komunikacja
          </p>
          <div className="mt-4 space-y-4">
            <Checkbox
              label="Zgoda na powiadomienia marketingowe i analize klanowa"
              checked={marketingAccepted}
              onChange={(event) => onMarketingChange(event.target.checked)}
            />
            <Checkbox
              label="Alerty email po zmianach konta"
              checked={emailAlertsEnabled}
              onChange={(event) => onEmailAlertsChange(event.target.checked)}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-ui-border bg-bg-muted/55 p-5">
          <p className="text-[0.72rem] font-black uppercase tracking-[0.14em] text-text-dim">
            Stan konta
          </p>
          <div className="mt-4 space-y-3">
            <div className="flex items-start justify-between gap-4 rounded-2xl border border-ui-border/70 bg-bg-card/70 p-4">
              <div>
                <p className="text-sm font-black text-text-main">Weryfikacja</p>
                <p className="mt-1 text-sm leading-6 text-text-dim">
                  {isVerified
                    ? "Konto potwierdzone i aktywne."
                    : "Konto oczekuje na potwierdzenie."}
                </p>
              </div>
              {isVerified ? (
                <BadgeCheck className="shrink-0 text-success" size={22} />
              ) : (
                <ShieldX className="shrink-0 text-error" size={22} />
              )}
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-ui-border/70 bg-bg-card/70 p-4">
              <div>
                <p className="text-sm font-black text-text-main">
                  Regulamin serwisu
                </p>
                <p className="mt-1 text-sm text-text-dim">
                  {termsAccepted ? "Zaakceptowano" : "Brak zgody"}
                </p>
              </div>
              <span className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-brand">
                {termsAccepted ? "OK" : "WAIT"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-brand/15 bg-brand/8 p-5">
        <p className="text-[0.72rem] font-black uppercase tracking-[0.14em] text-brand">
          Zakres sekcji
        </p>
        <p className="mt-2 text-sm leading-7 text-text-dim">
          Dane profilu, komunikacja, status konta oraz pola pod rozszerzenia ustawien.
        </p>
        <p className="mt-2 text-sm leading-7 text-text-dim">
          Tag gracza jest zapisywany w jednym formacie z prefiksem <code>#</code>.
        </p>
      </div>

      <Button type="submit" fullWidth isLoading={loading}>
        <Save size={18} className="mr-2" />
        Zapisz zmiany konta
      </Button>
    </form>
  );
};
