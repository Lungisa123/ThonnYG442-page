document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  
var GALLERY_IMAGES = [
    { src: "static/Images/Gallery/1.jpg",  alt: "model pic" },
    { src: "static/Images/Gallery/2.jpg",  alt: "model pic" },
    { src: "static/Images/Gallery/3.jpg",  alt: "model pic" },
    { src: "static/Images/Gallery/4.jpg",  alt: "model pic" },
    { src: "static/Images/Gallery/5.jpg",  alt: "model pic" },
    { src: "static/Images/Gallery/6.jpg",  alt: "model pic" },
    { src: "static/Images/Gallery/7.jpg",  alt: "model pic" },
    { src: "static/Images/Gallery/9.jpg",  alt: "model pic" },
    { src: "static/Images/Gallery/10.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/11.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/12.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/13.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/14.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/15.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/16.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/17.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/18.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/19.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/20.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/21.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/22.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/23.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/24.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/25.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/26.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/27.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/28.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/29.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/30.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/31.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/32.jpg", alt: "model pic" },
    { src: "static/Images/Gallery/33.jpg", alt: "model pic" }
];

  var GALLERY_PAGE_SIZE = 8;   // how many images load per click on "Show more"
  var galleryShown = 0;
  var galleryObserver = null;

  function renderGalleryBatch() {
    var grid = document.getElementById("galleryGrid");
    var moreBtn = document.getElementById("galleryMore");
    if (!grid) return; // no gallery on this page — quietly do nothing

     
    if (!galleryObserver && "IntersectionObserver" in window) {
      galleryObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            galleryObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
    }

    var next = GALLERY_IMAGES.slice(galleryShown, galleryShown + GALLERY_PAGE_SIZE);

    next.forEach(function (item) {
      var fig = document.createElement("figure");
      fig.setAttribute("data-reveal", "");

      var img = document.createElement("img");
      img.className = "tone";
      img.src = item.src;
      img.alt = item.alt || "";
      img.loading = "lazy";          // native lazy-load — matters a lot at 30 images
      img.setAttribute("data-zoom", "");

      var cap = document.createElement("figcaption");
      cap.textContent = item.caption || "";

      fig.appendChild(img);
      fig.appendChild(cap);
      grid.appendChild(fig);

      if (galleryObserver) { galleryObserver.observe(fig); }
    });

    galleryShown += next.length;
    if (moreBtn) { moreBtn.hidden = galleryShown >= GALLERY_IMAGES.length; }
  }

  renderGalleryBatch();

  var moreBtn = document.getElementById("galleryMore");
  if (moreBtn) { moreBtn.addEventListener("click", renderGalleryBatch); }

});