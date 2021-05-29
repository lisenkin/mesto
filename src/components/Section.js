export default class Section {
  constructor({renderer}, selector) {
  // карточки изначальные убрали
      this._renderer = renderer;
      this._selector = document.querySelector(selector);
  }

  renderItems(data) {
    //теперь рисуем дату
      data.forEach((item) => {
          this._renderer(item);
      });
  }

  setItems(element) {
      this._selector.append(element);
  }

  prependItems(element) {
      this._selector.prepend(element);
  }
}
