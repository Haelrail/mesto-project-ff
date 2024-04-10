import { deleteCardFromServer, addLikeOnCard, removeLikeFromCard } from "./api";
import { closePopup, openPopup } from "./modal";

// Функция создания карточки

export function createCard(cardName, cardLink, openCard, cardLikeNumber, cardOwnerId, userId, cardId, likeList) {

  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__image').src = cardLink;
  newCard.querySelector('.card__image').alt = cardName;
  newCard.querySelector('.card__title').textContent = cardName;

  return newCard;
}

// Удаление карточек

let targetCard;
let currentCardId;

export function manageDeleteButton(newCard, cardOwnerId, userId, cardId) {
  const popupDeleteCard = document.querySelector('.popup_type_delete-card');
  const deleteButton = newCard.querySelector('.card__delete-button');
  if(cardOwnerId === userId)
    deleteButton.addEventListener('click', (event) => {
      targetCard = event.target.closest('.card');
      currentCardId = cardId;
      const deleteCardElement = document.forms['delete-card'];
      openPopup(popupDeleteCard);
      deleteCardElement.addEventListener('submit', handleDeleteButton);
    });
  else
    deleteButton.remove();
}

export function handleDeleteButton(event) {
  event.preventDefault();
  deleteCardFromServer(currentCardId)
  .then((res) => {
    targetCard.remove();
    closePopup(document.querySelector('.popup_type_delete-card'));
  })
  .catch((err) => console.error(err));
}

// Обработка "лайков" на карточке

function checkLike(likeList, likeButton, userId) {
  if (likeList.some((elem) => elem._id === userId))
    likeButton.classList.add('card__like-button_is-active');
}

function likeCard(cardId, likeButton, cardLikeNumber, newCard) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    removeLikeFromCard(cardId)
    .then((res) => {
      newCard.querySelector('.card__like-counter').textContent = res.likes.length;
      likeButton.classList.remove('card__like-button_is-active');
      cardLikeNumber--;
    })
    .catch((err) => console.error(err));
  }
  else {
    addLikeOnCard(cardId)
    .then((res) => {
      newCard.querySelector('.card__like-counter').textContent = res.likes.length;
      likeButton.classList.add('card__like-button_is-active');
      cardLikeNumber++;
    })
    .catch((err) => console.error(err));
  }
  return (cardLikeNumber);
};

export function manageLikesOnCard(newCard, cardLikeNumber, likeList, userId, cardId) {
  const likeButton = newCard.querySelector('.card__like-button');

  newCard.querySelector('.card__like-counter').textContent = cardLikeNumber;
  checkLike(likeList, likeButton, userId);
  likeButton.addEventListener('click', () => cardLikeNumber = likeCard(cardId, likeButton, cardLikeNumber, newCard));
}

// Открытие карточки

export function manageCardOpening(newCard, cardName, cardLink, openCard) {
  const cardOpening = newCard.querySelector('.card__image');

  cardOpening.addEventListener('click', () => openCard(cardName, cardLink));
}
