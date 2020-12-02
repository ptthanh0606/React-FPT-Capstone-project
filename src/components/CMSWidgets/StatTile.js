import React from 'react';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '_metronic/_helpers';

const StatTile = ({
  className,
  baseColor = 'primary',
  iconColor = 'success',
  widgetHeight = '150px',
  iconSrc = toAbsoluteUrl('/media/svg/icons/Layout/Layout-4-blocks.svg'),
  dataText = '790',
  desciption = 'Topic in this semester',
  onClick = () => {},
}) => {
  const handleClick = React.useCallback(
    e => {
      e.preventDefault();
      onClick();
    },
    [onClick]
  );

  return (
    <>
      <a
        href="/"
        onClick={handleClick}
        className={`card card-custom bg-${baseColor} ${className}`}
        style={{ height: widgetHeight }}
      >
        <div className="card-body">
          <span className={`svg-icon svg-icon-3x svg-icon-${iconColor} ml-n2`}>
            <SVG src={iconSrc} />
          </span>
          <div
            className={`text-inverse-${baseColor} font-weight-bolder font-size-h2 mt-3`}
          >
            {dataText}
          </div>

          <span
            href="/"
            className={`text-inverse-${baseColor} font-weight-bold font-size-lg mt-1`}
          >
            {desciption}
          </span>
        </div>
      </a>
    </>
  );
};

export default React.memo(StatTile);
