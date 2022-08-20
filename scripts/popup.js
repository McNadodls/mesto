export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = document.querySelector(selectorPopup);
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.closePopup(document.querySelector(".popup_opened"));
    };
  }

  openPopup() {
    this._selectorPopup.classList.add("popup_opened");
  }

  closePopup() {
    this._selectorPopup.classList.remove("popup_opened");
    
  }

  setEventListeners() {
    document.addEventListener("keydown", (evt) => {this._handleEscClose(evt)});

    this._selectorPopup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("button_type_close") ||
        evt.target.classList.contains("popup_opened")
      ) {
        this.closePopup(popup);
      }
    });
  }
}
