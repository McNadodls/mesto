const popups = document.querySelectorAll('.popup')
const widowPopupProfile = document.querySelector('.popup_type_profile');
const editProfileBtn = document.querySelector('.button_do_profile-edit');
/*const closePopupProfileBtn = document.querySelector('.button_do_popup-close-profile');*/
const formProfile = document.querySelector('.popup__form_type_profile');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputProfession = document.querySelector('.popup__input_type_profession');

const addElementBtn = document.querySelector('.button_do_profile-add');
const widowPopupCard = document.querySelector('.popup_type_card');
const elementTitle = document.querySelector('.popup__input_type_title'); 
const elementUrl = document.querySelector('.popup__input_type_url-img'); 

const elementsTemplate = document.querySelector('#elements-template'); 
const elements = document.querySelector('.elements');
/*const closeCardPopupBtn = document.querySelector('.button_do_popup-close-card');*/
const formCard = document.querySelector('.popup__form_type_card');

const widowPopupImage = document.querySelector('.popup_type_img');
const imagePopup = document.querySelector('.popup__image');
const signaturePopup = document.querySelector('.popup__signature');
/*const closeImagePopupBtn = document.querySelector('.button_do_popup-close-image');*/



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
  const delite = elementTemplate.querySelector('.button_do_element-delete');
  elementTemplate.querySelector('.element__signature').textContent = name;
  image.src = link;
  image.alt = name;
  image.addEventListener('click', function () { 
    imagePopup.src = link;
    imagePopup.alt = name;
    signaturePopup.textContent = name;
    openPopup(widowPopupImage);
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
function openedPopupProfile(){/*открыть*/
  openPopup(widowPopupProfile);
  popupInputName.value = profileTitle.textContent;
  popupInputProfession.value = profileSubtitle.textContent;
}

function submitFormProfile (evt) {/*заменить*/
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputProfession.value;
  closePopup(widowPopupProfile);
}
/*карточки*/
function submitFormCard (evt) {
  evt.preventDefault();
  
  const variable =  addCardNew(elementTitle.value, elementUrl.value);
   elements.prepend(variable);
   closePopup(widowPopupCard);
   formCard.reset();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

initialCard ();

editProfileBtn.addEventListener('click', openedPopupProfile); //профиль
/*closePopupProfileBtn.addEventListener('click', () => {closePopup(widowPopupProfile)});*/
formProfile.addEventListener('submit', submitFormProfile);

addElementBtn.addEventListener('click', () => { openPopup(widowPopupCard)});
/*closeCardPopupBtn.addEventListener('click', () => {closePopup(widowPopupCard)});*/
formCard.addEventListener('submit', submitFormCard);

/*closeImagePopupBtn.addEventListener('click', () => {closePopup(widowPopupImage)});*/
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('button_type_close')) {
        closePopup(popup)
      }
  })
}) 