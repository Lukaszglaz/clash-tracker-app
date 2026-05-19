import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";
import { dashboardNavigation } from "../dashboard.navigation";

interface DashboardSidebarProps {
  isMobileOpen: boolean;
  isActive: (path: string) => boolean;
  onClose: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isMobileOpen,
  isActive,
  onClose,
}) => {
  const [openCategories, setOpenCategories] = useState<string[]>(["home"]);

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-ui-border bg-bg-card transition-transform lg:sticky lg:translate-x-0 ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-ui-border p-6">
        <h2 className="text-lg font-black tracking-tight text-text-main">
          Clash Panel
        </h2>
        <button onClick={onClose} className="p-2 text-text-dim lg:hidden">
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        {(["general", "villages", "community", "account"] as const).map(
          (cat) => {
            const items = dashboardNavigation.filter((i) => i.category === cat);
            if (items.length === 0) return null;

            return (
              <div key={cat} className="mb-8">
                <p className="mb-2 px-3 text-[0.65rem] font-bold uppercase tracking-wider text-text-dim/60">
                  {cat === "general"
                    ? "Panel"
                    : cat === "villages"
                      ? "Wioski"
                      : cat === "community"
                        ? "Społeczność"
                        : "Konto"}
                </p>

                <div className="space-y-1">
                  {items.map((item) => {
                    const Icon = item.icon;
                    const hasChildren = !!item.children;
                    const isOpen = openCategories.includes(item.id);
                    const isParentActive = isActive(item.to);

                    return (
                      <div key={item.to}>
                        <button
                          onClick={() => hasChildren && toggleCategory(item.id)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                            isParentActive && !hasChildren
                              ? "bg-brand/10 text-brand"
                              : "text-text-dim hover:bg-bg-muted hover:text-text-main"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              className={`h-4 w-4 ${isParentActive ? "text-brand" : ""}`}
                            />
                            {hasChildren ? (
                              <span>{item.label}</span>
                            ) : (
                              <Link
                                to={item.to}
                                onClick={onClose}
                                className="w-full text-left"
                              >
                                {item.label}
                              </Link>
                            )}
                          </div>
                          {hasChildren && (
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-text-main" : "text-text-dim/50"}`}
                            />
                          )}
                        </button>

                        {hasChildren && isOpen && (
                          <div className="mt-1 flex flex-col space-y-1 pl-9">
                            {item.children?.map((child) => {
                              const isChildActive = isActive(child.to);
                              return (
                                <Link
                                  key={child.to}
                                  to={child.to}
                                  onClick={onClose}
                                  className={`rounded-md px-3 py-2 text-xs transition-colors ${
                                    isChildActive
                                      ? "bg-brand/10 font-bold text-brand"
                                      : "text-text-dim/80 hover:bg-bg-muted hover:text-text-main"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          },
        )}
      </nav>
    </aside>
  );
};
