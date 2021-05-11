import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({selector, formHandler}) {
      super(selector);
      this.handleSubmit = formHandler; // колбэк сабмита формы.
  }
//собирает данные всех полей формы.
  _getInputValues() {
      this._inputList = this._selector.querySelectorAll('.popup__input'); //найди попап-инпут
      this._formValues = {};
      this._inputList.forEach(input => {this._formValues[input.name] = input.value});  // считай все инпуты
      return this._formValues;
  }

 //Перезаписали setEventListeners. + обработчик сабмита формы
  setEventListeners() {
      super.setEventListeners();
      this._selector.addEventListener('submit', (event) => {
          event.preventDefault();
          this.handleSubmit(this._getInputValues());
      })
  }

  close() {
      super.close(); //супер от попапа
      this._selector.querySelector('.popup__form').reset();

  }

}
