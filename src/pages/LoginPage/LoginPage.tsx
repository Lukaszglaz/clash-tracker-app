import { useState, type FC, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  Mail,
  Lock,
  ArrowLeft,
  AlertCircle,
  LogIn,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "../../components/shared/Button/Button";
import { InputBase } from "../../components/shared/InputBase/InputBase";

export const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/login", { email, password });
      const { access_token, user } = response.data;

      login(access_token, user);

      toast.success("Witaj z powrotem!");

      if (!user.isVerified) {
        navigate("/verify-email", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err: any) {
      const errMsg =
        err.response?.data?.message || "Błąd logowania. Spróbuj ponownie.";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-body px-6 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-text/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link to="/" className="hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-linear-to-br from-brand to-accent-text rounded-2xl shadow-lg shadow-brand/20" />
            </Link>
            <h2 className="text-3xl font-black italic uppercase tracking-tight text-text-main">
              Clash <span className="text-brand">Tracker</span>
            </h2>
          </div>
          <h1 className="text-2xl font-black italic uppercase text-text-main/90">
            Witaj Ponownie
          </h1>
          <p className="text-text-dim text-xs uppercase tracking-[0.2em] font-bold mt-2 opacity-60">
            Zaloguj się do swojego konta
          </p>
        </div>

        <div className="bg-bg-card border border-ui-border rounded-[2.5rem] p-8 md:p-10 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-error/10 border border-error/20 text-error text-[11px] font-bold uppercase tracking-wider italic animate-shake">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-dim group-focus-within:text-brand transition-colors">
                <Mail size={18} />
              </div>
              <InputBase
                type="email"
                placeholder="Adres e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                leftIcon={<Mail size={18} />}
              />
            </div>

            <div className="relative group">
              <InputBase
                type={showPassword ? "text" : "password"}
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                leftIcon={<Lock />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-text-dim/50 hover:text-brand transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
              />
            </div>

            <div className="flex justify-end px-2">
              <Button
                asChild
                variant="clean"
                cleanStyle="link"
                className="text-xs"
              >
                <Link to="/forgot-password">Zapomniałeś hasła?</Link>
              </Button>
            </div>

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              fullWidth
              className="gap-2.5"
            >
              <LogIn size={20} strokeWidth={2.5} />
              <span className="leading-none">Zaloguj się</span>
            </Button>
          </form>

          <div className="flex items-center justify-center gap-2 mt-6">
            <p className="text-text-dim text-[10px] uppercase tracking-widest font-bold opacity-60">
              Nie masz jeszcze konta?
            </p>

            <Button
              asChild
              variant="clean"
              cleanStyle="link"
              className="text-xs"
            >
              <Link to="/register">Zarejestruj się</Link>
            </Button>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-2 w-full text-[10px] text-text-dim hover:text-text-main uppercase tracking-[0.3em] font-black transition-colors mt-8 py-2 cursor-pointer opacity-40 group"
        >
          <ArrowLeft
            size={12}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Powrót do strony głównej
        </button>
      </div>
    </div>
  );
};
