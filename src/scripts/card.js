import { deleteCardFromServer, addLikeOnCard, removeLikeFromCard } from "./api";
import { closePopup, openPopup } from "./modal";

// Функция создания карточки

export function createCard(cardName, cardLink, openCard, cardLikeNumber, cardOwnerId, userId, cardId, likeList) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = newCard.querySelector('.card__delete-button');
  const likeButton = newCard.querySelector('.card__like-button');
  const cardOpening = newCard.querySelector('.card__image');

  newCard.querySelector('.card__image').src = cardLink;
  newCard.querySelector('.card__image').alt = cardName;
  newCard.querySelector('.card__title').textContent = cardName;
  newCard.querySelector('.card__like-counter').textContent = cardLikeNumber;

  manageDeleteButton(cardOwnerId, userId, deleteButton, cardId);

  checkLike(likeList, likeButton, userId);

  likeButton.addEventListener('click', () => cardLikeNumber = likeCard(cardId, likeButton, cardLikeNumber, newCard));
  cardOpening.addEventListener('click', () => openCard(cardName, cardLink));

  return newCard;
}

// Удаление карточек

function manageDeleteButton(cardOwnerId, userId, deleteButton, cardId) {
  const popupDeleteCard = document.querySelector('.popup_type_delete-card');
  if(cardOwnerId === userId)
    deleteButton.addEventListener('click', (event) => {
      const targetCard = event.target.closest('.card');
      const deleteCardElement = document.forms['delete-card'];
      openPopup(popupDeleteCard);
      deleteCardElement.addEventListener('submit', (event) => {
        event.preventDefault();
        deleteCardFromServer(cardId)
        .then((res) => deleteCard(targetCard))
        .catch((err) => console.error(err));
        closePopup(popupDeleteCard);
      });
    });
  else
    deleteButton.remove();
}

export function deleteCard(card) {
  card.remove();
}

// Обработка "лайков" на карточке

function checkLike(likeList, likeButton, userId) {
  if (likeList.some((elem) => elem._id === userId))
    likeButton.classList.add('card__like-button_is-active');
}

export function likeCard(cardId, likeButton, cardLikeNumber, newCard) {
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
}
