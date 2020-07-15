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
const userName = document.querySelector('.profile__name');
const userLabel = document.querySelector('.profile__label');
const userNameEdit = document.querySelector('.popup__profile_name');
const userLabelEdit = document.querySelector('.popup__profile_label');

//переменные для попапа добавления фото
const cardTitleNew = document.querySelector('.popup-add__content_name');
const cardLinkNew = document.querySelector('.popup-add__content_link');

//форма попапа профиля
const formElement = document.querySelector('.popup__container');

//форма попапа добавления фото
const addFormElement = document.querySelector('.popup-add__container');

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

//объявляем функции

//функция открытия попапа
function popupOpen(modal) {
    modal.classList.add('popup__opened');
  
    document.addEventListener('keydown', popupCloseEsc);   
}

//функция закрытия попапа
function popupClose(modal) {
    modal.classList.remove('popup__opened');

    document.removeEventListener('keydown', popupCloseEsc);
}

//функция закрытия попапа по нажатию ESC
function popupCloseEsc(evt) {
    if (evt.key !== 'Escape') {
        return;
    }

    const popupOpened = document.querySelector('.popup__opened');
    popupClose(popupOpened);
}

//функция закрытия по нажатию на оверлей
function popupOverlayClose(modal) {
    modal.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__opened')) {
            popupClose(modal);
        }
    });
};

//попап превью
//открываем превью
function previewOpen(imageValue, titleValue) {
    //создаем константу с содержимым тега img в elements__item
    const imageSource = imageValue;
    //создаем константу с содержимым тега h2 в elements__item
    const imageTitle = titleValue;

     imageSource.addEventListener('click', function() {
         
         //откроем превью
        popupOpen(popupPreview);
        //добавим закрытие по оверлею
        popupOverlayClose(popupPreview);
        //создаем переменную, куда записывается новый src картинки из константы imageSource
         const previewImageSrc = document.querySelector('.image-preview__item');
         previewImageSrc.src = imageSource.src;
        
         //создаем переменную с названием картинки из константы imageTitle
         const previewImageTitle = document.querySelector('.image-preview__title');
         previewImageTitle.textContent = imageTitle.textContent;
     });
}

//закрываем превью
function popupPreviewClose() { 
    popupClose(popupPreview);
}

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

//функция отправки формы профиля
function profileForm (evt) {
    evt.preventDefault();
    userName.textContent = userNameEdit.value;
    userLabel.textContent = userLabelEdit.value;
    //закроем попап
    popupClose(popup);
}

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
    deleteButton.addEventListener('click', function (_evt) {
        //выбираем ближайший родительский элемент к trash
        const deleteItem = deleteButton.closest('.elements__item');
        //удаляем его
        deleteItem.remove();
    });
}

//функция возвращает готовые карточки, которые она создает из template
function buildTemplate(cardName, cardLink) {
    //копируем template
    const cardElement = cards.cloneNode(true); 
    //title и image заносим в переменные
    const cardTitle = cardElement.querySelector('.elements__title');
    const cardImage = cardElement.querySelector('.elements__image');
    
    //записываем данные, переданные в аргументах, в шаблон(название, ссылка на картинку и ее alt)
    cardTitle.textContent = cardName;
    cardImage.src = cardLink;
    cardImage.alt = cardName;
    
    //подключаем к шаблону лайки, кнопку удаления и превью
    like(cardElement);
    cardDelete(cardElement);
    previewOpen(cardImage, cardTitle);

    //возвращаем готовую карточку
    return cardElement;
}

//отображение карточек
function renderCards(section, cards)  {
    section.prepend(cards);
}

//сборка новой карточки с фото
function addNewCards(evt) {
    evt.preventDefault();

   //отправляем введенные в инпуты значения в функцию построения карточки
    const cards = buildTemplate(cardTitleNew.value, cardLinkNew.value)
   //и отображаем их
    renderCards(cardsSection, cards);
   
    //выключаем попап
    popupClose(popupAdd);
}

//функция перебирает массив и создает карточки
function buildCardsFromArray() {
    //  перебираем массив initialCards и для каждого элемента---
      initialCards.forEach((card) => {
      //вытаскиваем имя и ссылку
      const cardName = card.name;
      const cardLink = card.link;
     
      //отправляем значения cardName и cardLink в функцию построения карточки
      const cards = buildTemplate(cardName, cardLink);
      //и отображаем их
      renderCards(cardsSection, cards);
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