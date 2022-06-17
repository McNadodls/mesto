let container = document.querySelector('.body');
let editPopup = container.querySelector('.popup');
let showEditBotton = container.querySelector('.profile__edit-botton');
let closeEditBotton = container.querySelector('.popup__close-botton');
let saveEditPopup = container.querySelector('.popup__save-botton');
let profileTitle = container.querySelector('.profile__title');
let profileSubtitle = container.querySelector('.profile__subtitle');
let profileTitlePopup = container.querySelector('.popup__edit-title');
let profileSubtitlePopup = container.querySelector('.popup__edit-subtitle');

function showEditPopup(){
    editPopup.classList.remove('popup_close');
    editPopup.classList.add('popup_show');
    profileTitlePopup.value = profileTitle.textContent;
    profileSubtitlePopup.value = profileSubtitle.textContent;
}
showEditBotton.addEventListener('click',showEditPopup);

function closeEditPopup(){
    editPopup.classList.remove('popup_show');
    editPopup.classList.add('popup_close');
}
closeEditBotton.addEventListener('click',closeEditPopup);

function textСhange() {
    profileTitle.textContent = profileTitlePopup.value;
    profileSubtitle.textContent = profileSubtitlePopup.value;
    closeEditPopup()
}
saveEditPopup.addEventListener('click',textСhange);
