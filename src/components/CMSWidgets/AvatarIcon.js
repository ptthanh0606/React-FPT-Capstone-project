import React from 'react';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '_metronic/_helpers';

const AvatarIcon = () => {
  return (
    <div className="symbol symbol-40 symbol-light-success mr-5">
      <span className="symbol-label">
        <SVG
          className="h-75 align-self-end"
          src={toAbsoluteUrl('/media/svg/avatars/009-boy-4.svg')}
        ></SVG>
      </span>
    </div>
  );
};

export default React.memo(AvatarIcon);
