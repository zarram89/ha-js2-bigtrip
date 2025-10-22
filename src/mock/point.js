import {OFFER_TYPES, generateOffersByType} from './offer.js';
import {generateDestination} from './destination.js';
import {getRandomArrayElement, getRandomInteger} from '../utils/common.js';

function generatePoint(id) {
  const type = getRandomArrayElement(OFFER_TYPES);
  const basePrice = getRandomInteger(20, 500);
  const dateFrom = new Date();
  const dateTo = new Date(dateFrom.getTime() + getRandomInteger(1, 4) * 3600 * 1000);

  return {
    id,
    type,
    destination: generateDestination(id),
    dateFrom: dateFrom.toISOString(),
    dateTo: dateTo.toISOString(),
    basePrice,
    isFavorite: Math.random() > 0.5,
    offers: generateOffersByType(type).offers
  };
}

export { generatePoint };
