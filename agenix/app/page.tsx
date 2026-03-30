import type { Metadata } from "next";
import Hero         from "@/components/Hero";
import WhatWeDo     from "@/components/WhatWeDo";
import Stores       from "@/components/Stores";
import Agents       from "@/components/Agents";
import Sectors      from "@/components/Sectors";
import HowWeWork    from "@/components/HowWeWork";
import Results      from "@/components/Results";
import Testimonials from "@/components/Testimonials";
import CTA          from "@/components/CTA";
import Contact      from "@/components/Contact";

export const metadata: Metadata = {
  title: "Dizilo — Stores, Agents & Automation",
  description:
    "Dizilo builds Shopify & WooCommerce stores, custom AI agents, and workflow automation — end-to-end, from first line of code to production. Based in Birmingham, working worldwide.",
  alternates: { canonical: "https://dizilo.com" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Dizilo build?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dizilo builds three things: Shopify and WooCommerce e-commerce stores, custom AI agents (for lead qualification, customer support, and sales), and business workflow automation using tools like n8n, Zapier, and Make.",
      },
    },
    {
      "@type": "Question",
      name: "What is an AI agent and how can it help my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI agent is software that takes action on your behalf — not just answering questions, but actually doing things: qualifying leads, booking calls, responding to support tickets, processing documents, or sending follow-ups. Dizilo builds custom AI agents trained on your business data.",
      },
    },
    {
      "@type": "Question",
      name: "Can Dizilo build a Shopify store for me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Dizilo builds Shopify stores from scratch — custom themes, product setup, payment integration, AI support agents, and performance optimisation. We also work with WooCommerce and headless commerce setups.",
      },
    },
    {
      "@type": "Question",
      name: "What business processes can be automated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common automations include invoice processing, lead routing and qualification, CRM updates, email follow-up sequences, order management, document generation, and internal reporting. If it repeats, Dizilo can build a system that handles it automatically with n8n and AI.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build an AI agent or automation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most AI agents and automations are scoped, built, and live within 2–4 weeks. Dizilo provides a fixed price and clear timeline before any work starts — no open-ended retainers.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Dizilo based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dizilo is based in Birmingham, UK, but works with clients worldwide. All communication is in English and projects are delivered remotely.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main>
        <Hero />
        <WhatWeDo />
        <Stores />
        <Agents />
        <Sectors />
        <HowWeWork />
        <Results />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
    </>
  );
}
