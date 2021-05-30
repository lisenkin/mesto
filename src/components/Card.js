import Popup from './Popup.js'
export default class Card {


  constructor(data, selector,currentUser,handleCardClick, likeClickHandler, deleteButtonHandler) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data._likes;
    this._selector = selector;
    this._currentUser = currentUser;
    this._deleteButtonHandler = deleteButtonHandler;
    this._likeClickHandler = likeClickHandler;
    this._handleCardClick = handleCardClick;
  };

  generateCard() {
    // получим разметку
     this._element = this.getTemplate();
     // элементы карточки вместо хардкода
     this._title = this._element.querySelector('.place__text');
     this._image = this._element.querySelector('.place__photo');
     this._likes = this._element.querySelector('.place__score-like');
     this._like = this._element.querySelector('.place__like');
     this._deleteButton = this._element.querySelector('.place__button-remove');


     this._setEventListeners();

     this._title.textContent = this._name;
     this._title.alt = this._name;
     this._image.src = this._link;

     if (this._currentUser === this._data.owner._id) {
      // убрать класс скрывающий кнопку удаления
      this._deleteButton.classList.remove('place__button-remove_hidden');
    }
    // иначе скрыть кнопку
    else {
      this._deleteButton.classList.add('place__button-remove_hidden');
    }

     this._data.likes.forEach(elem => {
      if (elem._id === this._userId) {
        this._likes.classList.add('places__like_active');
      }
    });




     return this._element;
 }

   //тут селектор из темплейта li.  добываем по шаблону из дом
   getTemplate() {
    const placeItem = document.querySelector(this._selector).content.querySelector(".places__item").cloneNode(true);
    return placeItem;
  }




_setEventListeners() {
  this._like.addEventListener('click', this._likeClickHandler);

  this._deleteButton.addEventListener("click", () => {
    this._deleteButtonHandler();
  })


  this._image.addEventListener("click", () => this._handleCardClick(this._name, this._link));

}

}



