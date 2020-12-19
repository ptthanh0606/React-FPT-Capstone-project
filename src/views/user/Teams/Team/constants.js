export const modalConfigs = [
  {
    name: 'name',
    type: 'text',
    label: 'Team name',
    placeholder: 'Give this team a name...',
  },
  {
    name: 'maxMembers',
    type: 'number',
    label: 'Maximum member',
    smallLabel: 'Maximum member can join this team',
    placeholder: '10',
  },
  {
    name: 'isPublic',
    type: 'toggle',
    label: 'Privacy',
    smallLabel: 'Is this team public',
  },
];

export const createTeamSettingFieldTemplate = teamDetail => {
  return {
    name: teamDetail.name,
    maxMembers: teamDetail.maxMembers,
    isPublic: teamDetail.privacy,
  };
};
