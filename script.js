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

  const lightbox = document.querySelector("[data-lightbox]");
  if (!lightbox) {
    return;
  }

  const lightboxImage = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector("[data-lightbox-caption]");
  const closeButton = lightbox.querySelector("[data-lightbox-close]");
  const prevButton = lightbox.querySelector("[data-lightbox-prev]");
  const nextButton = lightbox.querySelector("[data-lightbox-next]");

  if (
    !lightboxImage ||
    !lightboxCaption ||
    !closeButton ||
    !prevButton ||
    !nextButton
  ) {
    return;
  }

  const galleryImages = Array.from(
    document.querySelectorAll(".gallery-item img"),
  );

  if (!galleryImages.length) {
    return;
  }

  let currentIndex = 0;

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
  };

  const showImageAt = (index) => {
    const normalizedIndex =
      (index + galleryImages.length) % galleryImages.length;
    const image = galleryImages[normalizedIndex];
    if (!image) {
      return;
    }

    const caption = image
      .closest("figure")
      ?.querySelector("figcaption")
      ?.textContent?.trim();

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "";
    lightboxCaption.textContent = caption || image.alt || "";
    currentIndex = normalizedIndex;
  };

  const openLightbox = (image) => {
    const index = galleryImages.indexOf(image);
    if (index === -1) {
      return;
    }

    showImageAt(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const showNext = () => {
    showImageAt(currentIndex + 1);
  };

  const showPrev = () => {
    showImageAt(currentIndex - 1);
  };

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) {
      return;
    }

    if (!target.closest(".gallery-item")) {
      return;
    }

    openLightbox(target);
  });

  closeButton.addEventListener("click", closeLightbox);
  nextButton.addEventListener("click", showNext);
  prevButton.addEventListener("click", showPrev);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
      return;
    }

    if (event.key === "ArrowRight") {
      showNext();
    }

    if (event.key === "ArrowLeft") {
      showPrev();
    }
  });
});
