import React from "react";
import successIcon from "../images/check-icon.svg";
import errorIcon from "../images/error-icon.svg";

function InfoTooltip({
  isOpen,
  onClose,
  onCloseOverlay,
  isSuccess,
  successText,
  unSuccessText,
}) {
  return (
    <div
      className={`popup popup_type_info ${isOpen ? "popup_opened" : ""}`}
      onClick={onCloseOverlay}>
      <div className="popup__container">
        <button
          className="popup__image"
          type="button"
          onClick={onClose}>
        </button>
        <img
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? successText : unSuccessText}
          className="popup__container-icon"/>
        <h2 className="popup__title">{isSuccess ? successText : unSuccessText}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;