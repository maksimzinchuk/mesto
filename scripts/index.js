import Card from './Card.js';
import Section from './Section.js'
import PopupWithForm from './PopupWithForm.js'
import FormValidator from './FormValidator.js';
import { popupPreviewClose} from './utils.js';
import { validationConfig } from './config.js'
import { initialCards } from './initial-cards.js';

const profileEditButton = document.querySelector('.profile__edit-button');
export const popupCloseButton = document.querySelector('.popup__close-button');

const addButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup-add__close-button');

const popup = '.popup'; 
const popupAdd = '.popup-add'; 
export const popupOpened = 'popup__opened';
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
const elementsSection = '.elements';

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
    // console.log(document.querySelector(formEntity).closest('form__submit'))
    const formElement = document.querySelector(formEntity)
    const buttonElement = formElement.querySelector('.form__submit');

    if (isFormValid) {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove('form__submit_inactive');
    }
    else {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add('form__submit_inactive');
  }
}

// //функция заполнения формы профиля
// function profileForm (evt) {
//     evt.preventDefault();
     
//     userName.textContent = userNameEdit.value;
//     userLabel.textContent = userLabelEdit.value;
   

//     //закроем попап
//     popupClose(popup);
// }


// function addNewCards(newCard) {
//         const cardItem = new Section({items: newCard, renderer: (item) => {

//         const card = new Card(item, '.cards');
//         //гененрируем готовую карточку
//         const cardElement = card.generateCard();
//         //отображаем
//         cardItem.addItem(cardElement);
        
//         //выключаем попап
//         popupClose(popupAdd);
        
// }
// }, elementsSection);

//  cardItem.renderItems();

// }

//теперь идут вызовы функций
//вызов функции построения карточкек и массива initialCards
// buildCardsFromArray();
const buildCardsFromArray = new Section({items: initialCards, renderer: (item) => {
    //создаем новую карточку из класса Card
        const card = new Card(item, '.cards');
        //гененрируем готовую карточку
        const cardElement = card.generateCard();
        //отображаем
        buildCardsFromArray.addItem(cardElement);
        
    }
}, elementsSection)

buildCardsFromArray.renderItems();

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
    const popupOpen = new PopupWithForm({callback: (inputValues) => {
        console.log(inputValues)
        
    }} , popup );
    popupOpen.open();
    popupOpen.setEventListeners();
    //popupOpen.setEventListeners();

    //popupOpen(popup);
    // const openPopup = new Popup(popup);
    // openPopup.open();
    //openPopup.setEventListeners();
    // openPopup.setEventListeners();

    //добавим вызов функции закрытия по оверлею
   // popupOverlayClose(popup);

});

//закрываем попап редактирования профиля
// popupCloseButton.addEventListener('click', () => {
//     const closePopup = new Popup(popup);
//     closePopup.close();
// });

//открываем попап добавления фото
addButton.addEventListener('click', () => {
    //сбрасываем состояние до исходного
    addFormElement.reset();
     //делаем кнопку неактивной
     setSubmitButtonState(false, popupAdd);
    //открываем
    // popupOpen(popupAdd);
    // const openPopup = new Popup(popupAdd);
    
    const popupOpen = new PopupWithForm({ callback: () => {
        const newCard = 
         [{
         name: cardTitleNew.value,
         link: cardLinkNew.value
         }];
        const cardItem = new Section({items: newCard, renderer: (item) => {

                     const card = new Card(item, '.cards');
                     //гененрируем готовую карточку
                    const cardElement = card.generateCard();
                     //отображаем
                     cardItem.addItem(cardElement);
                              //выключаем попап
        // popupClose(popupAdd);
        
 }
 }, elementsSection);
    } }, popupAdd)

    popupOpen.open();

  //  popupOpen.setEventListeners();

   

    
    // openPopup.open();
    //openPopup.setEventListeners();
    //добавим вызов функции закрытия по оверлею
  //  popupOverlayClose(popupAdd);
});

//закрываем попап добавления фото
// popupAddCloseButton.addEventListener('click', () => {
//         popupClose(popupAdd);
//     });

//листенер отправки формы
// formElement.addEventListener('submit', profileForm);

//отправка формы карточки с фото
//  addFormElement.addEventListener('submit', (evt) => {
//     evt.preventDefault();

//     const newCard = 
//         [{
//         name: cardTitleNew.value,
//         link: cardLinkNew.value
//         }];

    
//     addNewCards(newCard)
//   //  addNewCards.renderItems();
//  });

//слушатель закрытия превью
popupPreviewCloseButton.addEventListener('click', popupPreviewClose);