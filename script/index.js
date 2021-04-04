//массив для карточек
const initialCards = [
  {
    name: 'карелия',
    link: './images/ruskeala.jpg'
  },
  {
    name: 'Сочи',
    link: './images/sochi.jpg'
  },
  {
    name: 'балтийское море',
    link: './images/baltica.jpg'
  },
  {
    name: 'Карельский лес',
    link: './images/karelia_les.jpg'
  },
  {
    name: 'красная поляна',
    link: './images/polyana.jpg'
  },
  {
    name: 'кусшкая коса',
    link: './images/kosa.jpg'
  }
];
//все переменные про попап
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup-edit-card'); //edit
const popupAdd = document.querySelector('.popup-add-card'); //add
const popupImg = document.querySelector('.popup-img');  //big image

//open-close попап
const openPopupBtn = document.querySelector('.profile__button-edit');
const openPopupBtnAdd = document.querySelector('.profile__button-add'); //add
const closePopupBtn = popupEdit.querySelector('.popup__close-button');
const closePopupBtnAdd = popupAdd.querySelector('.popup__close-button');//add
const closePopupBtnImg = popupImg.querySelector('.popup__close-button');//big image

//получим с профиля данные
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
//считаем что в форме
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_status');

// находим темплейт для карточек
const placesList = document.querySelector('.places__list');
const listItemTemplate = document.querySelector('.places-template').content;
//найдем форму для добавления карточки
const formAdd = document.querySelector('#popup-form-add');
const formAddInput = formAdd.querySelector('.popup__input_type_place-name');
const formAddUrl = formAdd.querySelector('.popup__input_type_photo');
const formAddBtnSubmit = formAdd.querySelector('.popup__button-submit');
//большая картинка
const fullPopupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption'); //подпись

initialCards.forEach(item => {
  const placeItem = listItemTemplate.cloneNode(true); // склонировали
  // ищем в карточке
  const placeItems = placeItem.querySelector('.place');
  const placeButtonDel = placeItem.querySelector('.place__button-remove');
  const placeBtnLike = placeItem.querySelector('.place__like');
  const placePhoto = placeItem.querySelector('.place__photo');
  const placeTitle = placeItem.querySelector('.place__text');
  placeTitle.textContent = item.name;
  placePhoto.src = item.link;
  placePhoto.alt = item.name;
  //удаление
  placeButtonDel.addEventListener('click', () => placeItems.remove())
  placeBtnLike.addEventListener('click', () => placeBtnLike.classList.toggle('places__like_active')); //лайки
  placePhoto.addEventListener('click', function () {
    fullPopupImage.src = placePhoto.src;
    fullPopupImage.alt = item.name;
    popupCaption.textContent = item.name;
    popupToggle(popupImg);
  });


  placesList.append(placeItem);
});


const formSubmitHandlerAdd = (e) => {
  e.preventDefault()
  const placeItem = listItemTemplate.cloneNode(true);
  inputValue = formAddInput.value;
  inputUrl = formAddUrl.value;
  const placeItems = placeItem.querySelector('.place');
  const placeButtonDel = placeItem.querySelector('.place__button-remove');
  const placeBtnLike = placeItem.querySelector('.place__like');
  const placePhoto = placeItem.querySelector('.place__photo');
  const placeTitle = placeItem.querySelector('.place__text');
  placeButtonDel.addEventListener('click', () => placeItems.remove())
  placeBtnLike.addEventListener('click', () => placeBtnLike.classList.add('places__like_active'));
  placeTitle.textContent = inputValue;
  placePhoto.src = inputUrl;
  placesList.prepend(placeItem);

  popupToggle(popupAdd);

}
//submit на форму
formAdd.addEventListener('submit', formSubmitHandlerAdd);



//функции на тоггл (для всех), попробуем так
function popupToggle(popup) {

  popup.classList.toggle('popup_visible');
}

//сохранить из эдит попап (раньше было в опен)
function editProfile(event) {
  event.preventDefault();
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  popupToggle(popupEdit);
}


function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  popup.classList.add('popup_visible');

}

function openPopupAdd() {
  popupAdd.classList.add('popup_visible');

}

//функции на close или стыдоба стыдобская, 3 одинаковых на одно действие
/*function closePopup() {
  popup.classList.remove('popup_visible');
}
function closePopupAdd() {
  popupAdd.classList.remove('popup_visible');
}

function closePopupImg() {
  popupImg.classList.remove('popup_visible');
}
*/

//эвент на редактировать
openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', () => popupToggle(popupEdit));
//эвент на добавить
openPopupBtnAdd.addEventListener('click', openPopupAdd);
closePopupBtnAdd.addEventListener('click', () => popupToggle(popupAdd));
//закрытие большой картинки
closePopupBtnImg.addEventListener('click', () => popupToggle(popupImg));


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будетz

//для эдит
function formSubmitHandler(evt) {
  evt.preventDefault();

  // Получите значение полей jobInput и nameInput из свойства value
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  //закроем
  popupToggle(popupEdit);

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);











