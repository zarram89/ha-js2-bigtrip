import {generatePoint} from '../mock/point.js';

const POINT_COUNT = 5;

export default class TripModel {
  #points = Array.from({length: POINT_COUNT}, (_, index) => generatePoint(index + 1));

  get points() {
    return this.#points;
  }
}
