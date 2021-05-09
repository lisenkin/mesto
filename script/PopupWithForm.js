import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, cleanForm) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._cleanForm = cleanForm;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  submitForm(evt) {
    evt.preventDefault();
    const inputsData = this._getInputValues();
    this._handleFormSubmit(inputsData);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this.submitForm.bind(this));
  }

  close() {
    this._cleanForm();
    super.close();
  }

  _getInputValues() {
    const inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    const inputValues = {};
    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    })
    return inputValues;
  }
}
