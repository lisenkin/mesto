export default class Api {

  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  // метод загрузки карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
          authorization: this._token
      }
    })
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
  })
}
//загрузка юзеринфо
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
          authorization: this._token
      }
  })
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
  })
}
//изменение юзеринфо передаем name и job(about)
editUserInfo({name : newName, about: newAbout}) {
  return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: newName,
          about: newAbout
      })
  })
  .then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
})
}
//добавить карточку  data (name link)  POST
addCard({name : newCardName, link : newCardLink}) {
  return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: newCardName,
          link: newCardLink
      })
  })
  .then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
})
}

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
          authorization: this._token,
      },
    })
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
  })
}

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
          authorization: this._token,
      },
  })
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
  })
}

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
          authorization: this._token,
      },
  })
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
  })
}
 // avatar = data
  editUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar,
      })
    })
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
  })
}
}
