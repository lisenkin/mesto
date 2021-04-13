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

//со страницы
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

// Находим форму в DOM

const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
console.log(formInput.id);
const formError = formElement.querySelector(`.${formInput.id}-error`);
console.log(formError)


//считаем что в форме
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_status');
const placesList = document.querySelector('.places__list');  //ul куда вставлять
//найдем форму для добавления карточки
const formAdd = document.querySelector('#popup-form-add');
const formAddInput = formAdd.querySelector('.popup__input_type_place-name');
const formAddUrl = formAdd.querySelector('.popup__input_type_photo');
const formAddBtnSubmit = formAdd.querySelector('.popup__button-submit');

//большая картинка
const fullPopupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption'); //подпись


//функции на тоггл (для всех), попробуем так
function togglePopup(popup) {
  popup.classList.toggle('popup_visible');
}

//сохранить из эдит попап
function editProfile(event) {
  event.preventDefault();
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  togglePopup(popupEdit);
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  togglePopup(popupEdit);
}


// функция cоздаем карточку и пишем все.
function createCardPlace(item, template) {
  const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');
  const placeItem = cardTemplate.cloneNode(true);
  const placePhoto = placeItem.querySelector('.place__photo');
  const placeTitle = placeItem.querySelector('.place__text');
  const placeBtnLike = placeItem.querySelector('.place__like');
  const placeButtonDel = placeItem.querySelector('.place__button-remove');
  placeTitle.textContent = item.name;
  placePhoto.src = item.link;
  placePhoto.alt = item.name;
//если выносить в отдельные функции, то с const они не работают
  placeButtonDel.addEventListener('click', () => placeItem.remove());
  placeBtnLike.addEventListener('click', () => placeBtnLike.classList.toggle('places__like_active'));
  placePhoto.addEventListener('click', function () {
      fullPopupImage.src = placePhoto.src;
  fullPopupImage.alt = item.name;
  popupCaption.textContent = item.name;
  togglePopup(popupImg);
    });
    return placeItem
}
//функция отрисовки карточек по дате, в контейнер (контейнер в самбите)
function renderCard(item, template) {
  template.prepend(createCardPlace(item,template));
};

//для добавления карты
const formSubmitHandlerAdd = (e) => {
  e.preventDefault()
  renderCard({
    name: formAddInput.value,
    link: formAddUrl.value
  }, placesList);
  formAddInput.value = '';
  formAddUrl.value = '';
  togglePopup(popupAdd);
}
//отрисовка начальных карточек
initialCards.forEach((data) => {
  renderCard(data, placesList) // <----- сюда контейнер куда вставлять карточки
});



 const showError = (input, errorMessage) => {
  input.classList.add('popup__input_invalid');

  formError.textContent = errorMessage;
  console.log(errorMessage)
  formError.classList.add('popup__error_active');
};


//спрятать
const hideError = (input) => {
  input.classList.remove('popup__input_invalid');
};



const checkInputValidity = () => {
  if (!formInput.validity.valid) {
 showError(formInput)
 console.log('blabla');
} else {
 hideError(formInput)
 console.log('yeah');
}
};



//эвенты
=======
>>>>>>> main

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function () {
  checkInputValidity();
});

//эвент на редактировать
openPopupBtn.addEventListener('click', editProfile);
closePopupBtn.addEventListener('click', () => togglePopup(popupEdit));
//эвент на добавить
openPopupBtnAdd.addEventListener('click', () => togglePopup(popupAdd));
closePopupBtnAdd.addEventListener('click', () => togglePopup(popupAdd));
//закрытие большой картинки
closePopupBtnImg.addEventListener('click', () => togglePopup(popupImg));
//submit на форму
formAdd.addEventListener('submit', formSubmitHandlerAdd);

formElement.addEventListener('submit', formSubmitHandler);











