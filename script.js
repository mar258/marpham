(() => {
  const sections = [...document.querySelectorAll("main .section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const dots = [...document.querySelectorAll(".dot")];
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
})();
