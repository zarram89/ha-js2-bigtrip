import TripPresenter from './presenter/trip-presenter.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter({
  tripMainContainer,
  filtersContainer,
  tripEventsContainer
});

tripPresenter.init();
