class ValidateForm {
  constructor(formCard, config) {
    this._config = config;
    this._formList = document.querySelector(formCard);

    this.inputList = Array.from(this._formList.querySelectorAll(this._config.inputSelector));
    this.buttonElement = this._formList.querySelector(this._config.submitButtonSelector);
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
    this.checkButtonValidateImputs();
  }

  _showInputError (inputElement, errorMessage) {
    this.errorElement = this._formList.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    this.errorElement.classList.add(this._config.errorClass);
    this.errorElement.textContent = errorMessage;
  }

  _hideInputError (inputElement) {
    this.errorElement = this._formList.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    this.errorElement.classList.remove(this._config.errorClass);
    this.errorElement.textContent = "";
  }

  _setEventListeners () {
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
      });
    });
  };
  

  _hasInvalidInput () {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  checkButtonValidateImputs () {
    if (!this._hasInvalidInput()) {
      this.buttonElement.removeAttribute("disabled");
      this.buttonElement.classList.remove(this._config.inactiveButtonClass);
    } else {
      this.buttonElement.setAttribute("disabled", "");
      this.buttonElement.classList.add(this._config.inactiveButtonClass);
    }
  }
  enableValidation () {
    this._setEventListeners();
    this.checkButtonValidateImputs();
  }
}
export { ValidateForm };
