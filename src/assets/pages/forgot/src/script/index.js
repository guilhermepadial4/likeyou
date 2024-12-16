// Seleciona os elementos
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

// Adiciona elemento para exibir erros de email
const emailError = document.createElement("p");
emailError.style.color = "red";
emailError.style.fontSize = "14px";
emailError.style.marginTop = "2px";
emailError.style.marginBottom = "4px";
emailInput.insertAdjacentElement("afterend", emailError);

// Função para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Adiciona evento ao botão "Enviar"
submitButton.addEventListener("click", function (event) {
  event.preventDefault(); // Impede o envio do formulário e a atualização da página

  // Captura o valor do email
  const email = emailInput.value.trim();

  // Verifica se o email é válido
  if (!email) {
    emailError.textContent = "Por favor, preencha o campo de email.";
    emailInput.style.border = "2px solid red"; // Borda vermelha
    return;
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Por favor, insira um email válido.";
    emailInput.style.border = "2px solid green"; // Borda vermelha
    return;
  } else {
    emailError.textContent = ""; // Limpa a mensagem de erro
    emailInput.style.border = ""; // Remove a borda vermelha
  }

  // Atualiza o parágrafo com o email
  verificationMessage.innerHTML = `Código de Verificação enviado para <span>${email}</span>`;

  // Atualiza o parágrafo para informar que o código foi enviado
  emailSentMessage.textContent = "Um código foi enviado para o email fornecido.";

  // Exibe o campo de verificação e o botão "Verificar"
  verificationContainer.style.display = "flex";

  // Desabilita o campo de email
  emailInput.disabled = true;
});

// Adiciona evento ao botão "Verificar"
verifyButton.addEventListener("click", function (event) {
  event.preventDefault(); // Impede o envio do formulário e a atualização da página

  const verificationCode = verificationInput.value;

  // Se o código de verificação tiver exatamente 4 números
  if (/^\d{4}$/.test(verificationCode)) {
    // Exibe os campos de nova senha e confirmação
    newPasswordGroup.style.display = "block";
    confirmPasswordGroup.style.display = "block";

    // Habilita os campos de senha
    newPasswordInput.removeAttribute("disabled");
    confirmPasswordInput.removeAttribute("disabled");

    // Desabilita o campo de código e o botão de verificação
    verificationInput.disabled = true;
    verifyButton.disabled = true;
  }
});

// Adiciona evento para o input de verificação
verificationInput.addEventListener("input", () => {
  // Remove caracteres não numéricos
  verificationInput.value = verificationInput.value.replace(/\D/g, "");

  const inputValue = verificationInput.value;

  // Verifica se o input tem exatamente 4 números
  if (/^\d{4}$/.test(inputValue)) {
    verifyButton.disabled = false; // Habilita o botão
  } else {
    verifyButton.disabled = true; // Desabilita o botão
  }
});

// Função para alternar a visibilidade da nova senha
function togglePasswordVisibility() {
  const passwordInput = document.getElementById("newPassword");
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

// Função para alternar a visibilidade da senha de confirmação
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

// Adiciona evento para os inputs de senha para habilitar o botão "Enviar"
newPasswordInput.addEventListener("input", checkPasswords);
confirmPasswordInput.addEventListener("input", checkPasswords);

function checkPasswords() {
  if (newPasswordInput.value && confirmPasswordInput.value) {
    submitButton.disabled = false; // Habilita o botão "Enviar"
  } else {
    submitButton.disabled = true; // Desabilita o botão "Enviar"
  }
}

// Função para redirecionar para a tela de login após o envio
submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  if (newPasswordInput.value && confirmPasswordInput.value) {
    // Aqui você pode redirecionar para a página de login
    window.location.href = "/src/assets/pages/login/index.html";
  }
});
