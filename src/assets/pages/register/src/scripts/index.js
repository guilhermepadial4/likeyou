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

  function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.charAt(9))) {
      return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  }

  inputCpf.addEventListener("input", function () {
    let cpf = inputCpf.value.replace(/\D/g, "");

    if (cpf.length > 9) {
      cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})$/, "$1.$2.$3-$4");
    } else if (cpf.length > 6) {
      cpf = cpf.replace(/^(\d{3})(\d{3})(\d{0,3})$/, "$1.$2.$3");
    } else if (cpf.length > 3) {
      cpf = cpf.replace(/^(\d{3})(\d{0,3})$/, "$1.$2");
    }

    inputCpf.value = cpf;

    errorCpf.innerHTML = "";
    inputCpf.style.border = "";
  });

  submitBtn.addEventListener("click", function (event) {
    let cpf = inputCpf.value;

    if (!isValidCPF(cpf)) {
      event.preventDefault();
      errorCpf.innerHTML = "<p'>CPF inválido! Por favor, insira um CPF válido.</p>";
      inputCpf.style.border = "2px solid red";
    } else {
      errorCpf.innerHTML = "";
      inputCpf.style.border = "";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const inputPhone = document.getElementById("phoneInput");

  inputPhone.addEventListener("input", function () {
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
