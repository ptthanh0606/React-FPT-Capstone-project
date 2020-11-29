export function down(i) {
  return {
    id: i?.id || console.log('id field not found'),
    code: i?.code || console.log('code field not found'),
    status:
      i?.isDisabled !== undefined
        ? !i?.isDisabled
        : !!console.log('isDisabled field not found'),
    name: i?.name || console.log('name field not found'),
    approvers:
      i?.approvers?.map(j => ({
        value: j?.lecturerID,
        label: j?.code,
      })) || (console.log('approvers field not found'), []),
  };
}

export function up(i) {
  return {
    code: i?.code,
    name: i?.name,
    isDisabled: !i?.status,
    approverIDs: i?.approvers?.map(j => j?.value) || [],
  };
}

// Down for list
// Down for read
// Up for update
// Up for create
