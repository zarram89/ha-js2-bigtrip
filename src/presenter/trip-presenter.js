import {render, replace, remove, RenderPosition} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import EmptyListView from '../view/empty-list-view.js';

export default class TripPresenter {
  #tripMainContainer = null;
  #filtersContainer = null;
  #tripEventsContainer = null;
  #tripModel = null;

  constructor({tripMainContainer, filtersContainer, tripEventsContainer, tripModel}) {
    this.#tripMainContainer = tripMainContainer;
    this.#filtersContainer = filtersContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripModel = tripModel;
  }

  init() {
    const points = this.#tripModel.points;

    render(new TripInfoView(), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new FiltersView(), this.#filtersContainer);
    render(new SortView(), this.#tripEventsContainer);

    if (points.length === 0) {
      render(new EmptyListView(), this.#tripEventsContainer);
      return;
    }

    const eventsList = document.createElement('ul');
    eventsList.classList.add('trip-events__list');
    this.#tripEventsContainer.append(eventsList);

    for (const point of points) {
      this.#renderPoint(eventsList, point);
    }
  }

  #renderPoint(container, point) {
    const pointComponent = new EventView({
      point,
      onEditClick: handleEditClick
    });

    const pointEditComponent = new EventEditView({
      point,
      onFormSubmit: handleFormSubmit,
      onCloseClick: handleCloseClick
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
      document.addEventListener('keydown', onEscKeyDown);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
      document.removeEventListener('keydown', onEscKeyDown);
    }

    function onEscKeyDown(evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
      }
    }

    function handleEditClick() {
      replacePointToForm();
    }

    function handleFormSubmit() {
      replaceFormToPoint();
    }

    function handleCloseClick() {
      replaceFormToPoint();
    }

    render(pointComponent, container);
  }
}
