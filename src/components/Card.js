import Popup from './Popup.js'
export default class Card {


  constructor(data, selector,currentUser,handleCardClick, deleteButtonHandler, api) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._data = data;
    this._likes = data._likes;
    this._selector = selector;
    this._currentUser = currentUser;
    this._deleteButtonHandler = deleteButtonHandler;
    this.api = api;
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

      // если ты владелец карточки
      if (this._currentUser === this._data.owner._id) {
       // покажи кнопку
       this._deleteButton.classList.remove('place__button-remove_hidden');
     }
     // иначе скрой кнопку
     else {
       this._deleteButton.classList.add('place__button-remove_hidden');
     }

     // уже есть лайки?
     if (this._data.likes){
       // сколько?
       this._likes.textContent = this._data.likes.length;
     } else {
       // иначе нет
       this._likes.textContent = 0;
     }

     // если ты уже лайкнул
     if (this.isLiked()) {
       // лайк покрась
       this._likes.classList.add('places__like_active');
     }

     return this._element;
 }

   //тут селектор из темплейта li.  добываем по шаблону из дом
   getTemplate() {
    const placeItem = document.querySelector(this._selector).content.querySelector(".places__item").cloneNode(true);
    return placeItem;
  }




_setEventListeners() {
  this._like.addEventListener('click', () => {
    if (this.isLiked()) {
      this.api.removeLike(this._data._id)
      .then(data => {
        this._data.likes = data.likes
        this._like.classList.remove('places__like_active');
        this._likes.textContent = data.likes.length;
      })
      .catch(err => console.log(err))
    } else {
      this.api.addLike(this._data._id)
      .then(data => {
        this._data.likes = data.likes
        this._like.classList.add('places__like_active');
        this._likes.textContent = data.likes.length;
      })
      .catch(err => console.log(err))
    }
  })


  this._deleteButton.addEventListener("click", (event) => {
    this._deleteButtonHandler(event);
  })


  this._image.addEventListener("click", () => this._handleCardClick(this._name, this._link));

}


// есть ли лайк пользователя на карточке
isLiked() {
  let hasLike = false
  // проходимся по каждому лайкнувшему карточку
  this._data.likes.forEach(likedUser => {
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



