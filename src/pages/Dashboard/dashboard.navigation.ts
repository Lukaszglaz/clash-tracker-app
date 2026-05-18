import {
  Boxes,
  Castle,
  Flag,
  LayoutDashboard,
  Pickaxe,
  ScrollText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface DashboardNavItem {
  id: string;
  label: string;
  description: string;
  to: string;
  icon: LucideIcon;
}

export const dashboardNavigation: DashboardNavItem[] = [
  {
    id: "overview",
    label: "Start",
    description: "Nowa baza panelu i glowne wejscia do sekcji.",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "homeVillage",
    label: "Home Village",
    description: "Armia, bohaterowie i struktury glownej wyspy.",
    to: "/dashboard/home-village",
    icon: Castle,
  },
  {
    id: "builderBase",
    label: "Builder Base",
    description: "Druga wyspa rozpisana na oddzielne kategorie.",
    to: "/dashboard/builder-base",
    icon: Pickaxe,
  },
  {
    id: "progression",
    label: "Progression",
    description: "Budynki produkcyjne i zaleznosci odblokowan.",
    to: "/dashboard/progression",
    icon: Boxes,
  },
  {
    id: "achievements",
    label: "Achievements",
    description: "Osiagniecia i cele konta przygotowane pod live API.",
    to: "/dashboard/achievements",
    icon: Sparkles,
  },
  {
    id: "helpers",
    label: "Helpers",
    description: "Pomocnicy i dodatkowe systemy wsparcia.",
    to: "/dashboard/helpers",
    icon: ScrollText,
  },
  {
    id: "clan",
    label: "Clan",
    description: "Baza pod dane klanu, lig i pucharkow.",
    to: "/dashboard/clan",
    icon: Flag,
  },
];

export const getDashboardCurrentSection = (pathname: string) =>
  dashboardNavigation.find((item) =>
    pathname === item.to || pathname.startsWith(`${item.to}/`),
  ) ?? dashboardNavigation[0]!;
