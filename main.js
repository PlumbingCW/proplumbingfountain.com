(function () {
  "use strict";
  var doc = document.documentElement;
  var toggle = document.getElementById("menu-toggle");
  var drawer = document.getElementById("mob-drawer");
  var overlay = document.getElementById("mob-overlay");
  var closeBtn = document.getElementById("mob-close");
  var mq = window.matchMedia("(max-width: 900px)");

  function openDrawer() {
    drawer.classList.add("open");
    overlay.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    doc.style.overflow = "hidden";
    if (closeBtn) { closeBtn.focus(); }
  }
  function closeDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    doc.style.overflow = "";
  }
  if (toggle && drawer && overlay) {
    toggle.addEventListener("click", openDrawer);
    overlay.addEventListener("click", closeDrawer);
    if (closeBtn) { closeBtn.addEventListener("click", closeDrawer); }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeDrawer(); }
    });
    var onChange = function (e) { if (!e.matches) { closeDrawer(); } };
    if (mq.addEventListener) { mq.addEventListener("change", onChange); } else { mq.addListener(onChange); }
  }

  var qs = document.querySelectorAll(".faq-q");
  Array.prototype.forEach.call(qs, function (q) {
    q.addEventListener("click", function () {
      var open = q.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(q.getAttribute("aria-controls"));
      q.setAttribute("aria-expanded", open ? "false" : "true");
      panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
    });
  });

  var fab = document.getElementById("fab-call");
  var foot = document.querySelector(".site-footer");
  if (fab && foot && "IntersectionObserver" in window) {
    var nearFooter = false;
    var update = function () {
      if (window.scrollY > 600 && !nearFooter) { fab.classList.add("show"); } else { fab.classList.remove("show"); }
    };
    new IntersectionObserver(function (en) { nearFooter = en[0].isIntersecting; update(); }).observe(foot);
    window.addEventListener("scroll", update, { passive: true });
    update();
  }
})();
