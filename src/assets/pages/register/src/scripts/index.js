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

document.addEventListener("DOMContentLoaded", function () {
  const inputCpf = document.getElementById("cpfInput");
  const errorCpf = document.querySelector(".error__cpf");
  const submitBtn = document.getElementById("submitBtn");

  // Função para limpar o erro
  function clearCpfError() {
    errorCpf.innerHTML = "";
    inputCpf.style.border = "";
  }

  // Máscara de CPF
  inputCpf.addEventListener("input", function () {
    let cpf = inputCpf.value.replace(/\D/g, "");

    // Aplicando a máscara de CPF
    if (cpf.length > 9) {
      cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})$/, "$1.$2.$3-$4");
    } else if (cpf.length > 6) {
      cpf = cpf.replace(/^(\d{3})(\d{3})(\d{0,3})$/, "$1.$2.$3");
    } else if (cpf.length > 3) {
      cpf = cpf.replace(/^(\d{3})(\d{0,3})$/, "$1.$2");
    }

    inputCpf.value = cpf;

    // Limpa o erro se o usuário começar a digitar
    clearCpfError();
  });

  // Evento de clique para o botão de envio
  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let allFieldsValid = true;

    // Valida CPF
    if (!isValidCPF(inputCpf.value)) {
      allFieldsValid = false;
      errorCpf.innerHTML = "<p class='input-error'>CPF inválido! Por favor, insira um CPF válido.</p>";
      inputCpf.style.border = "2px solid red";
    } else {
      errorCpf.innerHTML = "";
      inputCpf.style.border = "";
    }

    // Validação de outros campos, como email e telefone
    inputFields.forEach((field) => {
      const input = document.getElementById(field.id);
      if (!input) return;
      const parentGroup = input.closest(".form__group");
      clearError(input);

      if (!input.value.trim()) {
        allFieldsValid = false;
        const errorMsg = document.createElement("span");
        errorMsg.className = "input-error";
        errorMsg.textContent = field.emptyMessage;
        parentGroup.appendChild(errorMsg);
        input.style.border = "2px solid red";
      } else if (field.id === "email" && !isValidEmail(input.value)) {
        allFieldsValid = false;
        const errorMsg = document.createElement("span");
        errorMsg.className = "input-error";
        errorMsg.textContent = field.invalidMessage;
        parentGroup.appendChild(errorMsg);
        input.style.border = "2px solid red";
      } else if (field.id === "phoneInput" && !isValidPhone(input.value)) {
        allFieldsValid = false;
        const errorMsg = document.createElement("span");
        errorMsg.className = "input-error";
        errorMsg.textContent = field.invalidMessage;
        parentGroup.appendChild(errorMsg);
        input.style.border = "2px solid red";
      }
    });

    if (allFieldsValid) {
      console.log("Formulário válido!");
    }
  });

  // Função de validação do CPF
  function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0,
      remainder;

    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;

    return remainder === parseInt(cpf.charAt(10));
  }

  // Função de validação de email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Função de validação de telefone
  function isValidPhone(phone) {
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
  }

  // Limpar erro de outros campos
  function clearError(input) {
    if (!input) return;
    const parentGroup = input.closest(".form__group");
    if (!parentGroup) return;
    const existingError = parentGroup.querySelector(".input-error");
    if (existingError) existingError.remove();
    input.style.border = "";
  }

  // Validação de campos de outros tipos
  const inputFields = [
    { id: "name", emptyMessage: "Por favor, preencha seu nome." },
    { id: "email", emptyMessage: "Por favor, preencha seu email.", invalidMessage: "E-mail inválido!" },
    { id: "phoneInput", emptyMessage: "Por favor, preencha seu celular.", invalidMessage: "Número de telefone inválido!" },
    { id: "password", emptyMessage: "Por favor, preencha sua senha." },
  ];

  inputFields.forEach((field) => {
    const input = document.getElementById(field.id);
    if (!input) return;

    input.addEventListener("input", function () {
      clearError(input);
    });
  });

  // Máscara de telefone
  const inputPhone = document.getElementById("phoneInput");

  inputPhone.addEventListener("input", function () {
    clearError(inputPhone);
    let phone = inputPhone.value.replace(/\D/g, "");

    if (phone.length > 10) {
      phone = phone.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (phone.length > 6) {
      phone = phone.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (phone.length > 2) {
      phone = phone.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
    } else if (phone.length > 0) {
      phone = phone.replace(/^(\d{0,2})$/, "($1");
    }

    inputPhone.value = phone;
  });
});
