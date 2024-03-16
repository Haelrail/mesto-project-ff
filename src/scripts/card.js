// Функция создания карточки

export function createCard(cardName, cardLink, deleteCard, likeCard, openCard) {
  const cardTemplate = document.querySelector('#card-template').content;
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

// Функция удаления карточки

export function deleteCard(event) {
  event.target.closest('.card').remove();
}

// Обработка "лайков" на карточке

export function likeCard(event) {
  const likeButton = event.target.closest('.card__like-button');
  if (likeButton.classList.contains('card__like-button_is-active'))
    likeButton.classList.remove('card__like-button_is-active');
  else
    likeButton.classList.add('card__like-button_is-active');
}
