import {
  Crown,
  ShieldCheck,
  Sparkles,
  Swords,
  TimerReset,
} from "lucide-react";
import type { DashboardViewPageProps } from "../shared/DashboardContent";

export const playerOverviewData: DashboardViewPageProps = {
  hero: {
    eyebrow: "Profil gracza",
    title: "Centrum",
    accent: "Dowodzenia",
    description:
      "Podsumowanie stanu bazy, aktywnych sekcji konta i glownych priorytetow ulepszen.",
    badge: "Widok glowny",
    stats: [
      { label: "Town Hall", value: "TH 13", tone: "brand" },
      { label: "Postep bazy", value: "74%", tone: "success" },
      { label: "Priorytet", value: "Laboratorium" },
      { label: "Status", value: "Gotowy do gry" },
    ],
  },
  topGridClassName: "xl:grid-cols-[1.4fr_0.9fr]",
  topSections: [
    {
      title: "Szybkie Podsumowanie",
      subtitle: "Najwazniejsze liczby",
      icon: Sparkles,
      content: {
        type: "metrics",
        items: [
          {
            label: "Moc ataku",
            value: "8.6/10",
            helper: "Gotowosc armii do farmienia i regularnych wojen.",
            tone: "brand",
          },
          {
            label: "Stan obrony",
            value: "7.8/10",
            helper: "Rezerwa postepu widoczna glownie w pulapkach i wiezach bocznych.",
            tone: "success",
          },
          {
            label: "Kolejka ulepszen",
            value: "5",
            helper: "Otwarte obszary do rozpisania pod builderow i laboratorium.",
          },
          {
            label: "Aktywne cele",
            value: "3",
            helper: "Najblizszy fokus: laboratorium, bohaterowie i magazyny.",
          },
        ],
      },
    },
    {
      title: "Najblizsze Ruchy",
      subtitle: "Priorytety konta",
      icon: TimerReset,
      content: {
        type: "list",
        items: [
          "Laboratorium: ustaw kolejne badanie przed wydaniem eliksiru na poboczne ulepszenia.",
          "Bohaterowie: utrzymaj ciaglosc ulepszen dla dwoch glownych filarow ofensywy.",
          "Obrona: domknij najnizsze poziomy w bocznych sektorach bazy.",
        ],
      },
    },
  ],
  bottomGridClassName: "xl:grid-cols-[1.1fr_1fr]",
  bottomSections: [
    {
      title: "Postep Sekcji",
      subtitle: "Stan najwazniejszych modulow",
      icon: ShieldCheck,
      content: {
        type: "progress",
        items: [
          { label: "Baza glowna", value: "80%", progress: 80 },
          { label: "Armia", value: "72%", progress: 72 },
          { label: "Bohaterowie", value: "64%", progress: 64 },
          { label: "Pulapki", value: "58%", progress: 58 },
        ],
      },
    },
    {
      title: "Aktywne Role",
      subtitle: "Najmocniejsze strony profilu",
      icon: Crown,
      content: {
        type: "info",
        items: [
          {
            title: "Farming",
            value: "Tryb glowny",
            description:
              "Sklad armii i kolejnosc ulepszen najlepiej wspieraja szybkie zbieranie surowcow.",
            tone: "brand",
            icon: Swords,
          },
          {
            title: "Wojny",
            value: "W trakcie wzrostu",
            description:
              "Dalszy progres bohaterow i laboratorium podniesie stabilnosc skladow wojennych.",
            tone: "success",
            icon: ShieldCheck,
          },
        ],
      },
    },
  ],
};
