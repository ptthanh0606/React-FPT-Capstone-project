import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import SVG from 'react-inlinesvg';

const StatTile = ({
  className = '',
  baseColor = 'success',
  iconColor = 'success',
  toolTipMsg = '',
  widgetHeight = '150px',
  iconSrc = '',
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
    <div
      onClick={handleClick}
      className={`card card-custom bg-${baseColor} ${className}`}
      style={{ height: widgetHeight }}
    >
      <div className="card-body">
        <span className={`svg-icon svg-icon-3x svg-icon-white ml-n2`}>
          <SVG src={iconSrc} />
        </span>
        <div
          className={`text-inverse-${baseColor} font-weight-bolder font-size-h2 mt-3`}
        >
          {dataText}
        </div>
        {toolTipMsg ? (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>{toolTipMsg}</Tooltip>}
          >
            <span
              className={`text-inverse-${baseColor} font-weight-bold font-size-lg mt-1`}
            >
              {desciption}
            </span>
          </OverlayTrigger>
        ) : (
          <span
            className={`text-inverse-${baseColor} font-weight-bold font-size-lg mt-1`}
          >
            {desciption}
          </span>
        )}
      </div>
    </div>
  );
};

export default React.memo(StatTile);
