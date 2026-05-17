import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

// IMPORTANT: do NOT instantiate `new Resend(...)` at module level.
// Resend's constructor throws on a missing API key, and Next.js evaluates
// this module during `next build`'s "Collecting page data" pass — including
// on CI runners that have no env vars loaded. A module-level constant
// crashes the build. Instantiate inside the POST handler instead, after
// the env-presence guard.

const FROM = process.env.RESEND_FROM_EMAIL ?? "contact@zerobuilddigital.com";
const TO = process.env.CLIENT_NOTIFICATION_EMAIL;
const BIZ = process.env.CLIENT_BUSINESS_NAME ?? "Client";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY || !TO) {
    console.error("[contact] Missing RESEND_API_KEY or CLIENT_NOTIFICATION_EMAIL");
    return NextResponse.json(
      { ok: false, error: "Email is not configured on the server." },
      { status: 500 }
    );
  }

  // Lazy-init Resend client — see module-top comment for why this can't
  // be a top-level constant. Safe here because the env guard above already
  // proved RESEND_API_KEY is set.
  const resend = new Resend(process.env.RESEND_API_KEY);

  const ip = getClientIp(req);
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the form and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, phone, message } = parsed.data;

  const notificationHtml = `
    <h2>New contact form submission &mdash; ${escapeHtml(BIZ)}</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
    ${
      message
        ? `<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`
        : "<p><em>No message provided.</em></p>"
    }
    <hr>
    <p style="color:#666;font-size:12px">Sent via zerobuilddigital.com on behalf of ${escapeHtml(BIZ)}. Reply to this email to respond directly to the sender.</p>
  `;

  try {
    const notify = await resend.emails.send({
      from: `${BIZ} <${FROM}>`,
      to: TO,
      replyTo: email,
      subject: `New contact form - ${BIZ}`,
      html: notificationHtml,
    });

    if (notify.error) {
      console.error("[contact] Resend notification error:", notify.error);
      return NextResponse.json(
        { ok: false, error: "Could not send your message. Please try again." },
        { status: 502 }
      );
    }

    const confirmationHtml = `
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thanks for reaching out to ${escapeHtml(BIZ)} - we've received your message and will reply soon.</p>
      <p style="color:#666;font-size:12px">This is an automated confirmation. Please do not reply to this address; replies will reach us at <a href="mailto:${escapeHtml(FROM)}">${escapeHtml(FROM)}</a>.</p>
    `;

    try {
      await resend.emails.send({
        from: `${BIZ} <${FROM}>`,
        to: email,
        subject: `We received your message - ${BIZ}`,
        html: confirmationHtml,
      });
    } catch (confirmErr) {
      console.warn("[contact] Confirmation email failed (non-fatal):", confirmErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
