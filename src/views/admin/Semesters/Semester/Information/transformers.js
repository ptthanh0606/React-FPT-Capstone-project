import { addMinutes, format, subMinutes } from 'date-fns';

export function convertDateDown(dateInput) {
  return format(
    subMinutes(new Date(dateInput), new Date().getTimezoneOffset()),
    "yyyy-MM-dd'T'hh:mm:ss.SSS"
  );
}

export function convertDateUp(dateInput) {
  return format(
    addMinutes(new Date(dateInput), new Date().getTimezoneOffset()),
    "yyyy-MM-dd'T'hh:mm:ss.SSS"
  );
}

export function down(i) {
  return {
    id: i?.id || console.log('id field not found'),
    name: i?.name || console.log('name field not found'),
    status: i?.status || console.log('status field not found'),
  };
}
