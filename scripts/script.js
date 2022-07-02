let widowPopupProfile = document.querySelector('.popup_type_profile');
let editProfileBtn = document.querySelector('.button_do_profile_edit');
let closePopupProfileBtn = document.querySelector('.button_do_popup_close-profile');
let formProfile = document.querySelector('.popup__form_type_profile');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupInputName = document.querySelector('.popup__input_type_name');
let popupInputProfession = document.querySelector('.popup__input_type_profession');

let addElementBtn = document.querySelector('.button_do_profile_add');
let widowPopupCard = document.querySelector('.popup_type_card');
let elementTitle = document.querySelector('.popup__input_type_title'); 
let elementUrl = document.querySelector('.popup__input_type_url-img'); 

const elementsTemplate = document.querySelector('#elements-template'); 
let elements = document.querySelector('.elements');
let closeCardPopupBtn = document.querySelector('.button_do_popup_close-card');
let formCard = document.querySelector('.popup__form_type_card');

let widowPopupImage = document.querySelector('.popup_type_img');
let imagePopup = document.querySelector('.popup__image');
let signaturePopup = document.querySelector('.popup__signature');
let closeImagePopupBtn = document.querySelector('.button_do_popup_close-image');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



function addCardNew(name, link){
  const elementTemplate = elementsTemplate.content.cloneNode(true);
  const image = elementTemplate.querySelector('.element__image');
  const ImageLink = elementTemplate.querySelector('.buttont_type_like');
  const delite = elementTemplate.querySelector('.button_do_element_delete');
  elementTemplate.querySelector('.element__signature').textContent = name;
  image.src = link;
  image.alt = name;
  image.addEventListener('click', function () { 
    imagePopup.src = link;
    imagePopup.alt = name;
    signaturePopup.textContent = name;
    widowPopupImage.classList.add('popup_opened');
  });
  ImageLink.addEventListener('click', function () { 
    ImageLink.classList.toggle('buttont_type_like-active');
  });
  delite.addEventListener('click', function() {
    delite.closest('.element').remove();
   });
  return elementTemplate;
  };

  function initialCard (){
    initialCards.forEach(function (elem){
     const variable =  addCardNew(elem.name, elem.link);
     elements.prepend(variable);
   })
  };

/*Профиль*/ 
function openedPopupProfile(){
  widowPopupProfile.classList.add('popup_opened');
  popupInputName.value = profileTitle.textContent;
  popupInputProfession.value = profileSubtitle.textContent;
}

function formProfileSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputProfession.value;
  widowPopupProfile.classList.remove('popup_opened');
}

function closePopupProfile(){
  widowPopupProfile.classList.remove('popup_opened');
}
/*Карточки*/
function openedAddPopup(){
  widowPopupCard.classList.add('popup_opened');
}

function formCardSubmit (evt) {
  evt.preventDefault();
  
  const variable =  addCardNew(elementTitle.value, elementUrl.value);
   elements.prepend(variable);
  
  widowPopupCard.classList.remove('popup_opened');
}

function closeAddPopup(){
  widowPopupCard.classList.remove('popup_opened');
}
/*Картинка*/

function closeImagePopup(){
  widowPopupImage.classList.remove('popup_opened');
}


initialCard ();

editProfileBtn.addEventListener('click', openedPopupProfile); //профиль
closePopupProfileBtn.addEventListener('click', closePopupProfile);
formProfile.addEventListener('submit', formProfileSubmit);

addElementBtn.addEventListener('click', openedAddPopup);
closeCardPopupBtn.addEventListener('click', closeAddPopup);
formCard.addEventListener('submit', formCardSubmit);

closeImagePopupBtn.addEventListener('click', closeImagePopup);
