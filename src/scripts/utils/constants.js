const profileEditButton = document.querySelector(".profile__edit-button");
const popupCloseButton = ".popup__close-button";

const addButton = document.querySelector(".profile__add-button");

const avatarImage = document.querySelector(".profile__avatar");

const popup = ".popup";
const popupAdd = ".popup-add";
const popupOpened = "popup__opened";
const popupAvatar = ".popup-avatar";

//для превью
const popupPreview = ".image-preview";
const popupPreviewImage = ".image-preview__item";
const popupPreviewTitle = ".image-preview__title";

//переменные для попапа профиля
const userName = document.querySelector(".profile__name");
const userLabel = document.querySelector(".profile__label");
const userNameEdit = document.querySelector(".popup__profile_name");
const userLabelEdit = document.querySelector(".popup__profile_label");
const userAvatar = document.querySelector(".profile__avatar");

//переменная для поиска секции elements для добавления новых фото
const elementsSection = ".elements";

//форма попапа профиля
const formElement = document.querySelector(".popup__container");

//форма попапа добавления фото
const addFormElement = document.querySelector(".popup-add__container");

//форма попапа изменения аватара
const avatarFormElement = document.querySelector(".popup-avatar__container");

//конфиг настроек с селекторами
const validationConfig = {
  fieldSelector: ".form__field",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "form__type-error",
};

const apiOptions = {
  url: "https://mesto.nomoreparties.co/v1/cohort-14",
  headers: {
    authorization: "53f63733-0798-40e6-804e-4dfb424b0ce2",
    "Content-Type": "application/json",
  },
};

export {
  profileEditButton,
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
};
