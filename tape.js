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

/* Experiments dropdown: tap to open/close (hover and keyboard focus also work via CSS) */
(function () {
  var dd = document.querySelector(".dropdown");
  if (!dd) return;
  var btn = dd.querySelector(".dropdown-toggle");
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = dd.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  document.addEventListener("click", function () {
    dd.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  });
})();
