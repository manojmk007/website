"use client";

import { useState } from "react";
import Link from "next/link";

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00",
];

type Step = "form" | "sending" | "success" | "error";

export default function BookPage() {
  const [step, setStep]       = useState<Step>("form");
  const [errorMsg, setErrorMsg] = useState("");
  const [meetLink, setMeetLink] = useState("");

  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [date,    setDate]    = useState("");
  const [time,    setTime]    = useState("");
  const [service, setService] = useState("");
  const [notes,   setNotes]   = useState("");

  // Min date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Max date = 60 days from now
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !time || !service) return;

    const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_BOOKING_WEBHOOK_URL ?? "";
    if (!WEBHOOK_URL) {
      setErrorMsg("Booking not configured yet — please email us at dizilopartner@gmail.com");
      setStep("error");
      return;
    }
    setStep("sending");

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, date, time, service, notes }),
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        setMeetLink(data.meetLink ?? "");
        setStep("success");
      } else {
        setErrorMsg("Something went wrong. Please email us directly at dizilopartner@gmail.com");
        setStep("error");
      }
    } catch {
      setErrorMsg("Network error — please check your connection and try again.");
      setStep("error");
    }
  };

  if (step === "success") {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px", background: "#000" }}>
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "1.4rem" }}>✓</div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-.04em", marginBottom: 12, color: "#fff" }}>You&apos;re booked.</h1>
          <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 28 }}>
            We&apos;ve sent a confirmation to <strong style={{ color: "#fff" }}>{email}</strong> with all the details.
            A reminder will be sent 24 hours before the call.
          </p>
          {meetLink && (
            <a
              href={meetLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: 9, background: "#fff",
                color: "#0a0a0a", fontWeight: 600, fontSize: ".875rem",
                textDecoration: "none", marginBottom: 24,
              }}
            >
              Join Google Meet →
            </a>
          )}
          <div style={{ marginTop: 16 }}>
            <Link href="/" style={{ fontSize: ".8rem", color: "rgba(255,255,255,0.38)" }}>← Back to home</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", padding: "100px 24px 80px", background: "#000" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <span style={{ fontSize: ".67rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>
            Book a Call
          </span>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, letterSpacing: "-.04em", lineHeight: 1.1, marginTop: 10, marginBottom: 12, color: "#fff" }}>
            Let&apos;s talk about<br />
            <span style={{ color: "rgba(255,255,255,0.38)" }}>your project.</span>
          </h1>
          <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            30-minute discovery call. Pick a date and time that works for you — we&apos;ll send a Google Meet link instantly.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Name + Email */}
            <div className="fr">
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: ".68rem", fontWeight: 500, color: "rgba(255,255,255,0.38)" }}>Your name *</label>
                <input
                  className="fi"
                  type="text"
                  placeholder="James Rothwell"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: ".68rem", fontWeight: 500, color: "rgba(255,255,255,0.38)" }}>Email *</label>
                <input
                  className="fi"
                  type="email"
                  placeholder="james@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Service */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: ".68rem", fontWeight: 500, color: "rgba(255,255,255,0.38)" }}>What do you need? *</label>
              <select className="fsel" value={service} onChange={e => setService(e.target.value)} required>
                <option value="" disabled>Select a service</option>
                <option>E-Commerce Store (Shopify / WooCommerce)</option>
                <option>Custom Storefront</option>
                <option>AI Agent</option>
                <option>Workflow Automation</option>
                <option>Personal AI Assistant</option>
                <option>Multiple things / Not sure yet</option>
              </select>
            </div>

            {/* Date */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: ".68rem", fontWeight: 500, color: "rgba(255,255,255,0.38)" }}>Pick a date *</label>
              <input
                className="fi"
                type="date"
                min={minDate}
                max={maxDateStr}
                value={date}
                onChange={e => setDate(e.target.value)}
                required
                style={{ colorScheme: "dark" }}
              />
            </div>

            {/* Time slots */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: ".68rem", fontWeight: 500, color: "rgba(255,255,255,0.38)" }}>Pick a time (UK time) *</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }} className="time-grid">
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    style={{
                      padding: "10px",
                      borderRadius: 8,
                      border: `1px solid ${time === slot ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                      background: time === slot ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                      color: time === slot ? "#fff" : "rgba(255,255,255,0.5)",
                      fontSize: ".85rem",
                      fontWeight: time === slot ? 600 : 400,
                      cursor: "pointer",
                      transition: "all .15s",
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: ".68rem", fontWeight: 500, color: "rgba(255,255,255,0.38)" }}>Anything to add? (optional)</label>
              <textarea
                className="fta"
                placeholder="Brief description of what you want to build, your timeline, budget range, etc."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                style={{ minHeight: 80 }}
              />
            </div>

            {step === "error" && (
              <p style={{ fontSize: ".78rem", color: "#fca5a5", textAlign: "center" }}>
                {errorMsg}{" "}
                <button type="button" onClick={() => setStep("form")} style={{ color: "inherit", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}>Try again</button>
              </p>
            )}

            <button
              type="submit"
              className="fsub"
              disabled={step === "sending" || !name || !email || !date || !time || !service}
              style={{ marginTop: 4 }}
            >
              {step === "sending" ? "Booking…" : "Book Call & Get Meet Link →"}
            </button>

            <p style={{ fontSize: ".7rem", color: "rgba(255,255,255,0.25)", textAlign: "center" }}>
              Free 30-min call · No obligation · NDA available on request
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
