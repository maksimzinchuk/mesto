import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleDelete }, popupSelector) {
    super(popupSelector);
    this._handleDelete = handleDelete;
  }


  open() {
    super.open();
    this.setEventListeners();
  }

  _deleteCard = () => {
    this._handleDelete();
    this._resetEventListeners();
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector
      .querySelector(".popup-delete__button")
      .addEventListener("click", this._deleteCard);
  }

  _resetEventListeners() {
    this._popupSelector
      .querySelector(".popup-delete__button")
      .removeEventListener("click", this._deleteCard);
  }
}
