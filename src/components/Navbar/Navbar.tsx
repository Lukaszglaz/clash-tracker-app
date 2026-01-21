import { type FC } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="border-b border-ui-border bg-bg-page/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-linear-to-br from-brand to-accent-text rounded-xl shadow-[0_0_20px_rgba(188,71,251,0.3)] group-hover:rotate-6 transition-transform" />
          <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white">
            CLASH<span className="text-brand">TRK</span>
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-full bg-brand text-white shadow-lg shadow-brand/20 hover:scale-105 transition-all text-center"
              >
                Panel Gracza
              </Link>
              <button
                onClick={onLogout}
                className="text-[10px] font-bold uppercase text-error hover:underline cursor-pointer"
              >
                Wyloguj
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-bold uppercase px-6 py-2 text-text-main hover:text-brand transition-colors cursor-pointer"
              >
                Zaloguj
              </Link>
              <Link
                to="/register"
                className="text-xs font-bold uppercase px-6 py-2 rounded-full border border-ui-border hover:border-brand transition-all cursor-pointer text-center"
              >
                Rejestracja
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
