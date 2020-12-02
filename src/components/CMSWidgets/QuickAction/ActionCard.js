import React from 'react';

import SVG from 'react-inlinesvg';

const ActionCard = ({
  type = 'success',
  className = '',
  iconSrc = '/media/svg/icons/Communication/Urgent-mail.svg',
  label = '',
  onClick = () => {},
}) => {
  const handleClick = React.useCallback(
    event => {
      event.preventDefault();
      onClick();
    },
    [onClick]
  );

  return (
    <a
      href="/"
      onClick={handleClick}
      className={`col px-6 py-8 rounded-xl bg-light-${type} ${className}`}
    >
      <span className={`svg-icon svg-icon-3x svg-icon-${type} d-block my-2`}>
        <SVG src={iconSrc}></SVG>
      </span>
      <span className={`text-${type} font-weight-bold font-size-h6 mt-2`}>
        {label}
      </span>
    </a>
  );
};

export default React.memo(ActionCard);
