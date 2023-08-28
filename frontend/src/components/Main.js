import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from './Card';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-area">
          <img src={currentUser.avatar} className="profile__avatar" alt="Аватар профиля" />
          <button type="button" className="profile__avatar-edit" aria-label="Редактировать аватар профиля" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <h2 className="profile__description">{currentUser.about}</h2>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements" aria-label="Список изображений">
        <ul className="elements__list">
        {props.cards.map(card => (
         <Card card={card} onCardClick={props.onImage} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} onDeletePlace={props.onDeletePlace} key={card._id}/>
        ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;