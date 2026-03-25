import { Bomb, Flame, Radar, Target } from "lucide-react";
import type { DashboardViewPageProps } from "../shared/DashboardContent";

export const trapsLayoutData: DashboardViewPageProps = {
  hero: {
    eyebrow: "Ukryta obrona",
    title: "Pulapki",
    accent: "Taktyczne",
    description:
      "Stan typow pulapek, pokrycia bazy i ich wplywu na obrone przeciwko popularnym skladom ataku.",
    badge: "Hidden value",
    stats: [
      { label: "Pokrycie bazy", value: "61%", tone: "brand" },
      { label: "Priorytet", value: "Giant Bomb", tone: "success" },
      { label: "Do ulepszenia", value: "Spring Trap" },
      { label: "Spojnosc", value: "Srednia" },
    ],
  },
  topGridClassName: "xl:grid-cols-[1.15fr_0.85fr]",
  topSections: [
    {
      title: "Typy Pulapek",
      subtitle: "Poziomy i wartosc bojowa",
      icon: Bomb,
      content: {
        type: "metrics",
        items: [
          {
            label: "Giant Bomb",
            value: "Poziom 7",
            helper: "Najwiekszy wplyw na zatrzymywanie pushy naziemnych.",
            tone: "brand",
          },
          {
            label: "Air Bomb",
            value: "Poziom 6",
            helper: "Wsparcie pod obrone przeciwko balonom i smokom.",
          },
          {
            label: "Seeking Air Mine",
            value: "Poziom 5",
            helper: "Mocny kandydat do szybkiego ulepszenia pod ataki powietrzne.",
            tone: "success",
          },
          {
            label: "Spring Trap",
            value: "Poziom 4",
            helper: "Najslabszy poziom w sekcji wymagajacej wyrownania.",
          },
        ],
      },
    },
    {
      title: "Co Poprawic Najpierw",
      subtitle: "Priorytet rozwoju",
      icon: Target,
      content: {
        type: "list",
        items: [
          "Pulapki o najwyzszym wplywie na wojny i obrone przed spamem.",
          "Najslabsze poziomy, ktore zostawiaja martwe sektory bazy.",
          "Rozmieszczenie zgodne z aktualnym ukladem glownej bazy.",
        ],
      },
    },
  ],
  bottomSections: [
    {
      title: "Postep Modernizacji",
      subtitle: "Stan calej sekcji",
      icon: Radar,
      content: {
        type: "progress",
        items: [
          { label: "Pulapki naziemne", value: "68%", progress: 68 },
          { label: "Pulapki przeciwlotnicze", value: "63%", progress: 63 },
          { label: "Pulapki odrzucajace", value: "52%", progress: 52 },
          { label: "Spojnosc ukladu", value: "59%", progress: 59 },
        ],
      },
    },
    {
      title: "Wplyw na Obrone",
      subtitle: "Zastosowanie w praktyce",
      icon: Flame,
      content: {
        type: "info",
        items: [
          {
            title: "Wojny",
            description:
              "Dobrze rozlozone pulapki potrafia podniesc wartosc obrony nawet przy srednich poziomach wiez.",
          },
          {
            title: "Farming",
            description:
              "Przy regularnych atakach pulapki dobrze karza powtarzalne schematy wejscia przeciwnika.",
            tone: "brand",
          },
        ],
      },
    },
  ],
};
