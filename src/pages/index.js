import "./pages/index.css";
import {btnEditProfile, btnAddElement, avatar, configForm} from "../components/utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";

import FormValidator  from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import ConfirmPopup from "../components/ConfirmPopup.js";


import Api from "../components/Api.js";

const formValidators = {}

// Включение валидации
const enableValidation = (configForm) => {
  const formList = Array.from(document.querySelectorAll(configForm.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, configForm)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

const imagePopup = new PopupWithImage(".popup_type_img");
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__image');
const cardPopup = new PopupWithForm(".popup_type_card", submitFormCard); //создания popup карточки
const profilePopup = new PopupWithForm(".popup_type_profile", submitFormProfile); //создания popup профиля
const sectionCard = new Section (generateCard, ".elements");
const confirmPopup = new ConfirmPopup (".popup_type_confirm", submitConfirmDelete);
const avatarPopup = new PopupWithForm(".popup_type_avatar", submitAvatar);

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-49', '0e0d7772-71f5-4ff2-9ff2-a4d42c8f7f70'); 

function generateCard ({name, link, _id, likes, owner}) {
  const card = new Card({name, link, _id, likes, owner}, userInfo.getUserId(), '#elements-template', handleCardClick, handleDeleteClick, statusLike);
  return card.generateElement();
}

function handleCardClick (dataImg) { //функция popup картинки
  imagePopup.openPopup(dataImg)
}

function handleDeleteClick(elem) {
  confirmPopup.openPopup();
  confirmPopup.setElement(elem);

}
function statusLike (like, counter, id) {
  like.classList.toggle("buttont_type_like-active");
  if(like.classList.contains("buttont_type_like-active")){
    api.putLike(id)
      .then (result => {
        counter.textContent = result.likes.length;
      })
      .catch((err) => {
        api.enterError (err);
      });
    } else {
    api.removeLike(id)
      .then (result => {
        counter.textContent = result.likes.length;
      })
      .catch((err) => {
        api.enterError (err);
      })
  }
}

function submitAvatar (evt, inputValue) {
  evt.preventDefault();
  const {'popup__input_type_url-avatar': link} = inputValue;
  avatarPopup.loadingPopup(true, "Сохранение...")
  api.handleAvatar(link)
    .then (result => {
      userInfo.setUserAvatar(result);
      avatarPopup.closePopup();
    })
    .catch((err) => {
      api.enterError (err);
    })
    .finally(() => {
      avatarPopup.loadingPopup(false);
     });
}

function submitConfirmDelete(evt, element) {
  evt.preventDefault();
  api.deleteCard(element._id)
    .then (result => {
      element.remove();
      confirmPopup.closePopup();
   })
   .catch((err) => {
    api.enterError (err);
  });
 }

function submitFormCard (evt, inputValues) {//подтверждение создания карточки 
  evt.preventDefault();
  const {
    'popup__input_type_title': name,
    'popup__input_type_url-img': link
  } = inputValues;
  cardPopup.loadingPopup(true, "Создание...")
  api.addCard(name, link)
    .then (result => {
      sectionCard.addItem(result);
      cardPopup.closePopup();
    })
    .catch((err) => {
      api.enterError (err);
    })
    .finally(() => {
      cardPopup.loadingPopup(false);
     });
  
}

function submitFormProfile (evt, inputValues) {//подтверждение изменения профиля 
  evt.preventDefault();
  const {
    'popup__input_type_name': name,
    'popup__input_type_profession': profession
  } = inputValues;
  profilePopup.loadingPopup(true, "Сохранение...")
  api.changeProfileInfo(name, profession)
    .then (result => {
      userInfo.setUserInfo(result);
      profilePopup.closePopup();
    })
    .catch((err) => {
     api.enterError (err);
     })
    .finally(() => {
      profilePopup.loadingPopup(false);
     });
}

avatar.addEventListener("click", () => { 
  avatarPopup.openPopup();
  formValidators[ "popup__form_type_avatar" ].switchStatusForm();
})

btnAddElement.addEventListener("click", () => { 
  cardPopup.openPopup();
  formValidators[ "popup__form_type_card" ].switchStatusForm();
})

btnEditProfile.addEventListener("click", () => { 
  profilePopup.openPopup();
  const {name: popup__input_type_name, profession: popup__input_type_profession} = userInfo.getUserInfo(); //деструктуризация что бы не вызывать 2 раза userInfo.getUserInfo() при передачи
  profilePopup.setInputValues({popup__input_type_name, popup__input_type_profession});//передает массив из textContent профиля для подставни в открывающейся инпут
  formValidators[ "popup__form_type_profile" ].switchStatusForm();
})

Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
  .then(([userData, cards]) => {
    userInfo.setUserId(userData);
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    sectionCard.renderItems(cards);
})
  .catch(err => {
    api.enterError (err);
  })

cardPopup.setEventListeners();
profilePopup.setEventListeners();
imagePopup.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();
enableValidation(configForm);
