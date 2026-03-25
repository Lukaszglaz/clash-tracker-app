import { AlertTriangle, Castle, Shield, TowerControl } from "lucide-react";
import type { DashboardViewPageProps } from "../shared/DashboardContent";

export const defenseLayoutData: DashboardViewPageProps = {
  hero: {
    eyebrow: "Obrona",
    title: "Budowle",
    accent: "Obronne",
    description:
      "Przeglad glownego rdzenia bazy, stanu wiez, murow i kierunku kolejnych ulepszen.",
    badge: "Tarcza bazy",
    stats: [
      { label: "Stabilnosc", value: "78%", tone: "success" },
      { label: "Najmocniejszy blok", value: "Inferno", tone: "brand" },
      { label: "Do poprawy", value: "Wieze lucznikow" },
      { label: "Mury", value: "65%" },
    ],
  },
  topGridClassName: "xl:grid-cols-[1.15fr_0.85fr]",
  topSections: [
    {
      title: "Linie Obrony",
      subtitle: "Kluczowe obszary bazy",
      icon: Shield,
      content: {
        type: "metrics",
        items: [
          {
            label: "Obrona centralna",
            value: "8.4/10",
            helper: "Ratusz, inferno i eagle spinaja glowny rdzen bazy.",
            tone: "brand",
          },
          {
            label: "Obrona zewnetrzna",
            value: "6.9/10",
            helper: "Boczne sektory daja przeciwnikowi najlatwiejsze wejscie.",
          },
          {
            label: "Wsparcie obszarowe",
            value: "7.5/10",
            helper: "Splash damage dobrze wspiera rdzen, ale wymaga dalszych poziomow.",
            tone: "success",
          },
          {
            label: "Mury i strefy",
            value: "6.2/10",
            helper: "Najwiekszy zysk daje wyrownanie obwodu i pulapek.",
          },
        ],
      },
    },
    {
      title: "Najslabsze Punkty",
      subtitle: "Miejsca do poprawy",
      icon: AlertTriangle,
      content: {
        type: "list",
        items: [
          "Wieze lucznikow i obrona punktowa po bokach bazy.",
          "Nierowny poziom murow wzgledem glownego rdzenia.",
          "Pulapki i wsparcie obronne w sektorach o najnizszej gestosci.",
        ],
      },
    },
  ],
  bottomSections: [
    {
      title: "Postep Obrony",
      subtitle: "Stan kolejnych warstw",
      icon: TowerControl,
      content: {
        type: "progress",
        items: [
          { label: "Wieze glowne", value: "82%", progress: 82 },
          { label: "Obrona punktowa", value: "69%", progress: 69 },
          { label: "Wsparcie obszarowe", value: "74%", progress: 74 },
          { label: "Mury", value: "65%", progress: 65 },
        ],
      },
    },
    {
      title: "Rekomendowany Kierunek",
      subtitle: "Kolejnosc ulepszen",
      icon: Castle,
      content: {
        type: "info",
        items: [
          {
            title: "Wyrownaj boczne sektory",
            description:
              "Doprowadz do rowniejszych poziomow obrony zewnetrznej, aby ograniczyc darmowe wejscia.",
          },
          {
            title: "Wzmocnij splash damage",
            description:
              "Wsparcie obszarowe podnosi wartosc bazy zarowno na wojnach, jak i w regularnej obronie.",
            tone: "brand",
          },
        ],
        columns: 1,
      },
    },
  ],
};
