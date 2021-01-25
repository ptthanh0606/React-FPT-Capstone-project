export function down(i) {
  return {
    id: i?.id || console.log('id field not found'),
    status:
      i?.isDisabled !== undefined
        ? !i?.isDisabled
        : !!console.log('isDisabled field not found'),
    name: i?.name || console.log('name field not found'),
    description:
      i?.description !== undefined
        ? i?.description
        : console.log('description field not found'),
    attachment:
      i?.attachment !== undefined
        ? i?.attachment
        : console.log('attachment field not found'),
    count: i?.totalCheckpoints !== undefined ? i?.totalCheckpoints : 0,
    checkpoints:
      i?.checkpoints?.map(downCheckpoints) ||
      (console.log('checkpoints field not found'), []),
  };
}

export function downCheckpoints(i) {
  return {
    id: i?.id || console.log('id field not found'),
    name: i?.name || console.log('name field not found'),
    description: i?.description || console.log('description field not found'),
    count:
      i?.markColumns?.length !== undefined
        ? i?.markColumns?.length
        : console.log('count field not found'),
    weight:
      i?.weight !== undefined
        ? i?.weight
        : console.log('weight field not found'),
    marginPass:
      i?.marginPass !== undefined
        ? i?.marginPass
        : console.log('marginPass field not found'),
    cols:
      i?.markColumns?.map(j => ({
        id: j?.id || console.log('id field not found'),
        name: j?.name || console.log('name field not found'),
        description:
          j?.description || console.log('description field not found'),
        weight:
          j?.weight !== undefined
            ? j?.weight
            : console.log('weight field not found'),
      })) || (console.log('markColumns field not found'), []),
  };
}

export function mDown(i) {
  return {
    value: i?.id || console.log('id field not found'),
    label: i?.name || console.log('code field not found'),
  };
}

export function mDown2(i) {
  return {
    value: i?.id || console.log('id field not found'),
    label: i?.name || console.log('code field not found'),
    members:
      i?.members.map(member => ({
        code: member.code,
        name: member.name,
        email: member.email,
      })) || console.log('members field not found'),
  };
}

export function up(i) {
  return {
    name: i?.name,
    description: i?.description,
    isDisabled: !i?.status,
    attachment: i?.attachment,
  };
}

export function upCheckpoints(i) {
  return {
    id: i?.id,
    name: i?.name,
    description: i?.description,
    weight: i?.weight,
    marginPass: i?.marginPass,
    markColumns: i?.cols,
  };
}

// Down for list
// Down for selection
// Down for read
// Up for update
// Up for create
