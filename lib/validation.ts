import { z } from "zod";

export const ATTACHMENT_MAX_BYTES = 10 * 1024 * 1024;

/** Allowed attachment MIME types (master prompt §9). */
export const ATTACHMENT_TYPES: Record<string, string> = {
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    ".docx",
  "image/jpeg": ".jpg",
  "image/png": ".png",
};

const requiredString = z
  .string({ message: "errRequired" })
  .trim()
  .min(1, "errRequired")
  .max(500, "errInvalid");

export const quoteSchema = z.object({
  societe: requiredString,
  contact: requiredString,
  phone: requiredString.refine((v) => v.replace(/\D/g, "").length >= 8, {
    message: "errRequired",
  }),
  email: z.string({ message: "errRequired" }).trim().email("errEmail"),
  product: z.string().trim().max(100).optional().default(""),
  quantity: z.coerce
    .number({ message: "errQuantity" })
    .positive("errQuantity")
    .max(1_000_000, "errQuantity"),
  location: requiredString,
  date: requiredString,
  laying: z.boolean(),
  message: z.string().trim().max(4000, "errInvalid").optional().default(""),
});
export type QuoteInput = z.infer<typeof quoteSchema>;

export const applicationSchema = z.object({
  name: requiredString,
  email: z.string({ message: "errRequired" }).trim().email("errEmail"),
  phone: requiredString,
  role: requiredString,
  message: z.string().trim().max(4000, "errInvalid").optional().default(""),
});
export type ApplicationInput = z.infer<typeof applicationSchema>;

export type FieldErrors = Record<string, string>;

/** Flatten a ZodError into { field: errorKey } for the form UI. */
export function fieldErrorsOf(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in out)) out[key] = issue.message;
  }
  return out;
}

export type CheckedAttachment = {
  name: string;
  contentType: string;
  bytes: Buffer;
};

/**
 * Validate an optional uploaded file. Returns null when absent, an error key
 * string when rejected, or the checked attachment.
 */
export async function checkAttachment(
  value: FormDataEntryValue | null,
  { required = false, pdfOnly = false } = {},
): Promise<CheckedAttachment | string | null> {
  if (!(value instanceof File) || value.size === 0) {
    return required ? "errRequired" : null;
  }
  if (value.size > ATTACHMENT_MAX_BYTES) return "errAttachmentSize";
  const allowed = pdfOnly
    ? { "application/pdf": ".pdf" }
    : ATTACHMENT_TYPES;
  if (!(value.type in allowed)) return "errAttachmentType";
  return {
    name: value.name.replace(/[^\w.\- ]/g, "_").slice(0, 120) || "piece-jointe",
    contentType: value.type,
    bytes: Buffer.from(await value.arrayBuffer()),
  };
}
