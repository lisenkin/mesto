export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  // открыть вместо тогла
  open() {
    this._popup.classList.add('popup_visible');
    document.addEventListener('keydown', this._handleEscClose)
  }

  // закрыть вместо тогла (стрелочная что б не потерять контекст)
  close = () => {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  //закрыть по esc
  _handleEscClose = evt => {
    if (evt.key === 'Escape') {
      this.close(this._popup);
      document.removeEventListener('keydown', () => { });
    }
  }



  // слушатели
  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);

    this._popup.addEventListener('click', () => {
      this.open(this._popup);
    });
  // поиск закрытия
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        this.close(this._popup);
      }
    });
  }
}
