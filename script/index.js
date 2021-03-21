
const popup = document.querySelector('.popup');
const openPopupBtn = document.getElementById('open_popup_btn');
const closePopupBtn = document.querySelector('.popup__close-button');



//получим с профиля данные
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

//для отладки
//console.log(profileName.value);

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

//считаем что в форме
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_status');

//для отладки
//console.log(nameInput.value);
//console.log(jobInput.value);



// по клику открыть попап (добавить класс)
function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  popup.classList.add('popup_visible');

}

//по клику закрыть попап (убрать класс)
// по клику на оверлей закрыть попап
function closePopup() {
  popup.classList.remove('popup_visible');
}

openPopupBtn.addEventListener('click', openPopup);


closePopupBtn.addEventListener('click', closePopup);





// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitHandler(evt) {
  evt.preventDefault();

  // Получите значение полей jobInput и nameInput из свойства value
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup();  //закроем


}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
