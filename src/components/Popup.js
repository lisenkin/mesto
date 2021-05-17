export default class Popup {
    constructor(popup) {
      this._popup = document.querySelector(popup);
      this._closeByEsc= this._closeByEsc.bind(this);
    }
// пришлось переделать из тоггла на опен-клоуз((
    open() {
        this._popup.classList.add('popup_visible');
        document.addEventListener('keydown', this._closeByEsc);
    }
    close () {
        document.removeEventListener('keydown', this._closeByEsc);
        this._popup.classList.remove('popup_visible');
    }
//закрывашка по эскейп
    _closeByEsc(event) {
        if(event.key === 'Escape') {
            this.close();
        }
    }
//закрывашка по оверлэю, вааау
    _closePopupOverlay(event) {
        if(event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup')) {
            this.close();
        }

    }

    setEventListeners() {
        this._popup.addEventListener('click', this._closePopupOverlay.bind(this)); //вместо стрелочной

    }
}


