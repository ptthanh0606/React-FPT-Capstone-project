export function down(i) {
  return {
    id: i?.id || console.log('id field not found'),
    status:
      i?.status !== undefined
        ? i?.status
        : !!console.log('status field not found'),
    name: i?.name || console.log('name field not found'),
  };
}

export function mDown(i) {
  return {
    value: i?.id || console.log('id field not found'),
    label: i?.name || console.log('name field not found'),
  };
}

export function up(i) {
  return {
    code: i?.code,
    name: i?.name,
    status: i?.status,
  };
}

// Down for list
// Down for selection
// Down for read
// Up for update
// Up for create
