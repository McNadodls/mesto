import { checkButtonValidateImputs, enableValidation } from "./validate.js";
import { initialCards } from "./initialCards.js";
const ecsKey = "Escape";
const popups = document.querySelectorAll(".popup");
const widowPopupProfile = document.querySelector(".popup_type_profile");
const editProfileBtn = document.querySelector(".button_do_profile-edit");

const formProfile = document.querySelector(".popup__form_type_profile");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputProfession = document.querySelector(
  ".popup__input_type_profession"
);

const addElementBtn = document.querySelector(".button_do_profile-add");
const widowPopupCard = document.querySelector(".popup_type_card");
const elementTitle = document.querySelector(".popup__input_type_title");
const elementUrl = document.querySelector(".popup__input_type_url-img");

const elementsTemplate = document.querySelector("#elements-template");
const elements = document.querySelector(".elements");
const formCard = document.querySelector(".popup__form_type_card");

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
};

/*class Form {
  constructor(data, #templateSelector){
    this._title = data.title;
    this._signature = data.signature;
    this._submitButton = data.submitButton;
    this._closeButton = data.closeButton;
    
  }
}*/



class Element {
  constructor(dataElem, templateSelector){
    this._name = dataElem.name;
    this._link = dataElem.link;
    this._templateSelector = templateSelector;
  }

  _getTamplete () {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateElement() {
    this._element = this._getTamplete ();
    this._setListenerCard();
    
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__signature').textContent = this._name;
    return this._element;
  }
  _setListenerCard () {
    this._element.querySelector(".buttont_type_like").addEventListener("click", () => {
      this._triggerLikeClick();
    });
    this._element.querySelector(".button_do_element-delete").addEventListener("click", () => {
      this._triggerDeleteClick();
    });
    this._element.querySelector('.element__image').addEventListener("click", () => {
      this._triggerImageClick();
    });
  }
  _triggerLikeClick () {
    this._element.querySelector(".buttont_type_like").classList.toggle("buttont_type_like-active");
  }

  _triggerDeleteClick () {
    this._element.remove();
  }
  
  _triggerImageClick () {
    imagePopup.src = this._link;
    imagePopup.alt = this._name;
    console.log(this.link);
    signaturePopup.textContent = this._name;
    openPopup(widowPopupImage);
  }

}
function createNewCard (array){
  console.log(array);
  array.forEach((dataElem) => {
  const newElement = new Element(dataElem, '#elements-template');
  const cart = newElement.generateElement();
  document.querySelector('.elements').prepend(cart);
});
}


/*function createNewCard(name, link) {
  const elementNewCard = elementsTemplate.content.cloneNode(true);
  const image = elementNewCard.querySelector(".element__image");
  const ImageLink = elementNewCard.querySelector(".buttont_type_like");
  const buttonDelete = elementNewCard.querySelector(".button_do_element-delete");
  elementNewCard.querySelector(".element__signature").textContent = name;
  image.src = link;
  image.alt = name;
  image.addEventListener("click", function () {
    imagePopup.src = link;
    imagePopup.alt = name;
    signaturePopup.textContent = name;
    openPopup(widowPopupImage);
  });
  ImageLink.addEventListener("click", function () {
    ImageLink.classList.toggle("buttont_type_like-active");
  });
  buttonDelete.addEventListener("click", function () {
    buttonDelete.closest(".element").remove();
  });
  return elementNewCard;
}

function addNewCard(newCard) {
  elements.prepend(newCard);
}

function createInitialCard() {
  initialCards.forEach(function (elem) {
    const newCard = createNewCard(elem.name, elem.link);
    addNewCard(newCard);
  });
}*/

/*Профиль*/
function openPopupProfile() {
  /*открыть*/
  openPopup(widowPopupProfile);
  popupInputName.value = profileTitle.textContent;
  popupInputProfession.value = profileSubtitle.textContent;
}

function submitFormProfile(evt) {
  /*заменить*/
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputProfession.value;
  closePopup(widowPopupProfile);
}
/*карточки*/
function submitFormCard(evt) {
  evt.preventDefault();
  const newCardConfig = [
    {
      name: elementTitle.value,
      link: elementUrl.value
    }
  ]
  createNewCard(newCardConfig);
  closePopup(widowPopupCard);
  formCard.reset();
  checkButtonValidateImputs(formCard, configForm);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", checkKeyPressEsc);
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", checkKeyPressEsc);
}

function checkKeyPressEsc(evt) {
  if (evt.key === ecsKey) {
    closePopup(document.querySelector(".popup_opened"));
  }
}
//createInitialCard();
createNewCard(initialCards);

editProfileBtn.addEventListener("click", openPopupProfile); //профиль
formProfile.addEventListener("submit", submitFormProfile);

addElementBtn.addEventListener("click", () => {
  openPopup(widowPopupCard);
}); //карточка
formCard.addEventListener("submit", submitFormCard);

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("button_type_close") ||
      evt.target.classList.contains("popup_opened")
    ) {
      closePopup(popup);
    }
  });
});

enableValidation(configForm);
