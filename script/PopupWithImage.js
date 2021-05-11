import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._image = this._selector.querySelector('.popup__image'); //большая картинка
        this._caption = this._selector.querySelector('.popup__caption'); // и маленькая подпись
    }


    // в опен добавляем вставку картинки, и подписи к ней
    open(name, link) {
        super.open();
        this._image.src = link;
        this._image.alt = name;
        this._caption.textContent = name;
        /*fullPopupImage.src = cardLink;
        fullPopupImage.alt = cardName;
        popupCaption.textContent = cardName; */ // кусочек на память из старого index.js  про логику
    }

}


