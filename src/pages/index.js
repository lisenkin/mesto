import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../components/initial-cards.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import './index.css';


const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_invalid',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_active'
};

//open-close попап
const openPopupBtn = document.querySelector('.profile__button-edit');
const openPopupBtnAdd = document.querySelector('.profile__button-add'); //add


//со страницы
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const formEditCard = document.querySelector("#popup-form-edit");

//считаем что в форме
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_status')
const formAddCard = document.querySelector('#popup-form-add');


//включим валидацию
const addCardValidator = new FormValidator(config, formAddCard);
addCardValidator.enableValidation();

const editProfileValidator = new FormValidator(config, formEditCard);
editProfileValidator.enableValidation();


//созданим экземпляр класса с картинкой для галереи
const fullPopupImage = new PopupWithImage('.popup-img');


//раньше было внутри кардлиста
function createCard(data) {
  const newCard = new Card(data, '#card-template', fullPopupImage.open.bind(fullPopupImage))
  return newCard.generateCard();
}


// отрисовка карточек из изначального массива с помощью класса секшн и кард по темплейту
const cardsList = new Section({
  data: initialCards,
  renderer: function (data) {
    cardsList.setItems(createCard(data));  //вынесла в функцию create
  }
},

  '.places__list'  // li из темплейта
)
cardsList.renderItems();  //отрисовочка

//карточка юзеринфо
const userInfo = new UserInfo({ name: profileName, job: profileStatus });

//вынесем сохранения
const saveChangesProfile = (data) => {
  userInfo.setUserInfo(data);
  popupEditCard.close();
}

const popupEditCard = new PopupWithForm('.popup-edit-card', saveChangesProfile);
//нашла злую ошибку с отсутсивем атрибутов name в html которая не сохраняла


const createPopupAddCard = (data) => {
  const obj = {name: data.name, link: data.url};
  const newCard = createCard(obj, '.popup-add-card', popupAddCard.open);
  cardsList.prependItems(newCard);
  popupAddCard.close();
}

const popupAddCard = new PopupWithForm('.popup-add-card',createPopupAddCard)


/* ---                тут теперь все  эвенты ,  но это не точно        -  */

// эвент большой картинки
fullPopupImage.setEventListeners();

// эвент открытия добавления по кнопке
openPopupBtnAdd.addEventListener('click', (e) => {
  formAddCard.reset();
  e.preventDefault();
  addCardValidator.checkFormValidity(); //чек ошибок при пустой форме
  popupAddCard.open();
})

//эвент открытие профиля по кнопке
openPopupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  popupEditCard.open();
  const newUserInfo = userInfo.getUserInfo();
  nameInput.value = newUserInfo.name;
  jobInput.value = newUserInfo.job;

});

// эвент открытия добавления
popupAddCard.setEventListeners();

// эвент профиля
popupEditCard.setEventListeners();
