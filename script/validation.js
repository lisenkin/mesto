// все настройки
const conf = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_invalid',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error'
};



const showError = (formElement,inputElement,errorMessage,conf) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  //console.log(formError)
  inputElement.classList.add('popup__input_invalid'); // полоска
  formError.textContent = errorMessage;
  //console.log(errorMessage)
  formError.classList.add('popup__error_active');//span
};
//спрятать
const hideError = (formElement,inputElement,conf) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  formError.textContent = '';
  //console.log(errorMessage)
  formError.classList.remove('popup__error_active');//полоска
  inputElement.classList.remove('popup__input_invalid');//span
};

//проверка валидности ввода
const checkInputValidity = (formElement,inputElement,errorMessage,conf) => {
  if  (!inputElement.validity.valid) {
    showError(formElement,inputElement,errorMessage,conf)

} else {
  hideError(formElement,inputElement,conf)
}
};

//дергать кнопку для ВСЕГО МАССИВА инпутс
const toggleBtnState = (inputList,buttonElement,conf) => {
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid // если хоть один из, вместо every который был
);
  if (hasInvalidInput) { // проверка та
    buttonElement.setAttribute('disabled','');
    buttonElement.classList.add("popup__button-submit_invalid");
    //console.log('button ne ok')
   } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove("popup__button-submit_invalid");
    //console.log('button ok')
   }
}

const setEventListeners = (formElement,conf) => {
//соберем инпуты (все) и кнопки
const inputList = Array.from(formElement.querySelectorAll(conf.inputSelector));
//console.log(inputList)
const buttonElement = formElement.querySelector(conf.submitButtonSelector);
// для каждого инпута чек на валидность и дерганье кнопки
  inputList.forEach(inputElement => {
      inputElement.addEventListener("input", (event) => {
          checkInputValidity(formElement, inputElement,inputElement.validationMessage,conf);
          toggleBtnState(inputList, buttonElement,conf);
      });
  });
  // сделаем чтобы проверялось до ввода
  toggleBtnState(inputList, buttonElement,conf);
};


//главная функа на валидацию
//переименовала переменные по-понятнее.

const enableValidation = (conf) => {
  const formList = Array.from(document.querySelectorAll(conf.formSelector)) // соберем все
//console.log(formsList);
//для _каждой_ формы из форм
formList.forEach(formElement =>{
formElement.addEventListener('submit',e =>{
  e.preventDefault();
});
setEventListeners(formElement,conf);
})
};


// включение валидации вызовом enableValidation
enableValidation(conf);


