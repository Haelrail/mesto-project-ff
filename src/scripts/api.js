const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-10',
  headers: {
    authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0',
    'Content-Type': 'application/json'
  }
}

function checkServerResponse(res) {
  if (res.ok)
    return (res.json());
  else
    return (Promise.reject(`Error: ${res}`));
}

export const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => checkServerResponse(res));
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => checkServerResponse(res));
}

// export const getProfileData = new Promise((resolve, reject) => {
//   fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me', {
//     headers: {
//       authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0'
//     }
//   })
//   .then((res) => {
//     if (res.ok)
//       resolve(res.json());
//     else
//       reject();
//   });
// })

// export const getInitialCards = new Promise((resolve, reject) => {
//   fetch('https://nomoreparties.co/v1/wff-cohort-10/cards', {
//     headers: {
//       authorization: '8f3d3456-430a-4c87-a5de-14735dcc84d0'
//     }
//   })
//   .then((res) => {
//     if(res.ok)
//       resolve(res.json());
//     else
//       reject();
//   })
// })

export const setNewProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then((res) => checkServerResponse(res));
}

export const sendNewCardOnServer = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then((res) => checkServerResponse(res));
}

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => checkServerResponse(res));
}

export const addLikeOnCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((res) => checkServerResponse(res));
}

export const removeLikeFromCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => checkServerResponse(res));
}

export const updateAvatar = (newUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newUrl
    })
  })
  .then((res) => checkServerResponse(res));
}
