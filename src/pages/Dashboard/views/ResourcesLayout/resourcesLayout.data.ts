import { Coins, Gem, Package2, Pickaxe } from "lucide-react";
import type { DashboardViewPageProps } from "../shared/DashboardContent";

export const resourcesLayoutData: DashboardViewPageProps = {
  hero: {
    eyebrow: "Ekonomia",
    title: "Surowce",
    accent: "i Zbieracze",
    description:
      "Przeglad produkcji, pojemnosci magazynow, builderow i glownych kierunkow farmienia.",
    badge: "Ekonomia bazy",
    stats: [
      { label: "Produkcja", value: "Wysoka", tone: "success" },
      { label: "Magazyny", value: "73%", tone: "brand" },
      { label: "Builderzy", value: "4/6" },
      { label: "Priorytet", value: "Eliksir" },
    ],
  },
  topGridClassName: "xl:grid-cols-[1.1fr_0.9fr]",
  topSections: [
    {
      title: "Bilans Surowcow",
      subtitle: "Stan glownej ekonomii",
      icon: Coins,
      content: {
        type: "metrics",
        items: [
          {
            label: "Zloto",
            value: "8.4M",
            helper: "Rezerwa pod budynki obronne, pulapki i mury.",
            tone: "brand",
          },
          {
            label: "Eliksir",
            value: "9.1M",
            helper: "Glowny zasob pod laboratorium i jednostki armii.",
            tone: "success",
          },
          {
            label: "Mroczny eliksir",
            value: "148K",
            helper: "Pula pod bohaterow i najwazniejsze ulepszenia elitarnych jednostek.",
          },
          {
            label: "Klejnoty",
            value: "1 260",
            helper: "Rezerwa pod buildera lub przyspieszenie kluczowych badan.",
          },
        ],
      },
    },
    {
      title: "Wskazowki Farmienia",
      subtitle: "Priorytety wydawania",
      icon: Pickaxe,
      content: {
        type: "list",
        items: [
          "Zloto pod budynki, ktore bezposrednio wzmacniaja baze.",
          "Eliksir pod laboratorium i trzon glownej armii.",
          "Mroczny eliksir pod bohaterow i kluczowe jednostki specjalne.",
        ],
      },
    },
  ],
  bottomSections: [
    {
      title: "Pojemnosc i Produkcja",
      subtitle: "Magazyny i zbieracze",
      icon: Package2,
      content: {
        type: "progress",
        items: [
          { label: "Magazyny zlota", value: "78%", progress: 78 },
          { label: "Magazyny eliksiru", value: "74%", progress: 74 },
          { label: "Wiertla i kopalnie", value: "69%", progress: 69 },
          { label: "Pompy i kolektory", value: "72%", progress: 72 },
        ],
      },
    },
    {
      title: "Tempo Rozwoju",
      subtitle: "Ocena organizacji ekonomii",
      icon: Gem,
      content: {
        type: "info",
        items: [
          {
            title: "Builderzy",
            value: "Dobra rotacja",
            description:
              "Kolejka ulepszen jest blisko stanu, w ktorym builderzy moga pracowac bez przerw.",
          },
          {
            title: "Straty surowcow",
            value: "Pod kontrola",
            description:
              "Najwazniejszy obszar do dopilnowania to regularne wydawanie eliksiru na glowne priorytety.",
            tone: "brand",
          },
        ],
      },
    },
  ],
};
