import type { FieldErrors } from "@/lib/validation";

export type FormState = {
  status: "idle" | "success" | "error";
  /** Message key under quoteForm.* in /messages. */
  errorKey?: string;
  fieldErrors?: FieldErrors;
};

export const initialFormState: FormState = { status: "idle" };
