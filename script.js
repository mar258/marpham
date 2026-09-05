(() => {
  const sections = [...document.querySelectorAll("main .section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const dots = [...document.querySelectorAll(".dot")];
  const dotItems = [...document.querySelectorAll(".dot-item")];
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const backdrop = document.querySelector(".nav-backdrop");
  const reveals = [...document.querySelectorAll(".reveal")];

  function setActiveSection(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.section === id);
    });
    dots.forEach((dot) => {
      dot.classList.toggle("is-active", dot.dataset.section === id);
    });
    dotItems.forEach((item) => {
      item.classList.toggle("is-active", item.dataset.section === id);
    });
  }

  function closeMobileNav() {
    document.body.classList.remove("nav-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }
    if (mobileNav) mobileNav.setAttribute("hidden", "");
    if (backdrop) backdrop.setAttribute("hidden", "");
  }

  function openMobileNav() {
    document.body.classList.add("nav-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close navigation");
    }
    if (mobileNav) mobileNav.removeAttribute("hidden");
    if (backdrop) backdrop.removeAttribute("hidden");
  }

  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActiveSection(id);
    closeMobileNav();
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      event.preventDefault();
      scrollToSection(link.dataset.section || href.slice(1));
    });
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      if (dot.dataset.section) scrollToSection(dot.dataset.section);
    });
  });

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (document.body.classList.contains("nav-open")) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeMobileNav);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileNav();
  });

  if (sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  requestAnimationFrame(() => {
    document
      .querySelectorAll("#about .reveal")
      .forEach((el) => el.classList.add("is-visible"));
  });

  const plantsRoot = document.querySelector(".scroll-plants");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const PLANT_CONFIGS = [
    {
      side: "left",
      x: "0.4rem",
      height: 0.78,
      delay: 0.02,
      stem: "#3d6b4f",
      leaf: "#5a8f6c",
      petalA: "#7eb89a",
      petalB: "#5fa87f",
      core: "#2d5a40",
      center: "#e8f5e9",
    },
    {
      side: "left",
      x: "3.6rem",
      height: 1.18,
      delay: 0.1,
      stem: "#1b4332",
      leaf: "#2d6a4f",
      petalA: "#40916c",
      petalB: "#52b788",
      core: "#081c15",
      center: "#d8f3dc",
    },
    {
      side: "left",
      x: "7.1rem",
      height: 0.92,
      delay: 0.18,
      stem: "#4a6b3a",
      leaf: "#6b8f52",
      petalA: "#a3c96b",
      petalB: "#86b04a",
      core: "#3d5a2a",
      center: "#f1f8e9",
    },
    {
      side: "right",
      x: "0.5rem",
      height: 1.05,
      delay: 0.06,
      stem: "#245b4a",
      leaf: "#3d7a68",
      petalA: "#5dade2",
      petalB: "#3498db",
      core: "#1a5276",
      center: "#ebf5fb",
    },
    {
      side: "right",
      x: "4rem",
      height: 0.72,
      delay: 0.14,
      stem: "#556b2f",
      leaf: "#6b8e23",
      petalA: "#c9a227",
      petalB: "#e6b422",
      core: "#7a5c12",
      center: "#fff8e1",
    },
    {
      side: "right",
      x: "7.4rem",
      height: 1.28,
      delay: 0,
      stem: "#2d6a4f",
      leaf: "#40916c",
      petalA: "#95d5b2",
      petalB: "#74c69d",
      core: "#1b4332",
      center: "#d8f3dc",
    },
  ];

  function plantMarkup() {
    return `
      <svg class="scroll-plant-svg" viewBox="0 0 120 280" xmlns="http://www.w3.org/2000/svg" fill="none">
        <path class="plant-stem" d="M60 262 C58 230 62 200 58 168 C54 136 64 110 60 78 C57 52 61 32 60 18" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" fill="none" />
        <g class="plant-leaf plant-leaf-1">
          <path d="M58 210 C42 204 28 192 24 176 C38 178 50 190 58 210Z" opacity="0.55" />
        </g>
        <g class="plant-leaf plant-leaf-2">
          <path d="M60 178 C76 172 92 158 98 140 C84 144 70 158 60 178Z" opacity="0.7" />
        </g>
        <g class="plant-leaf plant-leaf-3">
          <path d="M57 132 C40 124 26 108 22 90 C38 96 50 112 57 132Z" opacity="0.6" />
        </g>
        <g class="plant-leaf plant-leaf-4">
          <path d="M61 96 C78 88 94 72 100 52 C84 58 70 76 61 96Z" opacity="0.75" />
        </g>
        <g class="plant-bloom">
          <circle class="bloom-core" cx="60" cy="14" r="5.5" opacity="0.85" />
          <ellipse class="petal-a" cx="60" cy="4" rx="5" ry="7" opacity="0.95" />
          <ellipse class="petal-b" cx="60" cy="4" rx="5" ry="7" opacity="0.95" transform="rotate(72 60 14)" />
          <ellipse class="petal-a" cx="60" cy="4" rx="5" ry="7" opacity="0.95" transform="rotate(144 60 14)" />
          <ellipse class="petal-b" cx="60" cy="4" rx="5" ry="7" opacity="0.95" transform="rotate(216 60 14)" />
          <ellipse class="petal-a" cx="60" cy="4" rx="5" ry="7" opacity="0.95" transform="rotate(288 60 14)" />
          <circle class="bloom-center" cx="60" cy="14" r="3.2" />
        </g>
      </svg>
    `;
  }

  const plantStems = [];

  function initPlants() {
    if (!plantsRoot) return;

    PLANT_CONFIGS.forEach((config) => {
      const el = document.createElement("div");
      el.className = "scroll-plant";
      el.dataset.side = config.side;
      el.style.setProperty("--x", config.x);
      el.style.setProperty("--height", String(config.height));
      el.style.setProperty("--delay", String(config.delay));
      el.style.setProperty("--stem", config.stem);
      el.style.setProperty("--leaf", config.leaf);
      el.style.setProperty("--petal-a", config.petalA);
      el.style.setProperty("--petal-b", config.petalB);
      el.style.setProperty("--core", config.core);
      el.style.setProperty("--center", config.center);
      el.innerHTML = plantMarkup();
      plantsRoot.appendChild(el);

      const stem = el.querySelector(".plant-stem");
      if (stem) {
        const length = stem.getTotalLength();
        stem.style.strokeDasharray = `${length}`;
        stem.style.strokeDashoffset = `${length}`;
        plantStems.push({
          stem,
          length,
          delay: config.delay,
        });
      }
    });

    plantsRoot.classList.add("is-ready");
  }

  function localGrow(grow, delay) {
    if (delay >= 1) return grow >= 1 ? 1 : 0;
    return Math.min(1, Math.max(0, (grow - delay) / (1 - delay)));
  }

  function updatePlantGrowth() {
    if (!plantsRoot) return;

    if (reduceMotion.matches) {
      plantsRoot.style.setProperty("--grow", "1");
      plantStems.forEach(({ stem }) => {
        stem.style.strokeDashoffset = "0";
      });
      return;
    }

    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const grow = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    plantsRoot.style.setProperty("--grow", grow.toFixed(4));

    plantStems.forEach(({ stem, length, delay }) => {
      const progress = localGrow(grow, delay);
      stem.style.strokeDashoffset = `${length * (1 - progress)}`;
    });
  }

  initPlants();
  updatePlantGrowth();

  let plantRaf = 0;
  window.addEventListener(
    "scroll",
    () => {
      if (plantRaf) return;
      plantRaf = requestAnimationFrame(() => {
        plantRaf = 0;
        updatePlantGrowth();
      });
    },
    { passive: true }
  );

  window.addEventListener("resize", updatePlantGrowth, { passive: true });
  reduceMotion.addEventListener("change", updatePlantGrowth);
})();
