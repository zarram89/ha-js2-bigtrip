// event-edit-view.js
import AbstractView from '../framework/view/abstract-view.js';

const createOffersSection = (offers) => {
  if (!offers || offers.length === 0) {
    return '';
  }
  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offers.map((o) => `
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden"
                   id="event-offer-${o.id}" type="checkbox" name="event-offer"
                   checked>
            <label class="event__offer-label" for="event-offer-${o.id}">
              <span class="event__offer-title">${o.title}</span>
              &plus;&euro;&nbsp;<span class="event__offer-price">${o.price}</span>
            </label>
          </div>
        `).join('')}
      </div>
    </section>
  `;
};

const createDestinationSection = (destination) => {
  if (!destination || (!destination.description && (!destination.pictures || destination.pictures.length === 0))) {
    return '';
  }
  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${destination.description ? `<p class="event__destination-description">${destination.description}</p>` : ''}
      ${destination.pictures && destination.pictures.length
    ? `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${destination.pictures.map((p) => `<img class="event__photo" src="${p.src}" alt="${p.description}">`).join('')}
            </div>
          </div>`
    : ''
  }
    </section>
  `;
};

function createEventEditTemplate(point) {
  const {type, destination, basePrice, offers} = point;

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn">
              <img class="event__type-icon" width="17" height="17"
                   src="img/icons/${type}.png" alt="Event type icon">
            </label>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <input class="event__input  event__input--destination"
                   type="text" name="event-destination"
                   value="${destination.name}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <input class="event__input  event__input--price"
                   type="number" min="0" step="1" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Close event</span>
          </button>
        </header>

        <section class="event__details">
          ${createOffersSection(offers)}
          ${createDestinationSection(destination)}
        </section>
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
