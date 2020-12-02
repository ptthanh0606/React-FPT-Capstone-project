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
        value: j?.id || console.log('approver id field not found'),
        label: j?.code || console.log('approver code field not found'),
        isDisabled:
          j?.isDisabled !== undefined
            ? j?.isDisabled
            : console.log('approvers isDisabled field not found'),
      })) || (console.log('approvers field not found'), []),
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
    isDisabled: !i?.status,
    approverIDs: i?.approvers?.map(j => j?.value) || [],
  };
}

// Down for list
// Down for selection
// Down for read
// Up for update
// Up for create
