document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* ---------- mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var links  = document.getElementById("navLinks");

  function isMobile(){ return window.matchMedia("(max-width: 820px)").matches; }

  function setNav(open){
    links.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  }

  function syncNav(){
    if (isMobile()) { setNav(false); }
    else { links.hidden = false; toggle.setAttribute("aria-expanded","false"); }
  }

  toggle.addEventListener("click", function(){ setNav(links.hidden); });
  links.addEventListener("click", function(e){
    if (e.target.tagName === "A" && isMobile()) { setNav(false); }
  });
  window.addEventListener("resize", syncNav);
  syncNav();

  /* ---------- scroll spy ---------- */
  var navAnchors = {};
  links.querySelectorAll("a").forEach(function(a){
    navAnchors[a.getAttribute("href").slice(1)] = a;
  });

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var a = navAnchors[entry.target.id];
        if (!a || !entry.isIntersecting) return;
        for (var k in navAnchors) { navAnchors[k].removeAttribute("aria-current"); }
        a.setAttribute("aria-current","true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    document.querySelectorAll("section[id]").forEach(function(s){ spy.observe(s); });
  }

  /* ---------- hero parallax (subtle, opt-out on reduced motion) ---------- */
  var heroImg = document.querySelector(".hero__bg img");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (heroImg && !reduce) {
    var ticking = false;
    window.addEventListener("scroll", function(){
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function(){
        var y = Math.min(window.scrollY, 700);
        heroImg.style.transform = "translateY(" + (y * 0.16) + "px) scale(1.06)";
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- contact form ---------- */
  var WA_NUMBER = "27686662424";             
  var EMAIL     = "tonygumbe@gmail.com";

  function collect(){
    var name = document.getElementById("fName").value.trim();
    var type = document.getElementById("fType").value;
    var when = document.getElementById("fWhen").value.trim();
    var msg  = document.getElementById("fMsg").value.trim();

    var lines = [];
    lines.push("Hi Tony — " + type.toLowerCase() + ".");
    if (name) lines.push("Name: " + name);
    if (when) lines.push("When: " + when);
    if (msg)  lines.push("", msg);

    return { name:name, type:type, body:lines.join("\n") };
  }

  var waBtn = document.getElementById("sendWa");
  if (waBtn) {
    waBtn.addEventListener("click", function(){
      var d = collect();
      window.open(
        "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(d.body),
        "_blank",
        "noopener"
      );
    });
  }

  var mailLink = document.getElementById("sendMail");
  if (mailLink) {
    mailLink.addEventListener("click", function(e){
      e.preventDefault();
      var d = collect();
      var subject = d.type + (d.name ? " — " + d.name : "");
      window.location.href =
        "mailto:" + EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(d.body);
    });
  }

  /* ---------- lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbClose = document.getElementById("lbClose");
  var lastFocus = null;

  function openLb(src, alt){
    lastFocus = document.activeElement;
    lbImg.src = src;
    lbImg.alt = alt || "";
    lb.hidden = false;
    lbClose.focus();
    document.body.style.overflow = "hidden";
  }

  function closeLb(){
    lb.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
    if (lastFocus) { lastFocus.focus(); }
  }

  document.addEventListener("click", function (e) {
    var img = e.target.closest("img[data-zoom]");
    if (img) openLb(img.currentSrc || img.src, img.alt);
  });

  lbClose.addEventListener("click", closeLb);
  lb.addEventListener("click", function(e){ if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function(e){
    if (e.key === "Escape" && !lb.hidden) closeLb();
  });

});
 // end DOMContentLoaded