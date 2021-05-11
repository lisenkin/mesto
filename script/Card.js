import Popup from './Popup.js'
export default class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  };

  //тут селектор из темплейта li.
  getTemplate() {
    const placeItem = document.querySelector(this._selector).content.querySelector(".places__item").cloneNode(true);
    return placeItem;
  }


  _deleteClickHandler = () => {
    const placeButtonDel = this._element.querySelector('.place__button-remove');
    this._element.remove();
  }

  // функция добавляет-удаляет класс на кнопке лайк
  _likeClickHandler = () => {
    this._element.querySelector('.place__like').classList.toggle('places__like_active');
  }


  _setEventListeners() {
    this._element.querySelector('.place__button-remove').addEventListener("click", (event) => {
      this._deleteClickHandler(event);
    })

    this._element.querySelector('.place__like').addEventListener("click", (event) => {
      this._likeClickHandler(event);
    });
    this._element.querySelector(".place__photo").addEventListener("click", () => this._handleCardClick(this._name, this._link));

  }




  generateCard() {

    this._element = this.getTemplate();
    this._setEventListeners();

    this._element.querySelector('.place__text').textContent = this._name;
    this._element.querySelector('.place__text').alt = this._name;
    this._element.querySelector('.place__photo').src = this._link;

    return this._element;


  }
}
