import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popup, formHandler) {
      super(popup);
      this._handleSubmit = formHandler;// колбэк сабмита формы.
      this.form = this._popup.querySelector('.popup__form')
  }
//собирает данные всех полей формы.
  _getInputValues() {
      this._inputList = Array.from(this._popup.querySelectorAll('.popup__input')); //найди попап-инпут
      const formValues = {};
      this._inputList.forEach(input => {formValues[input.name] = input.value});  // считай все инпуты
      return formValues;
  }

 //Перезаписали setEventListeners. + обработчик сабмита формы
  setEventListeners() {
      super.setEventListeners();
      this._popup.querySelector('.popup__form').addEventListener('submit', (event) => {
          event.preventDefault();
          this._handleSubmit(this._getInputValues());
      })
  }

  close() {
      super.close(); //супер от попапа
      this._popup.querySelector('.popup__form').reset();

  }
}
