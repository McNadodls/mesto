let widowPopup = document.querySelector('.popup');
let profileBtn = document.querySelector('.profile__edit-button');
let popupBtn = document.querySelector('.popup__close-button');
let popupContainer = document.querySelector('.popup__container');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupInputName = document.querySelector('.popup__input_type_name');
let popupInputProfession = document.querySelector('.popup__input_type_profession');

function openedPopup(){
  widowPopup.classList.add('popup_opened');
  popupInputName.value = profileTitle.textContent;
  popupInputProfession.value = profileSubtitle.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputProfession.value;
  widowPopup.classList.remove('popup_opened');
}

function closePopup(){
  widowPopup.classList.remove('popup_opened');
}

profileBtn.addEventListener('click',openedPopup);
popupBtn.addEventListener('click',closePopup);
popupContainer.addEventListener('submit', formSubmitHandler); 