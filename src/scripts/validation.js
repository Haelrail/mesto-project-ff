// Управление отображением ошибки ввода

const showInputError = (input, form) => {
  input.classList.add('popup__input_type_error');
  const errorNote = form.querySelector(`.${input.id}-error`);
  errorNote.textContent = input.validationMessage;
};

const hideInputError = (input, form) => {
  input.classList.remove('popup__input_type_error')
  const errorNote = form.querySelector(`.${input.id}-error`);
  errorNote.textContent = '';
};

// Проверка введенного текста

const checkValid = (input, form) => {
  if (input.validity.patternMismatch)
    input.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
  else
  input.setCustomValidity('');
  if (!input.validity.valid)
    showInputError(input, form);
  else
    hideInputError(input, form);
};

function checkInputsValid(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
};

// Управление кнопкой отправки формы

function manageSubmitButton(button, inputList) {
  if (checkInputsValid(inputList)) {
    button.disabled = true;
    button.classList.add('popup__button_disabled');
    button.classList.remove('popup__button_active');
  }
  else {
    button.disabled = false;
    button.classList.remove('popup__button_disabled');
    button.classList.add('popup__button_active');
  }

};

// Включить валидацию на всех полях в форме

function addFormValidation(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const submitButton = form.querySelector('.button');
  manageSubmitButton(submitButton, inputList);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkValid(input, form);
      manageSubmitButton(submitButton, inputList);
    });
  });
};

// Отключить валидацию на форме

export function clearValidation(form) {
  const inputList = form.querySelectorAll('.popup__input_type_error');
  inputList.forEach((input) => {
    hideInputError(input, form);
  })
}

// Включить валидацию в проекте

export function enableValidation(formList) {
  formList.forEach((formElement) => {
    addFormValidation(formElement);
  })
}