import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");

  React.useEffect(() => {
    setName("");
    setImage("");
  }, [props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleImageChange(e) {
    setImage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ name, link: image });
  }

  return (
    <PopupWithForm 
      onSubmit={handleSubmit} 
      name="add" 
      title="Новое место" 
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      buttonText={props.isLoading ? "Создается..." : "Создать"}
    >
      <label className="form__label-place">
        <input 
          onChange={handleNameChange} 
          value={name} 
          type="text" 
          minLength="2" 
          maxLength="30" 
          id="place-card" 
          name="placename" 
          required 
          placeholder="Название" 
          className="form__input form__input_type_place"
        />
        <span className="form__span" id="place-card-error"></span>
      </label>
      <label className="form__label-photo">
        <input 
          onChange={handleImageChange} 
          value={image} 
          type="url" 
          id="link-image" 
          name="placeimage" 
          required 
          placeholder="Ссылка на картинку" 
          className="form__input form__input_type_photo"
        />
        <span className="form__span form__span_padding-url" id="link-image-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;