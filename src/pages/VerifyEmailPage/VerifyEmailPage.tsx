import {
  useState,
  useRef,
  type FC,
  type FormEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../../api/axios";
import { toast } from "react-toastify";
import { ShieldCheck, ArrowLeft, RefreshCw, Lock } from "lucide-react";

export const VerifyEmailPage: FC = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9A-Z]*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1).toUpperCase();
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
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

    const nextIndex = pastedData.length < 6 ? pastedData.length : 5;
    inputsRef.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const finalCode = code.join("");

    if (!email) {
      toast.error("Błąd sesji. Wróć do rejestracji.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await api.post("/auth/verify", { email, code: finalCode });

      toast.success("Konto zweryfikowane!", {
        icon: <ShieldCheck size={20} className="text-brand" />,
        style: {
          borderRadius: "16px",
          background: "#161127",
          border: "1px solid rgba(188, 71, 251, 0.2)",
          color: "#fff",
        },
      });

      navigate("/login");
    } catch (err: any) {
      const errMsg = err.response?.data?.message || "Nieprawidłowy kod.";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-body px-6 relative overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand/10 blur-[130px] rounded-full" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent-text/5 blur-[130px] rounded-full" />

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500 relative z-10">
        <div className="bg-bg-card border border-ui-border rounded-[2.5rem] p-8 md:p-10 text-center shadow-2xl backdrop-blur-md">
          <div className="w-20 h-20 bg-linear-to-br from-brand/30 to-brand/5 rounded-3xl flex items-center justify-center mx-auto mb-8 -rotate-2 border border-brand/20 shadow-xl shadow-brand/10">
            <Lock className="text-brand w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black uppercase italic text-white mb-3 tracking-tighter">
            Bezpieczna <span className="text-brand">Weryfikacja</span>
          </h2>

          <p className="text-text-dim text-sm mb-10 leading-relaxed">
            Wprowadź 6-cyfrowy kod wysłany na: <br />
            <span className="text-white font-bold opacity-90 break-all">
              {email || "Twój e-mail"}
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 rounded-xl bg-error/10 border border-error/20 text-error text-[11px] font-bold italic uppercase tracking-wider animate-shake">
                {error}
              </div>
            )}
            <div className="flex justify-between gap-2" onPaste={handlePaste}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-16 md:w-14 md:h-20 bg-bg-body border-2 ${
                    digit
                      ? "border-brand shadow-lg shadow-brand/10"
                      : "border-ui-border"
                  } rounded-xl text-center text-3xl font-black text-white focus:outline-none focus:border-brand transition-all duration-200 placeholder:text-white/5`}
                  placeholder="0"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading || code.some((d) => d === "")}
              className="w-full py-5 bg-brand hover:bg-brand-hover text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-brand/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:grayscale cursor-pointer flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <RefreshCw className="animate-spin" size={20} />
              ) : (
                "Zweryfikuj konto"
              )}
            </button>
          </form>

          <button
            onClick={() => navigate("/check-email", { state: { email } })}
            className="flex items-center justify-center gap-2 w-full text-[10px] text-text-dim hover:text-white uppercase tracking-[0.3em] font-black transition-colors mt-10 py-2 cursor-pointer opacity-60"
          >
            <ArrowLeft size={12} />
            Wróć do instrukcji
          </button>
        </div>
        <div className="mt-10 space-y-4 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/5">
            <p className="text-[10px] text-text-dim/60 uppercase tracking-[0.2em] font-bold">
              Nie widzę wiadomości?{" "}
              <span className="text-brand/80">Sprawdź Spam</span>
            </p>
          </div>

          <p className="text-[10px] text-text-dim/40 uppercase tracking-[0.15em] leading-relaxed">
            Masz problem z kontem? <br />
            Napisz do nas:{" "}
            <span className="text-text-dim/80 font-bold ml-1 hover:text-brand transition-colors cursor-pointer">
              kontakt@glazlukasz.pl
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
