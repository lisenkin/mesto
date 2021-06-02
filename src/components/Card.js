import Popup from './Popup.js'
export default class Card {


  constructor({ name, link, likes, owner, _id }, selector, currentUser, handleCardClick, deleteButtonHandler, toggleLike) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this._owner = owner;
    this._selector = selector;
    this._currentUser = currentUser;
    this._deleteButtonHandler = deleteButtonHandler;
    this._handleCardClick = handleCardClick;
    this._toggleLike = toggleLike;
  };

  generateCard() {
    // получим разметку
    this._element = this.getTemplate();
    // элементы карточки вместо хардкода
    this._title = this._element.querySelector('.place__text');
    this._image = this._element.querySelector('.place__photo');
    this._likeScore = this._element.querySelector('.place__score-like');
    this._likeButton = this._element.querySelector('.place__like');
    this._deleteButton = this._element.querySelector('.place__button-remove');
    this._likeScore.textContent = this._likes.length

    this._setEventListeners();

    this._title.textContent = this._name;
    this._image.alt = this._name;
    this._image.src = this._link;


    //показать корзину если ты текущий юзер
    if (this._currentUser === this._owner._id) {
      this._deleteButton.classList.remove('place__button-remove_hidden');
    }
    // иначе убрать корзину
    else {
      this._deleteButton.classList.add('place__button-remove_hidden');
    }

    if (this.isLiked()) {
      // сделать иконку активной
      this._likeButton.classList.add('places__like_active'); // тогда черным
    }

    return this._element;
  }



  //тут селектор из темплейта li.  добываем по шаблону из дом
  getTemplate() {
    const placeItem = document.querySelector(this._selector).content.querySelector(".places__item").cloneNode(true);
    return placeItem;
  }


  _setEventListeners() {

    this._deleteButton.addEventListener("click", (event) => {
      this._deleteButtonHandler(this._id, this._element);
    })
    this._likeButton.addEventListener('click', (evt) => {
      this._toggleLike(evt, this._id, this._likeScore);
    });
    this._image.addEventListener("click", () => this._handleCardClick(this._name, this._link));

  }

   // есть ли лайк
  isLiked() {
    let hasLike = false
    // проходимся по каждому лайкнувшему карточку
    this._likes.forEach(likedUser => {
      let valuesArr = Object.values(likedUser)
      // если содержит АйДи пользователя
      if (valuesArr.includes(this._currentUser)) {
        // значит карточка уже лайканая
        hasLike = true
      }
    })
    return hasLike;
  }

}



