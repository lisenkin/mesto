import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({popup, formHandler}) {
      super(popup);
      this.handleSubmit = formHandler; // колбэк сабмита формы.
  }
//собирает данные всех полей формы.
  _getInputValues() {
      this._inputList = this._popup.querySelectorAll('.popup__input'); //найди попап-инпут
      this._formValues = {};
      this._inputList.forEach(input => {this._formValues[input.name] = input.value});  // считай все инпуты
      return this._formValues;
  }

 //Перезаписали setEventListeners. + обработчик сабмита формы
  setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener('submit', (event) => {
          event.preventDefault();
          this.handleSubmit(this._getInputValues());
      })
  }

  close() {
      super.close(); //супер от попапа
      this._popup.querySelector('.popup__form').reset();

  }

}
