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

const formEditProfile = document.querySelector('.popup__form');
const formInput = formEditProfile.querySelector('.popup__input');
const formEditCard = document.querySelector("#popup-form-edit");

//считаем что в форме
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_status');
const placesList = document.querySelector('.places__list');  //ul куда вставлять
//найдем форму для добавления карточки

const formAddCard = document.querySelector('#popup-form-add');
const formAddInput = formAddCard.querySelector('.popup__input_type_place-name');
const formAddUrl = formAddCard.querySelector('.popup__input_type_photo');
const formAddBtnSubmit = formAddCard.querySelector('.popup__button-submit');

//большая картинка
const fullPopupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption'); //подпись


//функции на тоггл (для всех), попробуем так
function togglePopup(popup) {
  const shouldOpen = !popup.classList.contains('popup_visible');
  if(shouldOpen) {
    document.addEventListener('keydown', pressEscapeButton)
  }
  else {
    document.removeEventListener('keydown', pressEscapeButton);
  }
  popup.classList.toggle('popup_visible');
}



//сохранить из эдит попап
function openEditProfileForm(event) {
  event.preventDefault();
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  document.addEventListener('keydown', pressEscapeButton);
  checkFormValidity(formEditCard,validationConfig);
  togglePopup(popupEdit);

}
function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  togglePopup(popupEdit);
  document.addEventListener('keydown', pressEscapeButton);
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
  template.prepend(createCardPlace(item, template));
};


//для добавления карты
const addCardFormSubmitHandler = (e) => {
  e.preventDefault()
  renderCard({
    name: formAddInput.value,
    link: formAddUrl.value
  }, placesList);
  formAddCard.reset();
  checkFormValidity(formAddCard,validationConfig);
  togglePopup(popupAdd);
  formAddBtnSubmit.setAttribute('disabled',true);
  formAddBtnSubmit.classList.add(validationConfig.inactiveButtonClass);
}


//пришлось сделать отдельную функцию на открытие с ресетом, что б убрать его из тоггл для всех. надеюсь это логически правильно :)
function openPopupFormWithReset(element) {
  formAddCard.reset();
  checkFormValidity(formAddCard,validationConfig);
  togglePopup(element);
}

//отрисовка начальных карточек
initialCards.forEach((data) => {

  renderCard(data, placesList) // <----- сюда контейнер куда вставлять карточки
});


const popups = Array.from(document.querySelectorAll('.popup'));

popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    //const overlay = document.querySelector('.popup') // div общий попапа
    if (evt.target.classList.contains('popup_visible')) { //
     // console.log('overlay! yay')
      togglePopup(popup)

    }
  });
}
);



function pressEscapeButton(evt) {
  const popup = document.querySelector('.popup_visible')
  if (evt.key === 'Escape') {
    togglePopup(popup)
  };
}



//эвенты

//эвент на редактировать
openPopupBtn.addEventListener('click',openEditProfileForm);
closePopupBtn.addEventListener('click', () => togglePopup(popupEdit));
//эвент на добавить
openPopupBtnAdd.addEventListener('click', () => openPopupFormWithReset(popupAdd)); // <----сделала отдельную функцию на открытие с ресетом
closePopupBtnAdd.addEventListener('click', () => togglePopup(popupAdd));
//закрытие большой картинки
closePopupBtnImg.addEventListener('click', () => togglePopup(popupImg));
//submit на форму
formAddCard.addEventListener('submit', addCardFormSubmitHandler);
formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);










