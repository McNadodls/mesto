import { ValidateForm } from "./validate.js";
import { Card } from "./card.js";
import { initialCards } from "./initialCards.js";

const ecsKey = "Escape";

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const elementsArea = document.querySelector(".elements");

const popups = document.querySelectorAll(".popup");

const btnEditProfile = document.querySelector(".button_do_profile-edit");//кнопка ручка
const widowPopupProfile = document.querySelector(".popup_type_profile");//popup профиля
const formProfile = document.querySelector(".popup__form_type_profile");//form профиля
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputProfession = document.querySelector(".popup__input_type_profession");

const btnAddElement = document.querySelector(".button_do_profile-add");//кнопка +
const widowPopupCard = document.querySelector(".popup_type_card");//popup карточки
const formCard = document.querySelector(".popup__form_type_card"); //form карточки  
const elementTitle = document.querySelector(".popup__input_type_title");//popup title карточки 
const elementUrl = document.querySelector(".popup__input_type_url-img");//popup url карточки 

const widowPopupImage = document.querySelector(".popup_type_img");
const imagePopup = document.querySelector(".popup__image");
const signaturePopup = document.querySelector(".popup__signature");

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

function preloadNewCard (array) { //берет массив начатьный карт
  array.forEach( (dataElem) => {
    createNewCard(dataElem.name, dataElem.link);
  });
}

function createNewCard (name, link) { //функция создания карточки
  const newCard = new Card (name, link, "#elements-template"); //генерация карточки
  const newElement = newCard.generateElement();
  putNewCard(newElement);
}

function openPopupImage (newElement) {//открытие popup с фото
  const cardImage = newElement.querySelector(".element__image");
  const signatureCard = newElement.querySelector(".element__signature");
  imagePopup.src = cardImage.src;
  imagePopup.alt = cardImage.alt;
  signaturePopup.textContent = signatureCard.textContent;
  openPopup(widowPopupImage);
};

function putNewCard (newElement) {//добавление карточки в DOM
  elementsArea.prepend(newElement); 
}


function openPopupProfile () { //открыть изменения профиля
  openPopup(widowPopupProfile);
  popupInputName.value = profileTitle.textContent;
  popupInputProfession.value = profileSubtitle.textContent;
  popupProfileValidate.checkButtonValidateImputs();
}

function submitFormProfile (evt) {//подтверждение изменения профиля
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputProfession.value;
  closePopup(widowPopupProfile);
}

function submitFormCard (evt) {//подтверждение создания карточки 
  evt.preventDefault();
  createNewCard(elementTitle.value, elementUrl.value);
  closePopup(widowPopupCard);
  formCard.reset();
  popupCardValidate.checkButtonValidateImputs();
}

function openPopup (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", checkKeyPressEsc);
}
function closePopup (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", checkKeyPressEsc);
}

function checkKeyPressEsc (evt) {//рекция на нажатие esc
  if (evt.key === ecsKey) {
    closePopup(document.querySelector(".popup_opened"));
  }
}

popups.forEach( (popup) => { //закрыте единственного popup
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("button_type_close") ||
      evt.target.classList.contains("popup_opened")
    ) {
      closePopup(popup);
    }
  });
});

preloadNewCard(initialCards);//создание начатьный карт
/*слушатели профиля*/
btnEditProfile.addEventListener("click", openPopupProfile);
formProfile.addEventListener("submit", submitFormProfile);
/*слушатели карточек*/
btnAddElement.addEventListener("click", () => {openPopup(widowPopupCard);}); 
formCard.addEventListener("submit", submitFormCard);
/*включение валидации*/
popupCardValidate.enableValidation();
popupProfileValidate.enableValidation();

export{openPopupImage};
