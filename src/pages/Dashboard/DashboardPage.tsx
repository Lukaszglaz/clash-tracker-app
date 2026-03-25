import { useState, type FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, Zap } from "lucide-react";
import { DashboardSectionHeader } from "./components/DashboardSectionHeader";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { sectionMeta } from "./dashboard.data";

export const DashBoardPage: FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const currentSection =
    sectionMeta[location.pathname] ?? sectionMeta["/dashboard"];

  const isActive = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.includes(path);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[radial-gradient(circle_at_top_left,rgba(212,63,184,0.08),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_22%),var(--bg-page)] text-text-main">
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-ui-border bg-bg-card/95 px-4 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-2">
          <Zap className="text-brand" size={18} fill="currentColor" />
          <span className="text-[11px] font-black uppercase italic tracking-widest">
            Menu Panelu
          </span>
        </div>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="rounded-lg p-2 text-brand transition-colors hover:bg-brand/10"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex min-h-[calc(100vh-4rem)] w-full flex-1">
        <DashboardSidebar
          isMobileOpen={isMobileOpen}
          isActive={isActive}
          onClose={() => setIsMobileOpen(false)}
        />

        {isMobileOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
          <div className="mx-auto flex w-full max-w-360 flex-col gap-6">
            <DashboardSectionHeader
              title={currentSection.title}
              description={currentSection.description}
            />

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
