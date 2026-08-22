"use server";

import { headers } from "next/headers";
import type { FormState } from "./form-state";
import { emailConfigured, quoteMailbox, sendMail } from "@/lib/email";
import { rateLimited } from "@/lib/rate-limit";
import {
  applicationSchema,
  checkAttachment,
  fieldErrorsOf,
  quoteSchema,
  type CheckedAttachment,
} from "@/lib/validation";

async function clientKey(): Promise<string> {
  const h = await headers();
  return (h.get("x-forwarded-for") ?? "local").split(",")[0]!.trim();
}

function line(label: string, value: string | number | boolean): string {
  return `${label.padEnd(18, " ")} ${value}`;
}

export async function submitQuote(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // Honeypot: bots fill it, humans never see it. Pretend success.
  if (formData.get("website")) return { status: "success" };

  if (rateLimited(`quote:${await clientKey()}`)) {
    return { status: "error", errorKey: "errRate" };
  }

  const parsed = quoteSchema.safeParse({
    societe: formData.get("societe"),
    contact: formData.get("contact"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    product: formData.get("product") ?? "",
    quantity: formData.get("quantity"),
    location: formData.get("location"),
    date: formData.get("date"),
    laying: formData.get("laying") === "on",
    message: formData.get("message") ?? "",
  });
  if (!parsed.success) {
    return {
      status: "error",
      errorKey: "errInvalid",
      fieldErrors: fieldErrorsOf(parsed.error),
    };
  }

  const attachment = await checkAttachment(formData.get("attachment"));
  if (typeof attachment === "string") {
    return {
      status: "error",
      errorKey: "errInvalid",
      fieldErrors: { attachment },
    };
  }

  if (!emailConfigured()) {
    return { status: "error", errorKey: "errUnconfigured" };
  }

  const d = parsed.data;
  const text = [
    "Demande de devis — aleqfactory.ma",
    "",
    line("Société", d.societe),
    line("Contact", d.contact),
    line("Téléphone", d.phone),
    line("Email", d.email),
    line("Produit", d.product || "à définir"),
    line("Quantité", `${d.quantity} t`),
    line("Lieu", d.location),
    line("Date souhaitée", d.date),
    line("Mise en œuvre", d.laying ? "oui" : "non"),
    "",
    d.message || "(pas de message)",
  ].join("\n");

  try {
    const to = quoteMailbox() ?? "";
    await sendMail({
      to,
      subject: `Devis — ${d.societe} — ${d.product || "produit à définir"} — ${d.quantity} t`,
      text,
      replyTo: d.email,
      attachments: attachment ? [attachment] : undefined,
    });
    await sendMail({
      to: d.email,
      subject: "Votre demande de devis — AleqFactory",
      text: [
        `Bonjour ${d.contact},`,
        "",
        "Votre demande de devis a bien été reçue. Le service commercial revient vers vous rapidement.",
        "Your quote request has been received; our sales team will get back to you shortly.",
        "",
        "Rappel de la demande :",
        line("Produit", d.product || "à définir"),
        line("Quantité", `${d.quantity} t`),
        line("Lieu", d.location),
        line("Date souhaitée", d.date),
        "",
        "AleqFactory — groupe ALEQ",
      ].join("\n"),
    });
  } catch {
    return { status: "error", errorKey: "errServer" };
  }

  return { status: "success" };
}

export async function submitApplication(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (formData.get("website")) return { status: "success" };

  if (rateLimited(`apply:${await clientKey()}`)) {
    return { status: "error", errorKey: "errRate" };
  }

  const parsed = applicationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    role: formData.get("role"),
    message: formData.get("message") ?? "",
  });
  if (!parsed.success) {
    return {
      status: "error",
      errorKey: "errInvalid",
      fieldErrors: fieldErrorsOf(parsed.error),
    };
  }

  const cv = await checkAttachment(formData.get("cv"), {
    required: true,
    pdfOnly: true,
  });
  if (typeof cv === "string") {
    return { status: "error", errorKey: "errInvalid", fieldErrors: { cv } };
  }

  if (!emailConfigured()) {
    return { status: "error", errorKey: "errUnconfigured" };
  }

  const d = parsed.data;
  try {
    const to = quoteMailbox() ?? "";
    await sendMail({
      to,
      subject: `Candidature — ${d.role} — ${d.name}`,
      text: [
        "Candidature spontanée — aleqfactory.ma",
        "",
        line("Nom", d.name),
        line("Email", d.email),
        line("Téléphone", d.phone),
        line("Poste visé", d.role),
        "",
        d.message || "(pas de message)",
      ].join("\n"),
      replyTo: d.email,
      attachments: cv ? [cv as CheckedAttachment] : undefined,
    });
    await sendMail({
      to: d.email,
      subject: "Votre candidature — AleqFactory",
      text: [
        `Bonjour ${d.name},`,
        "",
        "Votre candidature a bien été reçue. Elle est conservée six mois.",
        "Your application has been received and will be kept for six months.",
        "",
        "AleqFactory — groupe ALEQ",
      ].join("\n"),
    });
  } catch {
    return { status: "error", errorKey: "errServer" };
  }

  return { status: "success" };
}
