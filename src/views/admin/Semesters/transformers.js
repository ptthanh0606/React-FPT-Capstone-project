import { addMinutes, format, subMinutes } from 'date-fns';

export function convertDateDown(dateInput) {
  return format(
    subMinutes(new Date(dateInput), new Date().getTimezoneOffset()),
    "yyyy-MM-dd'T'HH:mm:ss.SSS"
  );
}

export function convertDateUp(dateInput) {
  return format(
    addMinutes(new Date(dateInput), new Date().getTimezoneOffset()),
    "yyyy-MM-dd'T'HH:mm:ss.SSS"
  );
}

export function down(i) {
  return {
    id: i?.id || console.log('id field not found'),
    name: i?.name || console.log('name field not found'),
    status: Number.isInteger(i?.status)
      ? i?.status
      : console.log('status field not found'),
    maxApplication: Number.isInteger(i?.maxTopicApplication)
      ? i?.maxTopicApplication
      : console.log('maxTopicApplication field not found'),
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

export function up(i) {
  return {
    name: i?.name,
    maxTopicApplication: Number(i?.maxApplication),
    assigningDate: convertDateUp(i?.matchingDate),
    inProgressDate: convertDateUp(i?.inprogressDate),
    finishedDate: convertDateUp(i?.finishedDate),
  };
}
