document.documentElement.classList.add("js-ready");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Deschide meniul");
  navigation.classList.remove("is-open");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Deschide meniul" : "Închide meniul");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

const bookingForm = document.querySelector("#booking-form");
const bookingStatus = document.querySelector("#booking-status");
const bookingDate = document.querySelector("#booking-date");

if (bookingDate) {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  bookingDate.min = today.toISOString().slice(0, 10);
}

if (bookingForm && bookingStatus) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!bookingForm.reportValidity()) return;

    const formData = new FormData(bookingForm);
    const guestName = formData.get("name").toString().trim();
    const vehicle = formData.get("vehicle").toString().trim();
    bookingStatus.textContent = `Mulțumim, ${guestName}! Cererea demonstrativă pentru ${vehicle} a fost afișată local; nu a fost trimisă către un service.`;
    bookingForm.reset();
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}