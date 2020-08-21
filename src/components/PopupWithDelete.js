import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setSubmitAction(func) {
    this._callback = func;
    this._popupSelector
    .querySelector(".popup-delete__button")
    .addEventListener("click", this._callback);
  }
}
