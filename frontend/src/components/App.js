import React from 'react'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/auth";
import ProctectedRouteElement from "./ProctectedRoute";
import InfoTooltip from "./InfoTooltip";
import Cookies from 'js-cookie';

function App() {
  const [isAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isimagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [formRegisterValue, setFormRegisterValue] = React.useState({
    email: "",
    password: "",
  });
  const [formLoginValue, setFormLoginValue] = React.useState({
    email: "",
    password: "",
  });
  const [isSuccess, setIsSuccess] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = React.useCallback(() => {
    setLoggedIn(true);
  }, [setLoggedIn]);

  React.useEffect(() => {
    function handleTokenCheck() {
      auth
        .checkToken()
        .then((res) => {
          if (res) {
            handleLogin();
            setUserEmail(res.email);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  
    handleTokenCheck(); // Вызываем функцию сразу
  
    // Остальной код useEffect
  }, [handleLogin, navigate, setUserEmail]);

  function signOut() {
    auth.signOut()
      .then(() => {
        navigate("/sign-in");
        setLoggedIn(false);
      })
      .catch((err) => console.log(err));
  }

  function handleRegisterSubmit(evt) {
    evt.preventDefault();
    auth
      .register(formRegisterValue.email, formRegisterValue.password)
      .then((res) => {
        navigate("/sign-in");
        setFormRegisterValue({ email: "", password: "" });
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => setIsInfoPopupOpen(true));
  }

  function handleLoginSubmit(evt) {
    evt.preventDefault();
    auth
      .login(formLoginValue.email, formLoginValue.password)
      .then(() => {
        setFormLoginValue({ email: "", password: "" });
        setUserEmail(formLoginValue.email);
        handleLogin();
        navigate("/");
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoPopupOpen(true);
        console.log(err);
      });
  }

  function infoApi() {
    api
      .getUserInfo()
      .then((result) => {
        setCurrentUser(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getInitialCards()
      .then((result) => {
        setCards(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  React.useEffect(() => {
    if (loggedIn) {
      infoApi();
    }
  }, [loggedIn]);
  
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard({});
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleDeletePlaceClick() {
    setIsDeletePopupOpen(!isDeletePopupOpen);
  }
  
  function handleCardClick(card) {
    setIsImagePopupOpen(!isimagePopupOpen);
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.profileEdit(data)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

 
  function handleUpdateAvatar(data) {
    setIsLoading(true);
  
    api.editAvatar(data) // Вызов метода editAvatar с подготовленными данными
      .then((result) => {
        setCurrentUser(result.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api.handleLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api.deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} userEmail={userEmail} onSignOut={signOut}/>
        <Routes>
          <Route 
            path="/"
            element={
              <ProctectedRouteElement
                element={Main}
                onEditAvatar={handleEditAvatarClick} 
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onImage={handleCardClick} 
                onCardLike={handleCardLike} 
                cards={cards} 
                onDeletePlace={handleDeletePlaceClick} 
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
              />
            }            
          />
          <Route
            path="/sign-up"
            element={
              <Register
                onRegister={handleRegisterSubmit}
                formRegisterValue={formRegisterValue}
                setFormRegisterValue={setFormRegisterValue}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                onLogin={handleLoginSubmit}
                formLoginValue={formLoginValue}
                setFormLoginValue={setFormLoginValue}
              />
            }
          />
        </Routes>
        <Footer/>
        <EditAvatarPopup 
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar} 
          isOpen={isAvatarPopupOpen} 
          onClose={closeAllPopups}/>
        <EditProfilePopup 
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser} 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}/>
        <AddPlacePopup 
          isLoading={isLoading}
          onAddPlace={handleAddPlaceSubmit} 
          isOpen={isAddPopupOpen} 
          onClose={closeAllPopups}/>
        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} 
          isOpen={isimagePopupOpen} />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoPopupOpen}
          isSuccess={isSuccess}
          successText="Вы успешно зарегистрировались!"
          unSuccessText="Что-то пошло не так! Попробуйте ещё раз."
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;