import { format } from 'date-fns';
import React from 'react';

const FlowItem = ({
  className = '',
  date = '',
  content = '',
  type = 'info',
}) => {
  return (
    <div className={'timeline-item align-items-start ' + className}>
      <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
        {format(new Date(date), 'dd MMM')}
      </div>

      <div className="timeline-badge">
        <i className={`fa fa-genderless text-${type} icon-xl`}></i>
      </div>

      {content}
    </div>
  );
};

export default React.memo(FlowItem);
