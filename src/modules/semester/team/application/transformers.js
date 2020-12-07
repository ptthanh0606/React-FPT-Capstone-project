import { format, subMinutes } from 'date-fns';

export const convertDateDown = function (input) {
  return format(
    subMinutes(new Date(input), new Date().getTimezoneOffset()),
    'MMM Do yyyy HH:mm:ss a'
  );
};
