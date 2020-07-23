import { popupOpen, popupClose, popupOverlayClose } from './index.js';

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