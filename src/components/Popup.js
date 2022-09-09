export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    };
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("button_type_close") ||
        evt.target.classList.contains("popup_opened")
      ) {
        this.closePopup();
      }
    });
  }
}
