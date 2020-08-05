//для превью
const popupPreview = document.querySelector('.image-preview');

//попап превью
//открываем превью
export function previewOpen(imageValue, titleValue) {
    //откроем превью
   popupOpen(popupPreview);
   //добавим закрытие по оверлею
   popupOverlayClose(popupPreview);
   //создаем переменную, куда записывается новый src картинки из константы imageSource
    const previewImageSrc = document.querySelector('.image-preview__item');
    previewImageSrc.src = imageValue;
   
    //создаем переменную с названием картинки из константы imageTitle
    const previewImageTitle = document.querySelector('.image-preview__title');
    previewImageTitle.textContent = titleValue;
}

//закрываем превью
export function popupPreviewClose() { 
popupClose(popupPreview);
}

// //функция открытия попапа
// export function popupOpen(modal) {
//     modal.classList.add('popup__opened');
  
//     document.addEventListener('keydown', popupCloseEsc);   
// }

// //функция закрытия попапа
// export function popupClose(modal) {
//     modal.classList.remove('popup__opened');

//     document.removeEventListener('keydown', popupCloseEsc);
// }

//функция закрытия по нажатию на оверлей
// export function popupOverlayClose(modal) {
//     modal.addEventListener('click', (evt) => {
//         if (evt.target.classList.contains('popup__opened')) {
//             popupClose(modal);
//         }
//     });
// };

//функция закрытия попапа по нажатию ESC
// function popupCloseEsc(evt) {
//     if (evt.key !== 'Escape') {
//         return;
//     }

//     const popupOpened = document.querySelector('.popup__opened');
//     popupClose(popupOpened);
// }