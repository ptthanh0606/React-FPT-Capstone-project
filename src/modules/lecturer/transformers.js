export function down(i) {
  return i
    ? {
        id: i?.id || console.log('id field not found'),
        code: i?.code || console.log('code field not found'),
        status:
          i?.isDisabled !== undefined
            ? !i?.isDisabled
            : !!console.log('isDisabled field not found'),
        name: i?.name || console.log('name field not found'),
        email: i?.email || console.log('email field not found'),
        departments:
          i?.departments?.map(j => ({
            value: j?.id,
            label: j?.code,
            isApprover: j?.isApprover,
          })) || (console.log('approvers field not found'), []),
      }
    : {};
}

export function mDown(i) {
  return {
    value: i?.id || console.log('id field not found'),
    label: i?.code || console.log('code field not found'),
    name: i?.name || console.log('name field not found'),
    email: i?.email || console.log('email field not found'),
    department:
      i?.departments?.map(j => j?.code).join(', ') ||
      (console.log('approvers field not found'), ''),
  };
}
export function up(i) {
  return {
    email: i?.email,
    code: i?.code,
    name: i?.name,
    departmentIDs: i?.departments?.map(j => j.value) || [],
    isDisabled: !i?.status,
  };
}
