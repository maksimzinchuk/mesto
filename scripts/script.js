const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');

const AddButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup-add__close-button');

const popup = document.querySelector('.popup'); 
const popupAdd = document.querySelector('.popup-add'); 

const likeButton = document.querySelector('.elements__like');

//для отображения картинок из массива
const Cards = document.querySelector('#cards').content;
const CardsSection = document.querySelector('.elements');

//для превью
const popupPreview = document.querySelector('.image-preview');
const popupPreviewCloseButton = document.querySelector('.image-preview__close-button');

//переменные для попапа профиля
let UserName = document.querySelector('.profile__name');
let UserLabel = document.querySelector('.profile__label');
let UserNameEdit = document.querySelector('.popup__profile_name');
let UserLabelEdit = document.querySelector('.popup__profile_label');

//переменные для попапа добавления фото
const CardTitleNew = document.querySelector('.popup-add__content_name');
const CardLinkNew = document.querySelector('.popup-add__content_link');

//форма попапа профиля
let formElement = document.querySelector('.popup__container');
const popupSaveButton = formElement.querySelector('.popup__save-button');

//форма попапа добавления фото
let AddFormElement = document.querySelector('.popup-add__container');

//открытие попапа
function popupOpen() {
    popup.classList.toggle('popup__opened');
    UserNameEdit.value = UserName.textContent;
    UserLabelEdit.value = UserLabel.textContent;
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
    if (UserNameEdit.value === '') {
        return false;
    }

    UserName.textContent = UserNameEdit.value;
    UserLabel.textContent = UserLabelEdit.value;

    popupClose();
}
formElement.addEventListener('submit', formSubmitHandler);

//popup добавления фото
function popupAddOpen() {
    popupAdd.classList.toggle('popup-add__opened');
}
AddButton.addEventListener('click', popupAddOpen);

function popupAddClose() { 
    popupAdd.classList.remove('popup-add__opened');
    //обнуляем поля ввода
    CardTitleNew.value = null;
    CardLinkNew.value = null;
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
const CardsName = initialCards.map(cardname => cardname.name);
//достаем ссылку на картинку из массива и записываем в CardsLink
const CardsLink = initialCards.map(cardlink => cardlink.link);

//функция отображает карточки и подтягивает информацию из массива initialCards
function CardsAdd() {
    for (let i = 0; i < initialCards.length; i++) {
        //копируем template
          const CardsElement = Cards.cloneNode(true);
          let CardsElementImage = CardsElement.querySelector('.elements__image');
          let CardsElementTitle = CardsElement.querySelector('.elements__title');

          //записываем адрес картинки в img src и название в h2
          CardsElementImage.src = CardsLink[i];
          CardsElementTitle.textContent = CardsName[i];   

          //записываем параметр alt в image
           CardsElement.querySelector('.elements__image').alt = CardsName[i];  
      
          //подключаем функцию лайков 
          like(CardsElement);

          //подключаем удаление элементов
          cardDelete(CardsElement);

          //подключаем превью
          previewOpen(CardsElementImage, CardsElementTitle);

          //отображаем
          CardsSection.append(CardsElement); 
    }; 
}
CardsAdd();

//добавляем новые карточки

function CardsAddNew(evt) {
    evt.preventDefault();
    //клонируем template для новой карточки
   const NewCards = Cards.cloneNode(true);
   let NewCardImage = NewCards.querySelector('.elements__image');
   let NewCardTitle = NewCards.querySelector('.elements__title');

    //записываем введенные значения в новую карточку
    NewCardImage.src = CardLinkNew.value;
    NewCardTitle.textContent = CardTitleNew.value;   

    //записываем параметр alt в image
    NewCardImage.alt = CardTitleNew.value;  

    //если поля не заполнены - не делаем ничего
    if (CardTitleNew.value === '' || CardLinkNew.value === '') {
        return false;
    }

    //подключаем удаление элементов
    cardDelete(NewCards);

    //подключаем функцию лайков 
    like(NewCards);

    //подключаем превью
    previewOpen(NewCardImage, NewCardTitle);

    //отображаем
    CardsSection.prepend(NewCards); 
   
    //выключаем попап
    popupAddClose();
}
AddFormElement.addEventListener('submit', CardsAddNew);


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