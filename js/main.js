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
