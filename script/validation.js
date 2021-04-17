// все настройки
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_invalid',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error'
};



const showError = (formElement,inputElement,errorMessage,validationConfig) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  //console.log(formError)
  inputElement.classList.add(validationConfig.inputErrorClass); // полоска
  formError.textContent = errorMessage;
  //console.log(errorMessage)
  formError.classList.add(validationConfig.errorClass);//span
};
//спрятать
const hideError = (formElement,inputElement,validationConfig) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.textContent = '';
  //console.log(errorMessage)
  formError.classList.remove(validationConfig.errorClass);//полоска
  inputElement.classList.remove(validationConfig.inputErrorClass);//span
};

//проверка валидности ввода
const checkInputValidity = (formElement,inputElement,errorMessage,validationConfig) => {
  if  (!inputElement.validity.valid) {
    showError(formElement,inputElement,errorMessage,validationConfig)

} else {
  hideError(formElement,inputElement,validationConfig)
}
};

const  deactivateButton = (buttonElement,validationConfig) =>{
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
  buttonElement.disabled = true;
}

const activateButton = (buttonElement,validationConfig) => {
 buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  buttonElement.disabled = false;
}
//дергать кнопку для ВСЕГО МАССИВА инпутс
const toggleBtnState = (inputList,buttonElement,validationConfig) => {
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid // если хоть один из, вместо every который был
);
  if (hasInvalidInput) { // проверка та
    deactivateButton(buttonElement,validationConfig)
    //buttonElement.setAttribute('disabled','');
    //buttonElement.classList.add("popup__button-submit_invalid");
    //console.log('button ne ok')
   } else {
    activateButton(buttonElement,validationConfig)
    //buttonElement.removeAttribute('disabled');
    //buttonElement.classList.remove("popup__button-submit_invalid");
    //console.log('button ok')
   }
}



const setEventListeners = (formElement,validationConfig) => {
  //соберем инпуты (все) и кнопки

  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  //console.log(inputList)
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  deactivateButton(buttonElement,validationConfig.inactiveButtonClass);
  // для каждого инпута чек на валидность и дерганье кнопки
    inputList.forEach(inputElement => {
        inputElement.addEventListener("input", (event) => {
          if (inputElement.value !== '') {
            checkInputValidity(formElement, inputElement,inputElement.validationMessage,validationConfig);
            toggleBtnState(inputList, buttonElement,validationConfig);
          }
          else {
            hideError (formElement, inputElement, validationConfig);
          }
        });
    });
    // сделаем чтобы проверялось до ввода
    toggleBtnState(inputList, buttonElement,validationConfig);
  };


function checkFormValidity (formElement, validationConfig) {

const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
inputList.forEach(inputElement=> {
    if (inputElement.value !== '') {
      checkInputValidity(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      hideError (formElement, inputElement, validationConfig);
    }
    toggleBtnState(inputList, buttonElement,validationConfig);
  })
}

//главная функа на валидацию
//переименовала переменные по-понятнее.

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector)) // соберем все
//console.log(formsList);
//для _каждой_ формы из форм
formList.forEach(formElement =>{
formElement.addEventListener('submit',e =>{
  e.preventDefault();
});
setEventListeners(formElement,validationConfig);
})
};


// включение валидации вызовом enableValidation
enableValidation(validationConfig);


