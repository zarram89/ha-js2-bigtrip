// trip-model.js
import {generatePoint} from '../mock/point.js';

const POINT_COUNT = 5;

export default class TripModel {
  #points = Array.from({length: POINT_COUNT}, (_, i) => generatePoint(i + 1));

  get points() {
    return this.#points;
  }

  updatePoint(updatedPoint) {
    this.#points = this.#points.map((point) =>
      point.id === updatedPoint.id ? updatedPoint : point
    );
  }
}
