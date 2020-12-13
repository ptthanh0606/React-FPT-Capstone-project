import React from 'react';
import TimelineItem from './FlowItem';

const FlowTimeline = ({
  className = '',
  items = [
    {
      date: '12 May',
      content: (
        <div className="font-weight-bolder font-size-lg timeline-content pl-3">
          Start in-capstone phase
        </div>
      ),
    },
    {
      date: '20 May',
      content: (
        <div className="timeline-content flex-row d-flex">
          <span className="font-weight-normal text-muted text-dark-75 pl-3 font-size-lg mr-5">
            Phase meeting with{' '}
            <span className="font-weight-bolder text-dark-75">
              Lam Huu Khanh Phuong, Tran Tuan Anh
            </span>
          </span>
        </div>
      ),
    },
    {
      date: '1 Jun',
      content: (
        <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
          Send report
          <a href="/" className="text-primary ml-1">
            #1
          </a>
        </div>
      ),
    },
    {
      date: '10 Jun',
      content: (
        <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
          Send report
          <a href="/" className="text-primary ml-1">
            #2
          </a>
        </div>
      ),
    },
    {
      date: '15 Jun',
      content: (
        <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
          Send report
          <a href="/" className="text-primary ml-1">
            #3
          </a>
        </div>
      ),
    },
    {
      date: '25 Jun',
      content: (
        <div className="timeline-content flex-row d-flex">
          <span className="font-weight-normal text-muted text-dark-75 pl-3 font-size-lg mr-5">
            Checkpoint meeting with{' '}
            <span className="font-weight-bolder text-dark-75">Council SE</span>
          </span>
        </div>
      ),
    },
    {
      date: '1 Jun',
      content: (
        <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
          Send report
          <a href="/" className="text-primary ml-1">
            #4
          </a>
        </div>
      ),
    },
    {
      date: '25 Jun',
      content: (
        <div className="timeline-content flex-row d-flex">
          <span className="font-weight-normal text-muted text-dark-75 pl-3 font-size-lg mr-5">
            Checkpoint meeting with{' '}
            <span className="font-weight-bolder text-dark-75">Council SE</span>
          </span>
        </div>
      ),
    },
    {
      date: '30 Jun',
      content: (
        <div className="timeline-content font-weight-mormal font-size-lg text-muted pl-3">
          ...
        </div>
      ),
    },
  ],
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
