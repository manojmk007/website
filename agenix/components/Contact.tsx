"use client";

import { useState, useId } from "react";

type FormState = "idle" | "sending" | "success" | "error" | "network-error";

export default function Contact() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const id = useId();

  const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ?? "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!WEBHOOK_URL) {
      setErrorMsg("Contact form not configured yet — please email us directly at dizilopartner@gmail.com");
      setState("error");
      return;
    }
    setState("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const formData = new FormData(form);
      const body: Record<string, string> = {};
      formData.forEach((v, k) => { body[k] = v.toString(); });

      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (res.ok) {
        setState("success");
      } else {
        setState("error");
        setErrorMsg("Something went wrong — please email us directly.");
      }
    } catch {
      clearTimeout(timeout);
      setState("network-error");
      setErrorMsg("Network error — please check your connection and try again.");
    }
  };

  return (
    <section id="contact">
      <div className="w">
        <div className="ct-layout">
          {/* Left column */}
          <div>
            <span className="s-label rv">Contact</span>
            <h2 className="ct-h rv d1">Let&apos;s talk about your project</h2>
            <p className="ct-sub rv d2">
              Tell us what you&apos;re trying to build. We&apos;ll come back with a clear plan
              and a fixed price — no obligation.
            </p>
            <div className="ct-rows rv d3">
              <div className="ct-row">
                <div className="ct-k">Email</div>
                <div className="ct-v">
                  <a href="mailto:dizilopartner@gmail.com">dizilopartner@gmail.com</a>
                </div>
              </div>
              <div className="ct-row">
                <div className="ct-k">Based in</div>
                <div className="ct-v">Birmingham, UK · Working worldwide</div>
              </div>
            </div>
          </div>

          {/* Right column — form */}
          <div className="rv d2">
            <div className="fw">
              <div className="fw-h">Send a message</div>

              {state === "success" ? (
                <div className="form-success" role="status" aria-live="polite">
                  <div className="form-success-title">✓ Message sent</div>
                  <div className="form-success-sub">
                    We&apos;ll reply within one business day.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="_gotcha"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <input type="hidden" name="_subject" value="New project enquiry — Dizilo website" />

                  <div className="fb">
                    <div className="fr">
                      <div className="fg">
                        <label className="fl" htmlFor={`${id}-first`}>
                          First name
                        </label>
                        <input
                          id={`${id}-first`}
                          className="fi"
                          type="text"
                          name="first_name"
                          placeholder="James"
                          required
                          autoComplete="given-name"
                        />
                      </div>
                      <div className="fg">
                        <label className="fl" htmlFor={`${id}-last`}>
                          Last name
                        </label>
                        <input
                          id={`${id}-last`}
                          className="fi"
                          type="text"
                          name="last_name"
                          placeholder="Rothwell"
                          autoComplete="family-name"
                        />
                      </div>
                    </div>

                    <div className="fg">
                      <label className="fl" htmlFor={`${id}-email`}>
                        Work email <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id={`${id}-email`}
                        className="fi"
                        type="email"
                        name="email"
                        placeholder="james@company.com"
                        required
                        autoComplete="email"
                      />
                    </div>

                    <div className="fg">
                      <label className="fl" htmlFor={`${id}-company`}>
                        Company
                      </label>
                      <input
                        id={`${id}-company`}
                        className="fi"
                        type="text"
                        name="company"
                        placeholder="Your company"
                        autoComplete="organization"
                      />
                    </div>

                    <div className="fg">
                      <label className="fl" htmlFor={`${id}-service`}>
                        What do you need?
                      </label>
                      <select
                        id={`${id}-service`}
                        className="fsel"
                        name="service"
                        defaultValue=""
                      >
                        <option value="" disabled>Select one</option>
                        <option>E-Commerce Store (Shopify / WooCommerce)</option>
                        <option>Custom Storefront</option>
                        <option>AI Agent for my Store</option>
                        <option>Business Automation / Workflow</option>
                        <option>Personal AI Assistant</option>
                        <option>Multiple things / Not sure yet</option>
                      </select>
                    </div>

                    <div className="fg">
                      <label className="fl" htmlFor={`${id}-message`}>
                        Tell us about your project <span aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id={`${id}-message`}
                        className="fta"
                        name="message"
                        placeholder="What are you trying to build or automate? The more detail, the better."
                        required
                      />
                    </div>

                    {(state === "error" || state === "network-error") && (
                      <p className="form-error" role="alert">
                        {errorMsg}{" "}
                        <button
                          type="button"
                          onClick={() => { setState("idle"); setErrorMsg(""); }}
                          style={{ color: "inherit", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", fontSize: "inherit", padding: 0 }}
                        >
                          Try again
                        </button>
                      </p>
                    )}

                    <button
                      type="submit"
                      className="fsub"
                      disabled={state === "sending"}
                      aria-disabled={state === "sending"}
                    >
                      {state === "sending" ? "Sending…" : "Send Message →"}
                    </button>
                  </div>
                </form>
              )}

              <div className="fn">Reply within 1 business day · NDA available on request</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
