document.addEventListener("DOMContentLoaded", () => {
  const active = document.body.dataset.active;
  if (!active) return;

  const link = document.querySelector(`[data-nav="${active}"]`);
  if (link) {
    link.classList.add("active");
  }

  const currentYear = document.querySelector("[data-current-year]");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
