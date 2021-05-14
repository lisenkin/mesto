export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
  }
  // пришлось переделать из тоггла на опен-клоуз((
  open() {
    this._selector.classList.add('popup_visible');
    document.addEventListener('keydown', this._closeByEsc.bind(this));
  }
  close() {
    document.removeEventListener('keydown', this._closeByEsc.bind(this));
    this._selector.classList.remove('popup_visible');
  }
  //закрывашка по эскейп
  _closeByEsc(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
  //закрывашка по оверлэю, вааау
  _closePopupOverlay(event) {
    if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup')) {
      this.close();
    }

  }

  setEventListeners() {
    this._selector.addEventListener('click', this._closePopupOverlay.bind(this)); //вместо стрелочной

  }
}


