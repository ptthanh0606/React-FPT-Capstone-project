import React from 'react';
import TimelineItem from './FlowItem';

const FlowTimeline = ({
  className = '',
  items = [
    {
      date: '12 May',
      content: (
        <div className="font-size-lg timeline-content pl-3">
          Start in-capstone phase
        </div>
      ),
    },
  ],
  toolBar = <></>,
  ...props
}) => {
  return (
    <div className={`card card-custom ${className}`} {...props}>
      <div className="card-header align-items-center border-0 mt-4">
        <h3 className="card-title align-items-start flex-column">
          <span className="font-weight-bolder text-dark">Flow timeline</span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            Keep track of Fall 2020
          </span>
        </h3>
        <div className="card-toolbar">{toolBar}</div>
      </div>
      <div className="card-body pt-4">
        <div className="timeline timeline-6 mt-3">
          {items?.length ? (
            items.map(item => (
              <TimelineItem date={item.date} content={item.content} />
            ))
          ) : (
            <>Nothing yet...</>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FlowTimeline);
