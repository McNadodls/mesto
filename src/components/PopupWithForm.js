import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.button_type_send');
    this._originalText = this._submitButton.textContent;
  }
  
  _getInputValues () {
    this._inputValues = {};
    this._inputList.forEach((elem) => {
      this._inputValues[elem.name] = elem.value;
    });
    return this._inputValues;
  }
  
  setInputValues (array) { // т.к. input относится к форме функция написана в классе
    this._inputList.forEach((input) => { 
      input.value = array[input.name]; 
      //принимает массив и по индексу меняет value у input 
      //я понмаю что обращение по индексу не не луший вариант. 
      //Но повторно искать input в sctipt.js я считаю неправильным - это задвоение кода.
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {this._handleSubmitForm(evt, this._getInputValues())});
  }

  loadingPopup(isLoading, text) {
    if (isLoading) {
      this._submitButton.textContent = text;
    } else {
      this._submitButton.textContent = this._originalText;
    }
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}