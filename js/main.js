(function () {
  "use strict";

  var profiles = document.querySelectorAll(".profile");

  profiles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      profiles.forEach(function (other) {
        if (other !== btn) other.setAttribute("aria-expanded", "false");
      });
      btn.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });

  var revealer = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealer.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealer.forEach(function (el) { io.observe(el); });
})();

(function () {
  "use strict";

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".center-tab"));

  function select(tab) {
    tabs.forEach(function (t) {
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      var active = t === tab;
      t.setAttribute("aria-selected", active ? "true" : "false");
      if (panel) panel.hidden = !active;
    });
    if (tab) tab.focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { select(tab); });

    tab.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === "Home") next = tabs[0];
      else if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next); }
    });
  });
})();
