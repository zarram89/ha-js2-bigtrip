// src/utils/sort.js
import dayjs from 'dayjs';
import {SortType} from '../const.js';

export const sortPoints = {
  [SortType.DAY]: (a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)),
  [SortType.TIME]: (a, b) => {
    const durationA = dayjs(a.dateTo).diff(dayjs(a.dateFrom));
    const durationB = dayjs(b.dateTo).diff(dayjs(b.dateFrom));
    return durationB - durationA; // от длинных к коротким
  },
  [SortType.PRICE]: (a, b) => b.basePrice - a.basePrice, // от дорогих к дешёвым
};
