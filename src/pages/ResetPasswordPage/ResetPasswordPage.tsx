import {
  useState,
  useRef,
  useEffect,
  type FC,
  type FormEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { api } from "../../api/axios";
import { toast } from "react-toastify";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Button } from "../../components/shared/Button/Button";
import { OTPInput } from "../../components/shared/OTPInput/OTPInput";
import { InputBase } from "../../components/shared/InputBase/InputBase";

interface LocationState {
  email?: string;
}

export const ResetPasswordPage: FC = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPass, setNewPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as LocationState)?.email || "";

  useEffect(() => {
    if (!email) {
      toast.error("Wpisz najpierw swój adres e-mail.");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9A-Z]*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1).toUpperCase();
    setCode(newCode);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0)
      inputsRef.current[index - 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .slice(0, 6)
      .toUpperCase();
    if (!/^[0-9A-Z]+$/.test(pastedData)) return;
    const newCode = [...code];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newCode[index] = char;
    });
    setCode(newCode);
    inputsRef.current[pastedData.length < 6 ? pastedData.length : 5]?.focus();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await api.post("/auth/reset-password", {
        email,
        code: code.join(""),
        newPass,
      });
      toast.success("Hasło zmienione!", {
        style: {
          borderRadius: "16px",
          background: "var(--bg-surface)",
          color: "var(--text-primary)",
          border: "1px solid var(--color-border)",
        },
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Błąd resetowania.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-body px-6 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-brand/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent-text/5 blur-[120px] rounded-full" />

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500 relative z-10">
        <div className="bg-bg-card border border-ui-border rounded-4xl p-6 md:p-8 text-center shadow-2xl backdrop-blur-md">
          <div className="w-16 h-16 bg-linear-to-br from-brand/30 to-brand/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-brand/20 shadow-xl">
            <LockKeyhole className="text-brand w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black uppercase italic text-text-main mb-2 tracking-tighter">
            Nowe <span className="text-brand">Hasło</span>
          </h2>
          <p className="text-text-dim leading-relaxed text-sm mb-5">
            Wysłaliśmy 6-cyfrowy kod weryfikacyjny na adres: <br />
            <span className=" font-black italic text-base break-all select-all">
              {email}
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {error && (
              <div className="p-3 rounded-xl bg-error/10 border border-error/20 text-error text-[10px] font-bold uppercase text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <OTPInput
                label="Kod Weryfikacyjny"
                code={code}
                inputsRef={inputsRef}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
              />
            </div>

            <div className="group">
              <label className="block text-[9px] uppercase tracking-[0.2em] font-bold text-text-dim mb-1.5 ml-1">
                Nowe Hasło (min. 8 znaków)
              </label>

              <InputBase
                type={showPassword ? "text" : "password"}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                leftIcon={<LockKeyhole />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-text-dim/50 hover:text-brand transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
            </div>
            <Button
              variant="primary"
              type="submit"
              fullWidth
              disabled={
                isLoading || code.some((d) => d === "") || newPass.length < 8
              }
              isLoading={isLoading}
            >
              Zatwierdź zmiany
            </Button>
          </form>

          <div className="flex items-center justify-center gap-2 mt-10 w-full">
            <p className="text-text-dim text-[10px] uppercase tracking-widest font-bold opacity-60">
              Chcesz wrócić, aby się zalogować?
            </p>

            <Button
              asChild
              variant="clean"
              cleanStyle="link"
              size="small"
              className="text-xs"
            >
              <Link to="/login">Zaloguj się</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
