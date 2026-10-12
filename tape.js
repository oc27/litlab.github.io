/* Randomly dots blue rectangles (like the logo's cut-paper shapes) behind the page.
   Tweak COUNT for more/fewer, and the opacity in the #tape-bg i rule above for stronger/softer. */
(function () {
  var COUNT = 26;
  var layer = document.getElementById("tape-bg");
  var seed = 7;
  function rand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function draw() {
    seed = 7;
    layer.innerHTML = "";
    var w = layer.clientWidth, h = layer.clientHeight;
    var scale = Math.min(1, w / 900) * 0.6 + 0.4;
    for (var n = 0; n < COUNT; n++) {
      var r = document.createElement("i");
      var rw = (24 + rand() * 60) * scale;
      var rh = rw * (1.3 + rand() * 1.1);
      var tilt = (rand() - 0.5) * 8;
      r.style.width = rw + "px";
      r.style.height = rh + "px";
      r.style.left = rand() * (w - rw) + "px";
      r.style.top = rand() * (h - rh) + "px";
      r.style.transform = "rotate(" + tilt.toFixed(1) + "deg)";
      layer.appendChild(r);
    }
  }
  draw();
  window.addEventListener("load", draw);
  var t;
  window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(draw, 200); });
})();

/* Experiment page: highlight the current section in the side menu, and fade items in on scroll */
(function () {
  if (!("IntersectionObserver" in window)) return;
  var links = document.querySelectorAll(".exp-toc a");
  if (links.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    links.forEach(function (l) {
      var el = document.getElementById(l.getAttribute("href").slice(1));
      if (el) spy.observe(el);
    });
  }
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  var show = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); show.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { show.observe(el); });
})();
