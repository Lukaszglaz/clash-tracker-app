import { useState, type FC, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/axios";
import { registerSchema } from "../../schemas/register.schema";
import { checkValidation } from "../../schemas";
import { toast } from "react-toastify";
import { AlertCircle, Check, Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/shared/Button/Button";

export const RegisterPage: FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    playerTag: "",
    password: "",
    confirmPassword: "",
    marketingConsent: false,
    termsAccepted: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [showConsentError, setShowConsentError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "termsAccepted" && checked) {
      setShowConsentError(false);
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "playerTag"
            ? value.toUpperCase()
            : value,
    }));
  };

  const passwordRequirements = [
    { id: 1, label: "Minimum 8 znaków", met: formData.password.length >= 8 },
    { id: 2, label: "Mała litera (a-z)", met: /[a-z]/.test(formData.password) },
    {
      id: 3,
      label: "Wielka litera (A-Z)",
      met: /[A-Z]/.test(formData.password),
    },
    { id: 4, label: "Cyfra (0-9)", met: /[0-9]/.test(formData.password) },
    {
      id: 5,
      label: "Znak specjalny",
      met: /[!@#$%^&*]/.test(formData.password),
    },
  ];

  const passwordsMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword !== "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      setShowConsentError(true);
      toast.error("Musisz zaakceptować regulamin!");
      return;
    }

    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    const dataToValidate = {
      ...formData,
      playerTag: formData.playerTag.startsWith("#")
        ? formData.playerTag
        : `#${formData.playerTag}`,
    };

    const validationErrors = checkValidation(dataToValidate, registerSchema);

    if (validationErrors && validationErrors.length > 0) {
      const errorMap: { [key: string]: string } = {};
      validationErrors.forEach((v: any) => {
        errorMap[v.key] = v.error;
      });
      setFieldErrors(errorMap);
      setIsLoading(false);
      toast.warning("Popraw błędy w formularzu");
      return;
    }

    const { confirmPassword, ...dataToSend } = dataToValidate;

    try {
      await api.post("/auth/register", dataToSend);

      toast.success(
        "Konto utworzone! Sprawdź swoją skrzynkę e-mail i zaloguj się, aby aktywować dostęp do panelu.",
        {
          autoClose: 8000,
          icon: <span>*</span>,
        },
      );

      navigate("/verify-email", {
        replace: true,
        state: { email: dataToSend.email },
      });
    } catch (err: any) {
      const errMsg = err.response?.data?.message || "Błąd rejestracji.";
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
              <div className="w-12 h-12 bg-linear-to-br from-brand to-accent-text rounded-2xl shadow-lg" />
            </Link>
            <h2 className="text-3xl font-black italic uppercase tracking-tight text-text-main">
              Clash <span className="text-brand">Tracker</span>
            </h2>
          </div>
          <h2 className="text-3xl font-black italic uppercase tracking-tight text-text-main">
            Stwórz <span className="text-brand">Konto</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-error/10 border border-error/20 text-error text-[11px] font-bold uppercase tracking-wider italic">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="Imię"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-bg-card border-2 border-ui-border rounded-2xl px-5 py-4 text-text-dim focus:outline-none focus:border-brand transition-all"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Nazwisko"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-bg-card border-2 border-ui-border rounded-2xl px-5 py-4 text-text-dim focus:outline-none focus:border-brand transition-all"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-bg-card border-2 ${fieldErrors.email ? "border-error/50" : "border-ui-border"} rounded-2xl px-5 py-4 text-text-dim focus:outline-none focus:border-brand transition-all`}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Hasło"
              value={formData.password}
              onChange={handleChange}
              className={`w-full bg-bg-card border-2 ${fieldErrors.password ? "border-error/50" : "border-ui-border"} rounded-2xl px-5 py-4 pr-12 text-text-dim focus:outline-none focus:border-brand transition-all`}
            />
            <Button
              type="button"
              variant="clean"
              cleanStyle="link"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-y-2 px-2">
            {passwordRequirements.map((req) => (
              <div key={req.id} className="flex items-center gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${req.met ? `bg-brand` : `bg-text-dim/30`}`}
                />
                <p
                  className={`text-[10px] font-bold uppercase tracking-wider ${req.met ? `text-brand` : `text-text-dim/50`}`}
                >
                  {req.label}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Powtórz hasło"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full bg-bg-card border-2 ${
                  (formData.confirmPassword && !passwordsMatch) ||
                  fieldErrors.confirmPassword
                    ? "border-error/50"
                    : "border-ui-border"
                } rounded-2xl px-5 py-4 pr-12 text-text-dim focus:outline-none focus:border-brand transition-all`}
              />
              <Button
                type="button"
                variant="clean"
                cleanStyle="link"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
            </div>

            {formData.confirmPassword && !passwordsMatch && (
              <p className="text-[10px] text-error font-bold uppercase tracking-wider px-2 animate-in fade-in slide-in-from-top-1">
                Hasła nie są identyczne
              </p>
            )}

            {fieldErrors.confirmPassword && !formData.confirmPassword && (
              <p className="text-[10px] text-error font-bold uppercase tracking-wider px-2">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          <input
            type="text"
            name="playerTag"
            placeholder="Player Tag (np. #P8L2V)"
            value={formData.playerTag}
            onChange={handleChange}
            className={`w-full bg-bg-card border-2 ${fieldErrors.playerTag ? "border-error/50" : "border-ui-border"} rounded-2xl px-5 py-4 text-text-dim focus:outline-none focus:border-brand transition-all font-mono italic`}
          />

          <div className="space-y-4 px-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className={`appearance-none w-6 h-6 rounded-lg border-2 transition-all cursor-pointer ${
                    showConsentError && !formData.termsAccepted
                      ? "border-error bg-error/10"
                      : "border-ui-border bg-bg-card checked:bg-brand checked:border-brand"
                  }`}
                />
                {formData.termsAccepted && (
                  <Check
                    size={14}
                    className="absolute text-white pointer-events-none"
                  />
                )}
              </div>
              <span
                className={`text-[10px] uppercase font-bold transition-colors ${
                  showConsentError && !formData.termsAccepted
                    ? "text-error"
                    : "text-text-dim opacity-70 group-hover:opacity-100"
                }`}
              >
                Akceptuję regulamin serwisu (Wymagane)
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  name="marketingConsent"
                  checked={formData.marketingConsent}
                  onChange={handleChange}
                  className="appearance-none w-6 h-6 rounded-lg border-2 border-ui-border bg-bg-card checked:bg-brand checked:border-brand transition-all cursor-pointer"
                />
                {formData.marketingConsent && (
                  <Check
                    size={14}
                    className="absolute text-white pointer-events-none"
                  />
                )}
              </div>
              <span className="text-[10px] text-text-dim uppercase font-bold opacity-70 group-hover:opacity-100">
                Zgoda na marketing (Opcjonalne)
              </span>
            </label>

            <div
              className={`p-4 rounded-xl border-l-4 transition-all ${
                showConsentError && !formData.termsAccepted
                  ? "bg-error/10 border-error border-y border-r"
                  : "bg-brand/5 border-brand border-y border-r"
              }`}
            >
              <p
                className={`text-[10px] uppercase font-bold tracking-tight mb-1 ${
                  showConsentError && !formData.termsAccepted
                    ? "text-error"
                    : "text-brand"
                }`}
              >
                Informacja o Administratorze
              </p>
              <p
                className={`text-[9px] leading-tight uppercase font-medium ${
                  showConsentError && !formData.termsAccepted
                    ? "text-error/80"
                    : "text-text-dim/70"
                }`}
              >
                Administratorem danych jest ClashTracker.pl. Twoje dane są
                chronione i przetwarzane zgodnie z polityką prywatności w celu
                obsługi Twojego konta.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            fullWidth
            variant="primary"
            isLoading={isLoading}
            className="gap-2.5 mt-4"
          >
            Zarejestruj się
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-10 w-full">
          <p className="text-text-dim text-[10px] uppercase tracking-widest font-bold opacity-60">
            Masz już konto?
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
  );
};
