import { Crown, Sword, Timer, Trophy } from "lucide-react";
import type { DashboardViewPageProps } from "../shared/DashboardContent";

export const heroesLayoutData: DashboardViewPageProps = {
  hero: {
    eyebrow: "Elita",
    title: "Bohaterowie",
    accent: "Krolewscy",
    description:
      "Poziomy bohaterow, ich role w skladach oraz glowna kolejnosc dalszych ulepszen.",
    badge: "Hero room",
    stats: [
      { label: "Sredni poziom", value: "67", tone: "brand" },
      { label: "Gotowosc", value: "71%", tone: "success" },
      { label: "Priorytet", value: "Queen" },
      { label: "Wojny", value: "Prawie gotowe" },
    ],
  },
  topGridClassName: "xl:grid-cols-[1.15fr_0.85fr]",
  topSections: [
    {
      title: "Rdzen Bohaterow",
      subtitle: "Poziomy glownych filarow",
      icon: Crown,
      content: {
        type: "metrics",
        items: [
          {
            label: "Archer Queen",
            value: "75",
            helper: "Najwazniejsza pod stabilnosc ataku i wojny.",
            tone: "brand",
          },
          {
            label: "Barbarian King",
            value: "70",
            helper: "Frontliner z miejscem na dalszy wzrost wytrzymalosci.",
          },
          {
            label: "Grand Warden",
            value: "56",
            helper: "Jeden z najmocniejszych wzrostow dla calej armii.",
            tone: "success",
          },
          {
            label: "Royal Champion",
            value: "32",
            helper: "Sekcja do domkniecia po ustabilizowaniu glownych filarow.",
          },
        ],
      },
    },
    {
      title: "Plan Ulepszen",
      subtitle: "Kolejnosc inwestycji",
      icon: Timer,
      content: {
        type: "list",
        items: [
          "Queen i Warden jako glowny wzrost sily ofensywy.",
          "King po domknieciu dwoch najwazniejszych bohaterow.",
          "Champion po ustabilizowaniu glownych strategii ataku.",
        ],
      },
    },
  ],
  bottomSections: [
    {
      title: "Postep Bohaterow",
      subtitle: "Stan kolejnych filarow",
      icon: Sword,
      content: {
        type: "progress",
        items: [
          { label: "Archer Queen", value: "83%", progress: 83 },
          { label: "Barbarian King", value: "77%", progress: 77 },
          { label: "Grand Warden", value: "68%", progress: 68 },
          { label: "Royal Champion", value: "51%", progress: 51 },
        ],
      },
    },
    {
      title: "Wplyw na Gre",
      subtitle: "Znaczenie dla skladu",
      icon: Trophy,
      content: {
        type: "info",
        items: [
          {
            title: "Farming",
            description:
              "Queen i Warden poprawiaja jakosc wejscia i ograniczaja liczbe nieudanych atakow.",
          },
          {
            title: "Wojny",
            description:
              "Domkniecie priorytetowych bohaterow wzmacnia przewidywalnosc i sile skladow wojennych.",
            tone: "brand",
          },
        ],
      },
    },
  ],
};
