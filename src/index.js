import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { closePopup, openPopup } from './scripts/modal.js';
import { clearValidation, enableValidation } from './scripts/validation.js';
import { getProfileData, getInitialCards, setNewProfileInfo, sendNewCardOnServer, deleteCardFromServer } from './scripts/api.js';

// DOM узлы

const cardsList = document.querySelector('.places__list');

// Модальные окна и их компоненты

const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const openCardPopup = document.querySelector('.popup_type_image');

const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_url');

const inputName = document.querySelector('.popup__input_type_name');
const inputOccupation = document.querySelector('.popup__input_type_description');

const openedCardCaption = openCardPopup.querySelector('.popup__caption');
const openedCardImage = openCardPopup.querySelector('.popup__image');

// Формы

const profileFormElement = document.forms['edit-profile'];
const cardFormElement = document.forms['new-place'];

// Профиль и его разделы

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__title');
const profileOccupation = profile.querySelector('.profile__description');
const profileNewCardButton = profile.querySelector('.profile__add-button');

// Вывод карточек на страницу

// initialCards.forEach(function(card){
//   cardsList.append(createCard(card.name, card.link, deleteCard, likeCard, openCard, 0, userId));
// });

// Изменение профиля

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  closePopup(profilePopup);
  setNewProfileInfo(profileName.textContent, profileOccupation.textContent);
}

profileFormElement.addEventListener('submit', handleFormSubmit);

profileEditButton.addEventListener('click', function() {
  clearValidation(profileFormElement);
  openPopup(profilePopup);
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
});

// Добавление новых карточек

function handleFormNewCard(event) {
  event.preventDefault();
  cardsList.prepend(createCard(inputCardName.value, inputCardLink.value, openCard, 0, userId, userId, cardId));
  sendNewCardOnServer(inputCardName.value, inputCardLink.value);
  closePopup(newCardPopup);
  clearValidation(cardFormElement);
  cardFormElement.reset();
}

profileNewCardButton.addEventListener('click', function() {
  openPopup(newCardPopup);
});

cardFormElement.addEventListener('submit', handleFormNewCard);

// Открытие карточек

function openCard(cardName, cardLink) {
  openedCardCaption.textContent = cardName;
  openedCardImage.src = cardLink;
  openedCardImage.alt = cardName;
  openPopup(openCardPopup);
}

// /////////////////////////////////////////////////////////////
//                          7 спринт                          //
// /////////////////////////////////////////////////////////////

// const profileFormInputs = Array.from(profileFormElement.querySelectorAll('.popup__input'));
// const cardFormInputs = Array.from(cardFormElement.querySelectorAll('.popup__input'));

// const submitButton = profileFormElement.querySelector('.button');

// const showInputError = (input) => {
//   input.classList.add('popup__input_type_error');
//   const errorNote = profileFormElement.querySelector(`.${input.id}-error`);
//   errorNote.textContent = input.validationMessage;
// };

// const hideInputError = (input) => {
//   input.classList.remove('popup__input_type_error')
//   const errorNote = profileFormElement.querySelector(`.${input.id}-error`);
//   errorNote.textContent = '';
// };

// const checkValid = (input) => {
//   if (input.validity.patternMismatch)
//     input.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
//   else
//   input.setCustomValidity('');
//   if (!input.validity.valid)
//     showInputError(input);
//   else
//     hideInputError(input);
// };

// // manageSubmitButton(submitButton, profileFormInputs);

// profileFormInputs.forEach((input) => {
//   input.addEventListener('input', () => {
//     checkValid(input);
//     manageSubmitButton(submitButton, profileFormInputs);
//   });
// });

// function clearValidation(form) {
//   const inputList = form.querySelectorAll('.popup__input_type_error');
//   inputList.forEach((input) => {
//     hideInputError(input);
//   })
// };

// function manageSubmitButton(button, inputList) {
//   if (checkInputsValid(inputList)) {
//     button.disabled = true;
//     button.classList.add('popup__button_disabled');
//     button.classList.remove('popup__button_active');
//   }
//   else {
//     button.disabled = false;
//     button.classList.remove('popup__button_disabled');
//     button.classList.add('popup__button_active');
//   }

// };

// function checkInputsValid(inputList) {
//   return inputList.some((input) => {
//     return !input.validity.valid;
//   })
// };

////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

const popupFormList = Array.from(document.querySelectorAll('.popup__form'));
const profileImage = profile.querySelector('.profile__image');

let userId;

enableValidation(popupFormList);

Promise.all([getProfileData, getInitialCards])
  .then(([data, cards]) => {
    profileName.textContent = data.name;
    profileOccupation.textContent = data.about;
    profileImage.style = `background-image: url("${data.avatar}")`;
    userId = data._id;

    cards.forEach((card) => cardsList.append(createCard(card.name, card.link, openCard, card.likes.length, card.owner._id, userId, card._id)));
  });

// getProfileData(profileName, profileOccupation, profileImage);

// getInitialCards(cardsList, createCard, deleteCard, likeCard, openCard, '8f3d3456-430a-4c87-a5de-14735dcc84d0');

// const pm = new Promise.resolve(getProfileData())
//   .then((data) => {
//     profileName.textContent = data.name;
//     profileOccupation.textContent = data.about;
//     profileImage.style = `background-image: url("${data.avatar}")`;
//     userId = data._id;
//   })
