import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor({ callback }, popupSelector) {
        super(popupSelector);
        this._callback = callback;
        this._form = this._popupSelector.querySelector('.form');
        this._submit = this._form.querySelector('.form__submit');
        
    }

    close() {
        super.close();

    }

    _getInputValues() {
        this._inputs = this._popupSelector.querySelectorAll('.form__input');
        this._formValue = {};
        this._inputs.forEach((input) => {
            this._formValue[input.name] = input.value;
        });
        return this._formValue;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callback(this._getInputValues())
        });
    }
}