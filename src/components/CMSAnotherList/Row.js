import React from 'react';
import md5 from 'utils/md5';

const Row = ({
  className,
  label = '',
  subLabel = '',
  altLabel = '',
  emailAvatar = '',
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
    <div
      className={`d-flex align-items-start list-item py-4 ${className}`}
      data-inbox="message"
    >
      <div className="flex-grow-1 mt-1 mr-2" data-toggle="view">
        <a
          href="/"
          onClick={handleRoute}
          className="text-dark-75 text-hover-primary font-weight-bolder mr-2"
        >
          {label}
        </a>

        <div className="mt-2">
          <span className="label label-light-primary font-weight-bold label-inline mr-2">
            {subLabel}
          </span>
        </div>
      </div>
      <div
        className="d-flex align-items-center justify-content-end flex-wrap"
        data-toggle="view"
      >
        <div className="font-weight-bolder" data-toggle="view">
          {altLabel}
        </div>

        <span className="symbol symbol-30 ml-3">
          <span
            className="symbol-label"
            style={{
              backgroundImage: `url(https://www.gravatar.com/avatar/${md5(
                emailAvatar.toLowerCase()
              )})`,
            }}
          ></span>
        </span>
      </div>
    </div>
  );
};

export default React.memo(Row);
