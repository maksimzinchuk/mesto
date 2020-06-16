const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup'); 

let UserName = document.querySelector('.profile__name');
let UserLabel = document.querySelector('.profile__label');
let UserNameEdit = document.querySelector('.popup__profile_name');
let UserLabelEdit = document.querySelector('.popup__profile_label');

let formElement = document.querySelector('.popup__container');
const popupSaveButton = formElement.querySelector('.popup__save-button');

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
    UserName.textContent = UserNameEdit.value;
    UserLabel.textContent = UserLabelEdit.value;
    popupClose();
}
formElement.addEventListener('submit', formSubmitHandler);
