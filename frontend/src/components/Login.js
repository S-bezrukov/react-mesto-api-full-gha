import React from "react";
function Login({ onLogin, formLoginValue, setFormLoginValue }) {
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormLoginValue({
      ...formLoginValue,
      [name]: value,
    });
  }

  return (
    <div className="auth-page">
      <h1 className="form__title form__title_theme_light">Вход</h1>
      <form className="form auth-page__form" onSubmit={onLogin}>
        <label className="form__label-place">
          <input
            type="email"
            onChange={handleChange}
            className="form__input form__input_theme_light"
            name="email"
            placeholder="Email"
            required
            id="input-email"
            value={formLoginValue.email || ""}
          />
          <span className="main-form__error input-email-error"></span>
        </label>
        <label className="form__label-photo">
          <input
            type="password"
            className="form__input form__input_type_photo form__input_theme_light"
            name="password"
            required
            id="input-password"
            placeholder="Пароль"
            onChange={handleChange}
            value={formLoginValue.password || ""}
          />
          <span className="main-form__error input-password-error"></span>
        </label>
        <button className="form__submit-btn form__submit-btn_theme_light">Войти</button>
      </form>
    </div>
  );
}

export default Login;