import { type ZodSchema } from "zod";

export interface Validation {
  key: string;
  error: string;
}

export function checkValidation(
  data: any,
  schema: ZodSchema,
): Validation[] | null {
  const results = schema.safeParse(data);

  if (results.success) return null;

  return results.error.issues.map((issue) => ({
    key: issue.path[0].toString(),
    error: issue.message,
  }));
}
