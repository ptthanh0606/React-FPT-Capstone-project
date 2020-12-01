import React from 'react';
import { useHistory } from 'react-router-dom';
import GroupInfo from './GroupInfo';
import GroupMember from './GroupMember';

const GroupCard = ({ className, title, members, name, department, leader }) => {
  const history = useHistory();

  const handleRoutToTeam = React.useCallback(
    event => {
      event.preventDefault();
      history.push('/team/0');
    },
    [history]
  );

  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-header border-0">
        <h3 className="card-title font-weight-bolder text-dark">{title}</h3>
        <div className="card-toolbar">
          <a
            href="/"
            className="btn btn-sm btn-light-primary font-weight-bolder"
          >
            More
          </a>
        </div>
      </div>
      <div className="card-body pt-2">
        <div className={'d-flex-column align-items-center' + className}>
          <GroupInfo name={name} department={department} leader={leader} />
          {members &&
            members.map(member => (
              <GroupMember label={member.name} subLabel={member.code} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
