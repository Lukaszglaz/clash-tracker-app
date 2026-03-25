import { type FC } from "react";
import clsx from "clsx";
import { type DashboardMetricItem } from "../../shared/DashboardContent";

interface SettingsOverviewGridProps {
  items: DashboardMetricItem[];
}

export const SettingsOverviewGrid: FC<SettingsOverviewGridProps> = ({
  items,
}) => {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.label}
          className="rounded-3xl border border-ui-border bg-bg-card p-6 shadow-[0_14px_40px_rgba(0,0,0,0.06)]"
        >
          <p className="text-[0.72rem] font-black uppercase tracking-[0.14em] text-text-dim">
            {item.label}
          </p>
          <p
            className={clsx(
              "mt-4 break-words text-2xl font-black leading-tight text-text-main sm:text-3xl",
              item.tone === "brand" && "text-brand",
              item.tone === "success" && "text-success",
            )}
          >
            {item.value}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-text-dim">
            {item.helper}
          </p>
        </article>
      ))}
    </div>
  );
};
