const buttonMoreDescription = document.querySelector(".button-description");
const mainDescription = document.querySelector(".main-container__description");

buttonMoreDescription.addEventListener("click", (e) => {
  mainDescription.classList.toggle("main-container__description--hidden");

  if (buttonMoreDescription.textContent == "СКРЫТЬ") {
    buttonMoreDescription.textContent = "А ПОДРОБНЕЕ?";
  } else {
    buttonMoreDescription.textContent = "СКРЫТЬ";
  }
});
