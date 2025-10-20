import {createElement} from '../render.js';

function createEventEditTemplate() {
  return `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
              </label>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Amsterdam">
            </div>

            <div class="event__field-group  event__field-group--time">
              <input class="event__input  event__input--time" type="text" value="18/03/19 10:00 — 18/03/19 11:00" name="event-time">
            </div>

            <div class="event__field-group  event__field-group--price">
              <input class="event__input  event__input--price" type="text" name="event-price" value="20">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Close event</span>
            </button>
          </header>
        </form>
      </li>
    `;
}

export default class EventEditView {
  getTemplate() {
    return createEventEditTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
