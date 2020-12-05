import React from 'react';
import GroupMember from './GroupMember';

const GroupCard = ({
  group = [],
  role,
  className,
  title,
  toolBar = <></>,
  booleanFlg = false,
}) => {
  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-header align-items-center border-0 mt-4">
        <h3 className="card-title font-weight-bolder text-dark">{title}</h3>
        <div className="card-toolbar">{toolBar}</div>
      </div>
      <div className="card-body pt-2">
        <div className={'d-flex-column align-items-center' + className}>
          {group?.length ? (
            group.map(member => (
              <GroupMember
                key={member.id}
                id={member.id}
                role={role}
                label={member.name}
                subLabel={member.isLeader && 'Leader'}
                booleanFlg={booleanFlg}
                value={member.weight}
              />
            ))
          ) : (
            <>Awaiting for team...</>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(GroupCard);
