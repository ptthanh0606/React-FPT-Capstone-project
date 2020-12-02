import React from 'react';
import SVG from 'react-inlinesvg';
import { useHistory } from 'react-router-dom';
import { toAbsoluteUrl } from '_metronic/_helpers';

const GroupMember = ({ id, role, className, label, subLabel }) => {
  const history = useHistory();

  const handleClick = React.useCallback(
    e => {
      e.preventDefault();
      const roles = ['admin', 'student', 'lecturer'];
      history.push(`/profile/${roles[role]}/${id}`);
    },
    [history, id, role]
  );

  return (
    <div className={'d-flex align-items-center mb-5 ' + className}>
      <div className="symbol symbol-40 symbol-light-success mr-5">
        <span className="symbol-label">
          <SVG
            className="h-75 align-self-end"
            src={toAbsoluteUrl('/media/svg/avatars/006-girl-3.svg')}
          ></SVG>
        </span>
      </div>
      <div className="d-flex flex-column flex-grow-1 font-weight-bold">
        <a
          onClick={handleClick}
          href="/"
          className="text-dark text-hover-primary mb-1 font-size-lg"
        >
          {label}
        </a>
        <span className="text-muted">{subLabel}</span>
      </div>
    </div>
  );
};

export default React.memo(GroupMember);
