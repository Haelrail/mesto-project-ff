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
  const cardId = sendNewCardOnServer(inputCardName.value, inputCardLink.value)._id;
  cardsList.prepend(createCard(inputCardName.value, inputCardLink.value, openCard, 0, userId, userId, cardId, []));
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

// /////////////////////////////////////////////////////////////
//                          7 спринт                          //
// /////////////////////////////////////////////////////////////

const popupFormList = Array.from(document.querySelectorAll('.popup__form'));
const profileImage = profile.querySelector('.profile__image');
const popupChangeAvatar = document.querySelector('.popup_type_change-avatar');
const profileAvatarChangeElement = document.forms['new-avatar'];

let userId;

enableValidation(popupFormList);

Promise.all([getProfileData(), getInitialCards()])
  .then(([data, cards]) => {
    console.log(data);
    console.log(cards);
    profileName.textContent = data.name;
    profileOccupation.textContent = data.about;
    profileImage.style = `background-image: url("${data.avatar}")`;
    userId = data._id;

    cards.forEach((card) => cardsList.append(createCard(card.name, card.link, openCard, card.likes.length, card.owner._id, userId, card._id, card.likes)));
  });

function handleFormAvatarChange(event) {
  event.preventDefault();
  const newAvatarLink = profileAvatarChangeElement.querySelector('.popup__input').value;
  profileImage.style = `background-image: url("${newAvatarLink}")`;
  updateAvatar(newAvatarLink);
  closePopup(popupChangeAvatar);
  clearValidation(profileAvatarChangeElement);
}

profileAvatarChangeElement.addEventListener('submit', handleFormAvatarChange);

profileImage.addEventListener('click', () => {
  openPopup(popupChangeAvatar);
  profileAvatarChangeElement.reset();
  clearValidation(profileAvatarChangeElement);
});


