import "./../pages/index.css"; //импорт стилей для webpack

import Card from "./../scripts/components/Card.js";
import Section from "./../scripts/components/Section.js";
import PopupWithForm from "./../scripts/components/PopupWithForm.js";
import PopupWithImage from "./../scripts/components/PopupWithImage.js";
import PopupWithDelete from "./../scripts/components/PopupWithDelete.js";
import UserInfo from "./../scripts/components/UserInfo.js";
import FormValidator from "./../scripts/components/FormValidator.js";
import Api from "./../scripts/components/Api.js";
import {
  profileEditButton,
  addButton,
  popup,
  popupAdd,
  popupPreview,
  userName,
  userLabel,
  userAvatar,
  userNameEdit,
  userLabelEdit,
  elementsSection,
  formElement,
  addFormElement,
  validationConfig,
  popupAvatar,
  avatarImage,
  avatarFormElement,
  apiOptions,
} from "./../scripts/utils/constants.js";

//переменная для массива и для использования вне разных функций
let buildCardsFromArray = "";

//создаем экземпляр класса Api
const api = new Api(apiOptions);

//объявляем функции

//подключим валидацию профиля, создаем новый экземпляр класса FromValidator
const editFormValidation = new FormValidator(validationConfig, formElement);
editFormValidation.enableValidation();
//подключим валидацию добавления фото, создаем новый экземпляр класса FromValidator
const addFormValidation = new FormValidator(validationConfig, addFormElement);
addFormValidation.enableValidation();
//подключим валидацию изменения аватара, создаем новый экземпляр класса FromValidator
const avatarFormValidation = new FormValidator(
  validationConfig,
  avatarFormElement
);
avatarFormValidation.enableValidation();

//создаем новый экземпляр класса превью картинки
const popupOpen = new PopupWithImage(popupPreview);
//и включаем слушатели
popupOpen.setEventListeners();

//получим данные пользователя с сервера и подставим их в DOM
api
  .getUserData()
  .then((data) => {
    userProfile.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

//получим массив карточек
api
  .getInitialCards()
  .then((data) => {
    //перевернем массив для правильного отображения последних добавленных фото
    const reversedData = data.reverse();
    //передадим карточки в функцию buildCard
    buildCard(reversedData);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

//функция обрабатывает входящий item - данные каждой карточки
const createCard = (item) => {
  //создаем новый экземпляр класса Card, куда передаем item(данные карточки),
  //селектор template и коллбек, обрабатывающий нажатия на карточку для открытия превью
  const card = new Card(item, ".cards", {
    handleCardClick: () => {
      popupOpen.open(item.name, item.link);
    },
    handleDeletePopup: () => {
      deletePopup.open();
      deletePopup.setEventListeners();
    },
    handleLikePut: () => {
      api
        .putLike(item._id)
        .then(() => {
          card.likeAdd();
          card.likeCounterPlus();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    },
    handleLikeDelete: () => {
      api
        .deleteLike(item._id)
        .then(() => {
          card.likeRemove();
          card.likeCounterMinus();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    },
  });

  //генерируем готовую разметку карточки
  const newCard = card.generateCard();

  //создаем экземпляр класса попапа удаления карточки
  const deletePopup = new PopupWithDelete(
    {
      handleDelete: () => {
        api
          .deleteCard(item._id)
          .then(() => {
            card.deleteElement();
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          })
          .finally(() => {
            deletePopup.close();
          });
      },
    },
    ".popup-delete"
  );

  //проверяем, чья карточка и оставляем кнопку удаления только на своих
  api
    .getUserData()
    .then((data) => {
      if (item.owner._id != data._id) {
        newCard.querySelector(".elements__trash").remove();
      }

      //если стоит мой лайк - подсвечиваем сердечко
      item.likes.forEach((like) => {
        if (like._id == data._id) {
          card.likeAdd();
        }
      });
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  //используем новый экземпляр класса Section для отображения
  buildCardsFromArray.addItem(newCard);
};

//создаем новый экземляр класса Section, передаем ему массив карточек, он их обрабатывает
//и каждую отдеьно передает через renderer в виде item, находящегося в аргументах createCard
const buildCard = (items) => {
  buildCardsFromArray = new Section(
    { items: items, renderer: createCard },
    elementsSection
  );
  buildCardsFromArray.renderItems();
};

//создаем новый экземпляр класса UserInfo
const userProfile = new UserInfo({
  nameSelector: userName,
  infoSelector: userLabel,
  avatarSelector: userAvatar,
});

//создаем новый экземпляр класса попапа профиля и данные для отправки
const popupProfile = new PopupWithForm(
  {
    handleFormSubmit: (inputValues) => {
      popupProfile.renderLoading("Сохранение...");
      //отправляем новые данные в класс UserInfo для добавления на страницу
      //      userProfile.setUserInfo(inputValues.name, inputValues.label);
      api
        .saveUserData(inputValues)
        .then((res) => {
          userProfile.setUserInfo(res);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
          popupProfile.renderLoading("Сохранить");
        });
    },
  },
  popup
);
popupProfile.setEventListeners();

//создаем новый экземпляр класса попапа добавления фото
const popupAddOpen = new PopupWithForm(
  //отправляем createCard в handleFormSubmit, чтобы подставить в createCard значения,
  //введенные в инпуты и создать карту(item в createCard - те самые значения(this._getInputValues))
  {
    handleFormSubmit: (inputs) => {
      popupAddOpen.renderLoading("Сохранение...");
      api
        .addCard(inputs)
        .then((res) => {
          createCard(res);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
          popupAddOpen.renderLoading("Создать");
        });
    },
  },
  popupAdd
);
popupAddOpen.setEventListeners();

//создадим новый экземпляр класса попапа редактирования аватара
const popupAvatarEdit = new PopupWithForm(
  {
    handleFormSubmit: (input) => {
      popupAvatarEdit.renderLoading("Сохранение...");
      api
        .avatarChange(input)
        .then((res) => {
          //отправим данные в отображения в DOM
          userProfile.setUserInfo(res);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
          popupAvatarEdit.renderLoading("Сохранить");
        });
    },
  },
  popupAvatar
);
popupAvatarEdit.setEventListeners();

//а теперь обработчики событий
//открываем попап редактирования профиля и заполняем поля
profileEditButton.addEventListener("click", () => {
  //получаем данные пользователя из экземпляра класса UserInfo для подстановки при открытии попапа
  userNameEdit.value = userProfile.getUserInfo().name;
  userLabelEdit.value = userProfile.getUserInfo().about;

  //сделаем кнопку активной в этом попапе при загрузке
  //найдем в текущей форме кнопку submit формы
  //удалим класс неактивной кнопки
  editFormValidation.setSubmitButtonState(false);
  //откроем попап
  popupProfile.open();
});

//открываем попап добавления фото
addButton.addEventListener("click", () => {
  //делаем кнопку неактивной
  addFormValidation.setSubmitButtonState(true);
  //открываем
  popupAddOpen.open();
});

//открываем попап реадктирования аватара
avatarImage.addEventListener("click", () => {
  //делаем кнопку неактивной
  avatarFormValidation.setSubmitButtonState(true);
  //открываем
  popupAvatarEdit.open();
});
