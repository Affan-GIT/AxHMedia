const carousal = document.getElementById("carousal");
const carousalDots = document.getElementById("carousal-dots");

let intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      carousal.dataset.currIndex = entry.target.dataset.index;
    }
  });
});

for (const child of carousal.children) {
  intersectionObserver.observe(child);
}

const config = { attributes: true, childList: false, subtree: false };

let mutationObserver = new MutationObserver((mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.attributeName === "data-curr-index") {
      Array.from(carousalDots.children).forEach((dot, index) => {
        if (index == carousal.dataset.currIndex) {
          dot.classList.add("bg-gray");
          dot.classList.remove("bg-lightGray");
        } else {
          dot.classList.remove("bg-gray");
          dot.classList.add("bg-lightGray");
        }
      });
    }
  }
});

mutationObserver.observe(carousal, config);

const scrollCarousal = (direction) => {
  carousal.scrollBy({
    left: direction * 100,
    behavior: "smooth",
  });
};

document
  .querySelector("[data-carousal-button-left]")
  .addEventListener("click", () => scrollCarousal(-1));

document
  .querySelector("[data-carousal-button-right]")
  .addEventListener("click", () => scrollCarousal(1));
