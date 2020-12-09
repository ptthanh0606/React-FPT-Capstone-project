import React from 'react';
import md5 from 'utils/md5';

const Row = ({
  className,
  label = '',
  subLabel = '',
  altLabel = '',
  emailAvatar = '',
  onLabelClick,
  darkMode,
}) => {
  return (
    <div
      className={`d-flex align-items-start list-item py-4 ${className}`}
      data-inbox="message"
    >
      <div className="flex-grow-1 mt-1 mr-2" data-toggle="view">
        <a
          href="/"
          onClick={onLabelClick}
          className={`text-${
            darkMode && 'light-primary'
          } text-hover-primary font-weight-bold mr-2`}
        >
          {label}
        </a>

        <div className="mt-2">
          <span
            className={`label ${
              darkMode ? 'label-info' : 'label-light-primary'
            } font-weight-bold label-inline mr-2`}
          >
            {subLabel}
          </span>
        </div>
      </div>
      <div
        className="d-flex align-items-center justify-content-end flex-wrap"
        data-toggle="view"
      >
        <a
          href="/"
          className={`font-weight-bolder ${
            darkMode && 'text-light-primary text-hover-primary'
          }`}
        >
          {altLabel}
        </a>

        {emailAvatar && (
          <a href="/" className="symbol symbol-30 ml-3">
            <span
              className="symbol-label"
              style={{
                backgroundImage: `url(https://www.gravatar.com/avatar/${md5(
                  emailAvatar.toLowerCase()
                )})`,
              }}
            ></span>
          </a>
        )}
      </div>
    </div>
  );
};

export default React.memo(Row);
