import {
  Bell,
  DatabaseZap,
  LayoutPanelTop,
  Link2,
  type LucideIcon,
  ServerCog,
} from "lucide-react";
import type {
  DashboardHeroStat,
  DashboardMetricItem,
} from "../shared/DashboardContent";

export interface SettingsOptionCardData {
  key:
    | "advancedPanelsEnabled"
    | "apiSyncEnabled"
    | "emailAlertsEnabled"
    | "customSystemsEnabled";
  title: string;
  description: string;
  label: string;
  icon: LucideIcon;
}

export interface SettingsIntegrationCardData {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface BuildSettingsHeroStatsArgs {
  profileCompletionPercent: number;
  securityScore: number;
  playerTag: string;
  isVerified: boolean;
}

interface BuildSettingsSummaryCardsArgs {
  fullName: string;
  email: string;
  updatedAt?: string;
  advancedPanelsEnabled: boolean;
}

export const settingsOptionCards: SettingsOptionCardData[] = [
  {
    key: "advancedPanelsEnabled",
    title: "Rozszerzone boxy danych",
    description:
      "Dodatkowe informacje po prawej stronie po wejsciu w obiekt lub modul.",
    label: "Aktywuj prawa kolumne pod szczegoly obiektu",
    icon: LayoutPanelTop,
  },
  {
    key: "apiSyncEnabled",
    title: "Synchronizacja danych",
    description:
      "Odswiezanie danych gracza, klanu i pozostalych sekcji dashboardu.",
    label: "Wlacz automatyczne odswiezanie danych",
    icon: Link2,
  },
  {
    key: "emailAlertsEnabled",
    title: "Alerty i zdarzenia",
    description:
      "Powiadomienia o zmianach builderow, laboratorium, wojnach i stanie konta.",
    label: "Pokazuj alerty systemowe i eventy",
    icon: Bell,
  },
  {
    key: "customSystemsEnabled",
    title: "Moduly dodatkowe",
    description:
      "Sekcje pod kalkulatory, statusy, cache i pozostale moduly dodatkowe.",
    label: "Pokazuj sekcje dodatkowe",
    icon: ServerCog,
  },
];

export const settingsIntegrationCards: SettingsIntegrationCardData[] = [
  {
    title: "Dane gracza",
    description:
      "Profil, armia, progres, historia i pozostale dane konta z gry.",
    icon: DatabaseZap,
  },
  {
    title: "Moduly dodatkowe",
    description:
      "Kalkulatory, synchronizacje, cache i logika dodatkowych funkcji.",
    icon: ServerCog,
  },
  {
    title: "Synchronizacja",
    description:
      "Harmonogram odswiezania, logi synchronizacji i historia zmian danych.",
    icon: Link2,
  },
  {
    title: "Panel boczny",
    description:
      "Szczegoly obiektu, statusy i dodatkowe informacje kontekstowe.",
    icon: LayoutPanelTop,
  },
];

export const settingsMissingModules = [
  "Builder Base, Clan Capital i osobne widoki dodatkowych trybow gry.",
  "Klan, wojny, CWL, logi bitew i statystyki sezonowe.",
  "Machiny obleznicze, wyposazenie bohaterow oraz osiagniecia.",
];

export const buildSettingsHeroStats = ({
  profileCompletionPercent,
  securityScore,
  playerTag,
  isVerified,
}: BuildSettingsHeroStatsArgs): DashboardHeroStat[] => [
  {
    label: "Kompletnosc profilu",
    value: `${profileCompletionPercent}%`,
    tone: "brand",
  },
  { label: "Bezpieczenstwo", value: `${securityScore}/100`, tone: "success" },
  { label: "Tag gracza", value: playerTag || "Brak" },
  {
    label: "Weryfikacja",
    value: isVerified ? "Aktywna" : "Do potwierdzenia",
    tone: isVerified ? "success" : "neutral",
  },
];

export const buildSettingsSummaryCards = ({
  fullName,
  email,
  updatedAt,
  advancedPanelsEnabled,
}: BuildSettingsSummaryCardsArgs): DashboardMetricItem[] => [
  {
    label: "Nazwa wyswietlana",
    value: fullName,
    helper: "Podstawowy identyfikator profilu gracza.",
    tone: "brand",
  },
  {
    label: "Adres email",
    value: email || "---",
    helper: "Adres konta pod logowanie, alerty i workflow.",
  },
  {
    label: "Ostatnia aktualizacja",
    value: updatedAt
      ? new Date(updatedAt).toLocaleDateString("pl-PL")
      : "Brak zmian",
    helper: "Znacznik czasu pod synchronizacje i logi zmian.",
  },
  {
    label: "Stan panelu",
    value: advancedPanelsEnabled ? "Rozszerzony" : "Minimalny",
    helper: "Zakres szczegolow dostepnych w prawej kolumnie i sekcjach pobocznych.",
    tone: "success",
  },
];
