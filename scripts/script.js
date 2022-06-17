let widowPopup = document.querySelector('.popup');
let profileEditBtn = document.querySelector('.profile__edit-button');
let popupCloseBtn = document.querySelector('.popup__close-button');
let popupSaveBtn = document.querySelector('.popup__save-button');
let popupWidow = document.querySelector('.popup__window');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profileTitlePopup = document.querySelector('.popup__edit_input_title');
let profileSubtitlePopup = document.querySelector('.popup__edit_input_subtitle');

function openedPopup(){
    widowPopup.classList.add('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = profileTitlePopup.value;
    profileSubtitle.textContent = profileSubtitlePopup.value;
    widowPopup.classList.remove('popup_opened');
}

function closePopup(){
    widowPopup.classList.remove('popup_opened');
}

profileEditBtn.addEventListener('click',openedPopup);
popupCloseBtn.addEventListener('click',closePopup);
popupWidow.addEventListener('submit', formSubmitHandler); 