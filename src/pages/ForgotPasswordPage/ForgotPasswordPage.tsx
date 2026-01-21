import { useState, type FC, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import { toast } from "react-toastify";
import { Mail, ArrowLeft, Send, Info, RefreshCw } from "lucide-react";

export const ForgotPasswordPage: FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/auth/forgot-password", { email });

      toast.success("Kod resetujący został wysłany!", {
        style: {
          borderRadius: "16px",
          background: "#161127",
          border: "1px solid rgba(188, 71, 251, 0.2)",
          color: "#fff",
        },
      });

      navigate("/reset-password", { state: { email } });
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Nie znaleziono takiego użytkownika",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-body px-6 relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand/10 blur-[130px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-text/5 blur-[130px] rounded-full animate-pulse" />

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500 relative z-10">
        <div className="bg-bg-card border border-ui-border rounded-4xl p-8 md:p-10 text-center shadow-2xl backdrop-blur-md">
          <div className="w-20 h-20 bg-linear-to-br from-brand/30 to-brand/5 rounded-3xl flex items-center justify-center mx-auto mb-8 -rotate-2 border border-brand/20 shadow-xl shadow-brand/10">
            <Mail className="text-brand w-10 h-10" />
          </div>

          <h2 className="text-4xl font-black uppercase italic text-white mb-4 tracking-tighter">
            Reset <span className="text-brand">Hasła</span>
          </h2>

          <div className="space-y-6 mb-10">
            <p className="text-text-dim leading-relaxed text-sm">
              Podaj swój adres e-mail, aby otrzymać <br />
              <span className="text-white font-black italic">
                6-cyfrowy kod weryfikacyjny.
              </span>
            </p>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-start gap-3 text-left">
              <Info className="text-brand shrink-0" size={18} />
              <p className="text-[11px] text-text-dim leading-tight uppercase font-bold tracking-wider">
                Kod resetujący jest aktywny przez{" "}
                <span className="text-white">60 minut</span> od momentu
                wysłania.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group text-left">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-text-dim mb-2 ml-1">
                Adres E-mail
              </label>
              <input
                type="email"
                required
                placeholder="ADRES E-MAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-body border-2 border-ui-border rounded-2xl px-5 py-5 text-white focus:outline-none focus:border-brand transition-all text-sm font-bold tracking-widest placeholder:text-white/5"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="flex items-center justify-center gap-3 w-full py-5 bg-brand hover:bg-brand-hover text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-brand/30 transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer group disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw className="animate-spin" size={20} />
              ) : (
                <>
                  <Send
                    size={20}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                  Wyślij kod
                </>
              )}
            </button>
          </form>

          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center gap-2 w-full text-[10px] text-text-dim hover:text-white uppercase tracking-[0.3em] font-black transition-colors mt-10 py-2 cursor-pointer opacity-60 hover:opacity-100"
          >
            <ArrowLeft size={12} /> Wróć do logowania
          </button>
        </div>

        <div className="mt-10 text-center">
          <p className="text-[10px] text-text-dim/40 uppercase tracking-[0.15em] leading-relaxed">
            Masz problem z odzyskaniem dostępu? <br />
            Napisz:{" "}
            <span className="text-text-dim/80 font-bold ml-1 hover:text-brand transition-colors cursor-pointer">
              kontakt@glazlukasz.pl
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
