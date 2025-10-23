// utils/filter.js
import dayjs from 'dayjs';
import {FilterType} from '../const.js';

const isFuture = (point) => dayjs(point.dateFrom).isAfter(dayjs());
const isPresent = (point) =>
  (dayjs(point.dateFrom).isBefore(dayjs()) || dayjs(point.dateFrom).isSame(dayjs())) &&
  (dayjs(point.dateTo).isAfter(dayjs()) || dayjs(point.dateTo).isSame(dayjs()));
const isPast = (point) => dayjs(point.dateTo).isBefore(dayjs());

export const filterPredicates = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter(isFuture),
  [FilterType.PRESENT]: (points) => points.filter(isPresent),
  [FilterType.PAST]: (points) => points.filter(isPast),
};

export const buildFilters = (points, activeType = FilterType.EVERYTHING) => ([
  {
    type: FilterType.EVERYTHING,
    name: 'Everything',
    count: filterPredicates[FilterType.EVERYTHING](points).length,
    checked: activeType === FilterType.EVERYTHING
  },
  {
    type: FilterType.FUTURE,
    name: 'Future',
    count: filterPredicates[FilterType.FUTURE](points).length,
    checked: activeType === FilterType.FUTURE
  },
  {
    type: FilterType.PRESENT,
    name: 'Present',
    count: filterPredicates[FilterType.PRESENT](points).length,
    checked: activeType === FilterType.PRESENT
  },
  {
    type: FilterType.PAST,
    name: 'Past',
    count: filterPredicates[FilterType.PAST](points).length,
    checked: activeType === FilterType.PAST
  },
]);
