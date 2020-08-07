const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = '.popup__close-button';

const addButton = document.querySelector('.profile__add-button');

const popup = '.popup'; 
const popupAdd = '.popup-add'; 
const popupOpened = 'popup__opened';
//для превью
const popupPreview = '.image-preview';
const popupPreviewImage = '.image-preview__item';
const popupPreviewTitle = '.image-preview__title';

//переменные для попапа профиля
const userName = document.querySelector('.profile__name');
const userLabel = document.querySelector('.profile__label');
const userNameEdit = document.querySelector('.popup__profile_name');
const userLabelEdit = document.querySelector('.popup__profile_label');

//переменная для поиска секции elements для добавления новых фото
const elementsSection = '.elements';

//форма попапа профиля
const formElement = document.querySelector('.popup__container');

//форма попапа добавления фото
const addFormElement = document.querySelector('.popup-add__container');

//конфиг настроек с селекторами
const validationConfig = {
    fieldSelector: '.form__field',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'form__input-error',
    errorClass: 'form__type-error'
};

//массив катрочек с фото
const initialCards = [
    {
        title: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        title: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        title: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        title: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        title: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        title: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export { profileEditButton, 
    popupCloseButton, 
    addButton, 
    popup, 
    popupAdd, 
    popupOpened,
    popupPreview, 
    popupPreviewImage, 
    popupPreviewTitle, 
    userName, 
    userLabel,
    userNameEdit, 
    userLabelEdit, 
    elementsSection, 
    formElement, 
    addFormElement,
    validationConfig,
    initialCards
};