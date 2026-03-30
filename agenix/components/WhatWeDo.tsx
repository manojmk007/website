export default function WhatWeDo() {
  return (
    <section id="what">
      <div className="w">
        <span className="s-label rv">What We Do</span>
        <h2 className="s-h rv d1">Three things we&apos;re great at</h2>
        <p className="s-sub rv d2">
          GenAI-powered agents, workflow automation, and e-commerce stores — built
          end-to-end, from first line of code to production deployment.
        </p>

        <div className="pillars">
          <div className="pillar rv d1">
            <div className="pillar-n">01</div>
            <div className="pillar-title">E-Commerce Stores</div>
            <p className="pillar-body">
              We build online stores from scratch — Shopify, WooCommerce, or fully
              custom — designed to sell, handle large catalogues, and scale without
              breaking.
            </p>
            <ul className="pillar-list" aria-label="E-Commerce capabilities">
              <li className="pillar-item">Shopify & WooCommerce development</li>
              <li className="pillar-item">Custom storefronts, any size catalogue</li>
              <li className="pillar-item">10,000–20,000+ product management</li>
              <li className="pillar-item">AI-powered store agents built in</li>
            </ul>
          </div>

          <div className="pillar rv d2">
            <div className="pillar-n">02</div>
            <div className="pillar-title">AI Agents</div>
            <p className="pillar-body">
              We build GenAI-powered agents using GPT-4o, Claude, and LangChain —
              for your store, your enterprise, or your team. They take action,
              not just answer questions.
            </p>
            <ul className="pillar-list" aria-label="AI Agent capabilities">
              <li className="pillar-item">Store agents (support, sales, inventory)</li>
              <li className="pillar-item">Enterprise agents (lead gen, HR, finance, legal)</li>
              <li className="pillar-item">RAG-powered knowledge base assistants</li>
              <li className="pillar-item">Multi-agent systems with LangGraph & CrewAI</li>
            </ul>
          </div>

          <div className="pillar rv d3">
            <div className="pillar-n">03</div>
            <div className="pillar-title">Workflows & Automation</div>
            <p className="pillar-body">
              If your team does the same task every day — we automate it.
              Invoices, reports, data entry, emails, approvals — built with n8n
              and GenAI so it runs without anyone touching it.
            </p>
            <ul className="pillar-list" aria-label="Automation capabilities">
              <li className="pillar-item">Any daily, weekly, or monthly process</li>
              <li className="pillar-item">n8n workflows — our primary platform</li>
              <li className="pillar-item">AI-enhanced automation with GenAI nodes</li>
              <li className="pillar-item">Connected to every tool in your stack</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
