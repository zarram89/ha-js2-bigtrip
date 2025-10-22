import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';

dayjs.extend(duration);

/**
 * Возвращает строку формата "DD/MM/YY HH:mm"
 */
const formatFullDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

/**
 * Возвращает время "HH:mm"
 */
const formatTime = (date) => dayjs(date).format('HH:mm');

/**
 * Возвращает дату в верхнем регистре месяца, например "MAR 18"
 */
const formatTripDate = (date) => dayjs(date).format('MMM DD').toUpperCase();

/**
 * Считает продолжительность между двумя датами (в формате D H M)
 */
const getDuration = (start, end) => {
  const diffMs = dayjs(end).diff(dayjs(start));
  const diff = dayjs.duration(diffMs);

  const days = diff.days();
  const hours = diff.hours();
  const minutes = diff.minutes();

  if (days > 0) {
    return `${String(days).padStart(2, '0')}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }
  return `${String(minutes).padStart(2, '0')}M`;
};

export { formatFullDate, formatTime, formatTripDate, getDuration};
