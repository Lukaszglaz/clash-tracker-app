import { type FC } from "react";
import { Info } from "lucide-react";
import { DashboardPanel } from "../../shared/DashboardContent";
import { settingsIntegrationCards } from "../settings.data";

export const SettingsIntegrationsPanel: FC = () => {
  return (
    <DashboardPanel
      title="Integracje i Zrodla Danych"
      subtitle="Obszary danych i workflow"
      icon={Info}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {settingsIntegrationCards.map((integrationCard) => {
          const Icon = integrationCard.icon;

          return (
            <article
              key={integrationCard.title}
              className="rounded-3xl border border-ui-border bg-bg-muted/55 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-black text-text-main">
                  {integrationCard.title}
                </p>
                <Icon className="shrink-0 text-brand" size={18} />
              </div>
              <p className="mt-4 text-sm leading-6 text-text-dim">
                {integrationCard.description}
              </p>
            </article>
          );
        })}
      </div>
    </DashboardPanel>
  );
};
