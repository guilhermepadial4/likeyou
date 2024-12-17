const submitButton = document.getElementById("submitButton");
const emailSentMessage = document.getElementById("emailSentMessage");
const verificationContainer = document.getElementById("verificationContainer");
const verificationInput = document.getElementById("verificationCode");
const verifyButton = document.getElementById("verifyButton");
const emailInput = document.getElementById("email");
const verificationMessage = document.getElementById("verificationMessage");
const newPasswordGroup = document.getElementById("newPasswordGroup");
const confirmPasswordGroup = document.getElementById("confirmPasswordGroup");
const newPasswordInput = document.getElementById("newPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");

const emailError = document.createElement("p");
emailError.style.color = "#f03e3e";
emailError.style.fontSize = "14px";
emailError.style.marginTop = "2px";
emailError.style.marginBottom = "4px";
emailInput.insertAdjacentElement("afterend", emailError);

const passwordError = document.createElement("p");
passwordError.style.color = "#f03e3e";
passwordError.style.fontSize = "14px";
passwordError.style.marginTop = "2px";
passwordError.style.marginBottom = "4px";

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    emailError.textContent = "Por favor, preencha o campo de email.";
    emailInput.style.border = "2px solid #f03e3e";
    return;
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Por favor, insira um email válido.";
    emailInput.style.border = "2px solid #f03e3e";
    return;
  } else {
    emailError.textContent = "";
    emailInput.style.border = "";
  }

  verificationMessage.innerHTML = `Código de Verificação enviado para <span>${email}</span>`;
  emailSentMessage.textContent = "Um código foi enviado para o email fornecido.";
  verificationContainer.style.display = "flex";
  emailInput.disabled = true;
});

verifyButton.addEventListener("click", function (event) {
  event.preventDefault();

  const verificationCode = verificationInput.value;

  if (/^\d{4}$/.test(verificationCode)) {
    newPasswordGroup.style.display = "block";
    confirmPasswordGroup.style.display = "block";

    newPasswordInput.removeAttribute("disabled");
    confirmPasswordInput.removeAttribute("disabled");

    verificationInput.disabled = true;
    verifyButton.disabled = true;
  }
});

verificationInput.addEventListener("input", () => {
  verificationInput.value = verificationInput.value.replace(/\D/g, "");

  const inputValue = verificationInput.value;

  if (/^\d{4}$/.test(inputValue)) {
    verifyButton.disabled = false;
  } else {
    verifyButton.disabled = true;
  }
});

function togglePasswordVisibility() {
  const passwordInput = document.getElementById("newPassword");
  const eyeIcon = document.getElementById("eyeIcon");

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

function toggleConfirmPasswordVisibility() {
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const eyeIcon = document.getElementById("confirmEyeIcon");

  if (confirmPasswordInput.type === "password") {
    confirmPasswordInput.type = "text";
    eyeIcon.src = "./src/assets/icons/eye-open.svg";
    eyeIcon.alt = "Ocultar senha";
  } else {
    confirmPasswordInput.type = "password";
    eyeIcon.src = "./src/assets/icons/eye-close.svg";
    eyeIcon.alt = "Mostrar senha";
  }
}

function clearErrorMessages() {
  // Remove mensagens de erro, se existirem
  if (document.getElementById("passwordError1")) document.getElementById("passwordError1").remove();
  if (document.getElementById("passwordError2")) document.getElementById("passwordError2").remove();

  // Remove bordas vermelhas
  newPasswordInput.style.border = "";
  confirmPasswordInput.style.border = "";
}

// Adiciona evento para limpar erros enquanto o usuário digita
newPasswordInput.addEventListener("input", clearErrorMessages);
confirmPasswordInput.addEventListener("input", clearErrorMessages);

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  // Verifica se os inputs de senha estão visíveis
  if (newPasswordGroup.style.display === "block" && confirmPasswordGroup.style.display === "block") {
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    clearErrorMessages();

    // Criação dinâmica de mensagens de erro
    const passwordError1 = document.createElement("div");
    passwordError1.id = "passwordError1";
    passwordError1.style.fontSize = "14px";
    passwordError1.style.color = "#f03e3e";

    const passwordError2 = document.createElement("div");
    passwordError2.id = "passwordError2";
    passwordError2.style.fontSize = "14px";
    passwordError2.style.color = "#f03e3e";

    // Verifica se os campos estão preenchidos
    if (!newPassword || !confirmPassword) {
      passwordError1.textContent = "Por favor, preencha os campos de senha.";
      passwordError2.textContent = "Por favor, preencha os campos de senha.";

      newPasswordGroup.appendChild(passwordError1);
      confirmPasswordGroup.appendChild(passwordError2);

      newPasswordInput.style.border = "2px solid #f03e3e";
      confirmPasswordInput.style.border = "2px solid #f03e3e";
      return;
    }

    // Verifica se a senha tem pelo menos 8 caracteres
    if (newPassword.length < 8) {
      passwordError1.textContent = "A senha deve ter no mínimo 8 caracteres.";
      passwordError2.textContent = "A senha deve ter no mínimo 8 caracteres.";

      newPasswordGroup.appendChild(passwordError1);
      confirmPasswordGroup.appendChild(passwordError2);

      newPasswordInput.style.border = "2px solid #f03e3e";
      confirmPasswordInput.style.border = "2px solid #f03e3e";
      return;
    }

    // Verifica se as senhas são iguais
    if (newPassword !== confirmPassword) {
      passwordError1.textContent = "As senhas não são iguais.";
      passwordError2.textContent = "As senhas não são iguais.";

      newPasswordGroup.appendChild(passwordError1);
      confirmPasswordGroup.appendChild(passwordError2);

      newPasswordInput.style.border = "2px solid #f03e3e";
      confirmPasswordInput.style.border = "2px solid #f03e3e";
      return;
    }

    // Chama a função de sucesso
    showSuccessMessage();
  }
});

function showSuccessMessage() {
  const successMessage = document.getElementById("successMessage");
  const overlay = document.getElementById("overlay");
  successMessage.style.display = "block"; // Exibe a mensagem de sucesso
  overlay.style.display = "block"; // Exibe o fundo escuro
  document.body.classList.add("modal-open");
}

// Função para esconder a mensagem de sucesso (fechar o toggle)
document.getElementById("closeButton").addEventListener("click", function () {
  const successMessage = document.getElementById("successMessage");
  const overlay = document.getElementById("overlay");
  successMessage.style.display = "none"; // Esconde a mensagem de sucesso
  overlay.style.display = "none"; // Esconde o fundo escuro
  document.body.classList.remove("modal-open");
});

