/**
 * Velora AI Chatbot — rule-based assistant for clinic marketing inquiries.
 * Answers common questions about services, pricing, contact, and process.
 */
(function () {
  "use strict";

  const SITE = {
    email: "Velorafrontdesk@gmail.com",
    phone: "(437) 808‑2882",
    phoneTel: "+14378082882",
  };

  // Knowledge base: keyword patterns → response
  const KNOWLEDGE = [
    {
      keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
      response: "Hi! I'm the Velora assistant. I can help answer questions about our clinic marketing services—websites, Instagram, video, and advertising. What would you like to know?",
    },
    {
      keywords: ["service", "services", "what do you offer", "what do you do", "offerings"],
      response: "We offer four core services for Toronto & GTA clinics:\n\n• **Websites** — Mobile-first, conversion-focused sites with clear booking prompts\n• **Instagram** — Consistent content, templates, and reporting on reach and leads\n• **Video** — Clinic walkthroughs, provider intros, and service explainers for ads and social\n• **Advertising** — Paid campaigns optimized for calls, forms, and booking intent\n\nWant details on any of these? <a href=\"services.html\">See our services page</a>.",
    },
    {
      keywords: ["website", "websites"],
      response: "We build websites that convert—structured so patients find what they need quickly and take the next step (call, form, or booking). We include mobile-first layouts, SEO-ready foundations, and pages for services, providers, and locations. <a href=\"services.html\">Learn more about our website services</a>.",
    },
    {
      keywords: ["instagram", "social", "social media"],
      response: "We manage Instagram for clinics with a monthly content plan, professional templates, and reels-friendly formats. Reporting focuses on reach, saves, and leads—not vanity metrics. <a href=\"services.html\">See our social services</a>.",
    },
    {
      keywords: ["video", "videos"],
      response: "We create clinic-appropriate video: walkthroughs, provider intros, and service explainers that work for ads, reels, and your website. All designed to build patient confidence and drive bookings. <a href=\"services.html\">Learn more about video content</a>.",
    },
    {
      keywords: ["ads", "advertising", "paid", "campaign"],
      response: "We build advertising campaigns that match your clinic brand and optimize toward calls, forms, and booking intent—not vanity clicks. We use funnel strategy (awareness → consideration → bookings), landing pages, and monthly reporting. <a href=\"services.html\">See our advertising services</a>.",
    },
    {
      keywords: ["price", "pricing", "cost", "how much", "package", "packages", "tier", "rate"],
      response: "We offer clear tiers to match your goals. Packages include website design, Instagram management, video content, and advertising—with options from starter to growth. <a href=\"pricing.html\">View our pricing and compare packages</a>.",
    },
    {
      keywords: ["contact", "email", "phone", "call", "reach", "get in touch"],
      response: `You can reach us at:\n• **Email:** <a href="mailto:${SITE.email}">${SITE.email}</a>\n• **Phone:** <a href="tel:${SITE.phoneTel}">${SITE.phone}</a>\n\nOr <a href="contact.html#contact-form">book a free consultation</a> and we'll recommend the best next steps for your clinic.`,
    },
    {
      keywords: ["consultation", "book", "booking", "free consultation"],
      response: "We offer a free consultation where we review your website and local presence, then recommend the highest-impact next steps for patient inquiries. <a href=\"contact.html#contact-form\">Book a free consultation here</a>.",
    },
    {
      keywords: ["toronto", "gta", "location", "where", "area", "city"],
      response: "We focus on Toronto & GTA clinics so we can stay specialized, responsive, and consistent in execution. We work remotely and serve clinics across the region.",
    },
    {
      keywords: ["process", "how it works", "workflow", "timeline", "steps"],
      response: "Our process:\n\n**Step 1 — Clinic discovery:** We learn your services, ideal patients, and how your team wants to be perceived.\n\n**Step 2 — Build & launch:** Design, content, and creative—then launch with tracking and baselines.\n\n**Step 3 — Optimize monthly:** We improve what works and give you clear updates and next actions.\n\n<a href=\"pricing.html\">See how it works in detail</a>.",
    },
    {
      keywords: ["reporting", "report", "metrics"],
      response: "Yes, we provide reporting on meaningful outcomes—leads, calls, booking signals—with recommendations each month. No vanity metrics.",
    },
    {
      keywords: ["booking system", "booking tool"],
      response: "Absolutely. We can link to your current booking tool and help improve the journey from marketing to booking.",
    },
    {
      keywords: ["launch", "how fast", "timeline"],
      response: "Most websites launch in a few weeks depending on approvals and content. Social and ads can begin sooner—we'll give you a clear timeline during discovery.",
    },
    {
      keywords: ["compliant", "compliance", "regulatory", "rules"],
      response: "Marketing rules vary by profession and regulator. We aim to create content that is professional and conservative by default, without exaggerated claims or aggressive tactics.",
    },
    {
      keywords: ["thanks", "thank you", "bye", "goodbye"],
      response: "You're welcome! Feel free to come back anytime—or <a href=\"contact.html#contact-form\">book a consultation</a> when you're ready. Good luck with your clinic!",
    },
  ];

  function getResponse(input) {
    const text = (input || "").toLowerCase().trim();
    if (!text) return "Please ask me a question about our services, pricing, or how to get started.";

    for (const { keywords, response } of KNOWLEDGE) {
      if (keywords.some((k) => text.includes(k))) {
        return response;
      }
    }

    return "I'm not sure I have the exact answer for that. I can help with questions about our services (websites, Instagram, video, ads), pricing, contact info, or our process. Try asking something like \"What services do you offer?\" or \"How do I book a consultation?\" Alternatively, <a href=\"contact.html#contact-form\">reach out directly</a> and we'll get back to you.";
  }

  function createWidget() {
    const wrapper = document.createElement("div");
    wrapper.id = "velora-chatbot";
    wrapper.setAttribute("aria-label", "Velora chat assistant");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chatbot-toggle";
    btn.setAttribute("aria-label", "Open chat");
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`;

    const panel = document.createElement("div");
    panel.className = "chatbot-panel";
    panel.hidden = true;

    const header = document.createElement("div");
    header.className = "chatbot-header";
    header.innerHTML = `
      <div>
        <strong>Velora Assistant</strong>
        <span>Ask about services, pricing, or booking</span>
      </div>
      <button type="button" class="chatbot-close" aria-label="Close chat">×</button>
    `;

    const messages = document.createElement("div");
    messages.className = "chatbot-messages";

    const welcome = document.createElement("div");
    welcome.className = "chatbot-msg bot";
    welcome.innerHTML = `<p>Hi! I'm the Velora assistant. I can help with questions about our clinic marketing services—websites, Instagram, video, and advertising. What would you like to know?</p>`;
    messages.appendChild(welcome);

    const inputWrap = document.createElement("div");
    inputWrap.className = "chatbot-input-wrap";
    inputWrap.innerHTML = `
      <input type="text" class="chatbot-input" placeholder="Ask a question..." autocomplete="off" />
      <button type="button" class="chatbot-send" aria-label="Send">Send</button>
    `;

    panel.appendChild(header);
    panel.appendChild(messages);
    panel.appendChild(inputWrap);
    wrapper.appendChild(btn);
    wrapper.appendChild(panel);

    document.body.appendChild(wrapper);

    const inputEl = panel.querySelector(".chatbot-input");
    const sendBtn = panel.querySelector(".chatbot-send");

    function open() {
      panel.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      inputEl.focus();
    }

    function close() {
      panel.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    }

    function appendUser(text) {
      const div = document.createElement("div");
      div.className = "chatbot-msg user";
      div.innerHTML = `<p>${escapeHtml(text)}</p>`;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    function appendBot(html) {
      const div = document.createElement("div");
      div.className = "chatbot-msg bot";
      div.innerHTML = `<p>${formatResponse(html)}</p>`;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    function send() {
      const text = inputEl.value.trim();
      if (!text) return;
      inputEl.value = "";
      appendUser(text);
      const reply = getResponse(text);
      setTimeout(() => appendBot(reply), 300);
    }

    btn.addEventListener("click", () => (panel.hidden ? open() : close()));

    const closeBtn = header.querySelector(".chatbot-close");
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      close();
    });
    sendBtn.addEventListener("click", send);
    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") send();
    });

    return wrapper;
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function formatResponse(html) {
    return html
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createWidget);
  } else {
    createWidget();
  }
})();
