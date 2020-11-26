export function down(i) {
  return i
    ? {
        id: i.id,
        code: i.code,
        name: i.name,
        email: i.email,
        department: i.departmentCode || {
          value: i.department?.departmentID,
          label: i.department?.code,
        },
      }
    : {};
}

export function up(i) {
  return i
    ? {
        code: i.code,
        name: i.name,
        email: i.email,
        departmentID: i.department?.value,
      }
    : {};
}
