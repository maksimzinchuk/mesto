import Popup from './Popup.js'
import { popupPreviewImage, popupPreviewTitle } from './../utils/constants.js'

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageName = this._popupSelector.querySelector(popupPreviewTitle);
        this._popupImageLink = this._popupSelector.querySelector(popupPreviewImage);
    }
    open(imageName, imageLink) {
        super.open();
        this._popupImageName.textContent = imageName;
        this._popupImageLink.src = imageLink;
    }
}