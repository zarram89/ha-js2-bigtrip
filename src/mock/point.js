// src/mock/point.js
import {getRandomInteger, getRandomArrayElement} from '../utils/common.js';
import {generateDestination} from './destination.js';
import dayjs from 'dayjs';

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight'];

// 👇 Новый объект офферов по типу маршрута
const OFFERS_BY_TYPE = {
  taxi: [
    {id: 1, title: 'Upgrade to business class', price: 50},
    {id: 2, title: 'Add extra luggage', price: 20},
  ],
  bus: [
    {id: 3, title: 'Add meal', price: 10},
    {id: 4, title: 'Choose seat', price: 5},
  ],
  train: [
    {id: 5, title: 'Add bed linen', price: 15},
    {id: 6, title: 'Upgrade to first class', price: 40},
  ],
  ship: [
    {id: 7, title: 'Ocean view cabin', price: 100},
    {id: 8, title: 'Dinner buffet', price: 50},
  ],
  drive: [
    {id: 9, title: 'Add insurance', price: 30},
    {id: 10, title: 'Add GPS navigation', price: 25},
  ],
  flight: [
    {id: 11, title: 'Extra legroom seat', price: 70},
    {id: 12, title: 'In-flight meal', price: 25},
    {id: 13, title: 'Priority boarding', price: 40},
  ]
};

const DESTINATIONS = Array.from({length: 5}, (_, i) => generateDestination(i + 1));

export function generatePoint(id) {
  const type = getRandomArrayElement(TYPES);
  const dateFrom = dayjs().add(getRandomInteger(-2, 2), 'day').hour(9).minute(0);
  const dateTo = dateFrom.add(getRandomInteger(1, 3), 'hour');
  const destination = getRandomArrayElement(DESTINATIONS);

  return {
    id,
    type,
    destination,
    basePrice: getRandomInteger(50, 500),
    dateFrom: dateFrom.toISOString(),
    dateTo: dateTo.toISOString(),
    offers: OFFERS_BY_TYPE[type].slice(0, getRandomInteger(0, OFFERS_BY_TYPE[type].length)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
}

export {TYPES, DESTINATIONS, OFFERS_BY_TYPE};
