export default class Card {
  constructor(
    data,
    cardSelector,
    { handleCardClick, handleDeletePopup, handleLikePut, handleLikeDelete }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleDeletePopup = handleDeletePopup;
    this._handleLikePut = handleLikePut;
    this._handleLikeDelete = handleLikeDelete;
    this._cardSelector = cardSelector; //записали селектор в приватное поле
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".elements__image");
    this._elementLike = this._element.querySelector(".elements__like");
    this._elementTrash = this._element.querySelector(".elements__trash");
    this._elementLikeNumber = this._element.querySelector(
      ".elements__like-number"
    );
    this._elementTitle = this._element.querySelector(".elements__title");
  }

  //установим обработчики событий
  _setEventListeners() {
    //слушатель кнопки лайк
    this._elementLike.addEventListener("click", () => {
      this._likeHandler();
    });
    //слушатель кнопки удаления

    this._elementTrash.addEventListener("click", () => {
      // this._deleteButtonClick();
      this._handleDeletePopup();
    });
    //слушатель превью
    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._element);
    });
  }

  //метод проверяет, стоит ли лайк, и если нет - позволяет поставить его и наоборот
  _likeHandler() {
    if (this._elementLike.classList.contains("elements__like_active")) {
      this._handleLikeDelete();
    } else {
      this._handleLikePut();
    }
  }

  //метод увлеличивает количество лайков в DOM
  likeCounterPlus() {
    this._elementLikeNumber.textContent++;
  }

  //метод уменьшает количество лайков в DOM
  likeCounterMinus() {
    this._elementLikeNumber.textContent--;
  }

  //добавляем активный лайк
  likeAdd() {
    this._elementLike.classList.add("elements__like_active");
  }

  //и удаляем его
  likeRemove() {
    this._elementLike.classList.remove("elements__like_active");
  }

  //удаляем карточку
  deleteElement() {
    this._element.remove();
  }

  //тут вернем разметку из template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    //добавим обработчики событий
    this._setEventListeners();

    //заносим данные
    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    //отобразим количество лайков
    this._element.querySelector(
      ".elements__like-number"
    ).textContent = this._likes.length;

    //вернем готовый элемент
    return this._element;
  }
}
