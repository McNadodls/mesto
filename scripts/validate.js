import {configForm} from './script.js';

const showInputError = (formElement, inputElement, errorMessage, configForm) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configForm.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configForm.errorClass);
}

const hideInputError = (formElement, inputElement, configForm) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configForm.inputErrorClass);
  errorElement.classList.remove(configForm.errorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, configForm) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, configForm);
  } else {
    hideInputError(formElement, inputElement, configForm);
  }
  checkButtonValidateImputs(formElement, configForm);
}

const setEventListeners = (formElement, configForm) => { //элем из массава(объекта)
  const inputList = Array.from( formElement.querySelectorAll(configForm.inputSelector) );
  const buttonElement = formElement.querySelector(configForm.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, configForm);
  inputList.forEach( (inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, configForm);//прослушка для проверки валидности
      toggleButtonState(inputList, buttonElement, configForm);
    });
  });
}

const enableValidation = (formElement) => {
  const formList = Array.from(document.querySelectorAll(configForm.formSelector));
  formList.forEach( (formElement) => {//для массива(объекта) =>
    setEventListeners(formElement, configForm);//при изменении передаем элем дальше
  });
}

const hasInvalidInput = (inputList, configForm) => {
  return inputList.some( (inputElement) => {
    return !inputElement.validity.valid;
}); 
}

const toggleButtonState  = (inputList, buttonElement, configForm) => {
  if ( hasInvalidInput(inputList, configForm) ) {
    buttonElement.classList.add(configForm.inactiveButtonClass);
} else {
    buttonElement.classList.remove(configForm.inactiveButtonClass); 
  }
}

function checkInputValidateImputs(formElement, configForm) {
  const inputList = Array.from( formElement.querySelectorAll(configForm.inputSelector) );
  return inputList.every(function(elem) {
    return elem.validity.valid;
  });
}

function checkButtonValidateImputs(formElement, configForm) {
  const buttonElement = formElement.querySelector(configForm.submitButtonSelector);
  if (checkInputValidateImputs(formElement, configForm)) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(configForm.inactiveButtonClass);
  } else {
    buttonElement.setAttribute('disabled', '');
    buttonElement.classList.add(configForm.inactiveButtonClass);
  }
}


export { checkButtonValidateImputs, enableValidation };