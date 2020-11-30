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
    maxApplication:
      i?.maxTopicApplication ||
      console.log('maxTopicApplication field not found'),
    matchingDate:
      (i?.assigningDate && convertDateDown(i.assigningDate)) ||
      console.log('assigningDate field not found'),
    inprogressDate:
      (i?.inProgressDate && convertDateDown(i.inProgressDate)) ||
      console.log('inProgressDate field not found'),
    finishedDate:
      (i?.finishedDate && convertDateDown(i.finishedDate)) ||
      console.log('finishedDate field not found'),
  };
}

export function up1(i) {
  return {
    name: i?.name,
    maxTopicApplication: i?.maxApplication,
  };
}

export function up2(i) {
  return {
    assigningDate: convertDateUp(i?.matchingDate),
    inProgressDate: convertDateUp(i?.inprogressDate),
    finishedDate: convertDateUp(i?.finishedDate),
  };
}
