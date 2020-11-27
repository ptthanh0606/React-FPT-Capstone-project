import React from 'react';

const TimelineItem = () => {
  return (
    <div className="timeline-item align-items-start">
      <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
        08:42
      </div>

      <div className="timeline-badge">
        <i className="fa fa-genderless text-warning icon-xl"></i>
      </div>

      <div className="font-weight-mormal font-size-lg timeline-content text-muted pl-3">
        Outlines keep you honest. And keep structure
      </div>
    </div>
  );
};

export default React.memo(TimelineItem);
