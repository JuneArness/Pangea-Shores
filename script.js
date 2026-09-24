/* ==========================================================================
   Pangea Shores | Site script
   Mobile navigation, header state, reveal-on-scroll, contact form
   validation and the footer year. The site stays usable without it.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.add("js");

  /* ---------- Current year in the footer ---------- */
  var yearEls = document.querySelectorAll("[data-year]");
  for (var y = 0; y < yearEls.length; y++) {
    yearEls[y].textContent = new Date().getFullYear();
  }

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.querySelector(".sr-only").textContent = open ? "Close menu" : "Open menu";
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") === "true" &&
          !nav.contains(e.target) && !toggle.contains(e.target)) {
        setNav(false);
      }
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) setNav(false);
    });
  }

  /* ---------- Navigation state ----------
     Each page already marks its own link with aria-current="page" in the HTML.
     This fallback covers pages served from a folder URL (e.g. "/" on GitHub Pages). */
  if (nav && !nav.querySelector('[aria-current="page"]')) {
    var path = window.location.pathname.split("/").pop() || "index.html";
    var links = nav.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("href") === path) links[i].setAttribute("aria-current", "page");
    }
  }

  /* ---------- Header shadow once the page scrolls ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Smooth scrolling for same-page links ---------- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute("href");
    if (id.length < 2) return;
    var target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("form-status");
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var phonePattern = /^[0-9+().\-\s]{7,20}$/;

  var messages = {
    firstName: "Enter your first name.",
    lastName: "Enter your last name.",
    email: "Enter an email address, like name@company.com.",
    phone: "Enter a phone number using digits, spaces, dashes or parentheses.",
    subject: "Choose a subject.",
    message: "Tell us a little about what you'd like to discuss (at least 20 characters)."
  };

  function fieldError(input) {
    var v = input.value.trim();
    if (input.required && !v) return messages[input.name];
    if (input.name === "email" && v && !emailPattern.test(v)) return messages.email;
    if (input.name === "phone" && v && !phonePattern.test(v)) return messages.phone;
    if (input.name === "message" && v.length > 0 && v.length < 20) return messages.message;
    return "";
  }

  function showError(input, msg) {
    var wrap = input.closest(".field");
    var slot = document.getElementById(input.id + "-error");
    wrap.classList.toggle("has-error", !!msg);
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (slot) slot.textContent = msg;
  }

  form.setAttribute("novalidate", "");
  var inputs = form.querySelectorAll("input, select, textarea");

  inputs.forEach(function (input) {
    input.addEventListener("blur", function () {
      if (input.value.trim() || input.getAttribute("aria-invalid") === "true") {
        showError(input, fieldError(input));
      }
    });
    input.addEventListener("input", function () {
      if (input.getAttribute("aria-invalid") === "true") showError(input, fieldError(input));
    });
  });

  form.addEventListener("submit", function (e) {
    var firstInvalid = null;
    inputs.forEach(function (input) {
      if (input.type === "hidden" || input.name === "_gotcha") return;
      var msg = fieldError(input);
      showError(input, msg);
      if (msg && !firstInvalid) firstInvalid = input;
    });

    status.className = "form-status";
    status.textContent = "";

    if (firstInvalid) {
      e.preventDefault();
      status.classList.add("is-error");
      status.textContent = "Message not sent. Fix the highlighted fields and try again.";
      firstInvalid.focus();
      return;
    }

    /* If no form service is connected yet, say so plainly instead of pretending
       the message was sent. See the FORM ENDPOINT comment in contact.html. */
    var action = (form.getAttribute("action") || "").trim();
    if (!action || action === "#") {
      e.preventDefault();
      status.classList.add("is-info");
      status.textContent =
        "Message not sent. This form isn't connected to a delivery service yet. " +
        "Until it is, please reach Pangea Shores by email or phone using the details on this page.";
    }
    /* Otherwise the browser submits normally to the configured service. */
  });
})();
