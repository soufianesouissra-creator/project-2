"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitApplication } from "@/app/actions/forms";
import { initialFormState } from "@/app/actions/form-state";
import { Field, FormStatus, Honeypot } from "./quote-form";

const inputCls =
  "w-full rounded-[2px] border border-granulat bg-transparent px-4 py-3 " +
  "text-16 focus:border-bitume focus:outline-none aria-[invalid]:border-chaud-encre";

export function ApplicationForm() {
  const t = useTranslations("applicationForm");
  const tQ = useTranslations("quoteForm");
  const [state, action, pending] = useActionState(
    submitApplication,
    initialFormState,
  );

  if (state.status === "success") {
    return (
      <div className="border border-granulat p-8">
        <p className="display-wide text-28">{t("success")}</p>
      </div>
    );
  }

  const err = (field: string) => {
    const key = state.fieldErrors?.[field];
    return key ? tQ(key) : undefined;
  };

  return (
    <form action={action} noValidate>
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t("name")} error={err("name")}>
          <input
            name="name"
            required
            aria-invalid={err("name") ? true : undefined}
            className={inputCls}
            autoComplete="name"
          />
        </Field>
        <Field label={t("email")} error={err("email")}>
          <input
            name="email"
            type="email"
            required
            aria-invalid={err("email") ? true : undefined}
            className={inputCls}
            autoComplete="email"
          />
        </Field>
        <Field label={t("phone")} error={err("phone")}>
          <input
            name="phone"
            type="tel"
            required
            aria-invalid={err("phone") ? true : undefined}
            className={inputCls}
            autoComplete="tel"
          />
        </Field>
        <Field label={`${t("role")} — ${t("roleHint")}`} error={err("role")}>
          <input
            name="role"
            required
            aria-invalid={err("role") ? true : undefined}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label={t("cv")} error={err("cv")}>
          <input
            name="cv"
            type="file"
            accept=".pdf"
            required
            aria-invalid={err("cv") ? true : undefined}
            className={`${inputCls} file:me-4 file:border-0 file:bg-transparent file:font-mono file:text-12 file:uppercase`}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label={t("message")} error={err("message")}>
          <textarea name="message" rows={4} className={inputCls} />
        </Field>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-8 inline-flex items-center justify-center rounded-[2px] bg-chaud px-6 py-3 text-16 font-medium text-bitume transition-[filter] hover:brightness-90 disabled:opacity-60"
      >
        {pending ? tQ("sending") : t("submit")}
      </button>
      <FormStatus state={state} t={tQ} />
    </form>
  );
}
