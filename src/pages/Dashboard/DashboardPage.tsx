import { useState, useMemo, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardSidebar } from "./components/DashboardSidebar";
import {
  getDashboardCurrentSection,
  isRouteActive,
} from "./dashboard.navigation";

export const DashBoardPage = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const currentSection = useMemo(
    () => getDashboardCurrentSection(pathname),
    [pathname],
  );

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen]);

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar
        isMobileOpen={isMobileOpen}
        isActive={(path) => isRouteActive(pathname, path)}
        onClose={() => setIsMobileOpen(false)}
      />

      <div
        className={`fixed inset-0 z-40 bg-black/55 backdrop-blur-sm lg:hidden transition-opacity ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        role="button"
        tabIndex={0}
        aria-label="Zamknij menu"
        onClick={() => setIsMobileOpen(false)}
        onKeyDown={(e) => e.key === "Enter" && setIsMobileOpen(false)}
      />

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-5">
          <DashboardHeader
            title={currentSection.label}
            description={currentSection.description}
            onOpenMenu={() => setIsMobileOpen(true)}
          />

          <section className="rounded-[1.9rem] border border-ui-border/80 bg-bg-card/88 p-6 shadow-sm">
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
};
