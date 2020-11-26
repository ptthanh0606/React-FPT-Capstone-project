export function down(i) {
  return {
    id: i.departmentID,
    code: i.code,
    status: i.isDisabled === true ? 0 : 1,
    name: i.name,
    approvers: i.approvers || [],
  };
}
