// Mobile navigation
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    document.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });

    // Project filter
    const filterButtons = document.querySelectorAll(".filter-button");
    const projectCards = document.querySelectorAll(".project-card");
    const projectCount = document.getElementById("project-count");

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const filter = button.dataset.filter;
        let visibleCount = 0;

        filterButtons.forEach(function (item) {
          const active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });

        projectCards.forEach(function (card) {
          const shouldShow = filter === "all" || card.dataset.category === filter;
          card.hidden = !shouldShow;
          if (shouldShow) visibleCount++;
        });

        projectCount.textContent = String(visibleCount).padStart(2, "0") + " projects";
      });
    });

    // Footer year
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Reveal-on-scroll animation
    document.body.classList.add("js-ready");
    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });

      revealItems.forEach(function (item) { observer.observe(item); });
    } else {
      revealItems.forEach(function (item) { item.classList.add("visible"); });
    }

    // Active section navigation
    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".nav-link");

    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navItems.forEach(function (link) {
              link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
            });
          }
        });
      }, { rootMargin: "-30% 0px -60% 0px" });

      sections.forEach(function (section) { sectionObserver.observe(section); });
    }

    // Back-to-top
    const backTop = document.getElementById("back-top");
    window.addEventListener("scroll", function () {
      backTop.classList.toggle("show", window.scrollY > 350);
    }, { passive: true });

    // Typing animation
    const typingText = document.getElementById("typing-text");
    if (typingText) {
      const words = ["Web Developer", "Programmer", "Problem Solver", "Future Software Engineer"];
      let wordIndex = 0;
      let charIndex = words[0].length;
      let deleting = false;

      function typeWords() {
        const currentWord = words[wordIndex];
        if (deleting) {
          charIndex--;
          typingText.textContent = currentWord.slice(0, charIndex);
        } else {
          charIndex++;
          typingText.textContent = currentWord.slice(0, charIndex);
        }

        let delay = deleting ? 45 : 85;
        if (!deleting && charIndex === currentWord.length) {
          deleting = true;
          delay = 1200;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          delay = 300;
        }
        setTimeout(typeWords, delay);
      }
      setTimeout(typeWords, 1200);
    }

    // Time-based greeting
    function updateGreeting() {
      const greeting = document.getElementById("live-greeting");
      if (!greeting) return;
      const hour = new Date().getHours();
      if (hour < 12) greeting.textContent = "Good morning! Welcome to my portfolio.";
      else if (hour < 17) greeting.textContent = "Good afternoon! Welcome to my portfolio.";
      else greeting.textContent = "Good evening! Welcome to my portfolio.";
    }
    updateGreeting();

    // Scroll progress
    const progressBar = document.getElementById("scroll-progress");
    function updateScrollProgress() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progressBar.style.width = progress + "%";
    }
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    updateScrollProgress();

    // Theme switcher
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", function () {
      const isLight = document.body.classList.toggle("light-theme");
      themeToggle.textContent = isLight ? "☾" : "☀";
      themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    });

    // Smooth custom cursor
    const cursorRing = document.querySelector(".cursor-ring");
    const cursorDot = document.querySelector(".cursor-dot");
    if (cursorRing && cursorDot && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
      document.addEventListener("mousemove", function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";
      });
      function moveCursorRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.left = ringX + "px";
        cursorRing.style.top = ringY + "px";
        requestAnimationFrame(moveCursorRing);
      }
      moveCursorRing();
      document.querySelectorAll("a,button").forEach(function (element) {
        element.addEventListener("mouseenter", function () { cursorRing.classList.add("cursor-active"); });
        element.addEventListener("mouseleave", function () { cursorRing.classList.remove("cursor-active"); });
      });
    }

    // Project 3D tilt (desktop)
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      document.querySelectorAll(".project-card").forEach(function (card) {
        card.addEventListener("mousemove", function (event) {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;
          const rotateY = (x - 0.5) * 8;
          const rotateX = (0.5 - y) * 8;
          card.style.transform = "perspective(800px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-5px)";
        });
        card.addEventListener("mouseleave", function () { card.style.transform = ""; });
      });
    }


    // Click a project card to open its details in a popup
    const projectModal = document.getElementById("project-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalNumber = document.getElementById("modal-number");
    const modalDescription = document.getElementById("modal-description");
    const modalTags = document.getElementById("modal-tags");
    const modalOpenLink = document.getElementById("modal-open-link");
    let lastFocusedElement = null;

    function openProjectPopup(card) {
      const title = card.querySelector(".project-body h3");
      const description = card.querySelector(".project-body p");
      const number = card.querySelector(".project-number");
      const liveLink = card.querySelector(".project-link");
      if (!title || !description || !liveLink) return;
      lastFocusedElement = document.activeElement;
      modalTitle.textContent = title.textContent;
      modalNumber.textContent = number ? number.textContent : "PROJECT DETAILS";
      modalDescription.textContent = description.textContent;
      modalTags.replaceChildren();
      card.querySelectorAll(".project-tags span").forEach(function (tag) {
        const chip = document.createElement("span");
        chip.textContent = tag.textContent;
        modalTags.appendChild(chip);
      });
      modalOpenLink.href = liveLink.href;
      projectModal.classList.add("is-open");
      projectModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      projectModal.querySelector(".modal-close").focus();
    }

    function closeProjectPopup() {
      projectModal.classList.remove("is-open");
      projectModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      if (lastFocusedElement) lastFocusedElement.focus();
    }

    document.querySelectorAll(".project-card").forEach(function (card) {
      card.addEventListener("click", function (event) {
        if (event.target.closest("a")) event.preventDefault();
        openProjectPopup(card);
      });
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Open details for " + (card.querySelector("h3")?.textContent || "project"));
      card.addEventListener("keydown", function (event) {
        if ((event.key === "Enter" || event.key === " ") && event.target === card) {
          event.preventDefault();
          openProjectPopup(card);
        }
      });
    });

    projectModal.querySelectorAll("[data-modal-close]").forEach(function (element) {
      element.addEventListener("click", closeProjectPopup);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && projectModal.classList.contains("is-open")) closeProjectPopup();
    });
