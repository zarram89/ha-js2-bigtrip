// src/view/svent-edit-view.js
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';
import {TYPES, OFFERS_BY_TYPE} from '../mock/point.js';

// ---------------------------
// Подшаблон офферов
// ---------------------------
const createOffersSection = (offers) => {
  if (!offers || offers.length === 0) {
    return '';
  }

  return `
    <section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offers.map((o) => `
          <div class="event__offer-selector">
            <input class="event__offer-checkbox visually-hidden"
                   id="event-offer-${o.id}" type="checkbox" name="event-offer" checked>
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

// ---------------------------
// Подшаблон назначения
// ---------------------------
const createDestinationSection = (destination) => {
  if (!destination || (!destination.description && (!destination.pictures || destination.pictures.length === 0))) {
    return '';
  }

  return `
    <section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
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

// ---------------------------
// Подшаблон выбора типа
// ---------------------------
const createTypeSelector = (type) => `
  <div class="event__type-wrapper">
    <label class="event__type event__type-btn" for="event-type-toggle">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17"
           src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle visually-hidden" id="event-type-toggle" type="checkbox">

    <div class="event__type-list">
      ${TYPES.map((t) => `
        <div class="event__type-item">
          <input id="event-type-${t}" class="event__type-input visually-hidden"
                 type="radio" name="event-type" value="${t}"
                 ${t === type ? 'checked' : ''}>
          <label class="event__type-label event__type-label--${t}"
                 for="event-type-${t}" data-type="${t}">
            ${t.charAt(0).toUpperCase() + t.slice(1)}
          </label>
        </div>
      `).join('')}
    </div>
  </div>
`;

// ---------------------------
// Основной шаблон
// ---------------------------
function createEventEditTemplate(data) {
  const { type, destination, basePrice, offers, dateFrom, dateTo } = data;

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${createTypeSelector(type)}

          <div class="event__field-group event__field-group--destination">
            <input class="event__input event__input--destination"
                   type="text" name="event-destination"
                   value="${destination.name}">
          </div>

          <div class="event__field-group event__field-group--time">
            <label class="visually-hidden" for="event-start-time">From</label>
            <input class="event__input event__input--time"
                   id="event-start-time"
                   type="text" name="event-start-time"
                   value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time">To</label>
            <input class="event__input event__input--time"
                   id="event-end-time"
                   type="text" name="event-end-time"
                   value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
          </div>

          <div class="event__field-group event__field-group--price">
            <input class="event__input event__input--price"
                   type="number" min="0" step="1"
                   name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn btn btn--blue" type="submit">Save</button>
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

// ---------------------------
// Класс компонента
// ---------------------------
export default class EventEditView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleCloseClick = null;
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor({ point, destinations, offers, onFormSubmit, onCloseClick }) {
    super();
    this._state = EventEditView.parsePointToState(point);
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;

    this._restoreHandlers();
  }

  get template() {
    return createEventEditTemplate(this._state);
  }

  removeElement() {
    super.removeElement();
    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }
    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeClickHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    // 👇 Обработчик выбора типа маршрута
    this.element.querySelectorAll('.event__type-label')
      .forEach((el) => el.addEventListener('click', this.#typeChangeHandler));

    this.#initDatePickers();
  }

  #initDatePickers() {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('#event-start-time'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      }
    );

    this.#dateToPicker = flatpickr(
      this.element.querySelector('#event-end-time'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
      }
    );
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({ dateFrom: userDate });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({ dateTo: userDate });
  };

  #destinationChangeHandler = (evt) => {
    const name = evt.target.value;
    const newDestination = this.#destinations.find((d) => d.name === name);
    if (!newDestination) return;
    this.updateElement({ destination: newDestination });
  };

  // 👇 Новый обработчик смены типа маршрута
  #typeChangeHandler = (evt) => {
    const newType = evt.target.dataset.type;
    if (!newType || newType === this._state.type) return;

    // При смене типа — обновляем тип и офферы для этого типа
    this.updateElement({
      type: newType,
      offers: OFFERS_BY_TYPE[newType] || []
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventEditView.parseStateToPoint(this._state));
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }
}
