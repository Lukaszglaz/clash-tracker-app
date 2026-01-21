import { type FC, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { FeatureCard } from "../../components/FeatureCard/FeatureCard";

export const HomePage: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-bg-body text-text-main font-sans ">
      <Navbar isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />

      <main className="max-w-5xl mx-auto px-6 py-24 text-center">
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-block mb-6 px-4 py-1 rounded-full border border-brand/20 bg-brand/5 text-brand text-[10px] font-bold uppercase tracking-[0.2em]">
            Wersja Beta 1.0
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] italic uppercase text-white">
            Twoje statystyki, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-accent-text">
              nowy standard.
            </span>
          </h2>
          <p className="text-text-dim text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            ClashTracker to zaawansowane narzędzie do analityki Twojego profilu
            w Clash of Clans. Monitoruj postępy bohaterów i śledź wydajność
            klanu.
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <FeatureCard
            number="01."
            title="Pełna Analityka"
            description="Wszystkie dane z API Supercell w jednym miejscu, od armii po osiągnięcia."
          />
          <FeatureCard
            number="02."
            title="Twój Profil"
            description="Zapisz swój tag na stałe i miej dostęp do historii postępów po każdym zalogowaniu."
          />
          <FeatureCard
            number="03."
            title="System Kont"
            description="Bezpieczne logowanie i autoryzacja zapewniają prywatność Twoich danych."
          />
        </div>
      </main>
    </div>
  );
};
