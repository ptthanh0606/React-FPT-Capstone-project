export function down(i) {
  const teamLeadId =
    i?.teamDetail?.teamLeadId || console.log('teamLeadId field not found');
  let leader;
  const teamMembers =
    i?.teamMembers?.map(j => {
      const obj = {
        value: j?.id || console.log('team member id field not found'),
        label:
          j?.code && j?.name
            ? '[' + j.code + '] ' + j.name
            : console.log('team member name and code field not found'),
      };

      if (j?.id === teamLeadId) leader = obj;
      return obj;
    }) || (console.log('teamMembers field not found'), []);

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
  };
}

export function mDown(i) {
  return {
    label:
      i?.teamDetail?.id && i?.teamDetail?.name
        ? '[' + i.teamDetail.id + '] ' + i.teamDetail.name
        : console.log('team id and name field not found'),
    value: i?.teamDetail?.id || console.log('team id field not found'),
  };
}

export function up(i) {
  return {
    name: String(i?.name),
    maxMembers: Number(i?.maxMembers),
    isPublic: !!i?.isPublic,
    isLocked: !!i?.isLocked,
    departmentId: Number(i?.department?.value),
    topicId: Number(i?.topic?.value),
    memberIds: i?.members?.map(j => Number(j.value)),
  };
}
