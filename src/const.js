// Типы фильтров — соответствуют значениям из ТЗ
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

// Названия фильтров для отображения
const FilterName = {
  [FilterType.EVERYTHING]: 'Everything',
  [FilterType.FUTURE]: 'Future',
  [FilterType.PRESENT]: 'Present',
  [FilterType.PAST]: 'Past',
};

// Тексты для пустых списков (по состоянию фильтра)
const NoPointsText = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

// Типы точек маршрута (см. ТЗ 1.2)
const PointType = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

// Сортировки (можно будет использовать в SortView)
const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export { FilterType, FilterName, NoPointsText, PointType, SortType };
