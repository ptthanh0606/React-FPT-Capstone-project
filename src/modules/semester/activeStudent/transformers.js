import format from 'date-fns/format';
import subMinutes from 'date-fns/subMinutes';

export function down(i) {
  return {
    id: i?.id || console.log('id field not found'),
    code: i?.code || console.log('code field not found'),
    department: i?.department?.code || console.log('department not found'),
    name: i?.name || console.log('name field not found'),
    team: i?.team
      ? {
          label:
            i.team.id && i.team.name
              ? '[' + i.team.id + '] ' + i.team.name
              : console.log('team id and name field not found'),
          value: i.team.id || console.log('team id field not found'),
        }
      : undefined,
    status: Number.isInteger(i?.status)
      ? i.status
      : console.log('status field not found'),
    addedAt:
      (i?.addedAt &&
        format(
          subMinutes(new Date(i?.addedAt), new Date().getTimezoneOffset()),
          "yyyy-MM-dd'T'HH:mm:ss.SSS"
        )) ||
      console.log('addedAt field not found'),
  };
}

export function mDown(i) {
  return {
    value: i?.id || console.log('id field not found'),
    label:
      i?.code && i?.name
        ? '[' + i?.code + '] ' + i?.name
        : console.log('code field not found'),
  };
}

export function cUp(i) {
  return {
    studentIds: i,
  };
}

export function up(i) {
  return {
    teamId: i?.team?.value,
  };
}

// Down for list
// Down for selection
// Down for read
// Up for update
// Up for create
