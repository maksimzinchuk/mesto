const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');

let UserName = document.querySelector('.profile__name');
let UserLabel = document.querySelector('.profile__label');

let formElement = document.querySelector('.popup__container');
const popupSaveButton = formElement.querySelector('.popup__save-button');

//открытие попапа
function popupOpen() {
    const popup = document.querySelector('.popup'); 
    popup.classList.toggle('popup__opened');
    document.querySelector('.popup__profile-name').value = UserName.textContent;
    document.querySelector('.popup__profile-label').value = UserLabel.textContent;
}
profileEditButton.addEventListener('click', popupOpen);

//закрытие попапа
function popupClose() {
    const popupClose = document.querySelector('.popup'); 
    popupClose.classList.remove('popup__opened');
}
popupCloseButton.addEventListener('click', popupClose);

//отправка формы
function formSubmitHandler (evt) {
    evt.preventDefault();
    let UserNameEdit = document.querySelector('.popup__profile-name');
    let UserLabelEdit = document.querySelector('.popup__profile-label');
    UserName.textContent = UserNameEdit.value;
    UserLabel.textContent = UserLabelEdit.value;
    popupClose();
}
formElement.addEventListener('submit', formSubmitHandler);
