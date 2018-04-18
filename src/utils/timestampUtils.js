export function getShortTimestamp(timestamp) {
  return moment(timestamp).format('LT');
}
