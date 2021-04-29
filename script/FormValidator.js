export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form
    this._buttonElement = this._form.querySelector( this._config.submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
  }

  enableValidation = () => {

    this._form.addEventListener('submit', e => {
      e.preventDefault();
    });
    this._setEventListeners();
  }


  // Функция показа ошибки
  _showError = (inputElement) => {
    const formError = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass); // полоска
    formError.textContent = inputElement.validationMessage;

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
    if (!inputElement.validity.valid) {
      this._showError(inputElement)
    } else {
      this._hideError(inputElement)
    }
  }


  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  // Фунция проверки состояния кнопки форм
  _deactivateButton = () => {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _activateButton = () => {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
  _toggleBtnState = () => {
    if (this._hasInvalidInput(this._inputList)) { // проверка та
      this._deactivateButton()
      //buttonElement.setAttribute('disabled','');
      //buttonElement.classList.add("popup__button-submit_invalid");
      //console.log('button ne ok')
    } else {
      this._activateButton()
      //buttonElement.removeAttribute('disabled');
      //buttonElement.classList.remove("popup__button-submit_invalid");
      //console.log('button ok')
    }
  }

  // Функция вешает слушатели событий на поля ввода и кнокпи в указаной форме
  _setEventListeners = () => {
    this._toggleBtnState();
    // обходим все поля ввода и вешаем на них слушатели
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener("input", (event) => {
          this._checkInputValidity(inputElement);
          this._toggleBtnState();
          //убран if
      });
    });
  };
  // Функция дизейбла кнопки

  checkFormValidity() {
    this._inputList.forEach(inputElement => {
      if (inputElement.value !== '') {
        this._checkInputValidity(inputElement);
      } else {
        this._hideError(inputElement);
      }
      this._toggleBtnState();
    })
  }



} //класс закончился


