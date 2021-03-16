console.log('ok');

// по клику открыть попап (добавить класс)

//по клику закрыть попап (убрать класс)

// по клику на оверлей закрыть попап 

const popup = document.querySelector('.popup');
const openPopupBtn = document.getElementById('open_popup_btn');
const closePopupBtn = document.querySelector('.popup__close-button');
const popupOverlay = document.querySelector('.popup__overlay');


function openPopup(){
    popup.classList.add('popup_visible');
}


function closePopup(){
    popup.classList.remove('popup_visible');
}

openPopupBtn.addEventListener('click' ,function(){
    openPopup();
});

 closePopupBtn.addEventListener('click', function() {closePopup(); });
 popupOverlay.addEventListener('click', function() {closePopup(); });