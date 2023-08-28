import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm 
      onSubmit={handleSubmit} 
      name="edit" 
      title="Редактировать профиль" 
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'} 
      onCloseOverlay={props.onCloseOverlay}
    >
      <label className="form__label-name">
        <input 
          type="text" 
          onChange={handleNameChange} value={name || ''} 
          minLength="2" 
          maxLength="40" 
          id="name" 
          name="username" 
          required placeholder="Имя" 
          className="form__input form__input_type_name"
        />
        <span className="form__span" id="name-error"></span>
      </label>
      <label className="form__label-job">
        <input type="text" 
          onChange={handleDescriptionChange} 
          value={description || ''}  
          minLength="2" 
          maxLength="200" 
          id="about-us" 
          name="description" 
          required placeholder="О себе" 
          className="form__input form__input_type_job"
        />
        <span className="form__span" id="about-us-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;