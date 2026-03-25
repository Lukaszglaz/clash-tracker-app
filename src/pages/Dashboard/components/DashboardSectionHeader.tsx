import { type FC } from "react";
import { ChevronRight } from "lucide-react";

interface DashboardSectionHeaderProps {
  title: string;
  description: string;
}

const headerCards = [
  { label: "Sekcja", value: "Panel gracza" },
  { label: "Dane", value: "Profil i progres" },
  { label: "Zakres", value: "Status i ulepszenia" },
];

export const DashboardSectionHeader: FC<DashboardSectionHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <section className="rounded-[2rem] border border-ui-border bg-bg-card/85 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[0.72rem] font-black uppercase tracking-[0.14em] text-text-dim">
            <span>Panel Gracza</span>
            <ChevronRight size={14} />
            <span className="text-brand">{title}</span>
          </div>
          <h1 className="mt-3 text-2xl font-black tracking-[-0.05em] text-text-main sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-text-dim">
            {description}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:w-full xl:max-w-[34rem]">
          {headerCards.map((card) => (
            <div
              key={card.label}
              className="min-w-0 rounded-2xl border border-ui-border bg-bg-muted/60 p-4"
            >
              <p className="text-[0.68rem] font-black uppercase tracking-[0.14em] text-text-dim">
                {card.label}
              </p>
              <p className="mt-2 break-words text-base font-black leading-tight text-text-main sm:text-lg">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
