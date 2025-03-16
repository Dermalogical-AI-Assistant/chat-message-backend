import * as dayjs from 'dayjs';

export function getDateNow() {
  return dayjs().toDate();
}
