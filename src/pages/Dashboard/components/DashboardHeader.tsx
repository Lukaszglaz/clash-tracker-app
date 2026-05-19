import { Menu, RefreshCw } from "lucide-react";
import { Button } from "../../../components/shared/Button/Button";

interface DashboardHeaderProps {
  title: string;
  description: string;
  onOpenMenu: () => void;
}

export const DashboardHeader = ({
  title,
  description,
  onOpenMenu,
}: DashboardHeaderProps) => {
  return (
    <header className="rounded-[1.55rem] border border-ui-border/80 bg-bg-card/90 p-4 shadow-sm sm:px-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1.5">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-brand/80">
            Dashboard Base
          </p>
          <h1 className="text-xl font-black tracking-tight text-text-main sm:text-2xl">
            {title}
          </h1>
          <p className="text-sm leading-relaxed text-text-dim">{description}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="secondary"
            size="small"
            className="rounded-full lg:hidden"
            onClick={onOpenMenu}
            aria-label="Otwórz menu nawigacji"
          >
            <Menu className="h-4 w-4" />
          </Button>

          <Button
            variant="secondary"
            size="small"
            className="rounded-full "
            disabled
          >
            <RefreshCw className="h-3.5 w-3.5 mr-2" />
            Baza gotowa
          </Button>
        </div>
      </div>
    </header>
  );
};
