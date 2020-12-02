import React from 'react';
import { toAbsoluteUrl } from '_metronic/_helpers';
import SVG from 'react-inlinesvg';

const MessageTile = ({ className }) => {
  return (
    <div
      className={`${className} d-flex align-items-center bg-light-success rounded p-5 mb-9`}
    >
      <span className="svg-icon svg-icon-success mr-5 svg-icon-lg">
        <SVG
          src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
        ></SVG>
      </span>
      <div className="d-flex flex-column flex-grow-1 mr-2">
        <a
          href="/"
          className="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1"
        >
          Apply for a topic to be display here
        </a>
        <span className="text-muted font-weight-bold">Due in 2 Days</span>
      </div>

      <span className="font-weight-bolder text-success py-1 font-size-lg">
        Apply now
      </span>
    </div>
  );
};

export default React.memo(MessageTile);
