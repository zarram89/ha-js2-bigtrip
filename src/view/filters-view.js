import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, isChecked) {
  const {type, name, count} = filter;
  const disabled = count === 0 ? 'disabled' : '';
  const checked = isChecked ? 'checked' : '';

  return `
    <div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${checked}
        ${disabled}
      >
      <label class="trip-filters__filter-label" for="filter-${type}">
        ${name}
      </label>
    </div>`;
}

function createFiltersTemplate(filters) {
  return `
    <form class="trip-filters" action="#" method="get">
      ${filters.map((f) => createFilterItemTemplate(f, f.checked)).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
