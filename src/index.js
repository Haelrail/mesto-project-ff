import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
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

// Вывод карточек на страницу



// Изменение профиля

function handleFormSubmit(event) {
  event.preventDefault();
  changeLoadingButtonText(false);
  setNewProfileInfo(inputName.value, inputOccupation.value)
  .then((res) => {
    profileName.textContent = res.name;
    profileOccupation.textContent = res.about;
  })
  .catch((err) => console.error(err))
  .finally(() => changeLoadingButtonText(true));
  closePopup(profilePopup);
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
  changeLoadingButtonText(false);
  sendNewCardOnServer(inputCardName.value, inputCardLink.value)
  .then((res) => cardsList.prepend(createCard(res.name, res.link, openCard, res.likes.length, res.owner._id, res.owner._id, res._id, res.likes)))
  .catch((err) => console.error(err))
  .finally(() => changeLoadingButtonText(true));
  closePopup(newCardPopup);
  clearValidation(cardFormElement);
  cardFormElement.reset();
}

profileNewCardButton.addEventListener('click', function() {
  openPopup(newCardPopup);
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

enableValidation(popupFormList);

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
  changeLoadingButtonText(false);
  const newAvatarLink = profileAvatarChangeElement.querySelector('.popup__input').value;
  updateAvatar(newAvatarLink)
  .then((res) => profileImage.style = `background-image: url("${res.avatar}")`)
  .catch((err) => console.error(err))
  .finally(() => changeLoadingButtonText(true));
  closePopup(popupChangeAvatar);
  clearValidation(profileAvatarChangeElement);
}

profileImage.addEventListener('click', () => {
  openPopup(popupChangeAvatar);
  profileAvatarChangeElement.reset();
  clearValidation(profileAvatarChangeElement);
});

profileAvatarChangeElement.addEventListener('submit', handleFormAvatarChange);

// UX form update

function changeLoadingButtonText(status) {
  const actualButton = document.querySelector('.popup__button');
  if (!status) {
    actualButton.textContent = 'Сохранение...';
  }
  else
    actualButton.textContent = 'Сохранить';
};
