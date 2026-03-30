import { type FC } from "react";
import clsx from "clsx";
import {
  BellRing,
  LayoutPanelTop,
  Link2,
  ServerCog,
  Tag,
  type LucideIcon,
} from "lucide-react";

interface SettingsPanelPreviewProps {
  advancedPanelsEnabled: boolean;
  apiSyncEnabled: boolean;
  emailAlertsEnabled: boolean;
  customSystemsEnabled: boolean;
  playerTag: string;
}

interface PreviewCard {
  title: string;
  description: string;
  status: string;
  active: boolean;
  icon: LucideIcon;
}

export const SettingsPanelPreview: FC<SettingsPanelPreviewProps> = ({
  advancedPanelsEnabled,
  apiSyncEnabled,
  emailAlertsEnabled,
  customSystemsEnabled,
  playerTag,
}) => {
  const previewCards: PreviewCard[] = [
    {
      title: "Prawa kolumna",
      description: advancedPanelsEnabled
        ? "Widoczne sa status konta, informacje systemowe i panele poboczne."
        : "Glowny widok pokazuje tylko podstawowa kolumne z trescia.",
      status: advancedPanelsEnabled ? "Widoczna" : "Ukryta",
      active: advancedPanelsEnabled,
      icon: LayoutPanelTop,
    },
    {
      title: "Synchronizacja",
      description: apiSyncEnabled
        ? playerTag
          ? "Dane ustawien moga odswiezac sie automatycznie w tle."
          : "Auto-sync jest wlaczony, ale wymaga przypisanego tagu gracza."
        : "Dane odswiezaja sie dopiero po recznym zapisie lub wejsciu.",
      status: apiSyncEnabled ? (playerTag ? "Aktywna" : "Czeka na tag") : "Reczna",
      active: apiSyncEnabled && Boolean(playerTag),
      icon: Link2,
    },
    {
      title: "Alerty konta",
      description: emailAlertsEnabled
        ? advancedPanelsEnabled
          ? "Widoczny jest panel alertow i najwazniejszych zdarzen."
          : "Alerty sa wlaczone, ale prawa kolumna jest obecnie ukryta."
        : "Sekcja alertow pozostaje ukryta w widoku ustawien.",
      status: emailAlertsEnabled
        ? advancedPanelsEnabled
          ? "Widoczne"
          : "Wlaczone lokalnie"
        : "Ukryte",
      active: emailAlertsEnabled && advancedPanelsEnabled,
      icon: BellRing,
    },
    {
      title: "Moduly dodatkowe",
      description: customSystemsEnabled
        ? advancedPanelsEnabled
          ? "Widoczne sa integracje oraz miejsce na dalsze moduly systemowe."
          : "Integracje sa widoczne w glownej kolumnie, a prawa sekcja modulow jest ukryta."
        : "Dodatkowe integracje i moduly nie sa wyswietlane.",
      status: customSystemsEnabled ? "Aktywne" : "Wylaczone",
      active: customSystemsEnabled,
      icon: ServerCog,
    },
  ];

  return (
    <div className="rounded-3xl border border-ui-border bg-bg-card p-5 shadow-[0_14px_40px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-3 border-b border-ui-border/70 pb-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="text-[0.72rem] font-black uppercase tracking-[0.14em] text-text-dim">
            Podglad aktywnych sekcji
          </p>
          <p className="mt-2 text-sm leading-7 text-text-dim">
            Tylko widok ustawien i zachowanie panelu dla tego urzadzenia.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em] text-brand">
          <Tag size={13} />
          {playerTag || "Brak tagu"}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {previewCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className={clsx(
                "rounded-3xl border p-4 transition-colors",
                card.active
                  ? "border-success/20 bg-success/10"
                  : "border-ui-border/70 bg-bg-muted/55",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-black text-text-main">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-text-dim">
                    {card.description}
                  </p>
                </div>
                <div
                  className={clsx(
                    "rounded-2xl border p-3",
                    card.active
                      ? "border-success/20 bg-success/10 text-success"
                      : "border-ui-border/70 bg-bg-card text-text-dim",
                  )}
                >
                  <Icon size={16} />
                </div>
              </div>

              <div className="mt-4">
                <span
                  className={clsx(
                    "inline-flex rounded-full px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em]",
                    card.active
                      ? "bg-success/15 text-success"
                      : "bg-bg-card text-text-dim",
                  )}
                >
                  {card.status}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
