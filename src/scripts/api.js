// export function getProfileData() {
//   fetch('https://nomoreparties.co/v1/:wff-cohort-10/users/me', {
//     headers: {
//       authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0'
//     }
//   })
//   .then((res) => {
//     return res.json();
//   })  
// }

export function getProfileData(userName, userInfo, userAvatar) {
  fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me', {
    headers: {
      authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0'
    }
  })
  .then((res) => res.json())
  .then((res) => {
    userName.textContent = res.name;
    userInfo.textContent = res.about;
    userAvatar.style = `background-image: url("${res.avatar}")`;
  });
}

export function getInitialCards(cardsList, createCard, deleteCard, likeCard, openCard) {
  fetch('https://nomoreparties.co/v1/wff-cohort-10/cards', {
    headers: {
      authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0'
    }
  })
  .then((res) => res.json())
  .then((res) => res.forEach((element) => cardsList.append(createCard(element.name, element.link, deleteCard, likeCard, openCard))));
}

export function setNewProfileInfo(name, about) {
  fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  });
}