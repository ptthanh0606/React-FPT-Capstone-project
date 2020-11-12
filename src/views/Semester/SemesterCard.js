import React from 'react';
import { toAbsoluteUrl } from '_metronic/_helpers';
import SVG from 'react-inlinesvg';

const SemesterCard = props => {
  return (
    <div
      className={'col bg-' + props.color + ' px-6 py-8 rounded-xl mr-7 mb-7'}
    >
      <span className="svg-icon svg-icon-3x svg-icon-light d-block my-2">
        <SVG
          src={toAbsoluteUrl('/media/svg/icons/Communication/Dial-numbers.svg')}
        ></SVG>
      </span>
      <span className="text-white font-weight-bold font-size-h3">
        {props.title}
      </span>
      <br />
      <span className="text-light font-weight-bold font-size-h6">
        {props.status}
      </span>
    </div>
  );
};

export default SemesterCard;
