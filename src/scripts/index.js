function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const toggleButton = document.querySelector(".toggle-btn");

  menu.classList.toggle("active");

  toggleButton.classList.toggle("active");
}

document.addEventListener("click", function (event) {
  const menu = document.getElementById("mobileMenu");
  const toggleButton = document.querySelector(".toggle-btn");

  if (!toggleButton.contains(event.target) && !menu.contains(event.target)) {
    menu.classList.remove("active");
    toggleButton.classList.remove("active");
  }
});

function toggleSearchInput() {
  const searchIcon = document.querySelector(".search__icon");
  const searchInput = document.querySelector(".input__search");

  if (searchInput.classList.contains("active")) {
    searchIcon.classList.remove("active");
    searchInput.classList.remove("active");
  } else {
    searchIcon.classList.add("active");
    searchInput.classList.add("active");
  }

  searchInput.focus();
}

document.addEventListener("DOMContentLoaded", () => {
  window.handleLike = (button) => {
    const likeCountSpan = button.querySelector(".like__count");
    let count = parseInt(likeCountSpan.textContent, 10);
    likeCountSpan.textContent = count + 1;
  };

  window.handleDislike = (button) => {
    const dislikeCountSpan = button.querySelector(".dislike__count");
    let count = parseInt(dislikeCountSpan.textContent, 10);
    dislikeCountSpan.textContent = count + 1;
  };
});
