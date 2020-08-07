import './../pages/index.css'; //импорт стилей для webpack

import Card from './../scripts/components/Card.js';
import Section from './../scripts/components/Section.js';
import PopupWithForm from './../scripts/components/PopupWithForm.js';
import PopupWithImage from './../scripts/components/PopupWithImage.js';
import UserInfo from './../scripts/components/UserInfo.js';
import FormValidator from './../scripts/components/FormValidator.js';
import { profileEditButton,
    addButton,
    popup,
    popupAdd,
    popupPreview,
    userName,
    userLabel,
    userNameEdit,
    userLabelEdit,
    elementsSection,
    formElement,
    addFormElement,
    validationConfig,
    initialCards
} from './../scripts/utils/constants.js';


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

//создаем новый экземпляр класса превью картинки
const popupOpen = new PopupWithImage(popupPreview);
//и включаем слушатели
popupOpen.setEventListeners();

//функция обрабатывает входящий item - данные каждой карточки
const createCard = (item) => {
    //создаем новый экземпляр класса Card, куда передаем item(данные карточки), 
    //селектор template и коллбек, обрабатывающий нажатия на карточку для открытия превью
    const card = new Card( 
        item, 
        '.cards', 
        { handleCardClick: () => {
              popupOpen.open(item.title, item.link);
            } 
        } 
    )
    //генерируем готовую разметку карточки
    const newCard = card.generateCard();
    //используем новый экземпляр класса Section для отображения
    buildCardsFromArray.addItem(newCard)
}

//создаем новый экземляр класса Section, передаем ему массив карточек, он их обрабатывает
//и каждую отдеьно передает через renderer в виде item, находящегося в аргументах createCard
const buildCardsFromArray = new Section( {items: initialCards, renderer: createCard }, elementsSection);
buildCardsFromArray.renderItems();

//создаем новый экземпляр класса UserInfo
const userProfile = new UserInfo({ nameSelector: userName, infoSelector: userLabel });

//создаем новый экземпляр класса попапа профиля и данные для отправки
const popupProfile = new PopupWithForm(
    { handleFormSubmit: (inputValues) => {
        //отправляем новые данные в класс UserInfo для добавления на страницу
        userProfile.setUserInfo(inputValues.name, inputValues.label);
    } },
    popup  
);
popupProfile.setEventListeners();

//создаем новый экземпляр класса попапа добавления фото
const popupAddOpen = new PopupWithForm(
    //отправляем createCard в handleFormSubmit, чтобы подставить в createCard значения,
    //введенные в инпуты и создать карту(item в createCard - те самые значения(this._getInputValues))
    { handleFormSubmit: createCard },
    popupAdd
);
popupAddOpen.setEventListeners();

//а теперь обработчики событий
//открываем попап редактирования профиля и заполняем поля
profileEditButton.addEventListener('click', () => {
    //получаем данные пользователя из экземпляра класса UserInfo для подстановки при открытии попапа
     userNameEdit.value = userProfile.getUserInfo().name;
     userLabelEdit.value = userProfile.getUserInfo().label; 
    
    //сделаем кнопку активной в этом попапе при загрузке
    //найдем в текущей форме кнопку submit формы
    //удалим класс неактивной кнопки
    setSubmitButtonState(true, popup);
    //откроем попап
    popupProfile.open();
});

//открываем попап добавления фото
addButton.addEventListener('click', () => {
     //делаем кнопку неактивной
     setSubmitButtonState(false, popupAdd);
     //открываем
     popupAddOpen.open();
});

