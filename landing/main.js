/* ============================================================
   AutoNaaS landing — behaviour
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- reduced motion: settle everything, pause video ---------- */

  if (reduceMotion) {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
    var v = document.querySelector(".bg-video");
    if (v) {
      try { v.pause(); } catch (e) {}
    }
  }

  /* ---------- background scrim ramps with scroll ---------- */

  var scrim = document.querySelector(".bg-scrim");
  var MIN = 0.1;
  var MAX = 0.46;

  function updateScrim() {
    if (!scrim) return;
    var vh = window.innerHeight || 1;
    var y = window.scrollY || window.pageYOffset || 0;
    // fully MIN through the hero, ramp to MAX over the next ~1.6 viewports
    var p = Math.min(Math.max((y - vh * 0.35) / (vh * 1.6), 0), 1);
    scrim.style.opacity = (MIN + (MAX - MIN) * p).toFixed(3);
  }

  var scrimTick = false;
  window.addEventListener(
    "scroll",
    function () {
      if (scrimTick) return;
      scrimTick = true;
      window.requestAnimationFrame(function () {
        updateScrim();
        scrimTick = false;
      });
    },
    { passive: true }
  );
  window.addEventListener("resize", updateScrim, { passive: true });
  updateScrim();

  /* ---------- reveal-on-scroll ---------- */

  var revealEls = Array.prototype.slice.call(
    document.querySelectorAll(".reveal")
  );

  if (!reduceMotion && "IntersectionObserver" in window && revealEls.length) {
    var ro = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            ro.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      ro.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- active nav link on scroll ---------- */

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".nav-link, .sheet-link")
  );
  var sections = Array.prototype.slice
    .call(document.querySelectorAll("main section[id]"))
    .filter(function (s) {
      return navLinks.some(function (l) {
        return l.getAttribute("href") === "#" + s.id;
      });
    });

  function setActive(id) {
    navLinks.forEach(function (l) {
      var href = l.getAttribute("href");
      var match =
        href === "#" + id ||
        (id === "top" && (href === "#top" || href === "#"));
      l.classList.toggle("is-active", match);
      if (match) {
        l.setAttribute("aria-current", "page");
      } else {
        l.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var so = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) {
      so.observe(s);
    });
    // hero / top of page
    window.addEventListener(
      "scroll",
      function () {
        if ((window.scrollY || 0) < window.innerHeight * 0.5) setActive("top");
      },
      { passive: true }
    );
  }

  /* ---------- count-up stats ---------- */

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  function formatValue(v, decimals, suffix) {
    var n = decimals > 0 ? v.toFixed(decimals) : String(Math.round(v));
    return n + suffix;
  }
  function runCount(el, i) {
    var target = parseFloat(el.getAttribute("data-target")) || 0;
    var decimals = parseInt(el.getAttribute("data-decimals"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1500 + i * 80;
    var startOffset = 480 + i * 90;

    if (reduceMotion) {
      el.textContent = formatValue(target, decimals, suffix);
      return;
    }
    el.textContent = formatValue(0, decimals, suffix);

    window.setTimeout(function () {
      var start = null;
      function frame(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        el.textContent = formatValue(easeOutCubic(p) * target, decimals, suffix);
        if (p < 1) window.requestAnimationFrame(frame);
      }
      window.requestAnimationFrame(frame);
    }, startOffset);
  }

  var statValues = Array.prototype.slice.call(
    document.querySelectorAll(".stat-value")
  );
  var counted = false;

  if ("IntersectionObserver" in window && statValues.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !counted) {
            counted = true;
            statValues.forEach(runCount);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(document.querySelector(".stats"));
  } else {
    statValues.forEach(runCount);
  }

  /* ---------- mobile menu ---------- */

  var burger = document.querySelector(".burger");
  var overlay = document.querySelector(".overlay");
  var sheet = document.querySelector(".sheet");

  function openMenu() {
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Close menu");
    overlay.hidden = false;
    sheet.hidden = false;
    document.body.classList.add("menu-open");
    var first = sheet.querySelector("a");
    if (first) first.focus();
  }
  function closeMenu() {
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
    overlay.hidden = true;
    sheet.hidden = true;
    document.body.classList.remove("menu-open");
    burger.focus();
  }
  function isOpen() {
    return burger.getAttribute("aria-expanded") === "true";
  }

  if (burger && overlay && sheet) {
    burger.addEventListener("click", function () {
      isOpen() ? closeMenu() : openMenu();
    });
    overlay.addEventListener("click", closeMenu);
    sheet.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 720 && isOpen()) closeMenu();
    });
  }
})();
