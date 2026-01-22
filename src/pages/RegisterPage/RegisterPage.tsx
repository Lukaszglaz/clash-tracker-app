import { useState, type FC, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/axios";
import { registerSchema } from "../../schemas/register.schema";
import { checkValidation } from "../../schemas";
import { toast } from "react-toastify";
import { UserPlus, AlertCircle } from "lucide-react";

export const RegisterPage: FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    playerTag: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    const dataToValidate = {
      ...formData,
      playerTag: formData.playerTag.startsWith("#")
        ? formData.playerTag
        : `#${formData.playerTag}`,
    };

    const validationErrors = checkValidation(dataToValidate, registerSchema) as
      | any[]
      | null;

    if (validationErrors && validationErrors.length > 0) {
      const errorMap: { [key: string]: string } = {};

      validationErrors.forEach((v: any) => {
        errorMap[v.key] = v.error;
      });

      setFieldErrors(errorMap);
      setIsLoading(false);
      return;
    }

    try {
      await api.post("/auth/register", {
        email: dataToValidate.email,
        password: dataToValidate.password,
        playerTag: dataToValidate.playerTag,
      });

      toast.success("Konto utworzone pomyślnie!", {
        icon: <UserPlus className="text-brand" size={20} />,
        style: {
          borderRadius: "16px",
          background: "#161127",
          border: "1px solid rgba(188, 71, 251, 0.2)",
          color: "#fff",
        },
      });

      navigate("/check-email", { state: { email: dataToValidate.email } });
    } catch (err: any) {
      const errMsg =
        err.response?.data?.message || "Błąd serwera. Spróbuj później.";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-body px-6 py-12">
      <div className="w-full max-w-md animate-in fade-in duration-500">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-10">
            <Link to="/">
              <div className="w-12 h-12 bg-linear-to-br from-brand to-accent-text rounded-2xl shadow-lg shadow-brand/20" />
            </Link>
            <h2 className="text-3xl font-black italic uppercase  tracking-tight">
              Clash <span className="text-brand">Tracker</span>
            </h2>
          </div>
          <h2 className="text-3xl font-black italic uppercase  tracking-tight">
            Stwórz <span className="text-brand">Konto</span>
          </h2>
          <p className="text-text-dim mt-2 text-sm uppercase tracking-widest font-bold opacity-60">
            Dołącz do elity graczy
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-error/10 border border-error/20 text-error text-[11px] font-bold italic uppercase tracking-wider">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full bg-bg-card border-2 ${fieldErrors.email ? "border-error/50" : "border-ui-border"} rounded-2xl px-5 py-4 text-text-dim focus:outline-none focus:border-brand transition-all`}
            />
            {fieldErrors.email && (
              <p className="text-error text-[10px] mt-2 ml-2 uppercase font-bold italic tracking-tighter">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Hasło"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={`w-full bg-bg-card border-2 ${fieldErrors.password ? "border-error/50" : "border-ui-border"} rounded-2xl px-5 py-4 text-text-dim focus:outline-none focus:border-brand transition-all`}
            />
            {fieldErrors.password && (
              <p className="text-error text-[10px] mt-2 ml-2 uppercase font-bold italic tracking-tighter">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Player Tag (np. #P8L2V)"
              value={formData.playerTag}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  playerTag: e.target.value.toUpperCase(),
                })
              }
              className={`w-full bg-bg-card border-2 ${fieldErrors.playerTag ? "border-error/50" : "border-ui-border"} rounded-2xl px-5 py-4 text-text-dim focus:outline-none focus:border-brand transition-all font-mono italic`}
            />
            {fieldErrors.playerTag && (
              <p className="text-error text-[10px] mt-2 ml-2 uppercase font-bold italic tracking-tighter">
                {fieldErrors.playerTag}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-brand hover:bg-brand-hover text-white font-bold uppercase tracking-widest rounded-2xl shadow-lg shadow-brand/20 transition-all active:scale-95 disabled:opacity-50 mt-4 cursor-pointer"
          >
            {isLoading ? "Rejestracja..." : "Stwórz konto"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-text-dim text-xs uppercase tracking-widest font-bold opacity-60">
            Masz już konto?{" "}
            <Link
              to="/login"
              className="text-brand font-black hover:underline ml-1"
            >
              Zaloguj się
            </Link>
          </p>
          <p className="text-text-dim mt-1.5 text-xs uppercase tracking-widest font-bold opacity-60">
            Wróć na stronę główną{" "}
            <Link to="/" className="text-brand font-black hover:underline ml-1">
              Kliknij tutaj.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
