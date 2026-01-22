import { type FC } from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Twitter,
  MessageSquare,
  Mail,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

export const Footer: FC = () => {
  return (
    <footer className="bg-bg-card border-t border-ui-border mt-auto relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-brand/5 blur-[100px] -z-10" />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className=" font-black italic uppercase tracking-tighter text-xl">
              Clash<span className="text-brand">Tracker</span>
            </h3>
            <p className="text-text-dim text-xs leading-relaxed max-w-xs">
              Najbardziej zaawansowane narzędzie do analityki Twojego klanu i
              profilu. Monitoruj postępy, planuj upgrade'y i dominuj w Clash of
              Clans.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="text-text-dim hover:text-brand transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="text-text-dim hover:text-brand transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="text-text-dim hover:text-brand transition-colors"
              >
                <MessageSquare size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className=" text-[10px] uppercase tracking-[0.2em] font-black mb-6 flex items-center gap-2">
              <ShieldCheck size={14} className="text-brand" /> Prawne
            </h4>
            <ul className="space-y-3 text-[11px] font-bold uppercase tracking-widest text-text-dim">
              <li>
                <Link
                  to="/regulamin"
                  className="hover:text-brand transition-colors"
                >
                  Regulamin
                </Link>
              </li>
              <li>
                <Link
                  to="/polityka-prywatnosci"
                  className="hover:text-brand transition-colors"
                >
                  Polityka Prywatności
                </Link>
              </li>
              <li>
                <Link to="/rodo" className="hover:text-brand transition-colors">
                  Klauzula RODO
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="hover:text-brand transition-colors"
                >
                  Polityka Cookies
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className=" text-[10px] uppercase tracking-[0.2em] font-black mb-6 flex items-center gap-2">
              <HelpCircle size={14} className="text-brand" /> Wsparcie
            </h4>
            <ul className="space-y-3 text-[11px] font-bold uppercase tracking-widest text-text-dim">
              <li>
                <Link to="/faq" className="hover:text-brand transition-colors">
                  Częste Pytania (FAQ)
                </Link>
              </li>
              <li>
                <Link
                  to="/instrukcja"
                  className="hover:text-brand transition-colors"
                >
                  Jak zacząć?
                </Link>
              </li>
              <li>
                <Link
                  to="/api-info"
                  className="hover:text-brand transition-colors"
                >
                  Status API Supercell
                </Link>
              </li>
              <li>
                <Link
                  to="/changelog"
                  className="hover:text-brand transition-colors"
                >
                  Lista Zmian
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className=" text-[10px] uppercase tracking-[0.2em] font-black mb-6 flex items-center gap-2">
              <Mail size={14} className="text-brand" /> Kontakt
            </h4>
            <div className="space-y-4">
              <p className="text-[11px] text-text-dim leading-relaxed italic">
                Masz pytania lub znalazłeś błąd? Napisz bezpośrednio do twórcy:
              </p>
              <a
                href="mailto:kontakt@glazlukasz.pl"
                className="inline-block bg-brand/10 border border-brand/20 px-4 py-2 rounded-xl text-brand text-[10px] font-black hover:bg-brand hover:text-white transition-all underline decoration-brand/30"
              >
                KONTAKT@GLAZLUKASZ.PL
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-ui-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] text-text-dim/50 uppercase tracking-[0.3em] font-bold">
            © 2026 ClashTracker. Wszelkie prawa zastrzeżone.
          </p>
          <div className="pt-10 border-t border-ui-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] text-text-dim/40 uppercase tracking-[0.4em] font-bold">
              © 2026 ClashTracker. All Rights Reserved.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-text-dim/60 uppercase tracking-[0.15em] font-medium">
              Designed & Developed by
              <a
                href="https://glazlukasz.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-main font-black hover:text-brand transition-all border-b border-brand/0 hover:border-brand pb-0.5"
              >
                Łukasz Głaz
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
