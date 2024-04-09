import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import { createCard, manageLikesOnCard, manageDeleteButton, manageCardOpening } from './scripts/card.js';
import { closePopup, openPopup } from './scripts/modal.js';
import { clearValidation, enableValidation } from './scripts/validation.js';
import { getProfileData, getInitialCards, setNewProfileInfo, sendNewCardOnServer, deleteCardFromServer, updateAvatar } from './scripts/api.js';

// DOM узлы

const cardsList = document.querySelector('.places__list');

// Модальные окна и их компоненты

const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const openCardPopup = document.querySelector('.popup_type_image');

const popupChangeAvatar = document.querySelector('.popup_type_change-avatar');

const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_url');

const inputName = document.querySelector('.popup__input_type_name');
const inputOccupation = document.querySelector('.popup__input_type_description');

const openedCardCaption = openCardPopup.querySelector('.popup__caption');
const openedCardImage = openCardPopup.querySelector('.popup__image');

// Формы

const popupFormList = Array.from(document.querySelectorAll('.popup__form'));
const profileFormElement = document.forms['edit-profile'];
const cardFormElement = document.forms['new-place'];
const profileAvatarChangeElement = document.forms['new-avatar'];

// Профиль и его разделы

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__title');
const profileImage = profile.querySelector('.profile__image');
const profileOccupation = profile.querySelector('.profile__description');
const profileNewCardButton = profile.querySelector('.profile__add-button');

// Validation config

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  activeButtonClass: 'popup__button_active',
  inputErrorClass: 'popup__input_type_error'
}

// Вывод карточек на страницу



// Изменение профиля

function handleFormSubmit(event) {
  event.preventDefault();
  changeLoadingButtonText(false, profilePopup.querySelector('.popup__button'));
  setNewProfileInfo(inputName.value, inputOccupation.value)
  .then((res) => {
    profileName.textContent = res.name;
    profileOccupation.textContent = res.about;
    closePopup(profilePopup);
  })
  .catch((err) => console.error(err))
  .finally(() => changeLoadingButtonText(true, profilePopup.querySelector('.popup__button')));
}

profileFormElement.addEventListener('submit', handleFormSubmit);

profileEditButton.addEventListener('click', function() {
  clearValidation(profileFormElement, validationConfig);
  openPopup(profilePopup);
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
});

// Добавление новых карточек

function handleFormNewCard(event) {
  event.preventDefault();
  changeLoadingButtonText(false, newCardPopup.querySelector('.popup__button'));
  sendNewCardOnServer(inputCardName.value, inputCardLink.value)
  .then((res) => {
    const newCard = createCard(res.name, res.link, openCard, res.likes.length, res.owner._id, res.owner._id, res._id, res.likes);
    cardsList.prepend(newCard);
    manageLikesOnCard(newCard, res.likes.length, res.likes, res.owner._id, res._id);
    manageDeleteButton(newCard, res.owner._id, res.owner._id, res._id);
    manageCardOpening(newCard, res.name, res.link);
    closePopup(newCardPopup);
  })
  .catch((err) => console.error(err))
  .finally(() => changeLoadingButtonText(true, newCardPopup.querySelector('.popup__button')));
}

// function handleFormNewCard(event) {
//   event.preventDefault();
//   changeLoadingButtonText(false, newCardPopup.querySelector('.popup__button'));
//   sendNewCardOnServer(inputCardName.value, inputCardLink.value)
//   .then((res) => {
//     cardsList.prepend(createCard(res.name, res.link, openCard, res.likes.length, res.owner._id, res.owner._id, res._id, res.likes));
//     closePopup(newCardPopup);
//   })
//   .catch((err) => console.error(err))
//   .finally(() => changeLoadingButtonText(true, newCardPopup.querySelector('.popup__button')));
// }

profileNewCardButton.addEventListener('click', function() {
  openPopup(newCardPopup);
  clearValidation(cardFormElement, validationConfig);
  cardFormElement.reset();
});

cardFormElement.addEventListener('submit', handleFormNewCard);

// Открытие карточек

function openCard(cardName, cardLink) {
  openedCardCaption.textContent = cardName;
  openedCardImage.src = cardLink;
  openedCardImage.alt = cardName;
  openPopup(openCardPopup);
}

// Включение валидации форм

// enableValidation(popupFormList);

enableValidation(validationConfig);

// Получение начальных данных от сервера

Promise.all([getProfileData(), getInitialCards()])
  .then(([data, cards]) => {
    profileName.textContent = data.name;
    profileOccupation.textContent = data.about;
    profileImage.style = `background-image: url("${data.avatar}")`;

    cards.forEach((card) => cardsList.append(createCard(card.name, card.link, openCard, card.likes.length, card.owner._id, data._id, card._id, card.likes)));
  })
  .catch((err) => console.error(err));

// Смена аватара

function handleFormAvatarChange(event) {
  event.preventDefault();
  changeLoadingButtonText(false, popupChangeAvatar.querySelector('.popup__button'));
  const newAvatarLink = profileAvatarChangeElement.querySelector('.popup__input').value;
  updateAvatar(newAvatarLink)
  .then((res) => {
    profileImage.style = `background-image: url("${res.avatar}")`;
    closePopup(popupChangeAvatar);
  })
  .catch((err) => console.error(err))
  .finally(() => changeLoadingButtonText(true, popupChangeAvatar.querySelector('.popup__button')));
}

profileImage.addEventListener('click', () => {
  openPopup(popupChangeAvatar);
  profileAvatarChangeElement.reset();
  clearValidation(profileAvatarChangeElement, validationConfig);
});

profileAvatarChangeElement.addEventListener('submit', handleFormAvatarChange);

// UX form update

function changeLoadingButtonText(status, actualButton) {
  if (!status) {
    actualButton.textContent = 'Сохранение...';
  }
  else
    actualButton.textContent = 'Сохранить';
};
