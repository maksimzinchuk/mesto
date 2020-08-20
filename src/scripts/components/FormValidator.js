export default class FormValidator {
  constructor(data, validatingForm) {
    this._fieldSelector = data.fieldSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._validatingForm = validatingForm;
    this._buttonElement = this._validatingForm.querySelector(".form__submit");
  }

  //эта функция удаляет ошибки, если пользователь закрывает попап
  _hidePopupErrors(validatingInput) {
    //создаем массив кнопок, закрывающих попапы
    const popupOpenButtons = document.querySelectorAll(".profile__reset");
    //проходимся по массиву кнопок
    popupOpenButtons.forEach((button) => {
      //для каждой создаем слушатель клика
      button.addEventListener("click", () => {
        if (validatingInput.classList.contains(this._errorClass)) {
          //находим span по его классу
          const spanReset = validatingInput
            .closest(this._fieldSelector)
            .querySelector(`.${this._inputErrorClass}`);
          //удаляем класс ошибки с инпута
          validatingInput.classList.remove(this._errorClass);
          //и удаляем класс ошибки со span'a
          spanReset.classList.remove(`${this._inputErrorClass}_active`);
        }
      });
    });
  }

  //функция проверяет, есть ли невалидные поля
  _hasInvalidInput(formInputList) {
    //пройдемся по массиву инпутов методом some

    return formInputList.some((validatingInput) => {
      //если поле инпута невалидно, то вернем true
      //при этом проверяется каждое поле, и если хоть одно вернет true -
      //обход массива прекратится и функция вернет true
      return !validatingInput.validity.valid;
    });
  }

  //функция стилизации кнопки
  //принимает на вход поля инпут и кнопку submit
  _toggleButtonState(formInputList) {
    //проверим поля на валидность
    const inputCheck = this._hasInvalidInput(formInputList);
    //и результат отправим в setSubmitButtonState
    this.setSubmitButtonState(inputCheck);
  }

  setSubmitButtonState(inputCheck) {
    if (!inputCheck) {
      this._buttonElement.classList.remove("form__submit_inactive");
      this._buttonElement.removeAttribute("disabled");
    } else {
      this._buttonElement.classList.add("form__submit_inactive");
      this._buttonElement.setAttribute("disabled", true);
    }
  }

  _formShowError(
    fieldSelector,
    validatingInput,
    errorMessage,
    inputErrorClass,
    errorClass
  ) {
    //выбор элемента span для показа ошибки
    const errorElement = validatingInput
      .closest(fieldSelector)
      .querySelector(`.${inputErrorClass}`);

    //добавляем класс для отображения красного подчеркивания ошибки
    validatingInput.classList.add(errorClass);

    //отображаем в span стандартное содержимое текста ошибки
    errorElement.textContent = errorMessage;

    //делаем видимым span
    errorElement.classList.add(`${inputErrorClass}_active`);
  }

  _formHideError(fieldSelector, validatingInput, inputErrorClass, errorClass) {
    //выбор элемента span чтоб убрать ошибку
    const errorElement = validatingInput
      .closest(fieldSelector)
      .querySelector(`.${inputErrorClass}`);

    //убираем красное подчеркивание ошибки
    validatingInput.classList.remove(errorClass);

    //убираем отображение теста ошибки
    errorElement.classList.remove(`${inputErrorClass}_active`);

    //убираем тест span'a
    errorElement.textContent = "";
  }

  _formValidation(validatingInput) {
    if (!validatingInput.validity.valid) {
      this._formShowError(
        this._fieldSelector,
        validatingInput,
        validatingInput.validationMessage,
        this._inputErrorClass,
        this._errorClass
      );
    } else {
      this._formHideError(
        this._fieldSelector,
        validatingInput,
        this._inputErrorClass,
        this._errorClass
      );
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._validatingForm.querySelectorAll(this._inputSelector)
    );
    //const buttonElement = this._validatingForm.querySelector('.form__submit');
    //тут вызовем функцию проверки состояния кнопки, чтоб проверить состояние кнопки до загрузки страницы
    this._toggleButtonState(inputList);
    //отправим массив полей в функцию, проверяющую есть ли невалидные поля
    this._hasInvalidInput(inputList);

    inputList.forEach((validatingInput) => {
      validatingInput.addEventListener("input", () => {
        this._formValidation(validatingInput);
        //тут вызовем функцию toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState(inputList);
        this._hidePopupErrors(validatingInput);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
