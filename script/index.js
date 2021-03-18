
const popup = document.querySelector('.popup');
const openPopupBtn = document.getElementById('open_popup_btn');
const closePopupBtn = document.querySelector('.popup__close-button');
const popupOverlay = document.querySelector('.popup__overlay');


//получим с профиля данные
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

//для отладки
//console.log(profileName.value);

 // Находим форму в DOM
let formElement = document.querySelector('.popup__form');

//считаем что в форме
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-status');

//для отладки
//console.log(nameInput.value);
//console.log(jobInput.value);

// считаем в поля что в форме данные из сайта
function toForm(){
  nameInput.setAttribute(profileName.textContent.value);
  jobInput.setAttribute(profileDescription.textContent.value);
  }

// по клику открыть попап (добавить класс)
function openPopup(){
    popup.classList.add('popup_visible');
    toForm(); //тут попробуем так
}

//по клику закрыть попап (убрать класс)
// по клику на оверлей закрыть попап
function closePopup(){
    popup.classList.remove('popup_visible');
}

openPopupBtn.addEventListener('click' ,function(){
    openPopup();
});

 closePopupBtn.addEventListener('click', function() {closePopup(); });
 popupOverlay.addEventListener('click', function() {closePopup(); });




// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitHandler (evt) {
    evt.preventDefault();

    // Получите значение полей jobInput и nameInput из свойства value
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
    closePopup();  //закроем


}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
