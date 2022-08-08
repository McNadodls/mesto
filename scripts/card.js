import {openPopupImage} from './script.js';

class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTamplete () {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  generateElement () {
    this._element = this._getTamplete ();
    this._image = this._element.querySelector(".element__image");
    this._signature = this._element.querySelector(".element__signature");
    this._like = this._element.querySelector(".buttont_type_like");
    this._delete = this._element.querySelector(".button_do_element-delete");
    this._image.src = this._link;
    this._signature.textContent = this._name;
    this._setListenerCard ();
    return this._element;
  }

  _setListenerCard () {
    this._like.addEventListener("click", () => {
      this._triggerLikeClick ();
    });
    this._delete.addEventListener("click", () => {
      this._triggerDeleteClick ();
    });
    this._image.addEventListener("click", () => {
      openPopupImage(this._element);
    });
  }

  _triggerLikeClick () {
    this._like.classList.toggle("buttont_type_like-active");
  }

  _triggerDeleteClick () {
    this._element.remove();
  }

}
export { Card };
