import { Axe, FlaskConical, ShieldEllipsis, Swords } from "lucide-react";
import type { DashboardViewPageProps } from "../shared/DashboardContent";

export const armyLayoutData: DashboardViewPageProps = {
  hero: {
    eyebrow: "Wioska glowna",
    title: "Jednostki",
    accent: "Armii",
    description:
      "Widok wojsk, czarow, obozow i priorytetow ofensywnych dla glownego skladu ataku.",
    badge: "Atak",
    stats: [
      { label: "Gotowosc", value: "92%", tone: "success" },
      { label: "Glowne wojsko", value: "Hybrid", tone: "brand" },
      { label: "Czary", value: "6 aktywnych" },
      { label: "Priorytet", value: "Balon + Healer" },
    ],
  },
  topSections: [
    {
      title: "Sklad Ofensywny",
      subtitle: "Glowne grupy jednostek",
      icon: Swords,
      content: {
        type: "metrics",
        items: [
          {
            label: "Wojska naziemne",
            value: "18",
            helper: "Trzon skladu oparty o jednostki wspierajace i regularny progres koszar.",
            tone: "brand",
          },
          {
            label: "Wojska powietrzne",
            value: "14",
            helper: "Sekcja grywalna z miejscem na kolejny skok poziomow.",
          },
          {
            label: "Czary",
            value: "9/12",
            helper: "Baza pod sklady mieszane i szybkie rotacje atakow.",
            tone: "success",
          },
          {
            label: "Machiny",
            value: "2/5",
            helper: "Stan rozwoju wsparcia oblazniczego dla glownych atakow.",
          },
        ],
      },
    },
    {
      title: "Kolejka Ulepszen",
      subtitle: "Najwazniejsze kroki",
      icon: Axe,
      content: {
        type: "list",
        items: [
          "Trzon glownego skladu ofensywnego przed alternatywnymi strategiami.",
          "Badania jednostek wspierajacych pod regularny sklad ataku.",
          "Domkniecie wojsk pod wojny po ustabilizowaniu farmienia.",
        ],
      },
    },
  ],
  bottomSections: [
    {
      title: "Postep Treningu",
      subtitle: "Koszary, czary i obozy",
      icon: FlaskConical,
      content: {
        type: "progress",
        items: [
          { label: "Baraki", value: "81%", progress: 81 },
          { label: "Mroczne baraki", value: "66%", progress: 66 },
          { label: "Fabryka czarow", value: "75%", progress: 75 },
          { label: "Obozy", value: "88%", progress: 88 },
        ],
      },
    },
    {
      title: "Styl Gry",
      subtitle: "Ocena praktyczna",
      icon: ShieldEllipsis,
      content: {
        type: "info",
        items: [
          {
            title: "Farming",
            value: "Bardzo stabilny",
            description:
              "Aktualny sklad najlepiej wspiera regularne zbieranie surowcow i szybkie serie atakow.",
          },
          {
            title: "Wojny",
            value: "W drodze do formy",
            description:
              "Dalsze badania i poziomy bohaterow podniosa pewnosc skladow wojennych.",
            tone: "brand",
          },
        ],
      },
    },
  ],
};
