import { format, subMinutes } from 'date-fns';

export const convertDateDown = function (input) {
  return format(
    subMinutes(new Date(input), new Date().getTimezoneOffset()),
    'dd/MM/yyyy, HH:mm:ss'
  );
};
