document.addEventListener("DOMContentLoaded", function () {
  const cadastroData = JSON.parse(localStorage.getItem("cadastroData"));

  if (cadastroData && cadastroData.name) {
    const welcomeMessage = document.getElementById("welcomeMessage");
    welcomeMessage.textContent = "Seja bem-vindo, " + cadastroData.name + "!";
  }
});
