import { format, subMinutes } from 'date-fns';

export const statusClasses = ['warning', 'primary', 'danger', 'success'];
export const statusTitles = ['Waiting', 'Evaluating', 'Failed', 'Passed'];

export function convertDateDown(dateInput) {
  return format(
    subMinutes(new Date(dateInput), new Date().getTimezoneOffset()),
    "HH'h', dd/MM/yyyy"
  );
}
