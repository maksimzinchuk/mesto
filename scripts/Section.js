export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    renderItems() {
        // для каждого элемента из массива
        this._renderedItems.forEach(item => {
            //используем переданную в конструктор функцию рендерер
            this._renderer(item);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}