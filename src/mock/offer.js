import {getRandomArrayElement, getRandomInteger} from '../utils/common.js';

const OFFER_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const OFFER_TITLES = [
  'Add luggage',
  'Switch to comfort class',
  'Add meal',
  'Choose seats',
  'Travel by train',
  'Order Uber',
  'Rent a car'
];

function generateOffersByType(type) {
  return {
    type,
    offers: Array.from({ length: getRandomInteger(1, 5) }, (_, index) => ({
      id: index + 1,
      title: getRandomArrayElement(OFFER_TITLES),
      price: getRandomInteger(10, 100),
    })),
  };
}

export { OFFER_TYPES, generateOffersByType };
