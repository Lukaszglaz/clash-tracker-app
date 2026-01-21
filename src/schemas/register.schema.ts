import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Niepoprawny format adresu e-mail"),
  password: z.string().min(8, "Hasło musi mieć minimum 8 znaków"),
  playerTag: z
    .string()
    .min(4, "Tag jest za krótki (min. # + 3 znaki)")
    .max(11, "Tag jest za długi (max. 11 znaków z #)")
    .regex(/^#[A-Z0-9]{3,10}$/, "Niepoprawny format tagu gracza"),
});
