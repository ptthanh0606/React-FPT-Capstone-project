export function down(i) {
  return {
    id: i?.id || console.log('id field not found'),
    code: i?.code || console.log('code field not found'),
    name: i?.name || console.log('name field not found'),
    email: i?.email || console.log('email field not found'),
    department: i?.department
      ? {
          value: i?.department?.id,
          label: i?.department?.code,
        }
      : (console.log('department field not found'), {}),
    biography: i?.biography || console.log('biography field not found'),
  };
}

export function mDown(i) {
  return {
    value: i?.id || console.log('id field not found'),
    label:
      i?.code && i?.name
        ? i.code + ' ' + i.name
        : console.log('code and name field not found'),
  };
}

export function up(i) {
  return i
    ? {
        code: i.code,
        name: i.name,
        email: i.email,
        departmentID: i.department?.value,
        biography: i.biography,
      }
    : {};
}
