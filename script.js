/* =============================================================================
   WILDBROOK BEVVY BURROS — Single behavior file
   Vanilla, no build, no deps. IIFE. Reduced-motion aware.
   ============================================================================= */

(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktopMQ = window.matchMedia("(min-width: 900px)");

  /* ---------- Sticky nav state -------------------------------------------- */
  const nav = document.getElementById("topnav");
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 24) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = nav.querySelector(".nav__toggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      nav.querySelectorAll(".nav__links a").forEach((a) => {
        a.addEventListener("click", () => {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* ---------- Hero title letter-split ------------------------------------- */
  document.querySelectorAll(".js-split").forEach((el) => {
    const html = el.innerHTML;
    el.innerHTML = "";
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const walk = (parent, target) => {
      parent.childNodes.forEach((node) => {
        if (node.nodeType === 3) {
          /* Split on whitespace — words get a no-break wrapper,
             spaces become real text nodes so the browser wraps
             only between words, never mid-word. */
          const segments = (node.textContent || "").split(/(\s+)/);
          segments.forEach((seg) => {
            if (/^\s+$/.test(seg)) {
              target.appendChild(document.createTextNode(" "));
            } else if (seg) {
              const wordWrap = document.createElement("span");
              wordWrap.className = "hero__split-word";
              for (const ch of seg) {
                const span = document.createElement("span");
                span.className = "hero__split-letter";
                span.textContent = ch;
                wordWrap.appendChild(span);
              }
              target.appendChild(wordWrap);
            }
          });
        } else if (node.nodeType === 1) {
          const clone = node.cloneNode(false);
          target.appendChild(clone);
          walk(node, clone);
        }
      });
    };
    walk(tmp, el);
    const letters = el.querySelectorAll(".hero__split-letter");
    letters.forEach((l, i) => {
      l.style.animationDelay = `${0.05 + i * 0.025}s`;
    });
  });

  /* ---------- Reveal-on-scroll ------------------------------------------- */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (reduced) {
      reveals.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }

  /* ---------- Number counters -------------------------------------------- */
  const counters = document.querySelectorAll(".counter");
  if (counters.length) {
    const animateCounter = (el) => {
      const target = parseFloat(el.getAttribute("data-counter") || "0");
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = target * eased;
        el.textContent = Number.isInteger(target)
          ? Math.round(value).toString()
          : value.toFixed(1);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (reduced) {
      counters.forEach((el) => {
        el.textContent = el.getAttribute("data-counter") || "0";
      });
    } else {
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              cio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach((el) => cio.observe(el));
    }
  }

  /* ---------- Flagship animal showcase ----------------------------------- */
  const rail = document.getElementById("showcase-rail");
  if (rail) {
    const panels = Array.from(rail.querySelectorAll(".showcase__panel"));
    const dots = Array.from(rail.querySelectorAll(".showcase__nav button"));
    const counterEl = document.getElementById("showcase-current");
    const totalPanels = panels.length;

    const setActive = (idx) => {
      panels.forEach((p, i) => {
        const active = i === idx;
        p.classList.toggle("is-active", active);
        p.setAttribute("aria-hidden", active ? "false" : "true");
      });
      dots.forEach((d, i) => {
        const active = i === idx;
        d.setAttribute("aria-pressed", String(active));
        d.setAttribute("aria-current", active ? "true" : "false");
      });
      if (counterEl) {
        counterEl.textContent = String(idx + 1).padStart(2, "0");
      }
    };

    let activeIdx = 0;

    /* Unified scroll-driven setup — works on both desktop and mobile.
       Desktop: 2-col panel. Mobile: top-image / bottom-copy panel.
       Both use the same sticky-viewport + tall-rail mechanism.       */
    const setupScrollDriven = () => {
      rail.style.setProperty("--showcase-panels", String(totalPanels));

      /* Cache each panel's parallax image element once */
      const mediaImgs = panels.map((p) =>
        p.querySelector(".showcase__media img, .showcase__media svg")
      );

      const onScroll = () => {
        const r = rail.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        if (total <= 0) return;

        const rawProgress = Math.min(1, Math.max(0, -r.top / total));
        const idx = Math.min(totalPanels - 1, Math.floor(rawProgress * totalPanels));

        if (idx !== activeIdx) {
          activeIdx = idx;
          setActive(idx);
        }

        /* Scroll-driven zoom: as you scroll through each panel's segment
           the image scales from 1.0 → 1.18, giving a push-in feel */
        if (!reduced) {
          const panelProgress = rawProgress * totalPanels - idx; // 0 to 1
          const scale = 1 + panelProgress * 0.18;
          const img = mediaImgs[idx];
          if (img) img.style.transform = `scale(${scale.toFixed(4)})`;
        }
      };

      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    };

    setupScrollDriven();

    /* Dot click: scroll to that panel's position in the rail ---------- */
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const idx = parseInt(dot.getAttribute("data-go") || "0", 10);
        const r = rail.getBoundingClientRect();
        const start = window.scrollY + r.top;
        const total = r.height - window.innerHeight;
        const target = start + (idx / totalPanels) * total + 4;
        window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
      });
    });

    /* Keyboard arrows while showcase is in view ----------------------- */
    document.addEventListener("keydown", (e) => {
      const r = rail.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.5 || r.bottom < window.innerHeight * 0.5) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        const next = Math.min(totalPanels - 1, activeIdx + 1);
        if (next !== activeIdx) { dots[next]?.click(); e.preventDefault(); }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        const prev = Math.max(0, activeIdx - 1);
        if (prev !== activeIdx) { dots[prev]?.click(); e.preventDefault(); }
      }
    });
  }

  /* ---------- Booking form: success animation ---------------------------- */
  const form = document.getElementById("booking-form");
  if (form) {
    const success = document.getElementById("booking-success");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("#bk-name");
      const email = form.querySelector("#bk-email");
      let valid = true;
      if (name && !name.value.trim()) {
        name.style.borderBottomColor = "#c66a3d";
        valid = false;
      }
      if (email && !/^\S+@\S+\.\S+$/.test(email.value.trim())) {
        email.style.borderBottomColor = "#c66a3d";
        valid = false;
      }
      if (!valid) return;
      if (success) {
        success.classList.add("is-visible");
      }
      form.querySelectorAll("input, textarea, select").forEach((el) => {
        if (el.type !== "submit") el.value = "";
      });
      const btn = form.querySelector(".booking__submit");
      if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = "<span>Inquiry sent</span><span class=\"btn__arrow\" aria-hidden=\"true\">✓</span>";
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML = original;
          btn.disabled = false;
          success && success.classList.remove("is-visible");
        }, 5500);
      }
    });

    form.querySelectorAll("input, textarea").forEach((el) => {
      el.addEventListener("input", () => {
        el.style.borderBottomColor = "";
      });
    });
  }

  /* ---------- Lightbox (animal profile galleries) ----------------------- */
  const galleryItems = document.querySelectorAll(".gallery__item");
  if (galleryItems.length) {
    let lightbox = document.querySelector(".lightbox");
    if (!lightbox) {
      lightbox = document.createElement("div");
      lightbox.className = "lightbox";
      lightbox.setAttribute("role", "dialog");
      lightbox.setAttribute("aria-modal", "true");
      lightbox.setAttribute("aria-label", "Image preview");
      lightbox.innerHTML =
        '<button class="lightbox__close" type="button" aria-label="Close preview">×</button>' +
        '<div class="lightbox__media"></div>';
      document.body.appendChild(lightbox);
    }
    const media = lightbox.querySelector(".lightbox__media");
    const closeBtn = lightbox.querySelector(".lightbox__close");

    const open = (item) => {
      const inner = item.innerHTML;
      media.innerHTML = inner;
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };
    const close = () => {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      media.innerHTML = "";
    };

    galleryItems.forEach((item) => {
      item.setAttribute("tabindex", "0");
      item.addEventListener("click", () => open(item));
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(item);
        }
      });
    });
    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) close();
    });
  }

  /* ---------- Hero photo slideshow --------------------------------------- */
  const heroImgs = Array.from(document.querySelectorAll(".hero__photo img"));
  if (heroImgs.length > 1) {
    let current = 0;
    const cycle = () => {
      heroImgs[current].classList.remove("is-active");
      current = (current + 1) % heroImgs.length;
      heroImgs[current].classList.add("is-active");
    };
    /* 4 500ms = ~3.5s fully visible + ~1s crossfade (CSS transition) */
    setInterval(cycle, 3200);
  }

  /* ---------- Hero parallax (mobile only) -------------------------------- */
  const heroPhoto = document.querySelector(".hero__photo");
  if (heroPhoto && !reduced) {
    const mobileMQ = window.matchMedia("(max-width: 720px)");
    let ticking = false;

    const applyParallax = () => {
      if (!mobileMQ.matches) {
        heroPhoto.style.transform = "";
        return;
      }
      const scrolled = window.scrollY;
      /* Photo translates DOWN by 35% of scroll distance, making it
         appear to move UP more slowly than the page — classic parallax */
      heroPhoto.style.transform = `translateY(${scrolled * 0.35}px)`;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          applyParallax();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    /* Reset on orientation / resize */
    window.addEventListener("resize", applyParallax, { passive: true });
    applyParallax();
  }

  /* ---------- Animal profile sticky CTA --------------------------------- */
  const stickyCta = document.querySelector(".animal__sticky-cta");
  if (stickyCta) {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) {
        stickyCta.classList.add("is-visible");
      } else {
        stickyCta.classList.remove("is-visible");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
