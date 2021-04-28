export default class Card {
  constructor({name,link}, cardSelector,handleCardClick) {
    this._link = link;
    this._name= name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate(){
    const placeItem = document.querySelector(this._cardSelector).content.querySelector(".places__item").cloneNode(true);

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
 this._element.querySelector(".place__photo").addEventListener("click", () => this._handleCardClick(this));

}




  generateCard() {

    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.place__text').textContent = this._name;
    this._element.querySelector('.place__text').alt = this._name;
    this._element.querySelector('.place__photo').src = this._link;

    return this._element;


}
}
