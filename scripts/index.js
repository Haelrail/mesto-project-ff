// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cardName, cardLink, deleteCard) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = newCard.querySelector('.card__delete-button');

  newCard.querySelector('.card__image').src = cardLink;
  newCard.querySelector('.card__title').textContent = cardName;

  deleteButton.addEventListener('click', deleteCard);

  return newCard;
}

// @todo: Функция удаления карточки

function deleteCard(event) {
  event.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function(card){
  cardsList.append(createCard(card.name, card.link, deleteCard));
});