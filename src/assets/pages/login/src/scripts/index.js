function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eye-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.src = "./src/assets/icons/eye-open.svg";
    eyeIcon.alt = "Ocultar senha";
  } else {
    passwordInput.type = "password";
    eyeIcon.src = "./src/assets/icons/eye-close.svg";
    eyeIcon.alt = "Mostrar senha";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitButton = document.querySelector("button[type='submit']");

  const emailMessage = document.querySelector(".email__error");
  const passwordMessage = document.querySelector(".password__error");

  emailInput.addEventListener("input", () => {
    if (emailMessage) {
      emailMessage.textContent = "";
    }
    emailInput.style.border = "";
  });

  passwordInput.addEventListener("input", () => {
    if (passwordMessage) {
      passwordMessage.textContent = "";
    }
    passwordInput.style.border = "";
  });

  submitButton.addEventListener("click", (event) => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    if (email === "") {
      isValid = false;
      event.preventDefault();
      emailInput.style.border = "2px solid red";
      emailMessage.textContent = "Por favor, insira seu e-mail.";
    } else if (!emailRegex.test(email)) {
      isValid = false;
      event.preventDefault();
      emailInput.style.border = "2px solid red";
      emailMessage.textContent = "Por favor, insira um e-mail válido.";
    }

    if (password === "") {
      isValid = false;
      event.preventDefault();
      passwordInput.style.border = "2px solid red";
      passwordMessage.textContent = "Por favor, insira sua senha.";
    }

    if (isValid) {
      emailInput.style.border = "";
      passwordInput.style.border = "";
    }
  });
});
