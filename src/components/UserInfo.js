export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
    this._avatarSelector = avatarSelector;
  }

  getUserInfo() {
    this._userProfileData = {};
    this._userProfileData.name = this._nameSelector.textContent;
    this._userProfileData.about = this._infoSelector.textContent;
    return this._userProfileData;
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._infoSelector.textContent = data.about;
    this._avatarSelector.src = data.avatar;
    this._avatarSelector.alt = data.name;
  }
}
