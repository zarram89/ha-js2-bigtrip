// src/view/sort-view.js
import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';

function createSortTemplate(currentSortType) {
  return `
    <form class="trip-events__trip-sort trip-sort" action="#" method="get">
      ${Object.values(SortType).map((type) => `
        <div class="trip-sort__item trip-sort__item--${type}">
          <input id="sort-${type}"
                 class="trip-sort__input visually-hidden"
                 type="radio"
                 name="trip-sort"
                 value="${type}"
                 ${currentSortType === type ? 'checked' : ''}>
          <label class="trip-sort__btn board__sort-item
                        ${currentSortType === type ? 'board__sort-item--active' : ''}"
                 for="sort-${type}"
                 data-sort-type="${type}">
            ${type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        </div>
      `).join('')}
    </form>
  `;
}

export default class SortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    const sortType = evt.target.dataset.sortType;

    if (!sortType || sortType === this.#currentSortType) {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(sortType);
  };
}
