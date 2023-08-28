import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_zoom_card ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_image_card">
        <button className="popup__image popup__image_zoom_card" onClick={() => props.onClose()}></button>
        <img src={props.card.link} alt={props.card.name} className="popup__image-place" />
        <h2 className="popup__title-place">{props.card.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;