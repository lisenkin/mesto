import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._image = this._popup.querySelector('.popup__image'); //большая картинка
    this._caption = this._popup.querySelector('.popup__caption'); // и маленькая подпись
  }


  // в опен добавляем вставку картинки, и подписи к ней
  open(name, link) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;

    super.open();
  }

}

