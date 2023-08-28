import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  return (
    <PopupWithForm 
      onSubmit={handleSubmit} 
      name="avatar"  
      title="Обновить аватар" 
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"} 
      isOpen={props.isOpen} 
      onClose={props.onClose}
    >
    <label className="form__label-photo">
      <input 
        ref={avatarRef} 
        type="url" 
        id="link-img" 
        name="avatar" 
        required placeholder="Ссылка на картинку" 
        className="form__input form__input_type_name"
      />
      <span className="form__span form__span_padding-url" id="link-img-error"></span>
    </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;