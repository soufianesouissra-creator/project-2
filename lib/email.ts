import "server-only";
import type { CheckedAttachment } from "./validation";

/**
 * Outbound email. Primary transport: Microsoft Graph sendMail from a shared
 * mailbox in the aleq.ma tenant (app registration, Mail.Send application
 * permission scoped by an ApplicationAccessPolicy — see README). Fallback:
 * Resend. With neither configured, sending reports "unconfigured" and the
 * form tells the visitor to use the direct contacts instead.
 */

export type Mail = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: CheckedAttachment[];
};

type GraphConfig = {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  mailbox: string;
};

function graphConfig(): GraphConfig | null {
  const { GRAPH_TENANT_ID, GRAPH_CLIENT_ID, GRAPH_CLIENT_SECRET, QUOTE_MAILBOX } =
    process.env;
  if (!GRAPH_TENANT_ID || !GRAPH_CLIENT_ID || !GRAPH_CLIENT_SECRET || !QUOTE_MAILBOX)
    return null;
  return {
    tenantId: GRAPH_TENANT_ID,
    clientId: GRAPH_CLIENT_ID,
    clientSecret: GRAPH_CLIENT_SECRET,
    mailbox: QUOTE_MAILBOX,
  };
}

export function quoteMailbox(): string | null {
  return process.env.QUOTE_MAILBOX ?? null;
}

export function emailConfigured(): boolean {
  return graphConfig() !== null || !!process.env.RESEND_API_KEY;
}

async function graphToken(cfg: GraphConfig): Promise<string> {
  const res = await fetch(
    `https://login.microsoftonline.com/${cfg.tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: cfg.clientId,
        client_secret: cfg.clientSecret,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    },
  );
  if (!res.ok) throw new Error(`graph token: ${res.status}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

async function sendViaGraph(cfg: GraphConfig, mail: Mail): Promise<void> {
  const token = await graphToken(cfg);
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(cfg.mailbox)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: mail.subject,
          body: { contentType: "Text", content: mail.text },
          toRecipients: [{ emailAddress: { address: mail.to } }],
          ...(mail.replyTo
            ? { replyTo: [{ emailAddress: { address: mail.replyTo } }] }
            : {}),
          attachments: (mail.attachments ?? []).map((a) => ({
            "@odata.type": "#microsoft.graph.fileAttachment",
            name: a.name,
            contentType: a.contentType,
            contentBytes: a.bytes.toString("base64"),
          })),
        },
        saveToSentItems: true,
      }),
    },
  );
  if (!res.ok && res.status !== 202) {
    throw new Error(`graph sendMail: ${res.status}`);
  }
}

async function sendViaResend(mail: Mail): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "AleqFactory <onboarding@resend.dev>",
      to: [mail.to],
      subject: mail.subject,
      text: mail.text,
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
      attachments: (mail.attachments ?? []).map((a) => ({
        filename: a.name,
        content: a.bytes.toString("base64"),
      })),
    }),
  });
  if (!res.ok) throw new Error(`resend: ${res.status}`);
}

export async function sendMail(mail: Mail): Promise<void> {
  const graph = graphConfig();
  if (graph) return sendViaGraph(graph, mail);
  if (process.env.RESEND_API_KEY) return sendViaResend(mail);
  throw new Error("email transport not configured");
}
