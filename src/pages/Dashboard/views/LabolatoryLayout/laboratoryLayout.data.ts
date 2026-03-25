import { Clock3, FlaskConical, Sparkles, WandSparkles } from "lucide-react";
import type { DashboardViewPageProps } from "../shared/DashboardContent";

export const laboratoryLayoutData: DashboardViewPageProps = {
  hero: {
    eyebrow: "Badania",
    title: "Laboratorium",
    accent: "Badan",
    description:
      "Status aktywnych badan, kolejnosc ulepszen i postep jednostek oraz czarow.",
    badge: "Research hub",
    stats: [
      { label: "Aktywne badanie", value: "Healer", tone: "brand" },
      { label: "Czas do konca", value: "2d 14h", tone: "success" },
      { label: "Kolejka", value: "3 ruchy" },
      { label: "Wplyw", value: "Wysoki" },
    ],
  },
  topGridClassName: "xl:grid-cols-[1.1fr_0.9fr]",
  topSections: [
    {
      title: "Status Badan",
      subtitle: "Stan glownych grup",
      icon: FlaskConical,
      content: {
        type: "metrics",
        items: [
          {
            label: "Wojska glowne",
            value: "76%",
            helper: "Najwazniejsze ulepszenia sa juz zaawansowane.",
            tone: "brand",
          },
          {
            label: "Wojska wspierajace",
            value: "61%",
            helper: "Sekcja z zapasem pod kolejne poziomy po zamknieciu trzonu armii.",
          },
          {
            label: "Czary",
            value: "69%",
            helper: "Stabilny progres pod farming i wojny.",
            tone: "success",
          },
          {
            label: "Mroczne jednostki",
            value: "58%",
            helper: "Rozwoj najlepiej prowadzic pod rzeczywiste sklady ataku.",
          },
        ],
      },
    },
    {
      title: "Kolejne Badania",
      subtitle: "Najwazniejsza kolejnosc",
      icon: Clock3,
      content: {
        type: "list",
        items: [
          "Ulepszenia pod glowny sklad armii i najczestsze wejscia.",
          "Wsparcie pod wojny po domknieciu najwazniejszych jednostek.",
          "Badania poboczne dopiero po zabezpieczeniu rdzenia ofensywy.",
        ],
      },
    },
  ],
  bottomSections: [
    {
      title: "Postep Kategorii",
      subtitle: "Stan badan wedlug grup",
      icon: Sparkles,
      content: {
        type: "progress",
        items: [
          { label: "Armia podstawowa", value: "76%", progress: 76 },
          { label: "Wsparcie i utility", value: "61%", progress: 61 },
          { label: "Czary", value: "69%", progress: 69 },
          { label: "Badania premium", value: "54%", progress: 54 },
        ],
      },
    },
    {
      title: "Efekt Dla Armii",
      subtitle: "Znaczenie dla rozgrywki",
      icon: WandSparkles,
      content: {
        type: "info",
        items: [
          {
            title: "Natychmiastowy zysk",
            description:
              "Aktualna kolejka badan wzmacnia glowny sklad ataku bez czekania na inne moduly.",
          },
          {
            title: "Dlugoterminowo",
            description:
              "Plan badan powiazany z bohaterami i koszarami daje rowniejszy progres calego konta.",
            tone: "brand",
          },
        ],
      },
    },
  ],
};
