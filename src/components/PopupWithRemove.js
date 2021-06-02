import Popup from './Popup.js';

export default class PopupWithRemove extends Popup {
  constructor(popup, formHandler) {
    super(popup);
    this._handleSubmit = formHandler;// колбэк сабмита формы.
    this.form = this._popup.querySelector('.popup__form')
  }

  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener('submit', evt => {
      evt.preventDefault();
      //вызвать тут обычное сохранение
      this._handleSubmit(this.cardId, this.cardElement)
    })
  }

  open(cardId, cardElement) {
    super.open();
    this.cardId = cardId
    this.cardElement = cardElement
  }
}
