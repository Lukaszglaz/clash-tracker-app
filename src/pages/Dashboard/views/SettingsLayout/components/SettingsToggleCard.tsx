import { type FC } from "react";
import { type LucideIcon } from "lucide-react";
import { Checkbox } from "../../../../../components/shared/Checkbox/Checkbox";

interface SettingsToggleCardProps {
  title: string;
  description: string;
  label: string;
  checked: boolean;
  icon: LucideIcon;
  onChange: (checked: boolean) => void;
}

export const SettingsToggleCard: FC<SettingsToggleCardProps> = ({
  title,
  description,
  label,
  checked,
  icon: Icon,
  onChange,
}) => {
  return (
    <div className="rounded-3xl border border-ui-border bg-bg-muted/55 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-text-main">{title}</p>
          <p className="mt-2 text-sm leading-6 text-text-dim">{description}</p>
        </div>
        <Icon className="shrink-0 text-brand" size={18} />
      </div>
      <div className="mt-4">
        <Checkbox
          label={label}
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
      </div>
    </div>
  );
};
