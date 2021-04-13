function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(forms => {
    forms.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    console.log(forms);
     const inputs = Array.from(forms.querySelectorAll(config.inputSelector))
     inputs.forEach(input => {
        input.addEventListener('input',() => {
           checkInputValidity(input, config)
        })
     })
  })
}






// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_invalid',
  inputErrorClass: 'popup__input_invalid',  // вот тут что
  errorClass: 'popup__error'
});
