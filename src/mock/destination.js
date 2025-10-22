import {getRandomArrayElement, getRandomInteger} from '../utils/common.js';

const DESTINATION_NAMES = [
  'Amsterdam',
  'Geneva',
  'Chamonix',
  'London',
  'Berlin',
  'Paris'
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'
];

function generatePictures() {
  return Array.from({ length: getRandomInteger(1, 5) }, () => ({
    src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 1000)}`,
    description: getRandomArrayElement(DESCRIPTIONS),
  }));
}

function generateDestination(id) {
  const name = getRandomArrayElement(DESTINATION_NAMES);
  return {
    id,
    description: getRandomArrayElement(DESCRIPTIONS),
    name,
    pictures: generatePictures(),
  };
}

export { generateDestination };
