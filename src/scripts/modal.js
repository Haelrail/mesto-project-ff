import { handleDeleteButton } from "./card";

// Управление модальными окнами

// Закрытие окна и снятие всех обработчиков

export function closePopup(popup) {
  document.removeEventListener('keydown', closePopupEsc);
  document.removeEventListener('click', closePopupOverlay);
  popup.querySelector('.popup__close').removeEventListener('click', closePopupButton);
  popup.classList.remove('popup_is-opened');
  if (popup === document.querySelector('.popup_type_delete-card'))
    document.querySelector('.popup_type_delete-card').removeEventListener('submit', handleDeleteButton);
}

// Закрытие по нажатию esc

function closePopupEsc(event) {
  if (event.key === 'Escape')
    closePopup(document.querySelector('.popup_is-opened'));
}

// Закрытие по нажатию на оверлей

function closePopupOverlay(event) {
  if (event.target.matches('.popup_is-opened')) {
    closePopup(event.target);
  }
}

// Закрытие по кнопке

function closePopupButton(event) {
  closePopup(event.target.closest('.popup'));
}

// Открытие окна

export function openPopup(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
  document.addEventListener('click', closePopupOverlay);
  popup.querySelector('.popup__close').addEventListener('click', closePopupButton); 
}