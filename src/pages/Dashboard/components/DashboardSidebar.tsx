import { type FC } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import {
  futureModules,
  navigationGroups,
  type DashboardNavItem,
} from "../dashboard.data";

interface DashboardSidebarProps {
  isMobileOpen: boolean;
  isActive: (path: string) => boolean;
  onClose: () => void;
}

const navLinkClass = (isSelected: boolean) =>
  [
    "group flex items-start gap-3 rounded-2xl px-4 py-3 transition-all duration-200",
    isSelected
      ? "bg-linear-to-r from-brand to-brand-hover text-white shadow-lg shadow-brand/20"
      : "text-text-dim hover:bg-bg-muted hover:text-text-main",
  ].join(" ");

const DashboardNavLink: FC<{
  item: DashboardNavItem;
  isActive: (path: string) => boolean;
  onClose: () => void;
}> = ({ item, isActive, onClose }) => {
  const Icon = item.icon;
  const selected = isActive(item.to);

  return (
    <Link to={item.to} onClick={onClose} className={navLinkClass(selected)}>
      <div className="rounded-2xl border border-ui-border/70 bg-bg-muted/60 p-2.5">
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="break-words text-[0.8rem] font-black leading-5 text-current">
          {item.label}
        </p>
        <p
          className={`mt-1 text-[0.78rem] leading-5 ${
            selected ? "text-white/85" : "text-text-dim"
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
        fixed left-0 top-0 z-[60] flex h-screen w-[min(88vw,340px)] flex-col border-r border-ui-border bg-bg-card/95 transition-transform duration-300 backdrop-blur-xl lg:sticky lg:top-0 lg:w-[320px] lg:z-30
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      <div className="flex items-center justify-between border-b border-ui-border px-6 py-6 lg:px-8">
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-brand/80">
            Dashboard
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.08em] text-brand">
            CLASH<span className="text-text-main">TRK</span>
          </h2>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-2 text-text-dim transition-colors hover:text-error lg:hidden"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6 text-left">
        {navigationGroups.map((group) => (
          <div key={group.label} className="space-y-2">
            <p className="px-4 text-[0.68rem] font-black uppercase tracking-[0.14em] text-text-dim/70">
              {group.label}
            </p>

            {group.items.map((item) => (
              <DashboardNavLink
                key={item.to}
                item={item}
                isActive={isActive}
                onClose={onClose}
              />
            ))}
          </div>
        ))}

        <div className="border-t border-ui-border pt-5">
          <p className="px-4 text-[0.68rem] font-black uppercase tracking-[0.14em] text-text-dim/70">
            Wkrotce
          </p>
          <div className="mt-2 space-y-2">
            {futureModules.map((module) => {
              const Icon = module.icon;

              return (
                <div
                  key={module.label}
                  className="flex items-start gap-3 rounded-2xl px-4 py-3 text-text-dim/70"
                >
                  <div className="rounded-2xl border border-ui-border/70 bg-bg-muted/60 p-2.5">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="break-words text-[0.8rem] font-black leading-5 text-text-main">
                      {module.label}
                    </p>
                    <p className="mt-1 text-[0.78rem] leading-5">
                      {module.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="p-4">
        <div className="rounded-[1.5rem] border border-ui-border bg-bg-muted/60 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-brand/20 bg-brand/10 text-xs font-black italic text-brand">
              TRK
            </div>
            <div className="flex flex-col">
              <span className="text-[0.68rem] font-black uppercase tracking-[0.14em] leading-none text-text-main">
                Status
              </span>
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-brand">
                Online / Konto aktywne
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
