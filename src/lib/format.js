export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
export const MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export function pad(n) {
  return n < 10 ? '0' + n : String(n)
}

// 16-Dec-2024
export function formatDate(d) {
  return pad(d.getDate()) + '-' + MONTHS[d.getMonth()] + '-' + d.getFullYear()
}

// Mon, Dec 16
export function formatSpecTitle(d) {
  return WEEKDAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate()
}

// 12-Aug-2024 08:07 AM
export function formatDateTime(d) {
  const h = d.getHours()
  const h12 = h % 12 || 12
  return (
    pad(d.getDate()) +
    '-' +
    MONTHS[d.getMonth()] +
    '-' +
    d.getFullYear() +
    ' ' +
    pad(h12) +
    ':' +
    pad(d.getMinutes()) +
    ' ' +
    (h >= 12 ? 'PM' : 'AM')
  )
}

export function isoKey(d) {
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
}

export function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function parseISODay(s) {
  const parts = String(s).split('-')
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
}
