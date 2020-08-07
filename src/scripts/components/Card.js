export default class Card {
     constructor( data, cardSelector, { handleCardClick }) {
        this._name = data.title;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector; //записали селектор в приватное поле
     }

    //установим обработчики событий
    _setEventListeners() {
        //слушатель кнопки лайк
        this._element.querySelector('.elements__like').addEventListener('click', () => {
             this._likeButtonClick();
        });
        //слушатель кнопки удаления
        this._element.querySelector('.elements__trash').addEventListener('click', () => {
            this._deleteButtonClick();
        });
        //слушатель превью
        this._element.querySelector('.elements__image').addEventListener('click', () => {
           this._handleCardClick(this._element);
        });
    }
     
    _likeButtonClick() {
         this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
    }
     
    _deleteButtonClick() {
        this._element.remove();
    }

    //тут вернем разметку из template
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.elements__item').cloneNode(true);
        return cardElement;
    }
    
    generateCard() {
        //запишем разметку в приватное поле _element для доступа других элементов
        this._element = this._getTemplate();
        //найдем в DOM elements__image
        const elementsImage = this._element.querySelector('.elements__image');
        //добавим обработчики событий
        this._setEventListeners();

        //заносим данные
        this._element.querySelector('.elements__title').textContent = this._name;
        elementsImage.src = this._link;
        elementsImage.alt = this._name;

        //вернем готовый элемент
        return this._element;
    }
}

