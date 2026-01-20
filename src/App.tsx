import { useState } from "react";

export default function App() {
  // Stan autoryzacji (docelowo z Twojego modułu Auth w NestJS/JWT)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-bg-body text-text-main font-sans">
      {/* --- NAWIGACJA --- */}
      <nav className="border-b border-ui-border bg-bg-page/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-linear-to-br from-brand to-accent-text rounded-xl shadow-[0_0_20px_rgba(188,71,251,0.3)] group-hover:rotate-6 transition-transform" />
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">
              CLASH<span className="text-brand">TRK</span>
            </h1>
          </div>

          {/* Menu */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              /* Widoczne tylko dla ZALOGOWANYCH */
              <div className="flex items-center gap-4">
                <button className="text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-full bg-brand text-white shadow-lg shadow-brand/20 hover:scale-105 transition-all">
                  Panel Gracza
                </button>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-[10px] font-bold uppercase text-error hover:underline"
                >
                  Wyloguj
                </button>
              </div>
            ) : (
              /* Widoczne dla NIEZALOGOWANYCH */
              <div className="flex items-center gap-2">
                <button className="text-xs font-bold uppercase px-6 py-2 text-text-main hover:text-brand transition-colors">
                  Zaloguj
                </button>
                <button className="text-xs font-bold uppercase px-6 py-2 rounded-full border border-ui-border hover:border-brand transition-all">
                  Rejestracja
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* --- HERO / INFO --- */}
      <main className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="inline-block mb-6 px-4 py-1 rounded-full border border-brand/20 bg-brand/5 text-brand text-[10px] font-bold uppercase tracking-widest">
          Wersja Beta 1.0
        </div>

        <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight italic uppercase">
          Twoje statystyki, <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-accent-text">
            nowy standard.
          </span>
        </h2>

        <p className="text-text-dim text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          ClashTracker to zaawansowane narzędzie do analityki Twojego profilu w
          Clash of Clans. Monitoruj postępy bohaterów, śledź wydajność klanu i
          planuj ulepszenia z poziomu nowoczesnego panelu.
        </p>

        {/* Sekcja Informacyjna */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="p-8 rounded-3xl bg-bg-card border border-ui-border hover:border-brand/30 transition-colors text-left">
            <div className="text-brand text-2xl mb-4 italic font-black">
              01.
            </div>
            <h3 className="text-lg font-bold mb-2 uppercase">
              Pełna Analityka
            </h3>
            <p className="text-text-dim text-sm">
              Wszystkie dane z API Supercell w jednym miejscu, od armii po
              osiągnięcia.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-bg-card border border-ui-border hover:border-brand/30 transition-colors text-left">
            <div className="text-brand text-2xl mb-4 italic font-black">
              02.
            </div>
            <h3 className="text-lg font-bold mb-2 uppercase">Twój Profil</h3>
            <p className="text-text-dim text-sm">
              Zapisz swój tag na stałe i miej dostęp do historii postępów po
              każdym zalogowaniu.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-bg-card border border-ui-border hover:border-brand/30 transition-colors text-left">
            <div className="text-brand text-2xl mb-4 italic font-black">
              03.
            </div>
            <h3 className="text-lg font-bold mb-2 uppercase">System Kont</h3>
            <p className="text-text-dim text-sm">
              Bezpieczne logowanie i autoryzacja zapewniają prywatność Twoich
              danych.
            </p>
          </div>
        </div>

        {/* Przycisk testowy do zmiany stanu */}
        <div className="mt-16 pt-10 border-t border-ui-border/50">
          <button
            onClick={() => setIsLoggedIn(true)}
            className="text-[10px] uppercase tracking-[0.3em] text-text-dim hover:text-brand transition-all"
          >
            Symuluj zalogowanie (pokazuje Panel w menu)
          </button>
        </div>
      </main>
    </div>
  );
}
