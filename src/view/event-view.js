import AbstractView from '../framework/view/abstract-view.js';
import {formatTripDate, formatTime, getDuration} from '../utils/point.js';

function createEventTemplate(point) {
  const {type, destination, dateFrom, dateTo, basePrice, offers, isFavorite} = point;
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  const startTime = formatTime(dateFrom);
  const endTime = formatTime(dateTo);
  const duration = getDuration(dateFrom, dateTo);
  const eventDate = formatTripDate(dateFrom);

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${eventDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${endTime}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">&euro;&nbsp;<span class="event__price-value">${basePrice}</span></p>
        <ul class="event__selected-offers">
          ${offers.map((offer) => `
            <li class="event__offer">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
            </li>`).join('')}
        </ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.229 4.326 1.572-9.163L.685 9.674
                     9.886 8.337 14 0l4.115 8.337 9.2 1.337-6.657
                     6.489 1.572 9.163L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
}

export default class EventView extends AbstractView {
  #point = null;
  #handleEditClick = null;

  constructor({point, onEditClick}) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createEventTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
