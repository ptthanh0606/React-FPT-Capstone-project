export function down(i) {
  return {
    id: i.departmentID,
    code: i.code,
    status: !i.isDisabled,
    name: i.name,
    approvers:
      (i.approvers &&
        i.approvers.map(j => ({
          value: j.lecturerID,
          label: j.name,
        }))) ||
      [],
  };
}

export function up(i) {
  return {
    code: i.code,
    name: i.name,
    isDisabled: !i.status,
    approverIDs: (i.approvers && i.approvers.map(j => j.value)) || [],
  };
}
