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


//все переменные про попап которые пока что страшно удалять потому что потому :)

//const popupEditCard = new Popup('.popup-edit-card');
//const popupFormEditProfile = document.querySelector('.popup-edit-card').querySelector('.popup__form');


//const popupAddCard = new Popup('.popup-add-card');
//const popupFormAddCard = document.querySelector('.popup-add-card').querySelector('.popup__form');

/*const popupEdit = document.querySelector('.popup-edit-card'); //edit
const popupAdd = document.querySelector('.popup-add-card'); //add
const popupImg = document.querySelector('.popup-img');  //big image
*/

//open-close попап
const openPopupBtn = document.querySelector('.profile__button-edit');
const openPopupBtnAdd = document.querySelector('.profile__button-add'); //add

//const closePopupBtn = popupEditCard.querySelector('.popup__close-button');
//const closePopupBtnAdd = popupAddCard.querySelector('.popup__close-button');//add
//const closePopupBtnImg = popupImg.querySelector('.popup__close-button');//big image

//со страницы
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

// Находим форму в DOM

//const formEditProfile = document.querySelector('.popup__form');
const formEditCard = document.querySelector("#popup-form-edit");

//считаем что в форме
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_status');
//const placesList = document.querySelector('.places__list');  //ul куда вставлять
//найдем форму для добавления карточки

const formAddCard = document.querySelector('#popup-form-add');
const formAddInput = formAddCard.querySelector('.popup__input_type_place-name');
const formAddUrl = formAddCard.querySelector('.popup__input_type_photo');
//const formAddBtnSubmit = formAddCard.querySelector('.popup__button-submit');

//большая картинка
//const fullPopupImage = document.querySelector('.popup__image');
//const popupCaption = document.querySelector('.popup__caption'); //подпись



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

//попап эдит профиль. селектор по классу.
const popupEditCard = new PopupWithForm({
  popup: '.popup-edit-card', formHandler: () => {
  //  userInfo.setUserInfo({ name: nameInput.value, job: jobInput.value });
  renderer: (item) => {
    userInfo.setUserInfo(item)
  }
    popupEditCard.close();
  }
});



const popupAddCard = new PopupWithForm({
  popup: '.popup-add-card',
  formHandler: () => {
      cardsList.prependItems(createCard({  name: formAddInput.value, link: formAddUrl.value }));

      popupAddCard.close();
  },
});
// открыть попап эдд с селетором по классу
/*const popupAddCard = new PopupWithForm({
  popup: '.popup-add-card', formHandler: () => {
   const newCard = new Card(

      { name: formAddInput.value, link: formAddUrl.value },

      '#card-template', fullPopupImage.open.bind(fullPopupImage)) // + большая картинка(галерея)

    cardsList.prependItems(newCard.generateCard());  //добавь в начало препендом

    popupAddCard.close();
  }
});*/


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
