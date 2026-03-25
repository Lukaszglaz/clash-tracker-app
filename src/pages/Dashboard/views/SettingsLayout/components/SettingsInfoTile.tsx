import { type FC } from "react";
import { type LucideIcon } from "lucide-react";

interface SettingsInfoTileProps {
  label: string;
  value: string;
  icon: LucideIcon;
  breakAll?: boolean;
}

export const SettingsInfoTile: FC<SettingsInfoTileProps> = ({
  label,
  value,
  icon: Icon,
  breakAll = false,
}) => {
  return (
    <div className="rounded-2xl border border-ui-border/70 bg-bg-muted/55 p-4">
      <p className="flex items-center gap-2 text-[0.72rem] font-black uppercase tracking-[0.14em] text-text-dim">
        <Icon size={14} /> {label}
      </p>
      <p
        className={`mt-3 text-sm font-bold text-text-main ${
          breakAll ? "break-all" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
};
