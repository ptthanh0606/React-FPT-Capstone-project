import React from 'react';

const Timeline = ({ className }) => {
  return (
    <div className={`card card-custom ${className}`}>
      {/* Header */}
      <div className="card-header align-items-center border-0 mt-4">
        <h3 className="card-title align-items-start flex-column">
          <span className="font-weight-bolder text-dark">Flow timeline</span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            Keep track of Fall 2020
          </span>
        </h3>
      </div>
      {/* Body */}
      <div className="card-body pt-4">
        <div className="timeline timeline-6 mt-3">
          <div className="timeline-item align-items-start">
            <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
              12 Jun
            </div>

            <div className="timeline-badge">
              <i className="fa fa-genderless text-warning icon-xl"></i>
            </div>

            <div className="font-weight-bolder font-size-lg timeline-content pl-3">
              Start in-capstone phase
            </div>
          </div>

          <div className="timeline-item align-items-start">
            <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
              12 Aug
            </div>

            <div className="timeline-badge">
              <i className="fa fa-genderless text-success icon-xl"></i>
            </div>

            <div className="timeline-content flex-row d-flex">
              <span className="font-weight-normal text-muted text-dark-75 pl-3 font-size-lg mr-5">
                Checkpoint meeting with{' '}
                <span className="font-weight-bolder text-dark-75">
                  Lam Huu Khanh Phuong, Tran Tuan Anh
                </span>
              </span>
            </div>
          </div>

          <div className="timeline-item align-items-start">
            <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
              12 May
            </div>

            <div className="timeline-badge">
              <i className="fa fa-genderless text-danger icon-xl"></i>
            </div>

            <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
              Send report
              <a href="/" className="text-primary ml-1">
                #1
              </a>
            </div>
          </div>

          <div className="timeline-item align-items-start">
            <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
              12 May
            </div>

            <div className="timeline-badge">
              <i className="fa fa-genderless text-danger icon-xl"></i>
            </div>

            <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
              Send report
              <a href="/" className="text-primary ml-1">
                #2
              </a>
            </div>
          </div>

          {/* <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                23:07
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-info icon-xl"></i>
              </div>

              <div className="timeline-content font-weight-mormal font-size-lg text-muted pl-3">
                Outlines keep and you honest. Indulging in poorly driving
              </div>
            </div> */}

          <div className="timeline-item align-items-start">
            <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
              12 Jun
            </div>

            <div className="timeline-badge">
              <i className="fa fa-genderless text-primary icon-xl"></i>
            </div>

            <div className="timeline-content font-weight-mormal font-size-lg text-muted pl-3">
              Some thing to be on the timeline
            </div>
          </div>

          <div className="timeline-item align-items-start">
            <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
              12 Jul
            </div>

            <div className="timeline-badge">
              <i className="fa fa-genderless text-warning icon-xl"></i>
            </div>

            <div className="font-weight-bolder font-size-lg timeline-content pl-3">
              End capstone semester
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Timeline);
