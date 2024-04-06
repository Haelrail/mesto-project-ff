
// export function getProfileData(userName, userInfo, userAvatar) {
//   fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me', {
//     headers: {
//       authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0'
//     }
//   })
//   .then((res) => res.json())
//   .then((res) => {
//     userName.textContent = res.name;
//     userInfo.textContent = res.about;
//     userAvatar.style = `background-image: url("${res.avatar}")`;
//   });
// }

// export function getInitialCards(cardsList, createCard, deleteCard, likeCard, openCard) {
//   fetch('https://nomoreparties.co/v1/wff-cohort-10/cards', {
//     headers: {
//       authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0'
//     }
//   })
//   .then((res) => res.json())
//   .then((res) => res.forEach((element) => cardsList.append(createCard(element.name, element.link, deleteCard, likeCard, openCard, element.likes.length, element.owner._id))));
// }

// export function getProfileData() {
//   fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me', {
//     headers: {
//       authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0'
//     }
//   })
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res);
//     return(res)
//   });
// }

// export function getInitialCards() {
//   fetch('https://nomoreparties.co/v1/wff-cohort-10/cards', {
//     headers: {
//       authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0'
//     }
//   })
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res);
//     return(res);
//   });
// }

export const getProfileData = new Promise((resolve, reject) => {
  fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me', {
    headers: {
      authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0'
    }
  })
  .then((res) => {
    if (res.ok)
      resolve(res.json());
    else
      reject();
  });
})

export const getInitialCards = new Promise((resolve, reject) => {
  fetch('https://nomoreparties.co/v1/wff-cohort-10/cards', {
    headers: {
      authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0'
    }
  })
  .then((res) => {
    if(res.ok)
      resolve(res.json());
    else
      reject();
  })
})

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

export function sendNewCardOnServer(name, link) {
  fetch('https://nomoreparties.co/v1/wff-cohort-10/cards', {
    method: 'POST',
    headers: {
      authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  });
}

export function deleteCardFromServer(cardId) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0',
    }
  });
}

export function addLikeOnCard(cardId) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0',
    }
  });
}

export function removeLikeFromCard(cardId) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-10/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0',
    }
  });
}

export function updateAvatar(newUrl) {
  fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: newUrl
    })
  });
}
