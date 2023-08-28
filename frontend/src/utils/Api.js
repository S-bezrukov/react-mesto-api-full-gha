class Api {
  constructor(options) {
    this._options = options;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  // Метод обработки ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }

  // Инициализации карточек с сервера
  getInitialCards() { 
    return this._request(`${this._options.baseUrl}/cards`, { 
      headers: this._options.headers,
      credentials: 'include',
    })
  }

  // Метод получения данных пользователя с сервера
  getUserInfo() {
    return this._request(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
      credentials: 'include',
    })
  }

  // Отправка лайка на сервер insertCardLike(cardId)
  
  handleLikeCard(id) {
    return this._request(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._options.headers,
      credentials: 'include',
    });
  }

  // Удаления лайка с сервера
  deleteLikeCard(id) {
    return this._request(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._options.headers,
      credentials: 'include',
    });
  }

  // Удаления карточки с сервера
  deleteCard(id) {
    return this._request(`${this._options.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._options.headers,
      credentials: 'include',
    });
  }

  // Метод для изменея данных пользователя
  // Метод для изменея данных пользователя
  profileEdit(inputData) {
    return this._request(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.about,
      }),
    });
  }

  // Отправка нового аватара на сервак
  editAvatar(avatarData) {
    return this._request(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: avatarData.avatar,
      }),
    });
  }

  // Добавления новой карточки на сервак
  addCard(cardData) {
    return this._request(`${this._options.baseUrl}/cards`, {
      method: "POST",
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    });
  }

}

// Объект для обмена данными с сервером
const api = new Api ({
  baseUrl: 'http://localhost:3000',
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66/',
  // headers: {
  //   authorization: '333858c6-7642-41c9-9f9a-6b40780ac2ad',
  //   'Content-Type': 'application/json'
  // }
})

export default api