export function down(i) {
  return {
    id: i?.id || console.log('id field not found'),
    code: i?.code || console.log('code field not found'),
    department: i?.department || console.log('department not found'),
    name: i?.name || console.log('name field not found'),
    team: i?.team || console.log('team field not found'),
    status: i?.status || console.log('status field not found'),
    addedAt: i?.addedAt || console.log('addedAt field not found'),
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