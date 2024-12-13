function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eye-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.src = "./src/assets/icons/eye-close.svg";
    eyeIcon.alt = "Ocultar senha";
  } else {
    passwordInput.type = "password";
    eyeIcon.src = "./src/assets/icons/eye-open.svg";
    eyeIcon.alt = "Mostrar senha";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const inputCpf = document.getElementById("cpfInput");

  inputCpf.addEventListener("input", function () {
    let cpf = inputCpf.value.replace(/\D/g, "");

    if (cpf.length > 9) {
      cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})$/, "$1.$2.$3-$4");
    } else if (cpf.length > 6) {
      cpf = cpf.replace(/^(\d{3})(\d{3})(\d{0,3})$/, "$1.$2.$3");
    } else if (cpf.length > 3) {
      cpf = cpf.replace(/^(\d{3})(\d{0,3})$/, "$1.$2");
    } else if (cpf.length > 0) {
      cpf = cpf.replace(/^(\d{0,3})$/, "$1");
    }

    inputCpf.value = cpf;
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
