import "./index.css";
import {btnEditProfile, btnAddElement, avatar, configForm} from "./components/utils/constants.js";

import Card from "./components/Card.js";
import Section from "./components/Section.js";

import FormValidator  from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";
import ConfirmPopup from "./components/ConfirmPopup.js";


import Api from "./components/Api.js";

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
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');
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
  if(like.classList.contains("buttont_type_like-active")){
    api.putLike(id)
      .then (result => {
        counter.textContent = result.likes.length;
      });
    } else {
    api.removeLike(id)
      .then (result => {
        counter.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(`Что-то пошло не так а именно ${err}`)
      })
  }
}
function setUserInfo () {
  api.getUserInfo()
    .then (result => {
      userInfo.setUserId(result._id);
      userInfo.setUserInfo(result.name, result.about);
      avatar.style.backgroundImage = `url(${result.avatar})`;
    })
    .catch((err) => {
      console.log(`Что-то пошло не так а именно ${err}`)
    });
}

function submitAvatar (evt, inputValue) {
  evt.preventDefault();
  const {'popup__input_type_url-avatar': link} = inputValue;
  api.handleAvatar(link)
    .then (result => {
     avatar.style.backgroundImage = `url(${result.avatar})`;
    });
  avatarPopup.closePopup();
}

function submitConfirmDelete(evt, element) {
  evt.preventDefault();
  api.deleteCard(element._id)
    .then (result => {
      element.remove();
      confirmPopup.closePopup();
   })
   .catch((err) => {
    console.log(`Что-то пошло не так а именно ${err}`)
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
    })
    .catch((err) => {
      console.log(`Что-то пошло не так а именно ${err}`)
    })
    .finally(() => {
      cardPopup.loadingPopup(false);
     });
  cardPopup.closePopup();
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
      userInfo.setUserInfo(result.name, result.about);
  })
    .finally(() => {
      cardPopup.loadingPopup(false);
     });
  profilePopup.closePopup();
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

api.getInitialCards()
  .then(result => {
    console.log(result);
    sectionCard.renderItems(result);
  })
  .catch((err) => {
    console.log(`Что-то пошло не так а именно ${err}`)
  });

cardPopup.setEventListeners();
profilePopup.setEventListeners();
imagePopup.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();
setUserInfo();
enableValidation(configForm);
