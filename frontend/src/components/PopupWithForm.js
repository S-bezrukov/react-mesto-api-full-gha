import React from 'react'

function PopupWithForm({isOpen, onClose, name, title, buttonText, children, onSubmit}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__image" type="button" onClick={() => onClose()}></button>
        <form className="form" name={`form-${name}`} onSubmit={onSubmit}>
          <h2 className="form__title">{title}</h2>
          {children}
          <button type="submit" className="form__submit-btn form__submit-btn_action_add">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;