import {createElement} from '../render.js';

function createEventTemplate() {
  return `
      <li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="2019-03-18">MAR 18</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
          </div>
          <h3 class="event__title">Taxi Amsterdam</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
              &mdash;
              <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
            </p>
            <p class="event__duration">30M</p>
          </div>
          <p class="event__price">&euro;&nbsp;<span class="event__price-value">20</span></p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            <li class="event__offer">
              <span class="event__offer-title">Order Uber</span>
              &plus;&euro;&nbsp;<span class="event__offer-price">20</span>
            </li>
          </ul>
          <button class="event__favorite-btn event__favorite-btn--active" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.229 4.326 1.572-9.163L.685 9.674 9.886 8.337 14 0l4.115 8.337 9.2 1.337-6.657 6.489 1.572 9.163L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>
    `;
}

export default class EventView {
  getTemplate() {
    return createEventTemplate();
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
