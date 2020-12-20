import { format, subMinutes } from 'date-fns';

export const statusClasses = ['warning', 'primary', 'success', 'danger'];
export const statusTitles = ['Waiting', 'Evaluating', 'Passed', 'Failed'];

export function convertDateDown(dateInput) {
  return format(
    subMinutes(new Date(dateInput), new Date().getTimezoneOffset()),
    "HH'h', dd/MM/yyyy"
  );
}
