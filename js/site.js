/* Alix Abroad — trip page behavior: carousel, scroll progress, theme toggle.
   Plain JS, no dependencies. Theme is applied early (inline script in <head>,
   see the HTML) to avoid a light/dark flash; this file wires up the toggle
   button itself plus everything else. */

(function () {
  "use strict";

  /* ---------- Theme toggle: switches the site between light and dark mode ---------- */
  function initTheme() {
    var btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;

    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.setAttribute("aria-pressed", String(isDark));

    btn.addEventListener("click", function () {
      var dark = document.documentElement.getAttribute("data-theme") === "dark";
      var next = dark ? "" : "dark";
      if (next) {
        document.documentElement.setAttribute("data-theme", next);
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      btn.setAttribute("aria-pressed", String(!dark));
      try {
        localStorage.setItem("alix-theme", next);
      } catch (e) {
        /* localStorage unavailable (private mode etc.) — theme just won't persist */
      }
    });
  }

  /* ---------- Scroll progress: the colored bar on the left edge that
     fills up to show how far down the page you've scrolled ---------- */
  function initScrollProgress() {
    var fill = document.querySelector(".scroll-progress__fill");
    if (!fill) return;

    var ticking = false;

    function update() {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var pct = scrollable > 0 ? (doc.scrollTop || document.body.scrollTop) / scrollable : 0;
      fill.style.height = Math.max(0, Math.min(1, pct)) * 100 + "%";
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );

    update();
  }

  /* ---------- Trip photo carousel: the big photo + small clickable
     thumbnails on each trip page ---------- */
  function initSliders() {
    var sliders = document.querySelectorAll("[data-slider]");

    sliders.forEach(function (slider) {
      var stage = slider.querySelector(".trip-slider__stage");
      var stageImgs = Array.prototype.slice.call(stage.querySelectorAll("img"));
      var thumbButtons = Array.prototype.slice.call(
        slider.querySelectorAll(".trip-slider__thumbs button")
      );
      var prevBtn = slider.querySelector(".trip-slider__arrow--prev");
      var nextBtn = slider.querySelector(".trip-slider__arrow--next");

      var active = stageImgs.findIndex(function (img) {
        return img.classList.contains("is-active");
      });
      if (active < 0) active = 0;

      function render() {
        stageImgs.forEach(function (img, i) {
          img.classList.toggle("is-active", i === active);
        });
        // thumbnails always show the two photos NOT currently active, in order
        var others = stageImgs
          .map(function (img, i) { return i; })
          .filter(function (i) { return i !== active; });

        thumbButtons.forEach(function (btn, slot) {
          var srcIndex = others[slot];
          var img = btn.querySelector("img");
          var sourceImg = stageImgs[srcIndex];
          img.src = sourceImg.src;
          img.alt = sourceImg.alt;
          btn.dataset.goTo = String(srcIndex);
          btn.setAttribute("aria-label", "Show photo " + (srcIndex + 1));
        });
      }

      function goTo(index) {
        var len = stageImgs.length;
        active = ((index % len) + len) % len;
        render();
      }

      if (prevBtn) prevBtn.addEventListener("click", function () { goTo(active - 1); });
      if (nextBtn) nextBtn.addEventListener("click", function () { goTo(active + 1); });

      thumbButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          goTo(Number(btn.dataset.goTo));
        });
      });

      // keyboard: left/right arrows while the slider (or anything in it) has focus
      slider.setAttribute("tabindex", "0");
      slider.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") { goTo(active - 1); }
        else if (e.key === "ArrowRight") { goTo(active + 1); }
      });

      // pointer drag / touch swipe on the stage
      var dragging = false;
      var startX = 0;

      stage.addEventListener("pointerdown", function (e) {
        // don't hijack clicks on the arrow buttons: capturing the pointer
        // here would retarget their mouseup/click to the stage and the
        // buttons would stop working for real mouse/touch input
        if (e.target.closest("button")) return;
        dragging = true;
        startX = e.clientX;
        stage.setPointerCapture(e.pointerId);
      });

      stage.addEventListener("pointerup", function (e) {
        if (!dragging) return;
        dragging = false;
        var dx = e.clientX - startX;
        var THRESHOLD = 40;
        if (dx > THRESHOLD) goTo(active - 1);
        else if (dx < -THRESHOLD) goTo(active + 1);
      });

      stage.addEventListener("pointercancel", function () { dragging = false; });

      render();
    });
  }

  /* ---------- Custom cursor: the colored line that follows your mouse
     around the screen, replacing the normal pointer ---------- */
  function initCursorTrail() {
    // only on devices with a real pointer — a "custom cursor" is meaningless
    // on touch, and we don't want to fight native touch scrolling/tapping
    if (!window.matchMedia("(pointer: fine)").matches) return;

    var canvas = document.querySelector(".cursor-canvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");

    // read the real palette values straight from CSS — no new/duplicated colors
    var rootStyle = getComputedStyle(document.documentElement);
    var paletteVars = ["--pink", "--yellow", "--green", "--blue", "--orange", "--cream", "--brown"];
    var palette = paletteVars.map(function (v) {
      var hex = rootStyle.getPropertyValue(v).trim();
      var n = parseInt(hex.replace("#", ""), 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    });

    function lerp(a, b, t) { return a + (b - a) * t; }

    // continuously-cycling color, independent of mouse movement — loops
    // through the whole palette once every CYCLE_MS milliseconds
    var CYCLE_MS = 5000;
    function currentColor(now) {
      var t = (now % CYCLE_MS) / CYCLE_MS; // 0..1
      var scaled = t * palette.length;
      var i = Math.floor(scaled) % palette.length;
      var j = (i + 1) % palette.length;
      var f = scaled - Math.floor(scaled);
      var a = palette[i], b = palette[j];
      return "rgb(" + Math.round(lerp(a.r, b.r, f)) + "," +
        Math.round(lerp(a.g, b.g, f)) + "," +
        Math.round(lerp(a.b, b.b, f)) + ")";
    }

    function resize() {
      var dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    var MAX_AGE = 350; // ms a trail point stays visible
    var points = []; // {x, y, color, t}
    // SMOOTHING: how much of the gap to the raw pointer position the drawn
    // cursor closes each frame. Lower = less sensitive/twitchy (more lag,
    // smoother easing); higher = snaps closer to the raw mouse position.
    var SMOOTHING = 0.08;

    var targetX = null, targetY = null, haveMouse = false;
    var curX = 0, curY = 0;

    window.addEventListener(
      "pointermove",
      function (e) {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!haveMouse) { curX = targetX; curY = targetY; }
        haveMouse = true;
      },
      { passive: true }
    );

    function frame() {
      var now = performance.now();

      if (haveMouse) {
        curX += (targetX - curX) * SMOOTHING;
        curY += (targetY - curY) * SMOOTHING;
        points.push({ x: curX, y: curY, color: currentColor(now), t: now });
        if (points.length > 60) points.shift();
      }

      points = points.filter(function (p) { return now - p.t < MAX_AGE; });

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 1; i < points.length; i++) {
        var p0 = points[i - 1], p1 = points[i];
        var age = (now - p1.t) / MAX_AGE; // 0 = fresh, 1 = about to vanish
        ctx.strokeStyle = p1.color;
        ctx.globalAlpha = 1 - age;
        ctx.lineWidth = Math.max(1, 3 * (1 - age));
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }

      // the "head" — a small solid dot at the smoothed (eased) position,
      // replacing the default arrow with an always-visible marker
      if (haveMouse) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = currentColor(now);
        ctx.beginPath();
        ctx.arc(curX, curY, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Run everything once the page has loaded ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initScrollProgress();
    initSliders();
    initCursorTrail();
  });
})();
