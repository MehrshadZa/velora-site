/**
 * Velora marketing site — lightweight, no dependencies.
 * Update contact details here if you want the whole site to reflect it consistently.
 */
const SITE = {
  businessName: "Velora Clinic Marketing",
  phoneDisplay: "(437) 808‑2882",
  phoneTel: "+14378082882",
  email: "Velorafrontdesk@gmail.com",
  cityLine: "Toronto & GTA • Healthcare‑focused marketing",
};

function qs(sel, root = document) {
  return root.querySelector(sel);
}
function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function initMobileNav() {
  const btn = qs("[data-nav-toggle]");
  const panel = qs("[data-nav-links]");
  if (!btn || !panel) return;

  const setOpen = (open) => {
    panel.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
  };

  btn.addEventListener("click", () => {
    const open = !panel.classList.contains("open");
    setOpen(open);
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    const isClickInside = panel.contains(e.target) || btn.contains(e.target);
    if (!isClickInside) setOpen(false);
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  // Close after clicking a link (mobile)
  qsa("a", panel).forEach((a) => a.addEventListener("click", () => setOpen(false)));
}

function initConfigBindings() {
  qsa("[data-business-name]").forEach((el) => (el.textContent = SITE.businessName));
  qsa("[data-phone]").forEach((el) => (el.textContent = SITE.phoneDisplay));
  qsa("[data-email]").forEach((el) => (el.textContent = SITE.email));
  qsa("[data-city]").forEach((el) => (el.textContent = SITE.cityLine));

  qsa("[data-phone-link]").forEach((a) => a.setAttribute("href", `tel:${SITE.phoneTel}`));
  qsa("[data-email-link]").forEach((a) => a.setAttribute("href", `mailto:${SITE.email}`));
}

function initCurrentNav() {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  qsa("[data-nav-links] a").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (!href) return;
    const isCurrent = href === path || (path === "" && href === "index.html");
    if (isCurrent) a.setAttribute("aria-current", "page");
  });
}

function initContactForm() {
  const form = qs("[data-contact-form]");
  const status = qs("[data-form-status]");
  if (!form || !status) return;

  const required = ["name", "email", "clinic", "service", "message"];
  const setStatus = (type, msg) => {
    status.className = `alert ${type}`;
    status.textContent = msg;
    status.hidden = false;
  };

  const isEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());

    for (const key of required) {
      if (!String(values[key] || "").trim()) {
        setStatus("warn", "Please complete all required fields so we can route your request correctly.");
        return;
      }
    }
    if (!isEmail(String(values.email))) {
      setStatus("warn", "Please enter a valid email address.");
      return;
    }

    // Email-based submission (no backend). Replace with a real endpoint later if needed.
    const subject = encodeURIComponent(`New inquiry — ${values.clinic} (${values.service})`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nClinic: ${values.clinic}\nService: ${values.service}\n\nMessage:\n${values.message}\n`
    );
    const mailto = `mailto:${SITE.email}?subject=${subject}&body=${body}`;

    setStatus("ok", "Thanks — your message is ready to send. If your email client didn’t open, please email us directly.");
    window.location.href = mailto;
    form.reset();
  });
}

function initStickyConsultCta() {
  // Lightweight sticky CTA (shows after scroll). If you add your own element in HTML,
  // give it: data-sticky-cta
  const existing = qs("[data-sticky-cta]");
  const el =
    existing ||
    Object.assign(document.createElement("a"), {
      className: "sticky-cta",
      href: "contact.html#contact-form",
      textContent: "Book a Free Consultation",
    });

  if (!existing) {
    el.setAttribute("data-sticky-cta", "true");
    el.setAttribute("aria-label", "Book a Free Consultation");
    document.body.appendChild(el);
  }

  document.body.classList.add("has-sticky-cta");

  const showAfter = 220;
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    el.classList.toggle("show", y > showAfter);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initConfigBindings();
  initCurrentNav();
  initContactForm();
  initStickyConsultCta();
});


