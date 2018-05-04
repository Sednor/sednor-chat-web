import moment from 'moment';

export function getShortTimestamp(timestamp) {
  return moment(timestamp).format('LT');
}
