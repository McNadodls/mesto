export default class Section {
  constructor(renderer, conteinerSection) {
    this._renderer = renderer;
    this._conteinerSection = document.querySelector(conteinerSection);
  }

  renderItems(array) {
    array.forEach((item) => this.addItem(item));
  }

  addItem(item) {
    const card = this._renderer(item)
    this._conteinerSection.prepend(card);
  }
}


