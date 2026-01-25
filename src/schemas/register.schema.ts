import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Imię jest za krótkie")
      .max(50, "Imię jest za długie"),
    lastName: z
      .string()
      .min(2, "Nazwisko jest za krótkie")
      .max(50, "Nazwisko jest za długie"),
    email: z.string().email("Niepoprawny format adresu e-mail"),
    playerTag: z
      .string()
      .min(4, "Tag jest za krótki (min. # + 3 znaki)")
      .max(11, "Tag jest za długi (max. 11 znaków z #)")
      .regex(/^#[A-Z0-9]{3,10}$/, "Niepoprawny format tagu gracza"),
    password: z
      .string()
      .min(8, "Hasło musi mieć minimum 8 znaków")
      .regex(/[a-z]/, "Hasło musi zawierać małą literę")
      .regex(/[A-Z]/, "Hasło musi zawierać wielką literę")
      .regex(/[0-9]/, "Hasło musi zawierać cyfrę")
      .regex(/[!@#$%^&*]/, "Hasło musi zawierać znak specjalny"),
    confirmPassword: z.string(),
    termsAccepted: z.boolean(),
    marketingConsent: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła nie są identyczne",
    path: ["confirmPassword"],
  })
  .refine((data) => data.termsAccepted === true, {
    message: "Musisz zaakceptować regulamin",
    path: ["termsAccepted"],
  });
