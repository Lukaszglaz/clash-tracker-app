import { type FC } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { dashboardNavigation } from "../dashboard.navigation";

interface DashboardSidebarProps {
  isMobileOpen: boolean;
  isActive: (path: string) => boolean;
  onClose: () => void;
}

const navLinkClass = (isSelected: boolean) =>
  [
    "group flex items-start gap-3 rounded-[1.25rem] border px-4 py-3 transition-all duration-200",
    isSelected
      ? "border-brand/30 bg-brand/12 text-text-main shadow-[0_14px_24px_rgba(193,61,167,0.12)]"
      : "border-ui-border/70 bg-bg-card/88 text-text-dim hover:border-brand/20 hover:bg-bg-muted hover:text-text-main",
  ].join(" ");

const DashboardNavLink: FC<{
  item: (typeof dashboardNavigation)[number];
  isActive: (path: string) => boolean;
  onClose: () => void;
}> = ({ item, isActive, onClose }) => {
  const Icon = item.icon;
  const selected = isActive(item.to);

  return (
    <Link to={item.to} onClick={onClose} className={navLinkClass(selected)}>
      <div className="rounded-[1rem] border border-ui-border/70 bg-bg-muted/60 p-2.5">
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="break-words text-[0.8rem] font-black leading-5 text-current">
          {item.label}
        </p>
        <p
          className={`mt-1 text-[0.78rem] leading-5 ${
            selected ? "text-text-dim" : "text-text-dim"
          }`}
        >
          {item.description}
        </p>
      </div>
    </Link>
  );
};

export const DashboardSidebar: FC<DashboardSidebarProps> = ({
  isMobileOpen,
  isActive,
  onClose,
}) => {
  return (
    <aside
      className={`
        fixed left-0 top-0 z-[60] flex h-screen w-[min(88vw,340px)] flex-col border-r border-ui-border bg-[linear-gradient(180deg,color-mix(in_srgb,var(--bg-surface)_98%,transparent)_0%,color-mix(in_srgb,var(--bg-surface-muted)_84%,transparent)_100%)] transition-transform duration-300 backdrop-blur-xl lg:sticky lg:top-0 lg:w-[320px] lg:z-30
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      <div className="flex items-center justify-between border-b border-ui-border px-6 py-6 lg:px-8">
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-brand/80">
            Nowa struktura
          </p>
          <h2 className="mt-2 text-[1.7rem] font-black tracking-[-0.08em] text-text-main">
            Clash Panel Base
          </h2>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-2 text-text-dim transition-colors hover:text-error lg:hidden"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto px-4 py-6 text-left">
        <div className="space-y-2">
          <p className="px-4 text-[0.68rem] font-black uppercase tracking-[0.14em] text-text-dim/70">
            Menu
          </p>

          {dashboardNavigation.map((item) => (
            <DashboardNavLink
              key={item.to}
              item={item}
              isActive={isActive}
              onClose={onClose}
            />
          ))}
        </div>
      </nav>

      <div className="p-4">
        <div className="rounded-[1.5rem] border border-ui-border bg-bg-muted/60 p-4">
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-brand">
            Zostalo tylko menu panelu
          </span>
        </div>
      </div>
    </aside>
  );
};
