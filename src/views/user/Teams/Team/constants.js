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
    name: 'privacy',
    type: 'toggle',
    label: 'Public team',
    smallLabel: 'Is this team private',
  },
];

export const createTeamSettingFieldTemplate = teamDetail => {
  return {
    name: teamDetail.name,
    maxMembers: teamDetail.maxMembers,
    isPublic: teamDetail.privacy,
  };
};
