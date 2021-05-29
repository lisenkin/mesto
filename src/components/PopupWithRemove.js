import Popup from './Popup.js';

export default class PopupWithRemove extends Popup {
    constructor (popup, formHandler) {
        super(popup)
        this._handleSubmit = formHandler;
        this._form = this.popup.querySelector('.popup__form');
    }

    setEventListeners () {
        super.setEventListeners();

        this._form.addEventListener('submit', evt => {
            evt.preventDefault();

            this._confirmHandler(this.cardId, this.cardElement)
        })
    }

    open(cardId, cardElement) {
        super.open();
        this.cardId = cardId
        this.cardElement = cardElement
    }
}
