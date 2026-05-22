"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

const INITIAL: ContactInput = {
  name: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

export default function ContactForm() {
  const [values, setValues] = useState<ContactInput>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [fieldIssues, setFieldIssues] = useState<Record<string, string[] | undefined>>({});

  const inputBase =
    "w-full rounded-md border bg-black/40 px-4 py-3 text-white text-base placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#E8D4A3]/60 focus:border-[#E8D4A3]/60 transition-colors duration-150";
  const inputBorder = "border-white/10";
  const labelClass = "block text-xs font-semibold mb-1.5 text-white/70 uppercase tracking-wider";

  const update = <K extends keyof ContactInput>(key: K, value: ContactInput[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (fieldIssues[key]) {
      setFieldIssues((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setFieldIssues(parsed.error.flatten().fieldErrors);
      setStatus("error");
      setStatusMessage("Please check the highlighted fields and try again.");
      return;
    }

    if (process.env.NEXT_PUBLIC_BUILD_MODE === "preview") {
      setStatus("success");
      setStatusMessage(
        "This form goes live when [TEMPLATE 3] launches. For now this is a preview - no email will be sent."
      );
      setValues(INITIAL);
      return;
    }

    setStatus("submitting");
    setStatusMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setFieldIssues(data.issues ?? {});
        setStatus("error");
        setStatusMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setStatusMessage("Thanks - we'll be in touch shortly.");
      setValues(INITIAL);
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-6" role="status" aria-live="polite">
        <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#D4B679]/15 text-[#E8D4A3] shadow-[0_0_30px_rgba(232,212,163,0.35)] ring-1 ring-[#E8D4A3]/30">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </div>
        <h3 className="font-display text-2xl text-white mb-2 leading-tight uppercase tracking-wide">
          Message received
        </h3>
        <p className="text-white/70 text-sm">{statusMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px", width: 0, height: 0, opacity: 0 }}
        value={values.website ?? ""}
        onChange={(e) => update("website", e.target.value)}
      />

      <div className="space-y-3.5">
        <div>
          <label htmlFor="cf-name" className={labelClass}>Name</label>
          <input
            id="cf-name"
            type="text"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Lorem ipsum"
            className={`${inputBase} ${fieldIssues.name ? "border-red-400" : inputBorder}`}
            required
          />
          {fieldIssues.name && (
            <p className="mt-1 text-xs text-red-400">{fieldIssues.name[0]}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label htmlFor="cf-email" className={labelClass}>Email</label>
            <input
              id="cf-email"
              type="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="lorem@ipsum.com"
              className={`${inputBase} ${fieldIssues.email ? "border-red-400" : inputBorder}`}
              required
            />
            {fieldIssues.email && (
              <p className="mt-1 text-xs text-red-400">{fieldIssues.email[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="cf-phone" className={labelClass}>Phone</label>
            <input
              id="cf-phone"
              type="tel"
              value={values.phone ?? ""}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="(555) 123-4567"
              className={`${inputBase} ${inputBorder}`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="cf-message" className={labelClass}>How can we help?</label>
          <textarea
            id="cf-message"
            value={values.message ?? ""}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Lorem ipsum dolor sit amet consectetur."
            rows={3}
            className={`${inputBase} ${inputBorder} resize-none`}
          />
        </div>
      </div>

      {status === "error" && statusMessage && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-md px-3 py-2 text-sm ring-1 bg-red-950/40 text-red-300 ring-red-900/50"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p>{statusMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#D4B679] px-6 py-3.5 text-slate-900 font-bold uppercase tracking-wider text-base shadow-[0_0_40px_rgba(232,212,163,0.4)] transition-all duration-300 ease-out hover:bg-[#E8D4A3] hover:-translate-y-0.5 hover:shadow-[0_0_60px_rgba(232,212,163,0.6)] disabled:opacity-70 disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8D4A3] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {status === "submitting" ? "Sending..." : (<>Get My Free Quote <Send className="h-4 w-4" aria-hidden="true" /></>)}
      </button>

      <p className="mt-3 text-center text-xs text-white/40">
        Lorem ipsum dolor sit amet - no spam, ever.
      </p>
    </form>
  );
}
