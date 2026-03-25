import type { FC, ReactNode } from "react";
import clsx from "clsx";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

type DashboardTone = "brand" | "success" | "warning" | "neutral";

export interface DashboardHeroStat {
  label: string;
  value: string;
  tone?: Exclude<DashboardTone, "warning">;
}

export interface DashboardHeroProps {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  badge?: string;
  stats?: DashboardHeroStat[];
}

export interface DashboardMetricItem {
  label: string;
  value: string;
  helper: string;
  tone?: DashboardTone;
}

export interface DashboardProgressItem {
  label: string;
  value: string;
  progress: number;
}

export interface DashboardInfoItem {
  title: string;
  description: string;
  value?: string;
  tone?: Exclude<DashboardTone, "warning">;
  icon?: LucideIcon;
}

type DashboardSectionContent =
  | { type: "metrics"; items: DashboardMetricItem[] }
  | { type: "list"; items: string[] }
  | { type: "progress"; items: DashboardProgressItem[] }
  | { type: "info"; items: DashboardInfoItem[]; columns?: 1 | 2 };

export interface DashboardSectionConfig {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  content: DashboardSectionContent;
}

export interface DashboardViewPageProps {
  hero: DashboardHeroProps;
  topSections: [DashboardSectionConfig, DashboardSectionConfig];
  bottomSections: [DashboardSectionConfig, DashboardSectionConfig];
  topGridClassName?: string;
  bottomGridClassName?: string;
}

export const DashboardHero: FC<DashboardHeroProps> = ({
  eyebrow,
  title,
  accent,
  description,
  badge,
  stats = [],
}) => {
  return (
    <section className="relative overflow-hidden rounded-4xl border border-ui-border bg-linear-to-br from-bg-card via-bg-card to-brand/8 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.12)] sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,63,184,0.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_28%)]" />
      <div className="relative space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl min-w-0 space-y-3">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-brand/80">
              {eyebrow}
            </p>
            <h1 className="text-3xl font-black tracking-[-0.04em] text-text-main sm:text-5xl">
              {title} <span className="text-brand">{accent}</span>
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-text-dim sm:text-base">
              {description}
            </p>
          </div>

          {badge ? (
            <div className="inline-flex max-w-full flex-wrap items-center gap-2 self-start rounded-full border border-brand/25 bg-brand/10 px-4 py-2 text-[0.72rem] font-black tracking-[0.18em] text-brand">
              <ArrowUpRight size={14} />
              {badge}
            </div>
          ) : null}
        </div>

        {stats.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-0 rounded-2xl border border-ui-border/70 bg-bg-muted/70 p-4 backdrop-blur-sm"
              >
                <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-text-dim">
                  {stat.label}
                </p>
                <p
                  className={clsx(
                    "mt-3 break-words text-xl font-black leading-tight tracking-tight sm:text-2xl",
                    stat.tone === "success" && "text-success",
                    stat.tone === "brand" && "text-brand",
                    (!stat.tone || stat.tone === "neutral") && "text-text-main",
                  )}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

interface DashboardPanelProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

export const DashboardPanel: FC<DashboardPanelProps> = ({
  title,
  subtitle,
  icon: Icon,
  children,
  className,
}) => {
  return (
    <section
      className={clsx(
        "rounded-[1.75rem] border border-ui-border bg-bg-card p-5 shadow-[0_18px_55px_rgba(0,0,0,0.08)] sm:p-6",
        className,
      )}
    >
      <div className="mb-5 flex flex-col gap-4 border-b border-ui-border/70 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-black tracking-tight text-text-main">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-text-dim">
              {subtitle}
            </p>
          ) : null}
        </div>

        {Icon ? (
          <div className="self-start rounded-2xl border border-brand/20 bg-brand/10 p-3 text-brand">
            <Icon size={18} />
          </div>
        ) : null}
      </div>

      {children}
    </section>
  );
};

export const MetricCard: FC<DashboardMetricItem> = ({
  label,
  value,
  helper,
  tone = "neutral",
}) => {
  return (
    <article className="min-w-0 rounded-2xl border border-ui-border/70 bg-bg-muted/55 p-4">
      <p className="text-[0.68rem] font-black uppercase tracking-[0.14em] text-text-dim">
        {label}
      </p>
      <p
        className={clsx(
          "mt-3 break-words text-2xl font-black leading-tight tracking-tight sm:text-3xl",
          tone === "brand" && "text-brand",
          tone === "success" && "text-success",
          tone === "warning" && "text-orange-400",
          tone === "neutral" && "text-text-main",
        )}
      >
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-text-dim">{helper}</p>
    </article>
  );
};

export const ProgressRow: FC<DashboardProgressItem> = ({
  label,
  value,
  progress,
}) => {
  return (
    <div className="space-y-2 rounded-2xl border border-ui-border/70 bg-bg-muted/55 p-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-sm font-black uppercase tracking-[0.12em] text-text-main">
          {label}
        </p>
        <span className="text-sm font-bold text-text-dim">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-bg-body">
        <div
          className="h-full rounded-full bg-linear-to-r from-brand to-brand-hover"
          style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }}
        />
      </div>
    </div>
  );
};

export const BulletList: FC<{ items: string[] }> = ({ items }) => {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item}
          className="flex gap-3 rounded-2xl border border-ui-border/70 bg-bg-muted/55 p-4 text-sm leading-6 text-text-dim"
        >
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
};

const InfoCard: FC<DashboardInfoItem> = ({
  title,
  description,
  value,
  tone = "neutral",
  icon: Icon,
}) => {
  return (
    <article className="rounded-2xl border border-ui-border/70 bg-bg-muted/55 p-4">
      <div className="flex items-center gap-3">
        {Icon ? (
          <div
            className={clsx(
              "rounded-2xl p-3",
              tone === "success" && "bg-success/10 text-success",
              tone === "brand" && "bg-brand/10 text-brand",
              tone === "neutral" && "bg-bg-card text-text-main",
            )}
          >
            <Icon size={18} />
          </div>
        ) : null}
        <div>
          <p className="text-sm font-black text-text-main">{title}</p>
          {value ? (
            <p
              className={clsx(
                "mt-1 text-xs font-bold uppercase tracking-[0.14em]",
                tone === "success" && "text-success",
                tone === "brand" && "text-brand",
                tone === "neutral" && "text-text-dim",
              )}
            >
              {value}
            </p>
          ) : null}
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-text-dim">{description}</p>
    </article>
  );
};

const DashboardSectionContentView: FC<{
  content: DashboardSectionContent;
}> = ({ content }) => {
  switch (content.type) {
    case "metrics":
      return (
        <div className="grid gap-4 md:grid-cols-2">
          {content.items.map((item) => (
            <MetricCard key={item.label} {...item} />
          ))}
        </div>
      );
    case "list":
      return <BulletList items={content.items} />;
    case "progress":
      return (
        <div className="space-y-4">
          {content.items.map((item) => (
            <ProgressRow key={item.label} {...item} />
          ))}
        </div>
      );
    case "info":
      return (
        <div
          className={clsx(
            "grid gap-4",
            content.columns === 1 && "grid-cols-1",
            (!content.columns || content.columns === 2) && "md:grid-cols-2",
          )}
        >
          {content.items.map((item) => (
            <InfoCard
              key={`${item.title}-${item.value ?? item.description}`}
              {...item}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
};

const DashboardSection: FC<DashboardSectionConfig> = ({
  title,
  subtitle,
  icon,
  content,
}) => {
  return (
    <DashboardPanel title={title} subtitle={subtitle} icon={icon}>
      <DashboardSectionContentView content={content} />
    </DashboardPanel>
  );
};

export const DashboardViewPage: FC<DashboardViewPageProps> = ({
  hero,
  topSections,
  bottomSections,
  topGridClassName = "xl:grid-cols-[1.2fr_0.8fr]",
  bottomGridClassName = "xl:grid-cols-[1fr_1fr]",
}) => {
  return (
    <div className="space-y-6 text-left">
      <DashboardHero {...hero} />

      <div className={clsx("grid gap-6", topGridClassName)}>
        {topSections.map((section) => (
          <DashboardSection key={section.title} {...section} />
        ))}
      </div>

      <div className={clsx("grid gap-6", bottomGridClassName)}>
        {bottomSections.map((section) => (
          <DashboardSection key={section.title} {...section} />
        ))}
      </div>
    </div>
  );
};
