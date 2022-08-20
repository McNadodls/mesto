export default class Section {
  constructor(data, conteinerSection) {
    this._item = data.item;
    this._renderer = data.renderer;
    this._conteinerSection = document.querySelector(conteinerSection);
  }

  renderItems() {
      this._renderer(this._item);
  }

  setItem(element) {
    this._conteinerSection.prepend(element);
  }
}


