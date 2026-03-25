import {
  FlaskConical,
  LayoutDashboard,
  PawPrint,
  Pickaxe,
  Settings,
  Shield,
  Swords,
  Star,
  Target,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface DashboardNavItem {
  to: string;
  icon: LucideIcon;
  label: string;
  description: string;
}

interface DashboardNavGroup {
  label: string;
  items: DashboardNavItem[];
}

interface DashboardFutureModule {
  icon: LucideIcon;
  label: string;
  description: string;
}

interface DashboardSectionMeta {
  title: string;
  description: string;
}

export const navigationGroups: DashboardNavGroup[] = [
  {
    label: "Glowne",
    items: [
      {
        to: "/dashboard",
        icon: LayoutDashboard,
        label: "Przeglad Profilu",
        description: "Podsumowanie postepu, aktywnych sekcji i priorytetow.",
      },
      {
        to: "/dashboard/settings",
        icon: Settings,
        label: "Ustawienia Konta",
        description: "Dane profilu, status konta i integracje systemowe.",
      },
    ],
  },
  {
    label: "Wioska Glowna",
    items: [
      {
        to: "/dashboard/army",
        icon: Users,
        label: "Jednostki Armii",
        description: "Wojska, czary, obozy i status ofensywy.",
      },
      {
        to: "/dashboard/defense",
        icon: Shield,
        label: "Budowle Obronne",
        description: "Wieze, rdzen obrony, mury i kierunek ulepszen.",
      },
      {
        to: "/dashboard/resources",
        icon: Pickaxe,
        label: "Surowce i Zbieracze",
        description: "Produkcja, magazyny, builderzy i ekonomia bazy.",
      },
      {
        to: "/dashboard/traps",
        icon: Target,
        label: "Pulapki",
        description: "Typy pulapek, poziomy i skutecznosc obrony.",
      },
      {
        to: "/dashboard/laboratory",
        icon: FlaskConical,
        label: "Laboratorium",
        description: "Badania, kolejka ulepszen i postep jednostek.",
      },
    ],
  },
  {
    label: "Elita",
    items: [
      {
        to: "/dashboard/heroes",
        icon: Star,
        label: "Bohaterowie",
        description: "Poziomy, role, gotowosc i plan ulepszen.",
      },
      {
        to: "/dashboard/pets",
        icon: PawPrint,
        label: "Zwierzeta",
        description: "Zwierzeta bohaterow, pary i priorytety rozwoju.",
      },
    ],
  },
];

export const futureModules: DashboardFutureModule[] = [
  {
    icon: Swords,
    label: "Machiny Obleznicze",
    description: "Poziomy, odblokowania i gotowosc pod wojny.",
  },
  {
    icon: Trophy,
    label: "Wojny i CWL",
    description: "Logi bitew, skutecznosc atakow i wyniki klanu.",
  },
  {
    icon: Shield,
    label: "Builder Base i Clan Capital",
    description: "Dodatkowe tryby gry z osobnym postepem i ekonomia.",
  },
  {
    icon: Star,
    label: "Wyposazenie Bohaterow",
    description: "Poziomy ekwipunku i konfiguracja pod sklady ataku.",
  },
];

export const sectionMeta: Record<string, DashboardSectionMeta> = {
  "/dashboard": {
    title: "Przeglad Profilu",
    description: "Podsumowanie bazy, aktywnych sekcji i glownych priorytetow.",
  },
  "/dashboard/settings": {
    title: "Ustawienia Konta",
    description: "Dane profilu, status konta, integracje i opcje panelu.",
  },
  "/dashboard/army": {
    title: "Jednostki Armii",
    description: "Wojska, czary, trening i kierunek rozwoju ofensywy.",
  },
  "/dashboard/defense": {
    title: "Budowle Obronne",
    description: "Rdzen obrony, slabe punkty bazy i stan ulepszen.",
  },
  "/dashboard/resources": {
    title: "Surowce i Zbieracze",
    description: "Produkcja, magazyny, builderzy i tempo rozwoju bazy.",
  },
  "/dashboard/traps": {
    title: "Pulapki",
    description: "Typy pulapek, pokrycie obrony i wartosc bojowa.",
  },
  "/dashboard/laboratory": {
    title: "Laboratorium",
    description: "Badania, kolejne ulepszenia i postep jednostek.",
  },
  "/dashboard/heroes": {
    title: "Bohaterowie",
    description: "Role bohaterow, poziomy i gotowosc do bitew.",
  },
  "/dashboard/pets": {
    title: "Zwierzeta",
    description: "Zwierzeta bohaterow, synergie i plan kolejnych poziomow.",
  },
};
