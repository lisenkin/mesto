import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super(popupSelector);
    this._popupFullImg = document.querySelector('.popup__image');
    this._popupCaption = document.querySelector('.popup__caption');
    this._name = name;
    this._link = link;
  }

  //  унаследует и дополним слегка
  open() {
    this._popupFullImg.src = this._link;
    this._popupCaption.textContent = this._name;
    super.open();
  }
}
