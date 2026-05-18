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
    <header className="rounded-[1.55rem] border border-ui-border/80 bg-bg-card/90 px-4 py-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)] sm:px-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-brand/80">
            Dashboard Base
          </p>
          <h1 className="mt-2 text-[1.25rem] font-black tracking-[-0.05em] text-text-main sm:text-[1.5rem]">
            {title}
          </h1>
          <p className="mt-2 text-[0.8rem] leading-6 text-text-dim">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="small"
            className="rounded-full lg:hidden"
            onClick={onOpenMenu}
          >
            <Menu size={16} />
          </Button>
          <Button
            variant="secondary"
            size="small"
            className="rounded-full"
            disabled
          >
            <RefreshCw size={15} />
            Baza gotowa
          </Button>
        </div>
      </div>
    </header>
  );
};
