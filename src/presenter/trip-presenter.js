import {render, RenderPosition} from '../render.js';
import TripInfoView from '../view/trip-info-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
// import EmptyListView from '../view/empty-list-view.js';

export default class TripPresenter {
  constructor({tripMainContainer, filtersContainer, tripEventsContainer, tripModel}) {
    this.tripMainContainer = tripMainContainer;
    this.filtersContainer = filtersContainer;
    this.tripEventsContainer = tripEventsContainer;
    this.tripModel = tripModel;
  }

  init() {
    const points = [...this.tripModel.getPoints()];

    // верхняя панель
    render(new TripInfoView(), this.tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new FiltersView(), this.filtersContainer, RenderPosition.BEFOREEND);
    // сортировка
    render(new SortView(), this.tripEventsContainer, RenderPosition.BEFOREEND);

    // контейнер для списка
    const eventsList = document.createElement('ul');
    eventsList.classList.add('trip-events__list');
    this.tripEventsContainer.append(eventsList);

    // форма редактирования (первая)
    render(new EventEditView(), eventsList, RenderPosition.BEFOREEND);

    // три точки маршрута
    for (const point of points) {
      render(new EventView(point), eventsList, RenderPosition.BEFOREEND);
    }

    // если бы данных не было:
    // render(new EmptyListView(), this.tripEventsContainer, RenderPosition.BEFOREEND);
  }
}
