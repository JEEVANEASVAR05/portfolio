
// ========================================
// JEEVANEASVAR - PORTFOLIO INTERACTIONS
// ========================================

// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
            menuToggle.textContent = "☰";
        });
    });

    document.addEventListener("click", function (event) {
        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
            menuToggle.textContent = "☰";
        }
    });
}


// 2. PROJECT FILTERING

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(function (item) {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        projectCards.forEach(function (card) {
            const category = card.dataset.category;

            card.hidden = !(
                selectedFilter === "all" ||
                category === selectedFilter
            );
        });
    });
});


// 3. AUTOMATIC FOOTER YEAR

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// 4. SCROLL REVEAL ANIMATIONS

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealElements.forEach(function (element, index) {
        element.style.transitionDelay = `${(index % 4) * 70}ms`;
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}


// 5. ACTIVE NAVIGATION WHILE SCROLLING

const pageSections = document.querySelectorAll("main section[id]");
const navigationItems = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;

                    navigationItems.forEach(function (link) {
                        const isActive =
                            link.getAttribute("href") === `#${sectionId}`;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px",
            threshold: 0
        }
    );

    pageSections.forEach(function (section) {
        sectionObserver.observe(section);
    });
}
