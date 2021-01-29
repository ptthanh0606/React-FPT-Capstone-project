import React from 'react';
import TimelineItem from './FlowItem';

const FlowTimeline = ({
  className = '',
  items = [],
  semesterName = '',
  toolBar = <></>,
  ...props
}) => {
  return (
    <div className={`card card-custom ${className}`} {...props}>
      <div className="card-header align-items-center border-0 mt-4">
        <h3 className="card-title align-items-start flex-column">
          <span className="font-weight-bolder text-dark">Flow timeline</span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            Keep track of {semesterName}
          </span>
        </h3>
        <div className="card-toolbar">{toolBar}</div>
      </div>
      <div className="card-body pt-4">
        <div className="timeline timeline-6 mt-3">
          {items?.length ? (
            items.map(item => <TimelineItem {...item} />)
          ) : (
            <>Nothing yet...</>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FlowTimeline);
