import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleDelete }, popupSelector) {
    super(popupSelector);
    this._handleDelete = handleDelete;
  }

  _deleteCard = () => {
    this._handleDelete();
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector
      .querySelector(".popup-delete__button")
      .addEventListener("click", this._deleteCard);
  }
}
