export default class UserInfo {
  constructor(data) {
  this._data = data;  //принимает имя и статус(работку)
  }

  // return обьект с данными. подставляет в форму при открытии
  getUserInfo() {
  return {
  //  nameInput.value = profileName.textContent;
  //jobInput.value = profileStatus.textContent;
      name: this._data.name.textContent,
      job: this._data.job.textContent
  }
  }
// вставляет новые данные на страницу
  setUserInfo(data) {
  //profileName.textContent = nameInput.value;  временно на память из старого index.js
  //profileStatus.textContent = jobInput.value;
  this._data.name.textContent = data.name;
  this._data.job.textContent = data.job;
  }
}
