import { useState, type FC, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/axios";
import { getApiErrorMessage } from "../../api/errors";
import { registerSchema } from "../../schemas/register.schema";
import { checkValidation } from "../../schemas";
import { toast } from "react-toastify";
import { AlertCircle, Eye, EyeOff, Hash, Lock, Mail, User } from "lucide-react";
import { Button } from "../../components/shared/Button/Button";
import { InputBase } from "../../components/shared/InputBase/InputBase";
import { Checkbox } from "../../components/shared/Checkbox/Checkbox";
import clsx from "clsx";

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
      validationErrors.forEach((v) => {
        errorMap[v.key] = v.error;
      });
      setFieldErrors(errorMap);
      setIsLoading(false);
      toast.warning("Popraw błędy w formularzu");
      return;
    }

    const dataToSend = {
      firstName: dataToValidate.firstName,
      lastName: dataToValidate.lastName,
      email: dataToValidate.email,
      playerTag: dataToValidate.playerTag,
      password: dataToValidate.password,
      marketingConsent: dataToValidate.marketingConsent,
      termsAccepted: dataToValidate.termsAccepted,
    };

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
    } catch (error: unknown) {
      const errMsg = getApiErrorMessage(error, "Błąd rejestracji.");
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
            <InputBase
              type="text"
              name="firstName"
              placeholder="Imię"
              value={formData.firstName}
              onChange={handleChange}
              leftIcon={<User />}
              error={fieldErrors.firstName}
            />
            <InputBase
              type="text"
              name="lastName"
              placeholder="Nazwisko"
              value={formData.lastName}
              onChange={handleChange}
              leftIcon={<User />}
              error={fieldErrors.lastName}
            />
          </div>
          <InputBase
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={fieldErrors.email}
            leftIcon={<Mail />}
          />

          <InputBase
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Hasło"
            value={formData.password}
            onChange={handleChange}
            error={fieldErrors.password}
            leftIcon={<Lock />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-text-dim/50 hover:text-brand transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
          />

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
              <InputBase
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Powtórz hasło"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={fieldErrors.confirmPassword}
                leftIcon={<Lock />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-text-dim/50 hover:text-brand transition-colors focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                }
              />
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
          <InputBase
            type="text"
            name="playerTag"
            placeholder="Player Tag (np. #P8L2V)"
            value={formData.playerTag}
            onChange={handleChange}
            error={fieldErrors.playerTag}
            leftIcon={<Hash />}
          />

          <div className="space-y-4 px-2">
            <Checkbox
              name="termsAccepted"
              label="Akceptuję regulamin serwisu (Wymagane)"
              checked={formData.termsAccepted}
              onChange={handleChange}
              error={showConsentError && !formData.termsAccepted}
            />

            <Checkbox
              name="marketingConsent"
              label="Zgoda na marketing (Opcjonalne)"
              checked={formData.marketingConsent}
              onChange={handleChange}
            />

            <div
              className={clsx(
                "p-4 rounded-xl border-l-4 border-y border-r transition-all",
                showConsentError && !formData.termsAccepted
                  ? "bg-error/10 border-error"
                  : "bg-brand/5 border-brand",
              )}
            >
              <p
                className={clsx(
                  "text-[10px] uppercase font-bold tracking-tight mb-1",
                  showConsentError && !formData.termsAccepted
                    ? "text-error"
                    : "text-brand",
                )}
              >
                Informacja o Administratorze
              </p>
              <p
                className={clsx(
                  "text-[9px] leading-tight uppercase font-medium",
                  showConsentError && !formData.termsAccepted
                    ? "text-error/80"
                    : "text-text-dim/70",
                )}
              >
                Administratorem danych jest ClashTracker.pl. Twoje dane są
                chronione...
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
