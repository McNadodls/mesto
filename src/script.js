import "../pages/index.css";
import ValidateForm from "../scripts/validate.js";
import Card from "../scripts/card.js";
import { initialCards } from "../scripts/initialCards.js";
import Section from "../scripts/Section.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/userInfo.js";
import PopupWithImage from "../scripts/PopupWithImage.js";

const btnEditProfile = document.querySelector(".button_do_profile-edit");//кнопка ручка
const btnAddElement = document.querySelector(".button_do_profile-add");//кнопка +

const configForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_type_send",
  inactiveButtonClass: "buttont_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
}

const popupCardValidate = new ValidateForm (".popup__form_type_card", configForm);
const popupProfileValidate = new ValidateForm (".popup_type_profile", configForm);
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const cardPopup = new PopupWithForm(".popup_type_card", submitFormCard); //создания popup карточки
btnAddElement.addEventListener("click", () => { 
  cardPopup.openPopup();
  popupCardValidate.switchStatusForm();
})

const profilePopup = new PopupWithForm(".popup_type_profile", submitFormProfile); //создания popup профиля
btnEditProfile.addEventListener("click", () => { 
  profilePopup.openPopup();
  const {name, profession} = userInfo.getUserInfo(); //деструктуризация что бы не вызывать 2 раза userInfo.getUserInfo() при передачи
  profilePopup.setInputValues([name, profession]);//передает массив из textContent профиля для подставни в открывающейся инпут
  popupProfileValidate.switchStatusForm();
})

function preloadNewCard (array) { //берет массив начатьный карт
  array.forEach( (dataElem) => {
    createNewCard(dataElem);
  });
}

function createNewCard (dataElem) { //функция создания карточки
  const sectionCard = new Section ({
    item: dataElem,
    renderer: (dataElem) => {
      const card = new Card(dataElem, '#elements-template', handleCardClick);
      const cardElement = card.generateElement();
      sectionCard.setItem(cardElement);
    }
  }, '.elements');
  sectionCard.renderItems();
}

function handleCardClick (dataImg) { //функция popup картинки
  const imagePopup = new PopupWithImage(".popup_type_img");
  imagePopup.openPopup(dataImg)
  imagePopup.setEventListeners()
}

function submitFormCard (evt, inputValues) {//подтверждение создания карточки 
  evt.preventDefault();
  const {
    'popup__input_type_title': name,
    'popup__input_type_url-img': link
  } = inputValues;
  createNewCard({name, link});
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

preloadNewCard(initialCards);//создание начатьный карт
cardPopup.setEventListeners();
profilePopup.setEventListeners();

popupCardValidate.enableValidation();
popupProfileValidate.enableValidation();

