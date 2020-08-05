import { popupCloseButton } from './index.js'

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        
       // this.popupCloseButton = this._popupSelector.querySelector(popupCloseButton)
    }

    open() {
        this._popupSelector.classList.add('popup__opened');
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._handleOverlayClose);
        
    }

    close() {
       
        this._popupSelector.classList.remove('popup__opened');
        document.removeEventListener('keydown', this._handleEscClose);
        
    }

    _handleEscClose = () => {
        
       if (event.key !== 'Escape'){
           return;
       }
       
      
        this.close()
       console.log('esc')
        
    }

    _handleOverlayClose = () => {
        if (event.target.classList.contains('popup__opened')) {
            this.close();
        }
    }


    setEventListeners() {
        popupCloseButton.addEventListener('click', () => { 
            this.close();
            
        });
      
           
       
       
    }



}