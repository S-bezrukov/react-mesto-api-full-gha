import Cookies from 'js-cookie';
class Api {
  constructor(options) {
    this._options = options;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }

  getInitialCards() {
    return this._request(`${this._options.baseUrl}/cards`, {
      headers: {
        ...this._options.headers,
        Authorization: `Bearer ${this._getTokenFromCookies()}`,
      },
      credentials: 'include',
    });
  }

  getUserInfo() {
    return this._request(`${this._options.baseUrl}/users/me`, {
      headers: {
        ...this._options.headers,
        Authorization: `Bearer ${this._getTokenFromCookies()}`,
      },
      credentials: 'include',
    });
  }

  handleLikeCard(id) {
    return this._request(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        ...this._options.headers,
        Authorization: `Bearer ${this._getTokenFromCookies()}`,
      },
      credentials: 'include',
    });
  }

  deleteLikeCard(id) {
    return this._request(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        ...this._options.headers,
        Authorization: `Bearer ${this._getTokenFromCookies()}`,
      },
      credentials: 'include',
    });
  }

  deleteCard(id) {
    return this._request(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._options.headers,
        Authorization: `Bearer ${this._getTokenFromCookies()}`,
      },
      credentials: 'include',
    });
  }

  profileEdit(profileData) {
    return this._request(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._options.headers,
        Authorization: `Bearer ${this._getTokenFromCookies()}`,
      },
      body: JSON.stringify({
        name: profileData.name,
        about: profileData.about,
      }),
      credentials: 'include',
    });
  }

  editAvatar(avatarData) {
    return this._request(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._options.headers,
        Authorization: `Bearer ${this._getTokenFromCookies()}`,
      },
      body: JSON.stringify({
        avatar: avatarData.avatar,
      }),
      credentials: 'include',
    });
  }

  addNewCard({ name, link }) {
    return this._request(`${this._options.baseUrl}/cards`, {
      headers: {
        ...this._options.headers,
        Authorization: `Bearer ${this._getTokenFromCookies()}`,
      },
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
      credentials: 'include',
    });
  }

  _getTokenFromCookies() {
    // Здесь вы можете использовать необходимый способ получения токена из куков
    // Например, с помощью библиотеки js-cookie
    return Cookies.get('token');
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  // headers: {
  //   authorization: '333858c6-7642-41c9-9f9a-6b40780ac2ad',
  //   'Content-Type': 'application/json'
  // }
});

export default api;