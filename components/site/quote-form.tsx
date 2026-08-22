"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitQuote } from "@/app/actions/forms";
import {
  initialFormState,
  type FormState,
} from "@/app/actions/form-state";

const inputCls =
  "w-full rounded-[2px] border border-granulat bg-transparent px-4 py-3 " +
  "text-16 focus:border-bitume focus:outline-none aria-[invalid]:border-chaud-encre";

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-14 text-acier">{label}</span>
      {children}
      {error && (
        <span role="alert" className="mt-1 block text-14 text-chaud-encre">
          {error}
        </span>
      )}
    </label>
  );
}

/** Bots fill every field; humans never see this one. */
export function Honeypot() {
  return (
    <div aria-hidden className="sr-only">
      <label>
        website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function FormStatus({
  state,
  t,
}: {
  state: FormState;
  t: (key: string) => string;
}) {
  if (state.status === "error" && state.errorKey) {
    return (
      <p role="alert" className="mt-4 text-16 font-medium text-chaud-encre">
        {t(state.errorKey)}
      </p>
    );
  }
  return null;
}

export function QuoteForm({
  products,
  defaultProduct,
}: {
  products: { slug: string; name: string }[];
  defaultProduct?: string;
}) {
  const t = useTranslations("quoteForm");
  const [state, action, pending] = useActionState(
    submitQuote,
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
    return key ? t(key) : undefined;
  };

  return (
    <form action={action} noValidate>
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t("societe")} error={err("societe")}>
          <input
            name="societe"
            required
            aria-invalid={err("societe") ? true : undefined}
            className={inputCls}
            autoComplete="organization"
          />
        </Field>
        <Field label={t("contact")} error={err("contact")}>
          <input
            name="contact"
            required
            aria-invalid={err("contact") ? true : undefined}
            className={inputCls}
            autoComplete="name"
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
        <Field label={t("product")} error={err("product")}>
          <select
            name="product"
            defaultValue={defaultProduct ?? ""}
            className={inputCls}
          >
            <option value="">{t("productNone")}</option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("quantity")} error={err("quantity")}>
          <input
            name="quantity"
            type="number"
            min={1}
            step={1}
            required
            aria-invalid={err("quantity") ? true : undefined}
            className={`${inputCls} tnum font-mono`}
          />
        </Field>
        <Field label={t("location")} error={err("location")}>
          <input
            name="location"
            required
            aria-invalid={err("location") ? true : undefined}
            className={inputCls}
          />
        </Field>
        <Field label={t("date")} error={err("date")}>
          <input
            name="date"
            type="date"
            required
            aria-invalid={err("date") ? true : undefined}
            className={`${inputCls} tnum font-mono`}
          />
        </Field>
      </div>

      <label className="mt-6 flex items-center gap-3 text-16">
        <input
          name="laying"
          type="checkbox"
          className="size-4 accent-(--color-chaud)"
        />
        {t("laying")}
      </label>

      <div className="mt-6">
        <Field
          label={`${t("attachment")} — ${t("attachmentHint")}`}
          error={err("attachment")}
        >
          <input
            name="attachment"
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className={`${inputCls} file:me-4 file:border-0 file:bg-transparent file:font-mono file:text-12 file:uppercase`}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label={t("message")} error={err("message")}>
          <textarea name="message" rows={5} className={inputCls} />
        </Field>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-8 inline-flex items-center justify-center rounded-[2px] bg-chaud px-6 py-3 text-16 font-medium text-bitume transition-[filter] hover:brightness-90 disabled:opacity-60"
      >
        {pending ? t("sending") : t("submit")}
      </button>
      <FormStatus state={state} t={t} />
    </form>
  );
}
