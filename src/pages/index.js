import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
//import { initialCards } from '../components/initial-cards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithRemove from '../components/PopupWithRemove.js';

import {
  config, openPopupBtn, openPopupBtnAdd, formEditCard, nameInput, jobInput,
  formAddCard, EditAvatarButton, formEditAvatar
} from '../utils/constants.js'
import './index.css';


//включим валидацию
const addCardValidator = new FormValidator(config, formAddCard);
addCardValidator.enableValidation();

const editProfileValidator = new FormValidator(config, formEditCard);
editProfileValidator.enableValidation();

const avatarValidator = new FormValidator(config, formEditAvatar);
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
const popupAddCard = new PopupWithForm('.popup-add-card', createPopupAddCard);
//попап аватар
const popupWithAvatar = new PopupWithForm('.popup-add-avatar', addNewAvatar);
//попап точно закрыть?
const popupWithRemove = new PopupWithRemove('.popup-remove-card', confirmCardRemove)

//карточка юзеринфо
const userInfo = new UserInfo('.profile__name', '.profile__status', '.profile__avatar');


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
function EditProfileSubmitHandler(inputValues) {
  // отправить значения на сервер через апи
  api.editUserInfo(inputValues)
    .then(() => {
      // изменить значения на странице через юзеринфо
      //console.log(inputValues);
      userInfo.setUserInfo(inputValues);


      popupEditCard.close();
    })
    .catch(err => console.log(err))
}


// обработчик формы создания карточек
function createPopupAddCard(inputValues) {
  //console.log(inputValues);
  // карточку на сервер POST API
  api.addCard(inputValues)
    .then(data => {
      renderCard({
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

}


// рендерер карточек
function renderCard(data) {
  // новый экземпляр карточки
  const newcard = new Card(data, // данные карточки (name link likes owner _id)
    '#card-template', // темплейт селектор
    userInfo.getUserId(), // currentUser
    handleCardClick, // большая картинка fullimagepopup
    handleDeleteButton, // удаление
    toggleLike // лааайки
  )

  const cardElement = newcard.generateCard();
  cardList.prependItems(cardElement);
}

//обработчик открытия галереи
function handleCardClick(name, link) {
  fullPopupImage.open(name, link)
}


// обработчик аватарки
function addNewAvatar(inputValue) {
  // отправить запрос
  api.editUserAvatar(inputValue.link)
    .then(() => {
      // изменить аватарку (отрисовать новую)
      userInfo.setUserAvatar(inputValue.link);
      // закрыть
      popupWithAvatar.close()

    })
    .catch(err => console.log(err))
}


// удалить карточку
function handleDeleteButton(cardId, cardElement) {
  //открыть попап конфирм ремув
  popupWithRemove.open(cardId, cardElement);
  //удалялка без попапа для тестов ниже
  /*api.removeCard(cardId)
  .then(() => {
    // удалить карточку из разметки ДОМ
    cardElement.remove() */
  // // вызвать функу удалить карту
  confirmCardRemove(cardId, cardElement);

}

//лайк тоггл
const toggleLike = (evt, cardId, likesCounter) => {
  if (evt.target.classList.contains('places__like_active')) { //если уже актив
    api.removeLike(cardId) // то снять
      .then((res) => {
        likesCounter.textContent = res.likes.length;
        evt.target.classList.toggle('places__like_active'); // покрась
      })
      .catch((err) => console.error(err));
  } else {
    if (evt.target.classList.contains('place__like')) {
      api.addLike(cardId) //добавь
        .then((res) => {
          likesCounter.textContent = res.likes.length;
          evt.target.classList.toggle('places__like_active'); //покрась
        })
        .catch((err) => console.error(err));
    }
  }
}



// точно удалить? с таким трудом добавляли
function confirmCardRemove(cardId, cardElement) {

  api.removeCard(cardId)
    .then(() => {
      // удалить карточку :(
      cardElement.remove()
      // закрыть попап
      popupWithRemove.close();
    })
    .catch(err => console.log(err))

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

// слушатель аватарки
EditAvatarButton.addEventListener('click', (e) => popupWithAvatar.open())



// добавить слушателей событий на попап с картинкой
fullPopupImage.setEventListeners();
// добавить слушателей событий на попап с формой редактирования
popupEditCard.setEventListeners();
// добавить слушателей событий на попап с формой добавления карточки
popupAddCard.setEventListeners();
// добавить слушателей событий на попап с формой подтверждения
popupWithRemove.setEventListeners()
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

