import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(
    (owner) => owner._id === currentUser._id
  );

  const cardLikeButtonClassName = `elements__icon ${
    isLiked && "elements__icon_active"
  }`;

  return (
    <li className="elements__element">
      {isOwn && (
      <button 
        className="elements__delete" 
        onClick={handleDeleteClick} 
        type="button">
      </button>
      )}
      <img 
        className="elements__image" 
        src={props.card.link} 
        alt={props.card.name} 
        onClick={handleClick}
      />
      <div className="elements__info">
        <h2 className="elements__text">{props.card.name}</h2>
        <div className="elements__like-area">
          <button 
          className={cardLikeButtonClassName} 
          onClick={handleLikeClick} 
          type="button"
          ></button>
          <p className="elements__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li> 
  )
}

export default Card;