import {
  LayoutDashboard,
  Castle,
  Pickaxe,
  Tent,
  Shield,
  UserCircle,
  Settings,
} from "lucide-react";
import type { DashboardNavItem } from "./types/dashboard.types";

export const dashboardNavigation: DashboardNavItem[] = [
  {
    id: "overview",
    label: "Dashboard",
    description: "Pulpit nawigacyjny",
    to: "/dashboard",
    icon: LayoutDashboard,
    category: "general",
  },
  {
    id: "home",
    label: "Home Village",
    description: "Baza główna i ekonomia",
    to: "/dashboard/home",
    icon: Castle,
    category: "villages",
    children: [
      { label: "Podsumowanie", to: "/dashboard/home" },
      { label: "Armia i Zaklęcia", to: "/dashboard/home/army" },
      { label: "Bohaterowie i Pety", to: "/dashboard/home/heroes" },
      { label: "Obrona i Pułapki", to: "/dashboard/home/defense" },
      { label: "Ekonomia i Lab", to: "/dashboard/home/economy" },
    ],
  },
  {
    id: "builder",
    label: "Builder Base",
    description: "Baza budowniczego",
    to: "/dashboard/builder",
    icon: Pickaxe,
    category: "villages",
    children: [
      { label: "Podsumowanie", to: "/dashboard/builder" },
      { label: "Armia", to: "/dashboard/builder/army" },
      { label: "Maszyny Bojowe", to: "/dashboard/builder/heroes" },
      { label: "Obrona", to: "/dashboard/builder/defense" },
    ],
  },
  {
    id: "capital",
    label: "Clan Capital",
    description: "Stolica klanu",
    to: "/dashboard/capital",
    icon: Tent,
    category: "villages",
    children: [
      { label: "Dzielnice", to: "/dashboard/capital/districts" },
      { label: "Wojska Stolicy", to: "/dashboard/capital/army" },
      { label: "Rozwój", to: "/dashboard/capital/upgrades" },
    ],
  },
  {
    id: "clan",
    label: "Klan",
    description: "Zarządzanie klanem",
    to: "/dashboard/clan",
    icon: Shield,
    category: "community",
    children: [
      { label: "Członkowie", to: "/dashboard/clan/members" },
      { label: "Wojny i CWL", to: "/dashboard/clan/wars" },
      { label: "Gry Klanowe", to: "/dashboard/clan/games" },
    ],
  },
  {
    id: "profile",
    label: "Profil Gracza",
    description: "Twoje statystyki",
    to: "/dashboard/profile",
    icon: UserCircle,
    category: "account",
    children: [
      { label: "Statystyki", to: "/dashboard/profile/stats" },
      { label: "Osiągnięcia", to: "/dashboard/profile/achievements" },
    ],
  },
  {
    id: "settings",
    label: "Ustawienia API",
    description: "Tokeny i preferencje",
    to: "/dashboard/settings",
    icon: Settings,
    category: "account",
  },
];

export const isRouteActive = (pathname: string, targetPath: string) => {
  if (targetPath === "/dashboard") {
    return pathname === targetPath;
  }
  return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
};

export const getDashboardCurrentSection = (
  pathname: string,
): { label: string; description: string } => {
  for (const item of dashboardNavigation) {
    if (item.children) {
      const childMatch = item.children.find(
        (child) => pathname === child.to || pathname.startsWith(`${child.to}/`),
      );
      if (childMatch) {
        return {
          label: childMatch.label,
          description: item.label,
        };
      }
    }
  }

  const mainMatch = dashboardNavigation.find(
    (item) => pathname === item.to || pathname.startsWith(`${item.to}/`),
  );

  if (mainMatch) {
    return {
      label: mainMatch.label,
      description: mainMatch.description,
    };
  }

  return {
    label: "Dashboard",
    description: "Pulpit nawigacyjny",
  };
};
