import React from "react";
import { Link } from "react-router-dom";

function Register({ formRegisterValue, setFormRegisterValue, onRegister }) {
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormRegisterValue({
      ...formRegisterValue,
      [name]: value,
    });
  }

  return (
    <div className="auth-page">
      <h1 className="form__title form__title_theme_light">
        Регистрация
      </h1>
      <form className="form auth-page__form" onSubmit={onRegister}>
        <label className="form__label-place">
          <input
            type="email"
            className="form__input form__input_theme_light"
            name="email"
            placeholder="Email"
            required
            id="input-email"
            onChange={handleChange}
            value={formRegisterValue.email}/>
          <span className="main-form__error input-email-error"></span>
        </label>
        <label className="form__label-place">
          <input
            type="password"
            className="form__input form__input_type_photo form__input_theme_light"
            name="password"
            placeholder="Пароль"
            required
            id="input-password"
            onChange={handleChange}
            value={formRegisterValue.password}/>
          <span className="main-form__error input-password-error"></span>
        </label>
        <button className="form__submit-btn form__submit-btn_theme_light">
          Зарегистрироватся
        </button>
      </form>
      <p className="auth-page__text">
        Уже зарегистрироны?
        <Link className="auth-page__link" to="/sign-in">Войти</Link>
      </p>
    </div>
  );
}

export default Register;

