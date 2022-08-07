class Element {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTamplete() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateElement() {
    this._element = this._getTamplete();
    this._image = this._element.querySelector(".element__image");
    this._signature = this._element.querySelector(".element__signature");
    this._like = this._element.querySelector(".buttont_type_like");
    this._delete = this._element.querySelector(".button_do_element-delete");
    this._widowPopupImage = document.querySelector(".popup_type_img");
    this._imagePopup = this._widowPopupImage.querySelector(".popup__image");
    this._signaturePopup = this._widowPopupImage.querySelector(".popup__signature");
    this._setListenerCard();

    this._image.src = this._link;
    this._signature.textContent = this._name;
    return this._element;
  }
  _setListenerCard() {
    this._like.addEventListener("click", () => {
      this._triggerLikeClick();
    });
    this._delete.addEventListener("click", () => {
      this._triggerDeleteClick();
    });
    this._element.querySelector(".element__image").addEventListener("click", () => {
      this._triggerImageClick();
    });
  }
  _triggerLikeClick() {
    this._like.classList.toggle("buttont_type_like-active");
  }
  _triggerDeleteClick() {
    this._element.remove();
  }
  _triggerImageClick() {
    this._imagePopup.src = this._link;
    this._imagePopup.alt = this._name;
    this._signaturePopup.textContent = this._name;
    this._widowPopupImage.classList.add("popup_opened");
  }
}
export { Element };
