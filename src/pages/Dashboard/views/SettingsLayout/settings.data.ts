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
  enabledMessage: string;
  disabledMessage: string;
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
      "Prawa kolumna z dodatkowymi informacjami, statusami i szczegolami sekcji.",
    label: "Aktywuj prawa kolumne pod szczegoly obiektu",
    enabledMessage: "Prawa kolumna pokazuje dodatkowe szczegoly i panele poboczne.",
    disabledMessage: "Widok zostaje ograniczony do glownej kolumny z trescia.",
    icon: LayoutPanelTop,
  },
  {
    key: "apiSyncEnabled",
    title: "Synchronizacja danych",
    description:
      "Automatyczne odswiezanie danych profilu i ustawien powiazanych z kontem.",
    label: "Wlacz automatyczne odswiezanie danych",
    enabledMessage: "Panel odswieza dane w tle, gdy profil ma przypisany tag gracza.",
    disabledMessage: "Dane sa aktualizowane tylko po recznym wejsciu lub zapisie.",
    icon: Link2,
  },
  {
    key: "emailAlertsEnabled",
    title: "Alerty i zdarzenia",
    description:
      "Widok alertow konta, komunikacji i najwazniejszych sygnalow z panelu.",
    label: "Pokazuj alerty systemowe i eventy",
    enabledMessage: "Sekcja alertow pozostaje widoczna razem z informacjami o koncie.",
    disabledMessage: "Alerty sa ukryte, a panel pokazuje tylko podstawowe dane.",
    icon: Bell,
  },
  {
    key: "customSystemsEnabled",
    title: "Moduly dodatkowe",
    description:
      "Dodatkowe sekcje pod integracje, kalkulatory, cache i kolejne moduly.",
    label: "Pokazuj sekcje dodatkowe",
    enabledMessage: "Widoczne sa integracje i miejsce na dodatkowe moduly systemowe.",
    disabledMessage: "Dodatkowe integracje i moduly pozostaja ukryte.",
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
