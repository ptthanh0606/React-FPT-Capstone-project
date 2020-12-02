export function down(i) {
  return {
    abstract: i?.abstract || console.log('abstract field not found'),
    code: i?.code || console.log('code field not found'),
    id: i?.id || console.log('id field not found'),
    name: i?.name || console.log('name field not found'),
    department: i?.department
      ? {
          label:
            i?.department?.code ||
            console.log('department code field not found'),
          value:
            i?.department?.id || console.log('department id field not found'),
        }
      : console.log('department field not found'),
    mentorMembers:
      i?.mentorMembers?.map(j => ({ label: j.code, value: j.id })) ||
      console.log('mentor members field not found'),
    status:
      i?.status !== undefined
        ? Number(i?.status)
        : console.log('status field not found'),
    submitByStudent:
      i?.submitByStudent !== undefined
        ? i.submitByStudent
        : console.log('submitByStudent field not found'),
    submitter: i?.submitter
      ? {
          label:
            i?.submitter?.code || console.log('submitter code field not found'),
          value:
            i?.submitter?.id || console.log('submitter id field not found'),
        }
      : console.log('submitter field not found'),
    teamMembers: i?.teamMembers?.map(j => ({
      label:
        j?.code && j?.name
          ? '[' + j?.code + '] ' + j?.name
          : console.log('team member code and name field not found'),
      value: j?.id || console.log('team member id field not found'),
    })),
  };
}

export function mDown(i) {
  return {
    label:
      i?.code && i?.name
        ? '[' + i?.code + '] ' + i?.name
        : console.log('topic code and name field not found'),
    value: i?.id,
  };
}

export function up(i) {
  return i;
}
