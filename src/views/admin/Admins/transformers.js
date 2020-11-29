export function down(i) {
  return {
    id: i?.id || console.log('id field not found'),
    code: i?.code || console.log('code field not found'),
    name: i?.name || console.log('name field not found'),
    email: i?.email || console.log('email field not found'),
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
    email: i?.email,
  };
}

// Down for list
// Down for selection
// Down for read
// Up for update
// Up for create
