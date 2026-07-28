(function () {
  const header = document.querySelector("[data-header]");
  const menu = document.querySelector("[data-menu]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const params = new URLSearchParams(window.location.search);
  const sent = params.get("sent");
  const subscribed = params.get("subscribed");
  const error = params.get("error");

  function updateHeader() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 18);
  }

  function closeMenu() {
    if (!menu || !menuToggle) return;
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  if (menu && menuToggle) {
    menuToggle.addEventListener("click", function () {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menu.classList.toggle("open", !isOpen);
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      document.body.classList.toggle("menu-open", !isOpen);
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const route = window.location.pathname.split("/").filter(Boolean)[0] || "home";
  document.querySelectorAll("[data-nav]").forEach(function (link) {
    if (link.dataset.nav === route) link.setAttribute("aria-current", "page");
  });

  const revealItems = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) { item.classList.add("visible"); });
  } else {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -32px" });

    revealItems.forEach(function (item, index) {
      item.style.transitionDelay = Math.min(index % 4, 3) * 60 + "ms";
      observer.observe(item);
    });
  }

  function showMessage(text, type) {
    const status = document.querySelector("[data-form-status]");
    if (!status) return;
    status.hidden = false;
    status.className = "form-status " + (type === "error" ? "form-status-error" : "form-status-success");
    status.textContent = text;
  }

  if (sent === "1") showMessage("Thank you for your message. We’ll be in touch soon.", "success");
  if (subscribed === "1") showMessage("Thanks—DTB will let you know when new insights are published.", "success");
  if (error) showMessage(decodeURIComponent(error), "error");

  document.querySelectorAll("[data-faq-button]").forEach(function (button) {
    button.addEventListener("click", function () {
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });

  const formStarted = document.querySelector("[data-form-started]");
  if (formStarted) formStarted.value = String(Date.now());
})();
