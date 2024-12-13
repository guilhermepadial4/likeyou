function activateButton(index) {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button, i) => {
    button.classList.toggle("active", i === index);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");

  if (![...buttons].some((button) => button.classList.contains("active"))) {
    activateButton(0);
  }
});
