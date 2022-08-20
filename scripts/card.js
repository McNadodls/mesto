export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = (templateSelector);
    this._handleCardClick = handleCardClick;
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
    this._image.alt = this._name;
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
      this._handleCardClick(this._data);
    });
  }

  _triggerLikeClick () {
    this._like.classList.toggle("buttont_type_like-active");
  }

  _triggerDeleteClick () {
    this._element.remove();
  }
}

