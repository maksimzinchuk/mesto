//эта функция удаляет ошибки, если пользователь закрывает попап
const hidePopupErrors = (formList, {inputSelector, fieldSelector, inputErrorClass, errorClass}) => {
    //создаем массив их кнопок, открывающих попап
    const profileButtons = Array.from(document.querySelectorAll('.profile__reset'));
    //проходимся пр массиву кнопок
    profileButtons.forEach((button) => {
         //для каждой создаем слушатель клика
         button.addEventListener('click', () => {
         //по клику проходимся по массиву форм formList
                formList.forEach((item) => {
                     //каждый инпут формы заносим в массив
                     const inputs = Array.from(item.querySelectorAll(inputSelector));
                     //проходимся по массиву инпутов
                     inputs.forEach((inputReset) => {
                         //условие: если у инпута есть класс с ошибкой, то
                         if (inputReset.classList.contains(errorClass)) {
                              //находим span по его классу
                             const spanReset = inputReset.closest(fieldSelector).querySelector(`.${inputErrorClass}`);
                             //удаляем класс ошибки с инпута
                             inputReset.classList.remove(errorClass);
                             //и удаляем класс ошибки со span'a
                             spanReset.classList.remove(`${inputErrorClass}_active`);
                            }
                        }); 
                 });

            });
    });  
}

//функция проверяет, есть ли невалидные поля
const hasInvalidInput = (formInputList) => {
    //пройдемся по массиву инпутов методом some
   
    return formInputList.some((validatingInput) => {
        //если поле инпута невалидно, то вернем true
        //при этом проверяется каждое поле, и если хоть одно вернет true - 
        //обход массива прекратится и функция вернет true
        return !validatingInput.validity.valid;
    });
}

//функция стилизации кнопки
//принимает на вход массив полей инпут и кнопку submit
const toggleButtonState = (formInputList, buttonElement) => {
    //проверяем, есть ли некорректные поля
    if (hasInvalidInput(formInputList)) {
        //если есть - делаем кнопку неактивной
        buttonElement.classList.add('form__submit_inactive');
        buttonElement.setAttribute('disabled', true);
    }

    //если нет - делаем снова активной
    else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove('form__submit_inactive');
    }
}

//отображение ошибки заполнения
const formShowError = (fieldSelector, validatingInput, errorMessage, inputErrorClass, errorClass) => {
    //выбор элемента span для показа ошибки
    
    const errorElement = validatingInput.closest(fieldSelector).querySelector(`.${inputErrorClass}`);

    //добавляем класс для отображения красного подчеркивания ошибки
    validatingInput.classList.add(errorClass);

    //отображаем в span стандартное содержимое текста ошибки
    errorElement.textContent = errorMessage;

    //делаем видимым span
    errorElement.classList.add(`${inputErrorClass}_active`);
};

//убираем отображение ошибки
const formHideError = (fieldSelector, validatingInput, inputErrorClass, errorClass) => {
    //выбор элемента span чтоб убрать ошибку
    const errorElement = validatingInput.closest(fieldSelector).querySelector(`.${inputErrorClass}`);

    //убираем красное подчеркивание ошибки
    validatingInput.classList.remove(errorClass);

    //убираем отображение теста ошибки
    errorElement.classList.remove(`${inputErrorClass}_active`);

    //убираем тест span'a
    errorElement.textContent = ''; 
};

//валидация формы
const formValidation = (validatingInput, {fieldSelector, inputErrorClass, errorClass}) => {
    if (!validatingInput.validity.valid) {
        formShowError(fieldSelector, validatingInput, validatingInput.validationMessage, inputErrorClass, errorClass);
    }
    else {
        formHideError(fieldSelector, validatingInput, inputErrorClass, errorClass); 
    }
};

//слушатель событий для полей формы
const formEventListener = (validatingForm, {inputSelector, ...rest}) => {
    //найдем все поля формы и сделаем из них массив
    const formInputList = Array.from(validatingForm.querySelectorAll(inputSelector));

    //найдем в текущей форме кнопку submit формы
    const buttonElement = validatingForm.querySelector('.form__submit');

    //тут вызовем функцию проверки состояния кнопки, чтоб проверить состояние кнопки до загрузки страницы
    toggleButtonState(formInputList, buttonElement);
    //отправим массив полей в функцию, проверяющую есть ли невалидные поля
    hasInvalidInput(formInputList);

    //с помощью forEach проходим по каждому элементу массива
    formInputList.forEach((validatingInput) => {
        //добавим каждому полю обработчик ввода input для отображения сообщений об ошибках
        validatingInput.addEventListener('input', () => {
            //в обработчике событий вызовем функцию валидации формы formValidation и передадим
            //ей форму и проверяемый элемент ввода
            formValidation(validatingInput, {...rest});

            //тут вызовем функцию toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(formInputList, buttonElement);  
        });
    });
};

//здесь мы найдем все формы, чтобы вызвать для них слушатель formEventListener
const enableValidation = ({formSelector, ...rest}) => {
    //сначала найдем все формы с классом 'form' и добавим их в массив
    const formList = Array.from(document.querySelectorAll(formSelector));
    //с помощью forEach пройдемся по созданному массиву
    formList.forEach((validatingForm) => {
         //уберем стандартное поведение на submit
         validatingForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
         });
         //и для каждой формы вызовем слушатель formEventListener
         formEventListener(validatingForm, {...rest});
         
    });
    //передадим массив форм в функцию скрытия ошибок при закрытии попапа
    hidePopupErrors(formList, {...rest})
};

enableValidation({
    formSelector: '.form',
    fieldSelector: '.form__field',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'form__input-error',
    errorClass: 'form__type-error'
  });