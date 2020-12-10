import { addMinutes, format, subMinutes } from 'date-fns';

export const statusClasses = ['secondary', 'primary', 'success', 'danger'];
export const statusTitles = ['Pending', 'Evaluating', 'Passed', 'Failed'];

export function convertDateDown(dateInput) {
  return format(
    subMinutes(new Date(dateInput), new Date().getTimezoneOffset()),
    "HH'h', dd/MM/yyyy"
  );
}
