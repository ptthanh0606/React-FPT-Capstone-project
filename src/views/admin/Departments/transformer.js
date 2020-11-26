export const mapping = {
  Code: 'code',
  Name: 'name',
  isDisabled: 'status',
};

export function down(i) {
  return {
    id: i.departmentID,
    code: i.code,
    status: !i.isDisabled,
    name: i.name,
    approvers:
      (i.approvers && i.approvers.map(j => [j.lecturerID, j.name])) || [],
  };
}

export function up(i) {
  console.log(i);
  return {
    code: i.code,
    name: i.name,
    isDisabled: !i.status,
  };
}
