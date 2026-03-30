import { z } from "zod";

export const settingsSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(50, "Imie jest za dlugie")
    .refine((value) => value.length === 0 || value.length >= 2, {
      message: "Imie jest za krotkie",
    }),
  lastName: z
    .string()
    .trim()
    .max(50, "Nazwisko jest za dlugie")
    .refine((value) => value.length === 0 || value.length >= 2, {
      message: "Nazwisko jest za krotkie",
    }),
  playerTag: z
    .string()
    .trim()
    .refine((value) => value.length === 0 || /^#[A-Z0-9]{3,10}$/.test(value), {
      message: "Niepoprawny format tagu gracza",
    }),
  marketingConsent: z.boolean(),
});
