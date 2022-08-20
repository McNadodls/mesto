import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = document.querySelector(".popup__image");
    this._signaturePopup = document.querySelector(".popup__signature")
  }
  
  openPopup({name, link}) {
    super.openPopup();
    this._imagePopup.src = link;
    this._imagePopup.alt = name;
    this._signaturePopup.textContent = name;
  }
}