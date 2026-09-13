/* ============================================================
   JNL PET STUDIO — script.js
   All interactivity. Reads from content.js (BUSINESS, SERVICES,
   FEATURES, TESTIMONIALS, TEAM, VALUES, GALLERY, FAQS,
   CONTACT_INFO, PET_TYPES). Edit content.js to change any text.
   ============================================================ */

(function () {
  "use strict";

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function findService(id) {
    return SERVICES.find((s) => s.id === id);
  }

  /* =============================================================
     TOAST
     ============================================================= */
  let toastTimer = null;
  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  /* =============================================================
     NAVIGATION / ROUTING
     ============================================================= */
  const PAGES = ["home", "about", "contact"];

  function goToPage(pageId, opts) {
    if (!PAGES.includes(pageId)) pageId = "home";
    $$(".page").forEach((p) => p.classList.toggle("active", p.dataset.page === pageId));
    $$(".nav-link").forEach((a) => a.classList.toggle("active", a.dataset.nav === pageId));
    closeMobileNav();
    if (!(opts && opts.skipScroll)) window.scrollTo({ top: 0 });
    if (location.hash.replace("#", "") !== pageId) history.replaceState(null, "", "#" + pageId);
    if (opts && opts.scrollToId) {
      // wait a tick for the page to become visible before scrolling to a section within it
      requestAnimationFrame(() => {
        const target = document.getElementById(opts.scrollToId);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function handleHashChange() {
    const pageId = location.hash.replace("#", "") || "home";
    goToPage(pageId);
  }

  function setupNav() {
    $$("[data-nav]").forEach((link) => {
      link.addEventListener("click", (e) => {
        const target = link.dataset.nav;
        if (!target) return;
        e.preventDefault();
        const scrollToId = link.dataset.scrollTo;
        location.hash = target;
        goToPage(target, scrollToId ? { scrollToId } : undefined);
      });
    });
    window.addEventListener("hashchange", handleHashChange);

    const hamburger = $("#hamburger");
    hamburger.addEventListener("click", () => {
      const open = $("#mainNav").classList.toggle("open");
      hamburger.setAttribute("aria-expanded", String(open));
    });
  }
  function closeMobileNav() {
    $("#mainNav").classList.remove("open");
    $("#hamburger").setAttribute("aria-expanded", "false");
  }

  /* =============================================================
     HOME PAGE
     ============================================================= */
  function renderHome() {
    $("#heroTagline").textContent = BUSINESS.tagline;
    $("#heroIntro").textContent = BUSINESS.intro;

    // Services
    const rows = $("#serviceRows");
    rows.innerHTML = "";
    SERVICES.forEach((s) => {
      const row = el("div", "service-row");
      row.innerHTML = `
        <span class="service-icon">${s.icon}</span>
        <div>
          <h3>${s.name}</h3>
          <p class="service-price">From ${s.priceFrom} · ${s.duration}</p>
        </div>
        <p class="service-desc">${s.shortDesc}</p>
        <button class="btn btn-ghost btn-small" data-open-service="${s.id}">Learn more</button>
      `;
      row.querySelector("[data-open-service]").addEventListener("click", () => openServiceModal(s.id));
      rows.appendChild(row);
    });

    // Features
    const featureGrid = $("#featureGrid");
    featureGrid.innerHTML = "";
    FEATURES.forEach((f) => {
      featureGrid.appendChild(el("div", "feature-item", `<h3>${f.title}</h3><p>${f.text}</p>`));
    });

    // Testimonials
    const testimonialGrid = $("#testimonialGrid");
    testimonialGrid.innerHTML = "";
    TESTIMONIALS.forEach((t) => {
      const card = el("div", "testimonial-card");
      card.innerHTML = `<p class="testimonial-quote">\u201C${t.quote}\u201D</p><p class="testimonial-who"><strong>${t.name}</strong> — ${t.pet}</p>`;
      testimonialGrid.appendChild(card);
    });

    // Gallery preview (first 3)
    renderGallery("#homeGalleryGrid", GALLERY.slice(0, 3));
  }

  function renderGallery(selector, items) {
    const grid = $(selector);
    grid.innerHTML = "";
    items.forEach((g) => {
      const item = el("div", "gallery-item");
      item.innerHTML = `<img src="${g.image}" alt="${g.caption}" loading="lazy"><span class="gallery-caption">${g.caption}</span>`;
      grid.appendChild(item);
    });
  }

  /* =============================================================
     SERVICE DETAIL MODAL
     ============================================================= */
  function openServiceModal(id) {
    const s = findService(id);
    if (!s) return;
    const body = $("#serviceModalBody");
    body.innerHTML = `
      <div class="service-modal-media"><img src="${s.image}" alt="${s.name}"></div>
      <div class="service-modal-content">
        <h2 id="serviceModalTitle">${s.icon} ${s.name}</h2>
        <div class="service-meta-row">
          <span class="meta-pill">From ${s.priceFrom}</span>
          <span class="meta-pill">${s.duration}</span>
        </div>
        <p>${s.longDesc}</p>
        <div class="service-includes">
          <h4>What's included</h4>
          <ul>${s.includes.map((i) => `<li>${i}</li>`).join("")}</ul>
        </div>
        <button class="btn btn-primary" id="modalEnquireBtn">Enquire about ${s.name.toLowerCase()}</button>
      </div>
    `;
    $("#modalEnquireBtn").addEventListener("click", () => {
      closeServiceModal();
      location.hash = "contact";
      goToPage("contact", { scrollToId: "enquiryForm" });
      const serviceSelect = $("#cfService");
      if (serviceSelect) serviceSelect.value = s.id;
    });
    $("#serviceModalOverlay").classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeServiceModal() {
    $("#serviceModalOverlay").classList.remove("open");
    document.body.style.overflow = "";
  }

  /* =============================================================
     ABOUT PAGE
     ============================================================= */
  function renderAbout() {
    $("#aboutIntro").textContent = BUSINESS.intro + ` Founded in ${BUSINESS.founded}, we're still small by choice.`;

    const valuesGrid = $("#valuesGrid");
    valuesGrid.innerHTML = "";
    VALUES.forEach((v) => {
      valuesGrid.appendChild(el("div", "value-item", `<h3>${v.title}</h3><p>${v.text}</p>`));
    });

    const teamGrid = $("#teamGrid");
    teamGrid.innerHTML = "";
    TEAM.forEach((t) => {
      const card = el("div", "team-card");
      card.innerHTML = `<img src="${t.image}" alt="${t.name}"><h3>${t.name}</h3><p class="team-role">${t.role}</p><p>${t.bio}</p>`;
      teamGrid.appendChild(card);
    });

    renderGallery("#aboutGalleryGrid", GALLERY);
  }

  /* =============================================================
     CONTACT PAGE
     ============================================================= */
  function renderContact() {
    $("#contactDetails").innerHTML = `
      <li><strong>Email</strong>${CONTACT_INFO.email}</li>
      <li><strong>Phone</strong>${CONTACT_INFO.phone}</li>
      <li><strong>WhatsApp</strong>${CONTACT_INFO.whatsapp}</li>
      <li><strong>Address</strong>${CONTACT_INFO.address}</li>
    `;
    $("#hoursList").innerHTML = CONTACT_INFO.hours
      .map((h) => `<li>${h.day}<span>${h.time}</span></li>`)
      .join("");
    $("#contactSocials").innerHTML = CONTACT_INFO.socials
      .map((s) => `<a href="${s.url}">${s.platform} ${s.handle}</a>`)
      .join("");
    $("#footerEmail").textContent = CONTACT_INFO.email;
    $("#footerPhone").textContent = CONTACT_INFO.phone;
    $("#footerTagline").textContent = BUSINESS.tagline;

    // Pet type + service selects
    const petSelect = $("#cfPetType");
    petSelect.innerHTML = `<option value="">Select pet type</option>` + PET_TYPES.map((p) => `<option value="${p}">${p}</option>`).join("");
    const serviceSelect = $("#cfService");
    serviceSelect.innerHTML = `<option value="">Select a service</option>` + SERVICES.map((s) => `<option value="${s.id}">${s.name}</option>`).join("") + `<option value="not-sure">Not sure yet</option>`;

    // FAQ accordion
    const faqList = $("#faqList");
    faqList.innerHTML = "";
    FAQS.forEach((f, i) => {
      const item = el("div", "faq-item");
      item.innerHTML = `
        <button class="faq-question" aria-expanded="false">
          <span>${f.q}</span><span class="faq-icon">+</span>
        </button>
        <div class="faq-answer"><p>${f.a}</p></div>
      `;
      const btn = item.querySelector(".faq-question");
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        $$(".faq-item", faqList).forEach((other) => {
          other.classList.remove("open");
          other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
      faqList.appendChild(item);
    });
  }

  function validateField(input, errorEl, message, validator) {
    const value = input.value.trim();
    const valid = validator(value);
    input.closest(".form-row").classList.toggle("invalid", !valid);
    errorEl.textContent = valid ? "" : message;
    return valid;
  }

  function setupContactForm() {
    const form = $("#enquiryForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameOk = validateField($("#cfName"), $("#cfNameError"), "Please enter your name.", (v) => v.length > 1);
      const emailOk = validateField($("#cfEmail"), $("#cfEmailError"), "Please enter a valid email address.", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
      const phoneOk = validateField($("#cfPhone"), $("#cfPhoneError"), "Please enter a contact number.", (v) => v.replace(/\D/g, "").length >= 7);
      const messageOk = validateField($("#cfMessage"), $("#cfMessageError"), "Let us know a little more — at least 10 characters.", (v) => v.length >= 10);

      if (!(nameOk && emailOk && phoneOk && messageOk)) return;

      // No backend is wired up — this simulates a successful send.
      $("#contactSuccess").hidden = false;
      form.reset();
      showToast("Enquiry sent — we'll be in touch shortly!");
      setTimeout(() => { $("#contactSuccess").hidden = true; }, 6000);
    });

    [["#cfName", "#cfNameError"], ["#cfEmail", "#cfEmailError"], ["#cfPhone", "#cfPhoneError"], ["#cfMessage", "#cfMessageError"]]
      .forEach(([inputSel, errorSel]) => {
        $(inputSel).addEventListener("input", () => {
          $(inputSel).closest(".form-row").classList.remove("invalid");
          $(errorSel).textContent = "";
        });
      });
  }

  /* =============================================================
     SERVICE MODAL OVERLAY LISTENERS
     ============================================================= */
  function setupOverlays() {
    $("#serviceModalClose").addEventListener("click", closeServiceModal);
    $("#serviceModalOverlay").addEventListener("click", (e) => {
      if (e.target === $("#serviceModalOverlay")) closeServiceModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeServiceModal();
    });
  }

  /* =============================================================
     INIT
     ============================================================= */
  function init() {
    $("#footerYear").textContent = new Date().getFullYear();
    setupNav();
    setupOverlays();

    renderHome();
    renderAbout();
    renderContact();
    setupContactForm();

    handleHashChange();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
