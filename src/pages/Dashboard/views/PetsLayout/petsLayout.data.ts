import { HeartHandshake, PawPrint, ShieldPlus, Stars } from "lucide-react";
import type { DashboardViewPageProps } from "../shared/DashboardContent";

export const petsLayoutData: DashboardViewPageProps = {
  hero: {
    eyebrow: "Wsparcie bohaterow",
    title: "Zwierzeta",
    accent: "Bohaterow",
    description:
      "Poziomy zwierzat, najlepsze polaczenia z bohaterami i plan dalszego rozwoju.",
    badge: "Support unit",
    stats: [
      { label: "Aktywne pary", value: "4", tone: "brand" },
      { label: "Postep", value: "57%", tone: "success" },
      { label: "Priorytet", value: "Diggy" },
      { label: "Synergia", value: "Dobra" },
    ],
  },
  topGridClassName: "xl:grid-cols-[1.1fr_0.9fr]",
  topSections: [
    {
      title: "Obecny Stan",
      subtitle: "Poziomy glownej stajni",
      icon: PawPrint,
      content: {
        type: "metrics",
        items: [
          {
            label: "Unicorn",
            value: "Poziom 8",
            helper: "Uniwersalny partner dla Queen i dluzszych wejsc.",
            tone: "brand",
          },
          {
            label: "Phoenix",
            value: "Poziom 6",
            helper: "Silne wsparcie po ustabilizowaniu glownego skladu wojennego.",
          },
          {
            label: "Diggy",
            value: "Poziom 5",
            helper: "Najmocniejszy kandydat do kolejnego poziomu.",
            tone: "success",
          },
          {
            label: "Frosty",
            value: "Poziom 4",
            helper: "Przydatne wsparcie za glownymi priorytetami.",
          },
        ],
      },
    },
    {
      title: "Najlepsze Polaczenia",
      subtitle: "Synergie z bohaterami",
      icon: HeartHandshake,
      content: {
        type: "list",
        items: [
          "Unicorn + Queen pod dlugie utrzymanie bohatera przy zyciu.",
          "Phoenix + King pod ciezsze wejscia i czyszczenie rdzenia.",
          "Diggy + Champion pod szybkie zdejmowanie kluczowych obron.",
        ],
      },
    },
  ],
  bottomSections: [
    {
      title: "Postep Zwierzat",
      subtitle: "Stan calej sekcji",
      icon: Stars,
      content: {
        type: "progress",
        items: [
          { label: "Unicorn", value: "80%", progress: 80 },
          { label: "Phoenix", value: "61%", progress: 61 },
          { label: "Diggy", value: "56%", progress: 56 },
          { label: "Frosty", value: "48%", progress: 48 },
        ],
      },
    },
    {
      title: "Priorytet Ulepszen",
      subtitle: "Kolejny etap rozwoju",
      icon: ShieldPlus,
      content: {
        type: "info",
        items: [
          {
            title: "Diggy / Unicorn",
            description:
              "Najczesciej daja najlepszy praktyczny zwrot po najblizszych poziomach.",
          },
          {
            title: "Phoenix",
            description:
              "Zyskuje na wartosci, gdy glowni bohaterowie sa juz blisko docelowych poziomow.",
            tone: "brand",
          },
        ],
        columns: 1,
      },
    },
  ],
};
