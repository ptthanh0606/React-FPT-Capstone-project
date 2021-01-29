import isNumber from 'utils/isNumber';

export function down(i) {
  const teamLeadId =
    i?.teamDetail?.teamLeadId || console.log('teamLeadId field not found');
  let leader;
  const teamMembers =
    i?.teamMembers?.map(j => {
      const obj = {
        value: j?.id || console.log('team member id field not found'),
        email: j?.email || console.log('team member email field not found'),
        label:
          j?.code && j?.name
            ? '[' + j.code + '] ' + j.name
            : console.log('team member name and code field not found'),
      };

      if (j?.id === teamLeadId) {
        leader = obj;
        obj.isLeader = true;
      }
      return obj;
    }) || (console.log('teamMembers field not found'), []);

  teamMembers.sort((a, b) => {
    if (a.isLeader) return -1;
    if (b.isLeader) return 1;
    return 0;
  });

  return {
    id: i?.teamDetail?.id || console.log('id field not found'),
    code: i?.teamDetail?.code || console.log('code field not found'),
    name: i?.teamDetail?.name || console.log('name field not found'),
    leader: leader,
    members: teamMembers,
    department: i?.teamDetail?.department
      ? {
          label:
            i.teamDetail.department.code || console.log('code field not found'),
          fullLabel:
            i.teamDetail.department.name || console.log('name field not found'),
          value:
            i.teamDetail.department.id || console.log('code field not found'),
        }
      : (console.log('department field not found'), {}),
    topic:
      i?.topic && i?.teamDetail?.status === true
        ? {
            label:
              (i.topic.name &&
                i.topic.code &&
                '[' + i.topic.code + '] ' + i.topic.name) ||
              console.log('topic code and name field not found'),
            value: i.topic.id || console.log('topic id field not found'),
            code: i.topic.code || console.log('topic code field not found'),
            abstract:
              i.topic.abstract || console.log('topic abstract field not found'),
          }
        : {},
    status:
      i?.teamDetail?.status !== undefined
        ? i?.teamDetail?.status
        : console.log('status field not found'),
    privacy:
      i?.teamDetail?.isPublic !== undefined
        ? !!i.teamDetail.isPublic
        : console.log('isPublic field not found'),
    lock:
      i?.teamDetail?.isLocked !== undefined
        ? !!i.teamDetail.isLocked
        : console.log('isLocked field not found'),
    maxMembers:
      i?.teamDetail?.maxMembers !== undefined
        ? i?.teamDetail?.maxMembers
        : console.log('team max members field not found'),
    applications:
      i?.topicApplications ||
      console.log('Topic applications field not found!'),
  };
}

export function mDown(i) {
  const teamLeadId =
    i?.teamDetail?.teamLeadId || console.log('teamLeadId field not found');
  const teamMembers =
    i?.teamMembers?.map(j => {
      const obj = {
        value: j?.id || console.log('team member id field not found'),
        email: j?.email || console.log('team member email field not found'),
        label:
          j?.code && j?.name
            ? '[' + j.code + '] ' + j.name
            : console.log('team member name and code field not found'),
      };

      if (j?.id === teamLeadId) {
        obj.isLeader = true;
      }
      return obj;
    }) || (console.log('teamMembers field not found'), []);

  teamMembers.sort((a, b) => {
    if (a.isLeader) return -1;
    if (b.isLeader) return 1;
    return 0;
  });

  return {
    label:
      i?.teamDetail?.id && i?.teamDetail?.name
        ? '[' + i.teamDetail.id + '] ' + i.teamDetail.name
        : console.log('team id and name field not found'),
    value: i?.teamDetail?.id || console.log('team id field not found'),
    department: i?.teamDetail.department?.code || '',
    members: i?.teamMembers,
  };
}

export function up(i) {
  if (!isNumber(i?.maxMembers)) {
    throw new Error('Max members must be a safe integer');
  }

  return {
    name: i?.name,
    maxMembers: Number(i?.maxMembers) || undefined,
    isPublic: !!i?.privacy,
    isLocked: !!i?.lock,
    departmentId: Number(i?.department?.value) || undefined,
    topicId: Number(i?.topic?.value) || undefined,
    memberIds: i?.members?.map(j => Number(j.value)),
  };
}
