import {generatePoint} from '../mock/point.js';

const POINT_COUNT = 5;

export default class TripModel {
  constructor() {
    this.points = Array.from({length: POINT_COUNT}, (_, index) => generatePoint(index + 1));
  }

  getPoints() {
    return this.points;
  }
}
