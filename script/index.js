import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initial-cards.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_invalid',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_active'
};


//все переменные про попап
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

const addCardValidator = new FormValidator(config, formAddCard);
const editProfileValidator = new FormValidator(config, formEditCard);

addCardValidator.enableValidation();
editProfileValidator.enableValidation();

//функции на тоггл (для всех), попробуем так
function togglePopup(popup) {
  const shouldOpen = !popup.classList.contains('popup_visible');
  if (shouldOpen) {
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
  editProfileValidator.checkFormValidity();
  //checkFormValidity(formEditCard,validationConfig);
  togglePopup(popupEdit);

}
function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  togglePopup(popupEdit);

}

//функция отрисовки карточек по дате, в контейнер (контейнер в самбите)
function renderCard(data, wrap) {
  const card = new Card(data, '#card-template', handleCardClick)
  wrap.prepend(card.generateCard());
};

//откроем большую картинку при клике на попап
function handleCardClick(cardName, cardLink) {
  togglePopup(popupImg);
  fullPopupImage.src = cardLink;
  fullPopupImage.alt = cardName;
  popupCaption.textContent = cardName;

}

//для добавления карты
const addCardFormSubmitHandler = (e) => {
  e.preventDefault()
  renderCard({
    name: formAddInput.value,
    link: formAddUrl.value
  }, placesList);
  formAddCard.reset();
  togglePopup(popupAdd);
  //formAddBtnSubmit.setAttribute('disabled', true);
  //formAddBtnSubmit.classList.add(validationConfig.inactiveButtonClass);
  addCardValidator.checkFormValidity(this.config._inactiveButtonClass);
}


//пришлось сделать отдельную функцию на открытие с ресетом, что б убрать его из тоггл для всех. надеюсь это логически правильно :)
function openPopupFormWithReset(element) {
  formAddCard.reset();
  addCardValidator.checkFormValidity();
  //checkFormValidity(formAddCard,validationConfig);
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
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_visible')
    togglePopup(popup)
  };
}



//эвенты

//эвент на редактировать
openPopupBtn.addEventListener('click', openEditProfileForm);
closePopupBtn.addEventListener('click', () => togglePopup(popupEdit));
//эвент на добавить
openPopupBtnAdd.addEventListener('click', () => openPopupFormWithReset(popupAdd)); // <----сделала отдельную функцию на открытие с ресетом
closePopupBtnAdd.addEventListener('click', () => togglePopup(popupAdd));
//закрытие большой картинки
closePopupBtnImg.addEventListener('click', () => togglePopup(popupImg));
//submit на форму
formAddCard.addEventListener('submit', addCardFormSubmitHandler);
formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);










