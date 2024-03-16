// Управление модальными окнами

// Закрытие окна

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escClosePopup);
  document.removeEventListener('click', overlayClickClosePopup);
}

// Закрытие по нажатию esc

function escClosePopup(event) {
  if (event.key === 'Escape')
    closePopup(document.querySelector('.popup_is-opened'));
}


//  Закрытие по кнопке

function buttonClosePopup(event) {
  document.querySelector('.popup_is-opened').querySelector('.popup__close').removeEventListener('click', buttonClosePopup);
  closePopup(document.querySelector('.popup_is-opened'));
}

// Закрытие по щелчку "мимо"

function overlayClickClosePopup(event) {
  if (event.target.matches('.popup_is-opened')) {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

// Открытие окна

export function openPopup(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escClosePopup);
  document.addEventListener('click', overlayClickClosePopup);
  popup.querySelector('.popup__close').addEventListener('click', buttonClosePopup);  
}