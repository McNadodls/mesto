export default class Card {
  constructor(data, userId, templateSelector, handleCardClick, handleDeleteClick, statusLike) {
    this._data = data;
    this._name = data.name;
    this._templateSelector = (templateSelector);
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._userId = userId;
    this._statusLike = statusLike;
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
    this._likes = this._element.querySelector(".element__counter");
    this._delete = this._element.querySelector(".button_do_element-delete");
    this._image.src = this._data.link;
    this._image.alt = this._name;
    this._signature.textContent = this._name;
    this._likes.textContent = this._data.likes.length;
    this._element._id = this._data._id;
    if(this._data.likes.some ((elem) =>{
      return elem._id === this._userId
      })) {
        this._like.classList.add("buttont_type_like-active");
      }
    if (!(this._data.owner._id == this._userId)) {
      this._delete.classList.add('button_none');
    }
    this._setListenerCard ();
    return this._element;
  }

  _setListenerCard () {
    this._like.addEventListener("click", () => {
      this._statusLike(this._like, this._likes, this._data._id);
    });
    this._delete.addEventListener("click", () => {
      this._handleDeleteClick (this._element);
    });
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._data);
    });
  }
}

