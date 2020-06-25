const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');

const addButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup-add__close-button');

const popup = document.querySelector('.popup'); 
const popupAdd = document.querySelector('.popup-add'); 

const likeButton = document.querySelector('.elements__like');

//для отображения картинок из массива
const cards = document.querySelector('#cards').content;
const cardsSection = document.querySelector('.elements');

//для превью
const popupPreview = document.querySelector('.image-preview');
const popupPreviewCloseButton = document.querySelector('.image-preview__close-button');

//переменные для попапа профиля
let userName = document.querySelector('.profile__name');
let userLabel = document.querySelector('.profile__label');
let userNameEdit = document.querySelector('.popup__profile_name');
let userLabelEdit = document.querySelector('.popup__profile_label');

//переменные для попапа добавления фото
const cardTitleNew = document.querySelector('.popup-add__content_name');
const cardLinkNew = document.querySelector('.popup-add__content_link');

//форма попапа профиля
let formElement = document.querySelector('.popup__container');
const popupSaveButton = formElement.querySelector('.popup__save-button');

//форма попапа добавления фото
let addFormElement = document.querySelector('.popup-add__container');

//открытие попапа
function popupOpen() {
    popup.classList.toggle('popup__opened');
    userNameEdit.value = userName.textContent;
    userLabelEdit.value = userLabel.textContent;
}
profileEditButton.addEventListener('click', popupOpen);

//закрытие попапа
function popupClose() { 
    popup.classList.remove('popup__opened');
   
}
popupCloseButton.addEventListener('click', popupClose);

//отправка формы
function formSubmitHandler (evt) {
    evt.preventDefault();
     //если поля не заполнены - не делаем ничего
    if (userNameEdit.value === '' || userLabelEdit.value === '') {
        return false;
    }

    userName.textContent = userNameEdit.value;
    userLabel.textContent = userLabelEdit.value;

    popupClose();
}
formElement.addEventListener('submit', formSubmitHandler);

//popup добавления фото
function popupAddOpen() {
    popupAdd.classList.toggle('popup-add__opened');
}
addButton.addEventListener('click', popupAddOpen);

function popupAddClose() { 
    popupAdd.classList.remove('popup-add__opened');
    //обнуляем поля ввода
    cardTitleNew.value = null;
    cardLinkNew.value = null;
}
popupAddCloseButton.addEventListener('click', popupAddClose);

//массив катрочек с фото
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//достаем имя карточки из массива и записываем в CardsName
const cardsName = initialCards.map(cardname => cardname.name);
//достаем ссылку на картинку из массива и записываем в CardsLink
const cardsLink = initialCards.map(cardlink => cardlink.link);

//функция отображает карточки и подтягивает информацию из массива initialCards
function addCards() {
    for (let i = 0; i < initialCards.length; i++) {
        //копируем template
          const cardsElement = cards.cloneNode(true);
          let cardsElementImage = cardsElement.querySelector('.elements__image');
          let cardsElementTitle = cardsElement.querySelector('.elements__title');

          //записываем адрес картинки в img src и название в h2
          cardsElementImage.src = cardsLink[i];
          cardsElementTitle.textContent = cardsName[i];   

          //записываем параметр alt в image
           cardsElement.querySelector('.elements__image').alt = cardsName[i];  
      
          //подключаем функцию лайков 
          like(cardsElement);

          //подключаем удаление элементов
          cardDelete(cardsElement);

          //подключаем превью
          previewOpen(cardsElementImage, cardsElementTitle);

          //отображаем
          cardsSection.append(cardsElement); 
    }; 
}
addCards();

//добавляем новые карточки

function addNewCards(evt) {
    evt.preventDefault();
    //клонируем template для новой карточки
   const newCards = cards.cloneNode(true);
   let newCardImage = newCards.querySelector('.elements__image');
   let newCardTitle = newCards.querySelector('.elements__title');

    //записываем введенные значения в новую карточку
    newCardImage.src = cardLinkNew.value;
    newCardTitle.textContent = cardTitleNew.value;   

    //записываем параметр alt в image
    newCardImage.alt = cardTitleNew.value;  

    //если поля не заполнены - не делаем ничего
    if (cardTitleNew.value === '' || cardLinkNew.value === '') {
        return false;
    }

    //подключаем удаление элементов
    cardDelete(newCards);

    //подключаем функцию лайков 
    like(newCards);

    //подключаем превью
    previewOpen(newCardImage, newCardTitle);

    //отображаем
    cardsSection.prepend(newCards); 
   
    //выключаем попап
    popupAddClose();
}
addFormElement.addEventListener('submit', addNewCards);


// функция лайков
function like(value) {
    //передаем value, чтоб лайки работали в копировании template
    value.querySelector('.elements__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active');
      });
}


//удаление карточек
function cardDelete(value) {
    //выбираем trash в template
    const deleteButton = value.querySelector('.elements__trash');

    //добавляем слушатель на trash
    deleteButton.addEventListener('click', function (evt) {
        //выбираем ближайший родительский элемент к trash
        const deleteItem = deleteButton.closest('.elements__item');
        //удаляем его
        deleteItem.remove();
    });
}


//превью

//открываем превью

function previewOpen(imageValue, titleValue) {
    //создаем константу с содержимым тега img в elements__item
    const imageSource = imageValue;
    //создаем константу с содержимым тега h2 в elements__item
    const imageTitle = titleValue;

    imageSource.addEventListener('click', function() {
        popupPreview.classList.toggle('image-preview__opened');
        
        //создаем переменную, куда записывается новый src картинки из константы imageSource
        let previewImageSrc = document.querySelector('.image-preview__item');
        previewImageSrc.src = imageSource.src;
        
        //создаем переменную с названием картинки из константы imageTitle
        let previewImageTitle = document.querySelector('.image-preview__title');
        previewImageTitle.textContent = imageTitle.textContent;
    });
}

//закрываем превью
function popupPreviewClose() { 
    popupPreview.classList.remove('image-preview__opened');
}
popupPreviewCloseButton.addEventListener('click', popupPreviewClose);