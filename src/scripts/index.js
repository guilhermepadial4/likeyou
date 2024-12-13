function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const toggleButton = document.querySelector(".toggle-btn");

  // Alterna a visibilidade do menu
  menu.classList.toggle("active");

  // Alterna a classe para o ícone aberto/fechado
  toggleButton.classList.toggle("active");
}

// Fecha o menu se o usuário clicar fora do menu ou do botão
document.addEventListener("click", function (event) {
  const menu = document.getElementById("mobileMenu");
  const toggleButton = document.querySelector(".toggle-btn");

  // Verifica se o clique foi fora do menu e do botão de toggle
  if (!toggleButton.contains(event.target) && !menu.contains(event.target)) {
    menu.classList.remove("active"); // Fecha o menu
    toggleButton.classList.remove("active"); // Restaura o ícone
  }
});

function toggleSearchInput() {
  const searchIcon = document.querySelector(".search__icon");
  const searchInput = document.querySelector(".input__search");

  // Adicionar ou remover a classe 'active' de forma condicional
  if (searchInput.classList.contains("active")) {
    searchIcon.classList.remove("active");
    searchInput.classList.remove("active");
  } else {
    searchIcon.classList.add("active");
    searchInput.classList.add("active");
  }

  searchInput.focus();
}
