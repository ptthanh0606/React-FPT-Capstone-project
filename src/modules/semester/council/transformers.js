export function down(i) {
  return {
    id: i?.id || console.log('id field not found'),
    name: i?.name || console.log('name field not found'),
    department: i?.department
      ? {
          label:
            i.department.code || console.log('deparment code field not found'),
          value:
            i.department.id || console.log('department id field not found'),
        }
      : console.log('department field not found'),
    members:
      i?.members?.map(j => ({
        label: j.code || console.log('member code field not found'),
        value: j.id || console.log('member id field not found'),
        name: j.name || console.log('member name field not found'),
        isLeader:
          j.isLeader !== 'undefined'
            ? j.isLeader
            : console.log('member isLeader field not found'),
        weight:
          j.weight !== undefined
            ? Number(j.weight)
            : console.log('member weight not found'),
      })) || console.log('member fields not found'),
  };
}

export function mDown(i) {
  return {
    value: i?.id || console.log('id field not found'),
    label: i?.code || console.log('code field not found'),
  };
}

export function up(i) {
  const newMembers = [...(i?.members || [])].sort(function (a, b) {
    if (a.isLeader) return -1;
    if (b.isLeader) return 1;
    return 0;
  });

  return {
    name: String(i?.name),
    departmentId: Number(i?.department?.value),
    lecturerIds: newMembers?.map(j => Number(j.value)),
    weights: newMembers?.map(j => Number(j.weight)),
  };
}
