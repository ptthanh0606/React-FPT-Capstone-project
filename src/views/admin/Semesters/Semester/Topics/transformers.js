export function mDown(i) {
  return {
    label:
      i?.code && i?.name
        ? '[' + i?.code + '] ' + i?.name
        : console.log('topic code and name field not found'),
    value: i?.id,
  };
}
