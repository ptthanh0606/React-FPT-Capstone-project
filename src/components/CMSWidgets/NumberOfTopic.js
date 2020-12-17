import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const NumberOfTopic = ({ className = '', totalAvailable = 0, total = 0 }) => {
  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title font-weight-bolder text-dark">
          Ready topics
        </h3>
      </div>
      <div className="card-body pt-0">
        <div className="text-primary font-weight-bolder font-size-h2">
          {totalAvailable}
        </div>

        <span className="text-muted text-hover-primary font-weight-bold font-size-lg mt-1">
          Topics available left for assigning.
        </span>
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip>
              {totalAvailable} on the total of {total}
            </Tooltip>
          }
        >
          <div className="progress progress-xs w-100 mt-12">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${(totalAvailable / total) * 100}%` }}
            ></div>
          </div>
        </OverlayTrigger>
      </div>
    </div>
  );
};

export default React.memo(NumberOfTopic);
