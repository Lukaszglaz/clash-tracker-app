import { type FC, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../shared/Button/Button";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isResetPage = location.pathname === "/reset-password";
  const isVerifyPage = location.pathname === "/verify-email";

  const showVerifyAlert =
    isLoggedIn && user && !user.isVerified && !isVerifyPage && !isResetPage;

  return (
    <>
      {showVerifyAlert && (
        <div className="bg-error/10 border-b border-error/20 py-2 animate-in slide-in-from-top duration-500">
          <div className="max-w-7xl mx-auto px-6 flex justify-center items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-error italic">
              Twoje konto nie jest w pełni aktywne!
            </span>
            <Button variant="destructive" size="small">
              <Link to="/verify-email">Weryfikacja konta</Link>
            </Button>
          </div>
        </div>
      )}

      <nav className="border-b border-ui-border bg-bg-page/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-linear-to-br from-brand to-accent-text rounded-xl shadow-[0_0_20px_rgba(188,71,251,0.3)] group-hover:rotate-6 transition-transform" />
            <h1 className="text-2xl font-black tracking-tighter uppercase italic text-text-main">
              CLASH<span className="text-brand">TRK</span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                {user?.isVerified || isResetPage ? (
                  <Button
                    asChild
                    variant="primary"
                    size="small"
                    className="border border-ui-border"
                  >
                    <Link to="/dashboard">Panel Gracza</Link>
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    actionStyle="filled"
                    isPulsing={true}
                    size="small"
                  >
                    <Link to="/verify-email">Weryfikacja konta</Link>
                  </Button>
                )}
                <Button
                  variant="destructive"
                  actionStyle="outline-subtle"
                  size="small"
                  onClick={onLogout}
                >
                  Wyloguj
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  variant="primary"
                  size="small"
                  className="border border-ui-border"
                >
                  <Link to="/login">Zaloguj</Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="small"
                  className="border border-ui-border"
                >
                  <Link to="/register">Zarejestruj się</Link>
                </Button>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-text-main"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-bg-body/80 backdrop-blur-xl border-b border-ui-border z-100 shadow-2xl animate-in fade-in slide-in-from-top-2">
            <div className="p-6 flex flex-col items-center gap-4">
              {isLoggedIn ? (
                <>
                  {user?.isVerified || isResetPage ? (
                    <Button
                      asChild
                      variant="primary"
                      size="medium"
                      className="border border-ui-border"
                    >
                      <Link to="/dashboard">Panel Gracza</Link>
                    </Button>
                  ) : (
                    <Button
                      variant="destructive"
                      actionStyle="filled"
                      isPulsing={true}
                      size="medium"
                    >
                      <Link to="/verify-email">Weryfikacja konta</Link>
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    actionStyle="outline-subtle"
                    size="medium"
                    onClick={onLogout}
                  >
                    Wyloguj
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="primary"
                    size="medium"
                    className="border border-ui-border"
                  >
                    <Link to="/login">Zaloguj</Link>
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    size="medium"
                    className="border border-ui-border"
                  >
                    <Link to="/register">Zarejestruj się</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
