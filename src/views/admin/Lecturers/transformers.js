export function down(i) {
  return i
    ? {
        id: i.lecturerID,
        code: i.code,
        status: !i.isDisabled,
        name: i.name,
        email: i.email,
        departments:
          (i.departments && i.departments.map(j => [j.departmentID, j.code])) ||
          [],
      }
    : {};
}

export function up(i) {
  return i
    ? {
        email: i.email,
        code: i.code,
        name: i.name,
        departmentIDs: (i.departments && i.departments.map(j => j.value)) || [],
        isDisabled: !i.status,
      }
    : {};
}
