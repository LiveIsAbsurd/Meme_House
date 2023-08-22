const buttonMoreDescription = document.querySelector(".button-description");
const mainDescription = document.querySelector(".main-container__description");
const tableWrapper = document.querySelector(".state-wrapper");
const stateButton = document.querySelector(".message-state__button");

buttonMoreDescription.addEventListener("click", (e) => {
  mainDescription.classList.toggle("main-container__description--hidden");

  if (buttonMoreDescription.textContent == "СКРЫТЬ") {
    buttonMoreDescription.textContent = "А ПОДРОБНЕЕ?";
  } else {
    buttonMoreDescription.textContent = "СКРЫТЬ";
  }
});

stateButton.addEventListener("click", () => {
  tableWrapper.classList.toggle("state-wrapper__hidden");

  if (stateButton.textContent == "А ЕЩЁ?") {
    stateButton.textContent == "Скрыть?"
  } else {
    stateButton.textContent = "А ЕЩЁ?"
  }
})