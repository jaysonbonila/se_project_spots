const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function showInputError(form, input, message, config) {
  const errorEl = form.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorEl.textContent = message;
  errorEl.classList.add(config.errorClass);
}

function hideInputError(form, input, config) {
  const errorEl = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorEl.textContent = "";
  errorEl.classList.remove(config.errorClass);
}

function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
}

function toggleButtonState(inputs, button, config) {
  const isFormValid = inputs.every((input) => input.validity.valid);
  button.disabled = !isFormValid;
  button.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, button, config);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

enableValidation(validationSettings);
