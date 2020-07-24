import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { popupPreviewClose, popupOpen, popupClose, popupOverlayClose } from './utils.js';
import { validationConfig } from './config.js'
import { initialCards } from './initial-cards.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');

const addButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup-add__close-button');

const popup = document.querySelector('.popup'); 
const popupAdd = document.querySelector('.popup-add'); 

//для превью

const popupPreviewCloseButton = document.querySelector('.image-preview__close-button');

//переменные для попапа профиля
const userName = document.querySelector('.profile__name');
const userLabel = document.querySelector('.profile__label');
const userNameEdit = document.querySelector('.popup__profile_name');
const userLabelEdit = document.querySelector('.popup__profile_label');

//переменные для попапа добавления фото
const cardTitleNew = document.querySelector('.popup-add__content_name');
const cardLinkNew = document.querySelector('.popup-add__content_link');

//переменная для поиска секции elements для добавления новых фото
const elementsSection = document.querySelector('.elements');

//форма попапа профиля
const formElement = document.querySelector('.popup__container');

//форма попапа добавления фото
const addFormElement = document.querySelector('.popup-add__container');

//объявляем функции

//подключаем валидацию форм
(function enableValidation() {
    //подключим валидацию профиля
    const editFormValidation = new FormValidator(validationConfig, formElement);
    editFormValidation.enableValidation();
    //подключим валидацию добавления фото
    const addFormValidation = new FormValidator(validationConfig, addFormElement);
    addFormValidation.enableValidation();
})();

//функция задает начальные значения кнопок submit 
function setSubmitButtonState(isFormValid, formEntity) {
    const buttonElement = formEntity.querySelector('.form__submit');
    if (isFormValid) {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove('form__submit_inactive');
    }
    else {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add('form__submit_inactive');
  }
}

//функция заполнения формы профиля
function profileForm (evt) {
    evt.preventDefault();
     
    userName.textContent = userNameEdit.value;
    userLabel.textContent = userLabelEdit.value;
   

    //закроем попап
    popupClose(popup);
}

//сборка новой карточки с фото
function addNewCards(evt) {
    evt.preventDefault();
    const newCard = 
        {
        name: cardTitleNew.value,
        link: cardLinkNew.value
    };

    //создаем новую карточку из класса Card
    const card = new Card(newCard, '.cards');
    //гененрируем готовую карточку
    const cardElement = card.generateCard();
    //отображаем
    elementsSection.prepend(cardElement);

    //выключаем попап
    popupClose(popupAdd);
}

//функция перебирает массив и создает карточки
function buildCardsFromArray() {
    //  перебираем массив initialCards и для каждого элемента---
    initialCards.forEach((item) => {
        //создаем новую карточку из класса Card
        const card = new Card(item, '.cards');
        //гененрируем готовую карточку
        const cardElement = card.generateCard();
        //отображаем
        elementsSection.append(cardElement);
    });
}

//теперь идут вызовы функций
//вызов функции построения карточкек и массива initialCards
buildCardsFromArray();

//а теперь обработчики событий
//открываем попап редактирования профиля и заполняем поля
profileEditButton.addEventListener('click', () => {
    userNameEdit.value = userName.textContent;
    userLabelEdit.value = userLabel.textContent; 

    //сделаем кнопку активной в этом попапе при загрузке
    //найдем в текущей форме кнопку submit формы
    
    //удалим класс неактивной кнопки
    setSubmitButtonState(true, popup);
    //откроем попап
    popupOpen(popup);

    //добавим вызов функции закрытия по оверлею
    popupOverlayClose(popup);

});

//закрываем попап редактирования профиля
popupCloseButton.addEventListener('click', () => {
    popupClose(popup);
});

//открываем попап добавления фото
addButton.addEventListener('click', () => {
    //сбрасываем состояние до исходного
    addFormElement.reset();
     //делаем кнопку неактивной
     setSubmitButtonState(false, popupAdd);
    //открываем
    popupOpen(popupAdd);
    //добавим вызов функции закрытия по оверлею
    popupOverlayClose(popupAdd);
});

//закрываем попап добавления фото
popupAddCloseButton.addEventListener('click', () => {
        popupClose(popupAdd);
    });

//листенер отправки формы
formElement.addEventListener('submit', profileForm);

//отправка формы карточки с фото
addFormElement.addEventListener('submit', addNewCards);

//слушатель закрытия превью
popupPreviewCloseButton.addEventListener('click', popupPreviewClose);