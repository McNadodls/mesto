let widowPopup = document.querySelector('.popup');
let profileBtn = document.querySelector('.profile__edit-button');
let popupBtn = document.querySelector('.popup__close-button');
let popupContainer = document.querySelector('.popup__container');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profilePopup = document.querySelectorAll('.popup__input');

function openedPopup(){
  widowPopup.classList.add('popup_opened');
  profilePopup[0].value = profileTitle.textContent;
  profilePopup[1].value = profileSubtitle.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = profilePopup[0].value;
  profileSubtitle.textContent = profilePopup[1].value;
  widowPopup.classList.remove('popup_opened');
}

function closePopup(){
  widowPopup.classList.remove('popup_opened');
}

profileBtn.addEventListener('click',openedPopup);
popupBtn.addEventListener('click',closePopup);
popupContainer.addEventListener('submit', formSubmitHandler); 