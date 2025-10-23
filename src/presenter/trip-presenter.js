// src/presenter/trip-presenter.js
import {render, remove, RenderPosition} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import {FilterType, SortType} from '../const.js';
import {buildFilters} from '../utils/filter.js';
import {sortPoints} from '../utils/sort.js';
import {DESTINATIONS, OFFERS_BY_TYPE} from '../mock/point.js'; // 👈 добавляем

export default class TripPresenter {
  #tripMainContainer = null;
  #filtersContainer = null;
  #tripEventsContainer = null;
  #tripModel = null;
  #pointPresenters = new Map();

  #currentFilterType = FilterType.EVERYTHING;
  #currentSortType = SortType.DAY;
  #sortComponent = null;

  constructor({tripMainContainer, filtersContainer, tripEventsContainer, tripModel}) {
    this.#tripMainContainer = tripMainContainer;
    this.#filtersContainer = filtersContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripModel = tripModel;
  }

  init() {
    const points = this.#getSortedPoints();
    const filters = buildFilters(points, FilterType.EVERYTHING);

    render(new TripInfoView({points}), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new FiltersView({filters}), this.#filtersContainer);
    this.#renderSort();
    this.#renderPoints(points);
  }

  #getSortedPoints() {
    const points = [...this.#tripModel.points];
    return points.sort(sortPoints[this.#currentSortType]);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripEventsContainer, RenderPosition.BEFOREEND);
  }

  #renderPoints(points) {
    if (points.length === 0) {
      render(new EmptyListView({filterType: FilterType.EVERYTHING}), this.#tripEventsContainer);
      return;
    }

    const eventsList = document.createElement('ul');
    eventsList.classList.add('trip-events__list');
    this.#tripEventsContainer.append(eventsList);

    for (const point of points) {
      const pointPresenter = new PointPresenter({
        container: eventsList,
        onDataChange: this.#handlePointChange,
        onModeChange: this.#handleModeChange,
        destinations: DESTINATIONS,
        offers: OFFERS_BY_TYPE
      });
      pointPresenter.init(point);
      this.#pointPresenters.set(point.id, pointPresenter);
    }
  }

  #clearPoints() {
    for (const presenter of this.#pointPresenters.values()) {
      presenter.destroy();
    }
    this.#pointPresenters.clear();
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripModel.updatePoint(updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    for (const presenter of this.#pointPresenters.values()) {
      presenter.resetView();
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderPoints(this.#getSortedPoints());
  };
}
