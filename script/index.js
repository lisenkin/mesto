import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initial-cards.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';


const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_invalid',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_active'
};


//все переменные про попап

const popupEditCard = new Popup('.popup-edit-card');
const popupFormEditProfile = document.querySelector('.popup-edit-card').querySelector('.popup__form');


const popupAddCard = new Popup('.popup-add-card');
const popupFormAddCard = document.querySelector('.popup-add-card').querySelector('.popup__form');

/*const popupEdit = document.querySelector('.popup-edit-card'); //edit
const popupAdd = document.querySelector('.popup-add-card'); //add
const popupImg = document.querySelector('.popup-img');  //big image
*/

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
//const fullPopupImage = document.querySelector('.popup__image');
//const popupCaption = document.querySelector('.popup__caption'); //подпись


//включим валидацию

const addCardValidator = new FormValidator(config, formAddCard);
addCardValidator.enableValidation();
const editProfileValidator = new FormValidator(config, formEditCard);
editProfileValidator.enableValidation();

//созданим экземпляр класса с картинкой
const fullPopupImage = new PopupWithImage('.popup__img');
fullPopupImage.setEventListeners();

const userInfo = new UserInfo(userInfoProfile);

//отвечает за отображение карточек
const sectionCards = new Section({
    items: initialCards,
    renderer: (item) => {
        sectionCards.addItem(newCard(item))
    }
}, cardsSelector);


const editProfilePopup = new PopupWithForm(editProfilePopupSelector, () => {
    userInfo.setUserInfo(inputProfileName.value, inputProfession.value)
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(addCardPopupSelector, (data) => {
    sectionCards.addItem(newCard(data));
    // addCardPopup.close()
    popupFormAddCard.reset();
    cardFormValidator.toggleSubmitBtnState();
});
addCardPopup.setEventListeners();


function newCard(data) {
    return new Card(data, cardTemplateSelector, () => {
        popupWithImage.open(data)
    }).createCard();
}

//заполняет попап редактирования профайла из профиля
function fillPopup(data) {
    inputProfileName.value = data.name;
    inputProfession.value = data.profession;
}

function openPopupProfile() {
    fillPopup(userInfo.getUserInfo());
    profileFormValidator.renewValidation();
    editProfilePopup.open()
}

function openPopupAddCard() {
    cardFormValidator.renewValidation();
    addCardPopup.open();
}

/*------------------обработчики событий----------------------------------*/

editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', openPopupAddCard);

/* ----------добавляет карточки при загрузке страницы из исходного массива------------*/

sectionCards.renderItems() 
