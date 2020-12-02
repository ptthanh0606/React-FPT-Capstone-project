import React from 'react';
import { useHistory } from 'react-router-dom';
import GroupInfo from './GroupInfo';
import GroupMember from './GroupMember';

const GroupCard = ({ group, groupId, className, title }) => {
  const history = useHistory();

  const handleClick = React.useCallback(
    e => {
      e.preventDefault();
      history.push(`/team/${groupId}`);
    },
    [groupId, history]
  );

  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-header align-items-center border-0 mt-4">
        <h3 className="card-title font-weight-bolder text-dark">{title}</h3>
        <div className="card-toolbar">
          <a
            href="/"
            onClick={handleClick}
            className="btn btn-sm btn-light-primary font-weight-bolder"
          >
            More
          </a>
        </div>
      </div>
      <div className="card-body pt-2">
        <div className={'d-flex-column align-items-center' + className}>
          <GroupInfo
            name={group.name}
            department={group.department}
            leader={group.leader}
          />
          {group.members &&
            group.members.map(member => (
              <GroupMember
                key={member.id}
                id={member.id}
                role={member.role}
                label={member.name}
                subLabel={member.code}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(GroupCard);
