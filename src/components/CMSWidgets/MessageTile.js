import React from 'react';
import { toAbsoluteUrl } from '_metronic/_helpers';
import SVG from 'react-inlinesvg';

const MessageTile = ({
  className = '',
  iconSrc = toAbsoluteUrl('/media/svg/icons/Layout/Layout-4-blocks.svg'),
  baseColor = 'success',
  content = <></>,
}) => {
  return (
    <div
      className={`alert alert-custom alert-light-${baseColor} fade show ${className}`}
      role="alert"
    >
      <div className="alert-icon">
        <span className={`svg-icon svg-icon-3x svg-icon-${baseColor}`}>
          <SVG src={iconSrc} />
        </span>{' '}
      </div>
      <div className="alert-text font-weight-bold">{content}</div>
    </div>
  );
};

export default React.memo(MessageTile);
