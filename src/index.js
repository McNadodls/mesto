import "./index.css";
import {btnEditProfile, btnAddElement, configForm} from "./utils/constants.js";

import Card from "./components/Card.js";
import { initialCards } from "./utils/initialCards.js";
import Section from "./components/Section.js";

import FormValidator  from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";


const imagePopup = new PopupWithImage(".popup_type_img");
const popupCardValidate = new FormValidator  (".popup__form_type_card", configForm);
const popupProfileValidate = new FormValidator  (".popup_type_profile", configForm);
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');
const cardPopup = new PopupWithForm(".popup_type_card", submitFormCard); //создания popup карточки
const profilePopup = new PopupWithForm(".popup_type_profile", submitFormProfile); //создания popup профиля



const sectionCard = new Section ({renderer: (dataElem) => {
    sectionCard.setItem(generateCard(dataElem));
 }
}, '.elements');

function generateCard ({name, link}) {
  const card = new Card({name, link}, '#elements-template', handleCardClick);
  return card.generateElement();
}

function handleCardClick (dataImg) { //функция popup картинки
  imagePopup.openPopup(dataImg)
}

function submitFormCard (evt, inputValues) {//подтверждение создания карточки 
  evt.preventDefault();
  const {
    'popup__input_type_title': name,
    'popup__input_type_url-img': link
  } = inputValues;
  sectionCard.setItem(generateCard({name, link}));
  cardPopup.closePopup();
}

function submitFormProfile (evt, inputValues) {//подтверждение изменения профиля 
  evt.preventDefault();
  const {
    'popup__input_type_name': name,
    'popup__input_type_profession': profession
  } = inputValues;
  userInfo.setUserInfo(name, profession);
  profilePopup.closePopup();
}

btnAddElement.addEventListener("click", () => { 
  cardPopup.openPopup();
  popupCardValidate.switchStatusForm();
})

btnEditProfile.addEventListener("click", () => { 
  profilePopup.openPopup();
  const {name: popup__input_type_name, profession: popup__input_type_profession} = userInfo.getUserInfo(); //деструктуризация что бы не вызывать 2 раза userInfo.getUserInfo() при передачи
  profilePopup.setInputValues({popup__input_type_name, popup__input_type_profession});//передает массив из textContent профиля для подставни в открывающейся инпут
  popupProfileValidate.switchStatusForm();
})


sectionCard.renderItems(initialCards); // предзагрузка карточек на страницу
cardPopup.setEventListeners();
profilePopup.setEventListeners();
imagePopup.setEventListeners()

popupCardValidate.enableValidation();
popupProfileValidate.enableValidation();

