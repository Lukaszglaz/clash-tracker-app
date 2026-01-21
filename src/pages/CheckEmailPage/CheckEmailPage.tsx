import { type FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MailCheck, KeySquare, ArrowLeft, Info } from "lucide-react";

export const CheckEmailPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "Twój adres e-mail";

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-body px-6 relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand/10 blur-[130px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-text/5 blur-[130px] rounded-full animate-pulse" />

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500 relative z-10">
        <div className="bg-bg-card border border-ui-border rounded-[2.5rem] p-10 text-center shadow-2xl backdrop-blur-md">
          <div className="w-24 h-24 bg-linear-to-br from-brand/30 to-brand/5 rounded-4xl flex items-center justify-center mx-auto mb-8 -rotate-2 border border-brand/20 shadow-2xl shadow-brand/20">
            <MailCheck className="text-brand w-12 h-12" />
          </div>

          <h2 className="text-4xl font-black uppercase italic text-white mb-4 tracking-tighter">
            Sprawdź <span className="text-brand">E-mail</span>
          </h2>

          <div className="space-y-6 mb-10">
            <p className="text-text-dim leading-relaxed text-sm">
              Wysłaliśmy 6-cyfrowy kod weryfikacyjny na adres: <br />
              <span className="text-white font-black italic text-base break-all select-all">
                {email}
              </span>
            </p>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-start gap-3 text-left">
              <Info className="text-brand shrink-0" size={18} />
              <p className="text-[11px] text-text-dim leading-tight uppercase font-bold tracking-wider">
                Kod jest ważny przez{" "}
                <span className="text-white">24 godziny</span>. Jeśli nie
                dotarł, sprawdź folder spam.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/verify-email", { state: { email } })}
              className="flex items-center justify-center gap-3 w-full py-5 bg-brand hover:bg-brand-hover text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-brand/30 transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer group"
            >
              <KeySquare
                size={20}
                className="group-hover:rotate-12 transition-transform"
              />
              Przejdź dalej
            </button>

            <button
              onClick={() => navigate("/register")}
              className="flex items-center justify-center gap-2 w-full text-[10px] text-text-dim hover:text-white uppercase tracking-[0.3em] font-black transition-colors py-2 cursor-pointer opacity-60 hover:opacity-100"
            >
              <ArrowLeft size={12} />
              Błędny email? Zmień dane
            </button>
          </div>
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
