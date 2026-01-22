import { useState, type FC, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/axios";
import { LogIn, AlertCircle, Lock, Mail } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

export const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/login", { email, password });

      login(response.data.access_token);

      toast.success("Zalogowano pomyślnie!", {
        icon: <LogIn size={20} className="text-brand" />,
        style: {
          borderRadius: "16px",
          background: "#161127",
          border: "1px solid rgba(188, 71, 251, 0.2)",
          color: "#fff",
        },
      });

      navigate("/dashboard");
    } catch (err: any) {
      const errMsg =
        err.response?.data?.message || "Nieprawidłowe dane logowania.";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-body px-6 relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-text/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500 relative z-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Link to="/">
              <div className="w-12 h-12 bg-linear-to-br from-brand to-accent-text rounded-2xl shadow-lg shadow-brand/20 hover:scale-105 transition-transform" />
            </Link>
            <h2 className="text-3xl font-black italic uppercase tracking-tight text-text-main">
              Clash <span className="text-brand">Tracker</span>
            </h2>
          </div>
          <h2 className="text-3xl font-black italic uppercase tracking-tight text-text-main">
            Witaj <span className="text-brand">ponownie</span>
          </h2>
          <p className="text-text-dim mt-2 text-sm uppercase tracking-widest font-bold opacity-60">
            Zaloguj się do swojego profilu
          </p>
        </div>

        <div className="bg-bg-card border border-ui-border rounded-[2.5rem] p-8 md:p-10 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-error/10 border border-error/20 text-error text-[11px] font-bold italic uppercase tracking-wider animate-shake">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-text-dim mb-2 ml-1 group-focus-within:text-brand transition-colors">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bg-body border-2 border-ui-border rounded-2xl px-5 py-4 pl-12 focus:outline-none focus:border-brand/50 transition-all text-text-main"
                  placeholder="example@email.com"
                />
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim/40 group-focus-within:text-brand transition-colors"
                  size={18}
                />
              </div>
            </div>

            <div className="group">
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-text-dim group-focus-within:text-brand transition-colors">
                  Hasło
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[10px] uppercase tracking-widest font-black text-brand/60 hover:text-brand transition-colors"
                >
                  Zapomniałeś hasła?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-bg-body border-2 border-ui-border rounded-2xl px-5 py-4 pl-12 focus:outline-none focus:border-brand/50 transition-all text-text-main"
                  placeholder="••••••••"
                />
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim/40 group-focus-within:text-brand transition-colors"
                  size={18}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-brand hover:bg-brand-hover text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-brand/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-3"
            >
              {isLoading ? "Autoryzacja..." : "Zaloguj się"}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-white/5">
            <p className="text-text-dim text-xs uppercase tracking-widest font-bold opacity-60">
              Nie masz konta?{" "}
              <Link
                to="/register"
                className="text-brand font-black hover:underline ml-1"
              >
                Stwórz je tutaj
              </Link>
            </p>
            <p className="text-text-dim mt-1.5 text-xs uppercase tracking-widest font-bold opacity-60">
              Wróć na stronę główną{" "}
              <Link
                to="/"
                className="text-brand font-black hover:underline ml-1"
              >
                Kliknij tutaj.
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-10 text-[10px] text-text-dim/30 uppercase tracking-[0.2em]">
          Masz problem?{" "}
          <span className="text-text-dim/60">kontakt@glazlukasz.pl</span>
        </p>
      </div>
    </div>
  );
};
