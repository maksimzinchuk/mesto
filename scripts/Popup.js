export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    open() {
        this._popupSelector.classList.add('popup__opened');
        // this.setEventListeners();
        document.addEventListener('keydown', () => { this._handleEscClose() });
        
        
    }

    close() {
        
        this._popupSelector.classList.remove('popup__opened');
        document.removeEventListener('keydown', () => { this._handleEscClose() });
        
    }

    _handleEscClose() {
        const press = event.key;
        if (press !== 'Escape') {
            return;
        }
        console.log('tets')
      
        this.close();
       
    }

    _handleOverlayClose() {

    }

    // _removeEventListeners() {
    //     document.removeEventListener('keydown', (evt) => {
    //         this._handleEscClose(evt);
           
    //   });
    // }

    setEventListeners(popupCloseButton) {
    //     this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => {
    //        this.close();
    //    })
       
        popupCloseButton.addEventListener('click', () => { this.close() })
    }
}