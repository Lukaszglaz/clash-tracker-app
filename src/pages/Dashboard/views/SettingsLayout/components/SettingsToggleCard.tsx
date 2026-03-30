import { type FC } from "react";
import { type LucideIcon } from "lucide-react";
import { Checkbox } from "../../../../../components/shared/Checkbox/Checkbox";

interface SettingsToggleCardProps {
  title: string;
  description: string;
  label: string;
  statusMessage: string;
  checked: boolean;
  icon: LucideIcon;
  onChange: (checked: boolean) => void;
}

export const SettingsToggleCard: FC<SettingsToggleCardProps> = ({
  title,
  description,
  label,
  statusMessage,
  checked,
  icon: Icon,
  onChange,
}) => {
  return (
    <div
      className={`rounded-3xl border p-5 transition-colors ${
        checked
          ? "border-brand/25 bg-brand/10"
          : "border-ui-border bg-bg-muted/55"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-black text-text-main">{title}</p>
          <p className="mt-2 text-sm leading-6 text-text-dim">{description}</p>
        </div>
        <div
          className={`rounded-2xl border p-3 ${
            checked
              ? "border-brand/25 bg-brand/12 text-brand"
              : "border-ui-border/70 bg-bg-card text-text-dim"
          }`}
        >
          <Icon className="shrink-0" size={18} />
        </div>
      </div>

      <div className="mt-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em] ${
            checked ? "bg-brand/15 text-brand" : "bg-bg-card text-text-dim"
          }`}
        >
          {checked ? "Aktywne" : "Wylaczone"}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-text-dim">{statusMessage}</p>

      <div className="mt-4 border-t border-ui-border/60 pt-4">
        <Checkbox
          label={label}
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
      </div>
    </div>
  );
};
