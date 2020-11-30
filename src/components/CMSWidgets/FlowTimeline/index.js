import React from 'react';
import TimelineItem from './FlowItem';

const FlowTimeline = ({ className }) => {
  return (
    <div className={`card card-custom ${className}`}>
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
          <TimelineItem
            date="12 Jun"
            content={
              <div className="font-weight-bolder font-size-lg timeline-content pl-3">
                Start in-capstone phase
              </div>
            }
          />
          <TimelineItem
            date="12 Aug"
            content={
              <div className="timeline-content flex-row d-flex">
                <span className="font-weight-normal text-muted text-dark-75 pl-3 font-size-lg mr-5">
                  Checkpoint meeting with{' '}
                  <span className="font-weight-bolder text-dark-75">
                    Lam Huu Khanh Phuong, Tran Tuan Anh
                  </span>
                </span>
              </div>
            }
          />
          <TimelineItem
            date="12 May"
            content={
              <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
                Send report
                <a href="/" className="text-primary ml-1">
                  #1
                </a>
              </div>
            }
          />
          <TimelineItem
            date="12 May"
            content={
              <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
                Send report
                <a href="/" className="text-primary ml-1">
                  #2
                </a>
              </div>
            }
          />
          <TimelineItem
            date="12 May"
            content={
              <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
                Send report
                <a href="/" className="text-primary ml-1">
                  #3
                </a>
              </div>
            }
          />
          <TimelineItem
            date="12 May"
            content={
              <div className="timeline-content font-weight-mormal font-size-lg text-muted pl-3">
                Some thing to be on the timeline
              </div>
            }
          />
          <TimelineItem
            date="12 May"
            content={
              <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
                Send report
                <a href="/" className="text-primary ml-1">
                  #4
                </a>
              </div>
            }
          />
          <TimelineItem
            date="12 May"
            content={
              <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
                Send report
                <a href="/" className="text-primary ml-1">
                  #5
                </a>
              </div>
            }
          />
          <TimelineItem
            date="12 May"
            content={
              <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
                Send report
                <a href="/" className="text-primary ml-1">
                  #6
                </a>
              </div>
            }
          />
          <TimelineItem
            date="12 May"
            content={
              <div className="timeline-content font-weight-mormal font-size-lg text-muted pl-3">
                Some thing to be on the timeline
              </div>
            }
          />
          <TimelineItem
            date="12 May"
            content={
              <div className="font-weight-bolder font-size-lg timeline-content pl-3">
                End capstone semester
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(FlowTimeline);
