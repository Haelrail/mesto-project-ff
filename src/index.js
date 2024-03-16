import './pages/index.css';

import {initialCards} from './scripts/cards.js';

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cardName, cardLink, deleteCard, likeCard, openCard) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = newCard.querySelector('.card__delete-button');
  const likeButton = newCard.querySelector('.card__like-button');
  const cardOpening = newCard.querySelector('.card__image');

  newCard.querySelector('.card__image').src = cardLink;
  newCard.querySelector('.card__title').textContent = cardName;

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
  cardOpening.addEventListener('click', () => openCard(cardName, cardLink));

  return newCard;
}

// @todo: Функция удаления карточки

function deleteCard(event) {
  event.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function(card){
  cardsList.append(createCard(card.name, card.link, deleteCard, likeCard, openCard));
});

// @wip: открытие попапа изменения профиля на странице, управление попапами

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');


const profilePopup = document.querySelector('.popup_type_edit');
// const profilePopupClose = profilePopup.querySelector('.popup__close');

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escClosePopup);
  document.removeEventListener('click', overlayClickClosePopup);
}

function escClosePopup(event) {
  if (event.key === 'Escape')
    closePopup(document.querySelector('.popup_is-opened'));
}

function buttonClosePopup(event) {
  document.querySelector('.popup_is-opened').querySelector('.popup__close').removeEventListener('click', buttonClosePopup);
  closePopup(document.querySelector('.popup_is-opened'));
}

function overlayClickClosePopup(event) {
  if (event.target.matches('.popup_is-opened')) {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

function openPopup(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escClosePopup);
  document.addEventListener('click', overlayClickClosePopup);
  popup.querySelector('.popup__close').addEventListener('click', buttonClosePopup);  
}

profileEditButton.addEventListener('click', function() {
  openPopup(profilePopup);
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
});

// wip: сохранение изменений профиля

const profileFormElement = document.forms['edit-profile'];
// const profileFormElement = document.querySelector('.popup__form');

const profileName = profile.querySelector('.profile__title');
const profileOccupation = profile.querySelector('.profile__description');

const inputName = document.querySelector('.popup__input_type_name');
const inputOccupation = document.querySelector('.popup__input_type_description');

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  closePopup(profilePopup);
}

profileFormElement.addEventListener('submit', handleFormSubmit);

// wip: форма добавления карточек

const profileNewCardButton = profile.querySelector('.profile__add-button');

const newCardPopup = document.querySelector('.popup_type_new-card');

const cardFormElement = document.forms['new-place'];

const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_url');

function handleFormNewCard(event) {
  event.preventDefault();
  cardsList.prepend(createCard(inputCardName.value, inputCardLink.value, deleteCard, likeCard, openCard));
  closePopup(newCardPopup);
  cardFormElement.reset();
}

profileNewCardButton.addEventListener('click', function() {
  openPopup(newCardPopup);
});

cardFormElement.addEventListener('submit', handleFormNewCard);

// wip: добавление "лайка" на карточку

function likeCard(event) {
  const likeButton = event.target.closest('.card__like-button');
  if (likeButton.classList.contains('card__like-button_is-active'))
    likeButton.classList.remove('card__like-button_is-active');
  else
    likeButton.classList.add('card__like-button_is-active');
}

// wip: открытие карточек

function openCard(cardName, cardLink) {
  const openCardPopup = document.querySelector('.popup_type_image');
  openCardPopup.querySelector('.popup__caption').textContent = cardName;
  openCardPopup.querySelector('.popup__image').src = cardLink;
  openPopup(openCardPopup);
}