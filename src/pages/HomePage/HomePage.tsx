import { type FC } from "react";
import { FeatureCard } from "../../components/FeatureCard/FeatureCard";

export const HomePage: FC = () => {
  const releaseLabel = `Publiczna beta v${__APP_VERSION__}`;

  return (
    <div className="min-h-screen bg-bg-body text-text-main">
      <main className="max-w-5xl mx-auto px-6 py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 -right-20 w-96 h-96 bg-brand/10 blur-[130px] rounded-full -z-10" />
        <div className="absolute bottom-0 -left-20 w-96 h-96 bg-accent-text/5 blur-[130px] rounded-full -z-10" />

        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-block mb-6 px-4 py-1 rounded-full border border-brand/20 bg-brand/5 text-brand text-[10px] font-bold uppercase tracking-[0.2em]">
            {releaseLabel}
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] italic uppercase text-text-main tracking-tighter">
            Twoja baza, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-accent-text">
              jeden panel.
            </span>
          </h2>

          <p className="text-text-dim text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            ClashTracker to frontendowy panel gracza do śledzenia postępu w
            Clash of Clans. Aktualna wersja obejmuje profil, armię, obronę,
            surowce, pułapki, laboratorium, bohaterów, zwierzęta i ustawienia
            konta.
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <FeatureCard
            number="01."
            title="Panel Gracza"
            description="Przegląd profilu, priorytetów ulepszeń i najważniejszych sekcji konta w jednym widoku."
          />
          <FeatureCard
            number="02."
            title="Moduły Postępu"
            description="Gotowe widoki dla armii, obrony, surowców, pułapek, laboratorium, bohaterów i zwierząt."
          />
          <FeatureCard
            number="03."
            title="Konto i Dostęp"
            description="Rejestracja, logowanie, weryfikacja e-mail, reset hasła i ustawienia połączone z API."
          />
        </div>

        <p className="mt-10 text-xs text-text-dim uppercase tracking-[0.18em] font-bold opacity-70">
          Moduły klanu, wojen, Builder Base i Clan Capital są jeszcze w
          przygotowaniu.
        </p>
      </main>
    </div>
  );
};
