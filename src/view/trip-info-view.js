import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

function createTripInfoTemplate(points) {
  if (points.length === 0) {
    return '';
  }

  const sorted = [...points].sort((a, b) => dayjs(a.dateFrom) - dayjs(b.dateFrom));
  const start = dayjs(sorted[0].dateFrom).format('DD MMM');
  const end = dayjs(sorted[sorted.length - 1].dateTo).format('DD MMM');
  const totalPrice = sorted.reduce((sum, point) => sum + point.basePrice, 0);

  const cities = sorted.map((p) => p.destination.name);
  const routeTitle = cities.length > 3
    ? `${cities[0]} — ... — ${cities[cities.length - 1]}`
    : cities.join(' — ');

  return `
    <section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${routeTitle}</h1>
        <p class="trip-info__dates">${start} — ${end}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`;
}

export default class TripInfoView extends AbstractView {
  #points = null;

  constructor({points}) {
    super();
    this.#points = points;
  }

  get template() {
    return createTripInfoTemplate(this.#points);
  }
}
