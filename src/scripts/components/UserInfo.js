export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
  }

  getUserInfo() {
    this._userProfileData = {};
    this._userProfileData.name = this._nameSelector.textContent;
    this._userProfileData.label = this._infoSelector.textContent;
    return this._userProfileData;
  }

  setUserInfo(newUserName, newUserLabel) {
    this._nameSelector.textContent = newUserName;
    this._infoSelector.textContent = newUserLabel;
  }
}
