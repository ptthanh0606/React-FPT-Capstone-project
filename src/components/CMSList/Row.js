import React from 'react';

const ApplicationRow = ({
  className,
  label,
  subLabel,
  action,
  onLabelClick,
}) => {
  const handleRoute = React.useCallback(
    event => {
      event.preventDefault();
      onLabelClick();
    },
    [onLabelClick]
  );

  return (
    <div className={'d-flex align-items-center mb-10 ' + className}>
      <div className="d-flex flex-column flex-grow-1 font-weight-bold">
        <a
          href="/"
          className="text-dark text-hover-primary mb-1 font-size-lg"
          onClick={handleRoute}
        >
          {label}
        </a>
        <span className="text-muted">{subLabel}</span>
      </div>
      {action}
    </div>
  );
};

export default ApplicationRow;
