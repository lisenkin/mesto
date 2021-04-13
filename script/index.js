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
const formInput = formElement.querySelector('.popup__input');
console.log(formInput.id);
const formError = formElement.querySelector(`.${formInput.id}-error`);
console.log(formError)


//считаем что в форме
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_status');
// находим темплейт для карточек
const placesList = document.querySelector('.places__list');
const listItemTemplate = document.querySelector('.places-template').content;
//найдем форму для добавления карточки
const formAdd = document.querySelector('#popup-form-add');
let formAddInput = formAdd.querySelector('.popup__input_type_place-name');
let formAddUrl = formAdd.querySelector('.popup__input_type_photo');
const formAddBtnSubmit = formAdd.querySelector('.popup__button-submit');
//большая картинка
const fullPopupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption'); //подпись

let placeItem ; //вынесла для функций


//функции на тоггл (для всех), попробуем так
function togglePopup(popup) {
  popup.classList.toggle('popup_visible');
}

//сохранить из эдит попап (раньше было в опен)
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
  //закроем
  togglePopup(popupEdit);

}

// -----> большое спасибо за разьяснение ошибок и советы по улучшениям в ревью! <-------
// функция cоздаем карточку и пишем все.
function createCardPlace(item) {
  placeItem = listItemTemplate.cloneNode(true);

  const placePhoto = placeItem.querySelector('.place__photo');
  const placeTitle = placeItem.querySelector('.place__text');
  //считываем и записываем
  placeTitle.textContent = item.name;
  placePhoto.src = item.link;
  placePhoto.alt = item.name;
  //лайки, удаление и большая картинка
  handleDelete();
  handleLikeIcon(); //лайки
  //вызов функции большой картинки с параметрами которые туда надо передать из переменных сверху
  placePhoto.addEventListener('click', () => handleFullPicture(item,placePhoto,placeTitle));
  // возвращаем элемент для других
    return placeItem;
}
//функция отрисовки карточек по дате, в контейнер (контейнер в самбите)
function renderCard(data, wrap) {
  wrap.prepend(createCardPlace(data));
};

// функция на лайки
function handleLikeIcon(data){
const placeBtnLike = placeItem.querySelector('.place__like'); //лайки
placeBtnLike.addEventListener('click', () => placeBtnLike.classList.toggle('places__like_active'));
}
//функция на удаление
function handleDelete(data){
  const placeButtonDel = placeItem.querySelector('.place__button-remove');
  const placeItems = placeItem.querySelector('.places__item');  // <----- вот тут удаляла не то
  placeButtonDel.addEventListener('click', () => placeItems.remove()) //нашла косяк, удаляла не то
}
// большая картинка
function handleFullPicture(item,placePhoto,placeTitle){
    fullPopupImage.src = placePhoto.src;
    fullPopupImage.alt = item.name;
    popupCaption.textContent = item.name;
    togglePopup(popupImg);
}
 //для эдит
const formSubmitHandlerAdd = (e) => {
  e.preventDefault()
  renderCard({
    name: formAddInput.value,
    link: formAddUrl.value
  }, placesList);
  formAddInput.value ='';
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
openPopupBtnAdd.addEventListener('click',  () => togglePopup(popupAdd));
closePopupBtnAdd.addEventListener('click', () => togglePopup(popupAdd));
//закрытие большой картинки
closePopupBtnImg.addEventListener('click', () => togglePopup(popupImg));
//submit на форму
formAdd.addEventListener('submit', formSubmitHandlerAdd);

formElement.addEventListener('submit', formSubmitHandler);











