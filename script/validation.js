//главная функа на валидацию
function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector)); // соберем все
//для _каждой_ формы из форм
console.log(forms);
  forms.forEach(form => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
//соберем инпуты (все) и кнопки
     const inputs = Array.from(form.querySelectorAll(config.inputSelector))
     console.log(inputs)
     const buttonElement = form.querySelector(config.submitButtonSelector);
     // для каждого инпута чек на валидность и дерганье кнопки
     inputs.forEach(input => {
        input.addEventListener('input',() => {
           checkInputValidity(input, form);
           toggleBtnState(inputs,buttonElement);
        })
     })
  })
  //toggleBtnState(forms,buttonElement); сюда бы по дефолту, но тут не виден buttonElement.
  //подумать УТРОМ как передавать мб колбеком
};

const showError = (input,errorMessage,form) => {
  const formError = form.querySelector(`.${input.id}-error`);
  //console.log(formError)
  formError.classList.add('popup__input_invalid'); // полоска
  formError.textContent = errorMessage;
  //console.log(errorMessage)
  formError.classList.add('popup__error_active');//span
};
//спрятать
const hideError = (input,form) => {
  const formError = form.querySelector(`.${input.id}-error`);
  formError.textContent = '';
  //console.log(errorMessage)
  formError.classList.remove('popup__error_active');
};



//проверка валидности ввода
const checkInputValidity = (input,form) => {
  const isNotValid = !input.validity.valid;
  if (isNotValid) {
    //const errorMessage = input.validationMessage;
 showError(input,input.validationMessage,form)
 //console.log('blablabla NET');
} else {
 hideError(input,form)
 //console.log('yeah');
}
};

//дергать кнопку для ВСЕГО МАССИВА инпутс
const toggleBtnState = (inputs,buttonElement) => {
  const isValid = inputs.every(input => input.validity.valid)
  if (!isValid) { // проверка та
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add("popup__button-submit_invalid");
    //console.log('button ne ok')
   } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove("popup__button-submit_invalid");
    //console.log('button ok')
   }
}



// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_invalid',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error'
});

