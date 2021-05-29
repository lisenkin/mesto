export default class UserInfo {
  constructor(nameSelector,jobSelector,avatarselector) {//принимает имя и статус(работку) и аватарку
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarselector);
  }

  // return обьект с данными. подставляет в форму при открытии
  getUserInfo() {
    return {
      //  nameInput.value = profileName.textContent;
      //jobInput.value = profileStatus.textContent;
      name: this._name.textContent,
      about: this._about.textContent
    }
  }
  // вставляет новые данные на страницу
  setUserInfo({name,about,id}) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._id = id;
  }

    // установить аватар
    setUserAvatar(avatar) {
      this._avatar.src = avatar;
  }

  // получить АйДи пользователя
  getUserId() {
      const userId = this._id;
      return userId
  }

}
