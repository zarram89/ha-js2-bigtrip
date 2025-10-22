import AbstractView from '../framework/view/abstract-view.js';

function createEventEditTemplate(point) {
  const {type, destination, basePrice} = point;

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type event__type-btn">
              <img class="event__type-icon" width="17" height="17"
                   src="img/icons/${type}.png" alt="Event type icon">
            </label>
          </div>

          <div class="event__field-group event__field-group--destination">
            <input class="event__input event__input--destination"
                   type="text" name="event-destination"
                   value="${destination.name}">
          </div>

          <div class="event__field-group event__field-group--price">
            <input class="event__input event__input--price"
                   type="number" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn btn btn--blue" type="submit">Save</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Close event</span>
          </button>
        </header>
      </form>
    </li>
  `;
}

export default class EventEditView extends AbstractView {
  #point = null;
  #handleFormSubmit = null;
  #handleCloseClick = null;

  constructor({point, onFormSubmit, onCloseClick}) {
    super();
    this.#point = point;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;

    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeClickHandler);
  }

  get template() {
    return createEventEditTemplate(this.#point);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };
}
