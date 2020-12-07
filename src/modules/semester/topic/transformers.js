export function downList(i) {
  return {
    abstract: i?.abstract || console.log('abstract field not found'),
    code: i?.code || console.log('code field not found'),
    id: i?.id || console.log('id field not found'),
    name: i?.name || console.log('name field not found'),
    note: i?.note || console.log('note field not found'),
    attachment: i?.attachment || console.log('attachment field not found'),
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
    checkpointTemplate:
      (i?.checkpointTemplate && {
        label:
          i?.checkpointTemplate?.name || console.log('name field not found'),
        value: i?.checkpointTemplate?.id || console.log('id field not found'),
      }) ||
      console.log('checkpoint template not found'),
  };
}

export function downRead(i) {
  return {
    abstract: i?.abstract || console.log('abstract field not found'),
    code: i?.code || console.log('code field not found'),
    id: i?.id || console.log('id field not found'),
    name: i?.name || console.log('name field not found'),
    note: i?.note || console.log('note field not found'),
    description: i?.description || console.log('description field not found'),
    keywords: i?.keywords || console.log('keywords field not found'),
    attachment: i?.attachment || console.log('attachment field not found'),
    maxMembers:
      i?.maxMembers !== undefined
        ? i?.maxMembers
        : console.log('maxMembers field not found'),
    minMembers:
      i?.minMembers !== undefined
        ? i?.minMembers
        : console.log('minMembers field not found'),
    department: i?.department
      ? {
          label:
            i?.department?.code ||
            console.log('department code field not found'),
          value:
            i?.department?.id || console.log('department id field not found'),
          fullName:
            i?.department?.name ||
            console.log('department name field not found'),
        }
      : console.log('department field not found'),
    mentorMembers:
      i?.mentorGroup?.members?.map(j => ({
        label: j.code,
        id: j.id,
        value: j.id,
        weight: j.weight,
        isLeader: j.isLeader,
        name: j.name,
      })) || console.log('mentor members field not found'),
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
    team: {
      value: i?.team?.id,
      label:
        i?.team?.id && i?.team?.name
          ? '[' + i?.team?.id + '] ' + i?.team?.name
          : console.log('team field not found'),
      members: i?.team?.members || [],
    },
    applications: i?.topicApplications?.map(j => ({
      id: j.id,
      status: j.status,
      createdAt: j.createdAt,
      updatedAt: j.updatedAt,
    })),
    feedbacks: i?.topicFeedbacks?.map(j => ({
      id: j.id,
      content: j.content,
      date: j.createdAt,
      approver: {
        id: j.approver?.id,
        code: j.approver?.code,
        name: j.approver?.name,
      },
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
  const newLecturers = [...(i?.lecturers || [])].sort(function (a, b) {
    if (a.isLeader) return -1;
    if (b.isLeader) return 1;
    return 0;
  });

  return {
    name: i?.name,
    code: i?.code,
    abstract: i?.abstract,
    description: i?.description,
    note: i?.note,
    maxMembers: Number(i?.maxMembers),
    minMembers: Number(i?.minMembers),
    departmentId: i?.department?.value && Number(i?.department?.value),
    submitByStudent: !!i?.submitByStudent,
    teamId: i?.team?.value && Number(i?.team?.value),
    mentorMembers: newLecturers?.map(j => ({
      id: Number(j.value),
      weight: Number(j.weight),
    })),
    keywords: i?.keywords,
    attachment: i?.attachment,
    submitterId: Number(i?.submitter?.value),
  };
}
