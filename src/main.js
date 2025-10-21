import TripPresenter from './presenter/trip-presenter.js';
import TripModel from './model/trip-model.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const tripModel = new TripModel();

const tripPresenter = new TripPresenter({
  tripMainContainer,
  filtersContainer,
  tripEventsContainer,
  tripModel
});

tripPresenter.init();
