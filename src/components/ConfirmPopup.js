import Popup from "./Popup.js";

export default class ConfirmPopup extends Popup {
  constructor(popupSelector, submitConfirmDelete) {
    super(popupSelector);
    this._submitConfirmDelete = submitConfirmDelete;
    this._form = this._popup.querySelector('.popup__form');
  }

  setElement (elem) {
    this.element = elem;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {this._submitConfirmDelete(evt, this.element)});
  }
}