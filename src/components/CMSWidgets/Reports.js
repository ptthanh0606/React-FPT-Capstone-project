import React from 'react';
import SVG from 'react-inlinesvg';
import { Button } from 'react-bootstrap';

const Reports = ({ className }) => {
  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header border-0">
        <h3 className="card-title font-weight-bolder text-dark">
          Report progress
        </h3>
        <div className="card-toolbar">
          <Button>Send report</Button>
        </div>
      </div>
      {/* Body */}
      <div className="card-body pt-2">
        <div className="d-flex align-items-center mb-10">
          <div className="symbol symbol-40 symbol-light-success mr-5">
            <span className="symbol-label">
              <SVG
                className="h-75 align-self-end"
                // src={toAbsoluteUrl('/media/svg/avatars/009-boy-4.svg')}
              ></SVG>
            </span>
          </div>
          <div className="d-flex flex-column flex-grow-1 font-weight-bold">
            <a
              href="/"
              className="text-dark text-hover-primary mb-1 font-size-lg font-weight-bolder"
            >
              Report #3
            </a>
            <span className="text-muted">At 10:30AM 6 June 2020</span>
          </div>
        </div>
        <div className="d-flex align-items-center mb-10">
          <div className="symbol symbol-40 symbol-light-success mr-5">
            <span className="symbol-label">
              <SVG
                className="h-75 align-self-end"
                // src={toAbsoluteUrl('/media/svg/avatars/006-girl-3.svg')}
              ></SVG>
            </span>
          </div>
          <div className="d-flex flex-column flex-grow-1 font-weight-bold">
            <a
              href="/"
              className="text-dark text-hover-primary mb-1 font-size-lg font-weight-bolder"
            >
              Report #2
            </a>
            <span className="text-muted">At 10:30AM 6 June 2020</span>
          </div>
        </div>
        <div className="d-flex align-items-center mb-10">
          <div className="symbol symbol-40 symbol-light-success mr-5">
            <span className="symbol-label">
              <SVG
                className="h-75 align-self-end"
                // src={toAbsoluteUrl('/media/svg/avatars/011-boy-5.svg')}
              ></SVG>
            </span>
          </div>
          <div className="d-flex flex-column flex-grow-1 font-weight-bold">
            <a
              href="/"
              className="text-dark text-hover-primary mb-1 font-size-lg font-weight-bolder"
            >
              Report #1
            </a>
            <span className="text-muted">At 10:30AM 6 June 2020</span>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="symbol symbol-40 symbol-light-success mr-5">
            <span className="symbol-label">
              <SVG
                className="h-75 align-self-end"
                // src={toAbsoluteUrl('/media/svg/avatars/015-boy-6.svg')}
              ></SVG>
            </span>
          </div>
          <div className="d-flex flex-column flex-grow-1 font-weight-bold">
            <a
              href="/"
              className="text-dark text-hover-primary mb-1 font-size-lg font-weight-bolder"
            >
              Report #4
            </a>
            <span className="text-muted">At 10:30AM 6 June 2020</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Reports);
