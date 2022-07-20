const dateForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button_type_send',
  inactiveButtonClass: 'buttont_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(dateForm.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(dateForm.errorClass);
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(dateForm.inputErrorClass);
  errorElement.classList.remove(dateForm.errorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const setEventListeners = (formElement) => { //элем из массава(объекта)
  const inputList = Array.from(formElement.querySelectorAll(dateForm.inputSelector));
  const buttonElement = formElement.querySelector(dateForm.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);//прослушка для проверки валидности
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = (formElement) => {
  const formList = Array.from(document.querySelectorAll(dateForm.formSelector));
  formList.forEach((formElement) => {//для массива(объекта) =>
    formElement.addEventListener('submit ', function (evt) {//прослушка на каждый элем
      evt.preventDefault(); //откл поведение
    });
    setEventListeners(formElement);//при изменении передаем элем дальше
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
}

const toggleButtonState  = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)){
    buttonElement.classList.add(dateForm.inactiveButtonClass);
} else {
  buttonElement.classList.remove(dateForm.inactiveButtonClass); 
  }
}

function checkInputValidateImputs(formElement, dateForm) {
  const inputList = Array.from(formElement.querySelectorAll(dateForm.inputSelector));
  let inputStatus = false;
  for (let i =0; i<inputList.length;i++) {
    if (!inputList[i].validity.valid) {
      inputStatus = false;
      break;
    } else {
      inputStatus = true;
    }
  }
  return inputStatus;
}



enableValidation(dateForm);
export { checkInputValidateImputs, dateForm};