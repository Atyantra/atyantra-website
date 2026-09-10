/* ============================================================
   Intelligence Designed To Evolve — behaviour
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

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
      // markup already carries the final value; leave it
      el.textContent = formatValue(target, decimals, suffix);
      return;
    }

    // markup carries the final value for the no-JS case; reset before counting
    el.textContent = formatValue(0, decimals, suffix);

    window.setTimeout(function () {
      var start = null;
      function frame(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        el.textContent = formatValue(
          easeOutCubic(p) * target,
          decimals,
          suffix
        );
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
