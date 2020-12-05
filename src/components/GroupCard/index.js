import React from 'react';
import GroupInfo from './GroupInfo';
import GroupMember from './GroupMember';

const GroupCard = ({ group, className, title, toolBar = <></> }) => {
  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-header align-items-center border-0 mt-4">
        <h3 className="card-title font-weight-bolder text-dark">{title}</h3>
        <div className="card-toolbar">{toolBar}</div>
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
