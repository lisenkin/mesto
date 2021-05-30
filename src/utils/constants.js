//for validation
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_invalid',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_active'
};


export const openPopupBtn = document.querySelector('.profile__button-edit');
export const openPopupBtnAdd = document.querySelector('.profile__button-add'); //add

//forms
export const formEditCard = document.querySelector("#popup-form-edit"); //edit

//inputs and avatar

export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_status')
export const formAddCard = document.querySelector('#popup-form-add');
export const EditAvatarButton = document.querySelector('.profile__overlay');
export const formEditAvatar = document.querySelector("#popup-form-add-avatar");
