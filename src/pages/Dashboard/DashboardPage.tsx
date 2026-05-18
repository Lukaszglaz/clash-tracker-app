import { useState } from "react";
import { useLocation } from "react-router-dom";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { getDashboardCurrentSection } from "./dashboard.navigation";

const isRouteActive = (pathname: string, targetPath: string) => {
  if (targetPath === "/dashboard") {
    return pathname === targetPath;
  }

  return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
};

export const DashBoardPage = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const currentSection = getDashboardCurrentSection(pathname);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(193,61,167,0.12),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(113,61,193,0.1),transparent_26%),var(--bg-page)] text-text-main">
      <div className="mx-auto flex min-h-screen w-full max-w-[1760px]">
        <DashboardSidebar
          isMobileOpen={isMobileOpen}
          isActive={(path) => isRouteActive(pathname, path)}
          onClose={() => setIsMobileOpen(false)}
        />

        {isMobileOpen ? (
          <button
            type="button"
            aria-label="Zamknij menu"
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        ) : null}

        <main className="min-w-0 flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-5">
            <DashboardHeader
              title={currentSection.label}
              description={currentSection.description}
              onOpenMenu={() => setIsMobileOpen(true)}
            />

            <section className="min-h-[520px] rounded-[1.9rem] border border-ui-border/80 bg-bg-card/88 shadow-[0_18px_38px_rgba(0,0,0,0.08)]" />
          </div>
        </main>
      </div>
    </div>
  );
};
