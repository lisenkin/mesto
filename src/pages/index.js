import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
//import { initialCards } from '../components/initial-cards.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithRemove from '../components/PopupWithRemove.js';

import './index.css';


const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_invalid',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_active'
};

const openPopupBtn = document.querySelector('.profile__button-edit');
const openPopupBtnAdd = document.querySelector('.profile__button-add'); //add
//со страницы

const formEditCard = document.querySelector("#popup-form-edit");

//считаем что в форме
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_status')
const formAddCard = document.querySelector('#popup-form-add');

const profileAvatar = document.querySelector('.profile__avatar')
const EditAvatarButton =  document.querySelector('.profile__overlay');
const formEditAvatar = document.querySelector("#popup-form-add-avatar");



//включим валидацию
const addCardValidator = new FormValidator(config, formAddCard);
addCardValidator.enableValidation();

const editProfileValidator = new FormValidator(config, formEditCard);
editProfileValidator.enableValidation();

const avatarValidator = new FormValidator(config,formEditAvatar);
avatarValidator.enableValidation();

// Экземпляр класса API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: '1c58ab56-f6d5-4a78-b0cd-4b039a0e7da3'
  //groupId: 'cohort-24'
});


//созданим экземпляр класса с картинкой для галереи
const fullPopupImage = new PopupWithImage('.popup-img');
// попап эдит профайл
const popupEditCard = new PopupWithForm('.popup-edit-card', EditProfileSubmitHandler);
// попап эдд кард
const popupAddCard = new PopupWithForm('.popup-add-card',createPopupAddCard);
//попап аватар
const popupWithAvatar =  new PopupWithForm('.popup-add-avatar',addNewAvatar);
//попап точно закрыть?
//const popupWithRemove = new PopupWithRemove('.popup-remove-card',confirmCardRemove)

//карточка юзеринфо
const userInfo = new UserInfo('.profile__name','.profile__status','.profile__avatar');


// отрисовка карточек

const cardList = new Section({
  renderer: (item) => {
      renderCard(item)
      },
    },
    '.places__list' // li из темплейта
  );


// это проверка вне всего (работает)
//console.log(api.getUserInfo())

// обработчик формы изменения профиля
function EditProfileSubmitHandler (inputValues) {
  // отправить значения на сервер через апи
  api.editUserInfo(inputValues)
    .then(() => {
      // изменить значения на странице через юзеринфо
      //console.log(inputValues);
      userInfo.setUserInfo(inputValues);


      popupEditCard.close();
    })
    .catch(err => console.log(err))
   // .finally(() => {
      // остановить загрузку
    //  isLoading(false, editPopup);
   // })
}


// обработчик формы создания карточек
function createPopupAddCard (inputValues) {
  console.log(inputValues);
  //isLoading(true, addPopup)
  // карточку на сервер POST API
  api.addCard(inputValues)
    .then(data => {
      renderCard ({
        name: data.name,
        link: data.link,
        id: data.id,
        owner: data.owner,
        likes: data.likes
      })
      //console.log(data);
      // сбросить поля формы
      formAddCard.reset();
      addCardValidator.checkFormValidity(); //чек ошибок при пустой форме
      // закрыть попап
      popupAddCard.close();
    })
    .catch(err => console.log(err))
    //.finally(() => {
      // остановить загрузку
     // isLoading(false, addPopup);
   // })
}


// рендерер карточек
function renderCard (data) {
  // новый экземпляр карточки
  const newcard = new Card(data, // данные карточки
                        '#card-template', // темплейт селектор
                        userInfo.getUserId(), //id
                        handleCardClick, // большая картинка
                        handleDeleteButton, // удаление
                        handleLikeButton // лааайки
  )

  const cardElement = newcard.generateCard();
  cardList.prependItems(cardElement);
}


function handleCardClick(name, link) {
  fullPopupImage.open(name, link)
}


// обработчик изменения аватарки
function addNewAvatar (inputValue) {
 // isLoading(true, avatarPopup)
  // отправить запрос на сервер
  api.editUserAvatar(inputValue.link)
    .then(() => {
      // изменить аватарку на странице
      userInfo.setUserAvatar(inputValue.link);
      // закрыть попап
      popupWithAvatar.close()
      // остановить загрузку
    //  isLoading(false, avatarPopup);
    })
    .catch(err => console.log(err))
}


// обработчик кнопки удаления карточки
function handleDeleteButton(cardId, cardElement) {
  // открыть попап подтверждения действия
  //popupWithRemove.open(cardId, cardElement);

  // // удалить карточку
  confirmCardRemove(cardId, cardElement);
}


// обработчик кнопки лайка
function handleLikeButton(card) {
    if (!evt.target.classList.contains("places__like_active")) {
      addLike(card)
    } else {
      removeLike(card)
    }
}



// подтвердить удаление карточки
function confirmCardRemove(cardId, cardElement) {
//  isLoading(true, submitPopup)
  // сообщить серверу о своем решении
  api.removeCard(cardId)
    .then(() => {
      // удалить карточку из разметки
      cardElement.remove()
      // закрыть попап подтверждения
    popupWithRemove.close();
    })
    .catch(err => console.log(err))
  //  .finally(() => {
  //    isLoading(false, submitPopup)
  //  })
}


// загружается?
function isLoading(loading, popup) {
  if (loading) {
    popup.querySelector('.popup__submit').textContent = 'Сохранение...';
  } else {
    if (popup.classList.contains('popup-add')) {
      popup.querySelector('.popup__submit').textContent = 'Создать';
    }
    else if (popup.classList.contains('popup-submit')) {
      popup.querySelector('.popup__submit').textContent = 'Да';
    }
    else {
      popup.querySelector('.popup__submit').textContent = 'Сохранить';
    }
  }
}




/* ---                тут теперь все  эвенты ,  но это не точно        -  */

// эвент открытия добавления по кнопке
openPopupBtnAdd.addEventListener('click', () => popupAddCard.open());

//эвент открытие профиля по кнопке
openPopupBtn.addEventListener('click', (e) => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.about;

  popupEditCard.open();
});

// слушатель нажатия на кнопку изменения аватарки
EditAvatarButton.addEventListener('click', (e) => popupWithAvatar.open())



// добавить слушателей событий на попап с картинкой
fullPopupImage.setEventListeners();
// добавить слушателей событий на попап с формой редактирования
popupEditCard.setEventListeners();
// добавить слушателей событий на попап с формой добавления карточки
popupAddCard.setEventListeners();
// добавить слушателей событий на попап с формой подтверждения
//popupWithRemove.setEventListeners()
// добавить слушателей событий на попап с формой обновления аватарки
popupWithAvatar.setEventListeners();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(values => {
    // получить информацию о пользователе
    const userData = values[0]
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      id: userData._id
    })
    userInfo.setUserAvatar(userData.avatar)

    // рендеринг набора карточек
   cardList.renderItems(values[1])
  })
  .catch(err => console.log(err))

