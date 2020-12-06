import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '_metronic/_helpers';

const UtilityButtonTile = ({
  className = '',
  smallTitle = 'Private code',
  label = 'UASJDASDK',
  baseColor = 'primary',
  tooltipMsg,
  buttonIcon = toAbsoluteUrl('/media/svg/icons/Code/Lock-overturning.svg'),
}) => {
  return (
    <div
      className={`card card-custom bg-diagonal bg-diagonal-${baseColor} ${className}`}
    >
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between p-4">
          <div className="d-flex flex-column align-items-start justify-content-center mr-5">
            <span className="text-white mb-2">{smallTitle}</span>
            {tooltipMsg ? (
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>{tooltipMsg}</Tooltip>}
              >
                <span className="h2 m-0 text-light font-weight-bolder">
                  {label}
                </span>
              </OverlayTrigger>
            ) : (
              <span className="h2 m-0 text-light font-weight-bolder">
                {label}
              </span>
            )}
          </div>

          <div className="ml-6 flex-shrink-0">
            <a href="/" className="py-3 px-6">
              <span className="svg-icon svg-icon-white svg-icon-4x">
                <SVG src={buttonIcon}></SVG>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UtilityButtonTile);
