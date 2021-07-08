const hamburgerIconContainerEl = document.getElementById("hamburgerMenu");
const closeIconContainerEl = document.getElementById("closeMenu");

const mobileNavItemsContainerEl = document.getElementById(
  "mobileNavItemsContainer"
);
const hideClass = "hide";

const toggleHiddenElements = () => {
  hamburgerIconContainerEl.classList.toggle(hideClass);
  closeIconContainerEl.classList.toggle(hideClass);
  mobileNavItemsContainerEl.classList.toggle(hideClass);
};

hamburgerIconContainerEl.addEventListener("click", toggleHiddenElements);
closeIconContainerEl.addEventListener("click", toggleHiddenElements);
