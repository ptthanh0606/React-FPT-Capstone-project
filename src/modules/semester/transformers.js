import { addMinutes, format, subMinutes } from 'date-fns';
import isNumber from 'utils/isNumber';

export function convertDateDown(dateInput) {
  try {
    return format(
      subMinutes(new Date(dateInput), new Date().getTimezoneOffset()),
      "yyyy-MM-dd'T'HH:mm:ss.SSS"
    );
  } catch (_) {
    return undefined;
  }
}

export function convertDateUp(dateInput) {
  try {
    return format(
      addMinutes(new Date(dateInput), new Date().getTimezoneOffset()),
      "yyyy-MM-dd'T'HH:mm:ss.SSS"
    );
  } catch (_) {
    return undefined;
  }
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
    marginPass:
      typeof i?.marginPass === 'number' && !Number.isNaN(i?.marginPass)
        ? i?.marginPass
        : console.log('marginPass field not found'),
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
  if (!isNumber(i?.maxApplication)) {
    throw new Error('Max application must be a safe integer');
  }
  if (!isNumber(i?.marginPass, true))
    throw new Error('Margin pass must be a safe float');

  return {
    name: i?.name,
    maxTopicApplication: Number(i?.maxApplication),
    marginPass: Number(i?.marginPass),
    assigningDate: convertDateUp(i?.matchingDate),
    inProgressDate: convertDateUp(i?.inprogressDate),
    finishedDate: convertDateUp(i?.finishedDate),
  };
}
