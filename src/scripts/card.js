import { deleteCardFromServer, addLikeOnCard, removeLikeFromCard } from "./api";

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

  if(cardOwnerId === userId)
    deleteButton.addEventListener('click', (event) => {
      deleteCardFromServer(cardId)
      .then((res) => deleteCard(event))
      .catch((err) => console.error(err));
    });
  else
    deleteButton.remove();

  checkLike(likeList, likeButton, userId);

  likeButton.addEventListener('click', () => cardLikeNumber = likeCard(cardId, likeButton, cardLikeNumber, newCard));
  cardOpening.addEventListener('click', () => openCard(cardName, cardLink));

  return newCard;
}

// Функция удаления карточки

export function deleteCard(event) {
  event.target.closest('.card').remove();
}

// Обработка "лайков" на карточке

// export function likeCard(event) {
//   const likeButton = event.target.closest('.card__like-button');
//   if (likeButton.classList.contains('card__like-button_is-active'))
//     likeButton.classList.remove('card__like-button_is-active');
//   else
//     likeButton.classList.add('card__like-button_is-active');
// }

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
