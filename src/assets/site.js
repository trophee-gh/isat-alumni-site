// isat-6: copy button, map quick views, mock form, hide-on-scroll, gallery font switcher. No network.
(function () {
  var root = document.documentElement;
  root.classList.add("js"); // without script, the floating buttons stay visible

  // Scrolling down hides the header and shows the floating buttons; scrolling up does the reverse.
  // With prefers-reduced-motion the CSS drops the transition (they appear and disappear without sliding).
  var lastY = window.scrollY, ticking = false;
  function onScroll() {
    var y = window.scrollY, menu = document.querySelector(".menu[open]");
    if (menu || y < 80) root.classList.remove("scroll-down");
    else if (y > lastY + 6) root.classList.add("scroll-down");
    else if (y < lastY - 6) root.classList.remove("scroll-down");
    lastY = y; ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  // The footer carries the same links: once it is in view, the floating buttons step aside.
  var foot = document.querySelector(".foot");
  if (foot && "IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { root.classList.toggle("foot-in", es[0].isIntersecting); }).observe(foot);
  }
  // Keyboard users: focusing the header or the bar brings it back.
  document.addEventListener("focusin", function (e) {
    if (!e.target.closest) return;
    if (e.target.closest(".top")) root.classList.remove("scroll-down");
    else if (e.target.closest(".floatbar")) root.classList.add("scroll-down");
  });

  // Copyable address.
  document.querySelectorAll("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var t = b.getAttribute("data-copy"), o = document.getElementById(b.getAttribute("aria-controls"));
      function ok() { if (o) o.textContent = o.getAttribute("data-ok"); }
      function fb() {
        var a = document.createElement("textarea"); a.value = t; document.body.appendChild(a); a.select();
        try { document.execCommand("copy"); ok(); } catch (e) {} a.remove();
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, fb); else fb();
    });
  });

  // Map quick views.
  var views = { monde: "0 0 720 280", europe: "330 40 120 66", ameriques: "20 10 300 165", asie: "470 40 230 160" };
  document.querySelectorAll("[data-view]").forEach(function (b) {
    b.addEventListener("click", function () {
      var v = b.getAttribute("data-view"), m = document.getElementById(b.getAttribute("data-map"));
      if (!m) return;
      m.setAttribute("viewBox", views[v]);
      b.parentNode.querySelectorAll("[data-view]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      m.querySelectorAll(".mk").forEach(function (k) { k.classList.toggle("dim", v !== "monde" && k.getAttribute("data-zone") !== v); });
    });
  });

  // Mock contact form: Netlify markup, but nothing is sent until hosting is decided.
  document.querySelectorAll("form[data-mock]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var o = f.querySelector(".copied");
      if (o) o.textContent = o.getAttribute("data-ok");
    });
  });

  // Gallery: font switcher swaps the custom properties.
  var stacks = {
    inter: '"Inter",system-ui,sans-serif',
    grotesk: '"Space Grotesk","Inter",system-ui,sans-serif',
    archivo: '"Archivo",system-ui,sans-serif'
  };
  document.querySelectorAll("[data-font]").forEach(function (b) {
    b.addEventListener("click", function () {
      var prop = b.getAttribute("data-prop"), f = b.getAttribute("data-font");
      root.style.setProperty(prop, stacks[f]);
      document.querySelectorAll('[data-prop="' + prop + '"]').forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    });
  });
})();
