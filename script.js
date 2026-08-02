(() => {
  const sections = [...document.querySelectorAll("main .section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const reveals = [...document.querySelectorAll(".reveal")];

  function setActiveSection(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.section === id);
    });
  }

  function closeMobileNav() {
    document.body.classList.remove("nav-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }
    if (mobileNav) {
      mobileNav.setAttribute("hidden", "");
    }
  }

  function openMobileNav() {
    document.body.classList.add("nav-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close navigation");
    }
    if (mobileNav) {
      mobileNav.removeAttribute("hidden");
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
      setActiveSection(link.dataset.section);
      closeMobileNav();
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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileNav();
  });

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
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // Show hero reveals immediately on load
  requestAnimationFrame(() => {
    document
      .querySelectorAll(".hero .reveal")
      .forEach((el) => el.classList.add("is-visible"));
  });
})();
