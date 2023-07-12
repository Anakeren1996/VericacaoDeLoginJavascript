const form = document.getElementById("form");
const campos = document.querySelectorAll(".required");
const spans = document.querySelectorAll(".span-required");
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    nameValidate();
    emailValidate();
    mainPasswordValidate();
    comparePassword();

    if (isFormValid()) {
      exibirMensagemSucesso();
      redirecionarLogin();
    }
  });

  function setError(index) {
    if (campos[index]) {
      campos[index].style.border = "2px solid #e63636";
    }
    if (spans[index]) {
      spans[index].style.display = "block";
    }
  }

  function removeError(index) {
    if (campos[index]) {
      campos[index].style.border = "";
    }
    if (spans[index]) {
      spans[index].style.display = "none";
    }
  }

  function nameValidate() {
    if (campos[0] && campos[0].value.length < 3) {
      setError(0);
    } else {
      removeError(0);
    }
  }

  function emailValidate() {
    if (campos[1] && !emailRegex.test(campos[1].value)) {
      setError(1);
    } else {
      removeError(1);
    }
  }

  function mainPasswordValidate() {
    if (campos[2] && campos[2].value.length < 8) {
      setError(2);
    } else {
      removeError(2);
      comparePassword();
    }
  }

  function comparePassword() {
    if (
      campos[2] &&
      campos[3] &&
      campos[2].value == campos[3].value &&
      campos[3].value.length >= 8
    ) {
      removeError(3);
    } else {
      setError(3);
    }
  }

  function isFormValid() {
    for (let i = 0; i < spans.length; i++) {
      if (spans[i].style.display === "block") {
        return false;
      }
    }
    return true;
  }

  function exibirMensagemSucesso() {
    let successMessage = document.querySelector(".js-successMessage");
    if (successMessage) {
      successMessage.innerHTML = "Cadastro realizado com sucesso.";
      successMessage.classList.add("successMessage");
      successMessage.style.display = "block";
    }
  }

  function redirecionarLogin() {
    setTimeout(function () {
      const cadastroData = {
        name: campos[0].value,
        email: campos[1].value,
        password: campos[2].value,
      };
      localStorage.setItem("cadastroData", JSON.stringify(cadastroData));

      window.location.href = "/formularioLogin.html";
    }, 3000);
  }

  // TELA DE LOGIN
  const emailLoginInput = document.getElementById("emailLogin");

  emailLoginInput.addEventListener("click", function () {
    const errorMessageLogin = document.querySelector(".js-errorMessage");
    errorMessageLogin.innerHTML = "";
    errorMessageLogin.style.display = "none"; 
  });

  function validateLogin() {
    let emailLogin = document.getElementById("emailLogin").value;
    let passwordLogin = document.getElementById("passwordLogin").value;

    const cadastroData = JSON.parse(localStorage.getItem("cadastroData"));

    if (
      cadastroData &&
      emailLogin === cadastroData.email &&
      passwordLogin === cadastroData.password
    ) {
     
      window.location.href = "/paginaLogin.html";
    } else {
      setTimeout(function () {
        let errorMessageLogin = document.querySelector(".js-errorMessage");

        errorMessageLogin.innerHTML =
          "Email ou senha inválidos. Por favor tente novamente!";
        errorMessageLogin.classList.add("errorMessage");
        errorMessageLogin.style.display = "block";
      }, 2000);
    }
  }
}
