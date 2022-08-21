export default class Section {
  constructor({renderer}, conteinerSection) {
    this._renderer = renderer;
    this._conteinerSection = document.querySelector(conteinerSection);
  }

  renderItems(array) {
    array.forEach((item) => this._renderer(item));
  }

  setItem(element) {
    this._conteinerSection.prepend(element);
  }
}


