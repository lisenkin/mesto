export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form
  }

  enableValidation = () => {

   this._form.addEventListener('submit',e =>{
      e.preventDefault();
    });
    this._setEventListeners();
    }


// Функция показа ошибки
_showError = (inputElement) => {
  const formError = this._form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._config.inputErrorClass); // полоска
  formError.textContent = inputElement.validationMessage;
  console.log('blabla')
  formError.classList.add(this._config.errorClass);//span
}

  // убираем
  _hideError = (inputElement) => {
    const formError = this._form.querySelector(`.${inputElement.id}-error`);
    formError.textContent = ''; // Убираем текст ошибки
    inputElement.classList.remove(this._config.inputErrorClass);// Удаляем класс невалидного инпута
    formError.classList.remove(this._config.errorClass);//полоска
  }

   //проверка валидности ввода
  _checkInputValidity = (inputElement) => {
    // если не валидно включаем, если валидно убираем
    if (!this._hasInvalidInput) {
      this._showError(inputElement,this._config)
    } else {
      this._hideError(inputElement)
    }
  }


 _hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
   return !inputElement.validity.valid;
   });
}
  // Фунция проверки состояния кнопки форм
  _deactivateButton = (buttonElement) => {
    buttonElement.classList.add(this._config.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  _activateButton = (buttonElement) => {
    buttonElement.classList.remove(this._config.inactiveButtonClass);
     buttonElement.disabled = false;
   }
  _toggleBtnState = (inputList,buttonElement) => {
    if (this._hasInvalidInput(inputList)) { // проверка та
      this._deactivateButton(buttonElement)
      //buttonElement.setAttribute('disabled','');
      //buttonElement.classList.add("popup__button-submit_invalid");
      //console.log('button ne ok')
     } else {
      this._activateButton(buttonElement)
      //buttonElement.removeAttribute('disabled');
      //buttonElement.classList.remove("popup__button-submit_invalid");
      //console.log('button ok')
     }
  }

// Функция вешает слушатели событий на поля ввода и кнокпи в указаной форме
_setEventListeners = () => {
  const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector)); //соберем инпуты (все) и кнопки
  //console.log(inputList)
  const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
  this._toggleBtnState(inputList, buttonElement,this._config);
    // обходим все поля ввода и вешаем на них слушатели
    inputList.forEach(inputElement => {
      inputElement.addEventListener("input", (event) => {
        if (inputElement.value !== '') {
          this._checkInputValidity(inputElement);
          this._toggleBtnState(inputList, buttonElement);
        }
        else {
          this._hideError(inputElement);
        }
      });
  });
};
  // Функция дизейбла кнопки

checkFormValidity (form) {
  const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
  const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
  inputList.forEach(inputElement=> {
      if (inputElement.value !== '') {
        this._checkInputValidity(inputElement);
      } else {
        this._hideError (inputElement);
      }
      this._toggleBtnState(inputList, buttonElement);
    })
  }



} //класс закончился


