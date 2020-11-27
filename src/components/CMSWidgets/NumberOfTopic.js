import React from 'react';

const NumberOfTopic = ({ className }) => {
  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-header border-0">
        <h3 className="card-title font-weight-bolder text-dark">
          Topic availability
        </h3>
      </div>
      <div className="card-body pt-0">
        <div className="text-primary font-weight-bolder font-size-h2">68</div>

        <a
          href="/"
          className="text-muted text-hover-primary font-weight-bold font-size-lg mt-1"
        >
          Topics are currently available remaining.
        </a>
        <div className="progress progress-xs w-100 mt-12">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: '65%' }}
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NumberOfTopic);
