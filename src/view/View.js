import mustache from 'mustache';

export default class View {
  constructor(state = {}, parent) {
    this._renderer = null;
    this._element = null;
    this._parent = parent;
    this._state = state;
  }

  getElement() {
    if (this._element) return this._element;

    this._element = this._compile();
    return this._element;
  }

  // eslint-disable-next-line class-methods-use-this
  _template() {
    throw new Error('string template don`t defined');
  }

  render() {
    const element = this.getElement();
    this._parent.appendChild(element);
  }

  rerender() {
    const lastElem = this.getElement();
    this._element = null;
    const newElem = this.getElement();

    lastElem.parentElement.replaceChild(newElem, lastElem);
  }

  _compile() {
    if (!this._renderer) {
      this._renderer = mustache.parse(this._template());
    }
    const div = document.createElement('div');
    div.innerHTML = this._renderer.render(this._state);

    return div.children[0];
  }
}
