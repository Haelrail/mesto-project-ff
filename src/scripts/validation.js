// Управление отображением ошибки ввода

const showInputError = (input, form, config) => {
  input.classList.add(config.inputErrorClass);
  const errorNote = form.querySelector(`.${input.id}-error`);
  errorNote.textContent = input.validationMessage;
};

const hideInputError = (input, form, config) => {
  input.classList.remove(config.inputErrorClass);
  const errorNote = form.querySelector(`.${input.id}-error`);
  errorNote.textContent = '';
};

// Проверка введенного текста

const checkValid = (input, form, config) => {
  if (input.validity.patternMismatch)
    input.setCustomValidity(input.dataset.errorMessage);
  else
  input.setCustomValidity('');
  if (!input.validity.valid)
    showInputError(input, form, config);
  else
    hideInputError(input, form, config);
};

function checkInputsValid(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
};

// Управление кнопкой отправки формы

function manageSubmitButton(button, inputList, config) {
  if (checkInputsValid(inputList)) {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
    button.classList.remove(config.activeButtonClass);
  }
  else {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
    button.classList.add(config.activeButtonClass);
  }
};

// Включить валидацию на всех полях в форме

function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  manageSubmitButton(submitButton, inputList, config);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkValid(input, form, config);
      manageSubmitButton(submitButton, inputList, config);
    });
  });
};

// Отключить валидацию на форме

export function clearValidation(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((input) => {
    hideInputError(input, form, config);
  })
}

// Включить валидацию в проекте

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  })
}
