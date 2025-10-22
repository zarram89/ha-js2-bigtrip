import AbstractView from '../framework/view/abstract-view.js';
import {NoPointsText} from '../const.js';

function createEmptyListTemplate(filterType) {
  const noPointText = NoPointsText[filterType];
  return `<p class="trip-events__msg">${noPointText}</p>`;
}

export default class EmptyListView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}

