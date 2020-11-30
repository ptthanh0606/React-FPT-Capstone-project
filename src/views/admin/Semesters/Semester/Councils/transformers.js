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
    department: i?.teamDetails?.department
      ? {
          label:
            i.teamDetails.department.code ||
            console.log('code field not found'),
          value:
            i.teamDetails.department.id || console.log('code field not found'),
        }
      : (console.log('department field not found'), {}),
    topic: i?.topic
      ? {
          label:
            (i.topic.name &&
              i.topic.code &&
              '[' + i.topic.code + '] ' + i.topic.name) ||
            console.log('topic code and name field not found'),
          value: i.topic.id || console.log('topic id field not found'),
        }
      : (console.log('topic field not found'), {}),
    status: i?.teamDetail?.status || console.log('status field not found'),
    privacy:
      i?.teamDetail?.isPublic !== undefined
        ? !i.teamDetail.isPublic
        : console.log('isPublic field not found'),
    lock:
      i?.teamDetail?.isLocked !== undefined
        ? !!i.teamDetail.isLocked
        : console.log('isLocked field not found'),
  };
}

export function mDown(i) {
  return {
    value: i?.id || console.log('id field not found'),
    label: i?.code || console.log('code field not found'),
  };
}

export function up(i) {
  return {
    code: i?.code,
    name: i?.name,
    email: i?.email,
  };
}

// Down for list
// Down for selection
// Down for read
// Up for update
// Up for create
