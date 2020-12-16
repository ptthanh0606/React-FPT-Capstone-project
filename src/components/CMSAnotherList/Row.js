import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'utils/md5';

const Row = ({
  className,
  labelId = '',
  label = '',
  subLabel = '',
  altLabel = '',
  altLabelExtended = '',
  emailAvatar = '',
  altLabelLinkTo = '',
  darkMode = false,
}) => {
  return (
    <div
      className={`d-flex align-items-center list-item py-4 ${className}`}
      data-inbox="message"
    >
      <div className="flex-grow-1 mt-1 mr-2" data-toggle="view">
        <Link
          to={`/topic/${labelId}`}
          className={`text-${
            darkMode && 'light-primary'
          } text-hover-primary font-weight-bold mr-2`}
        >
          {label}
        </Link>

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
        className="d-flex flex-column align-items-end justify-content-center flex-wrap"
        data-toggle="view"
      >
        {altLabelExtended && (
          <span className={`${darkMode && 'text-light-primary'}`}>
            {altLabelExtended}
          </span>
        )}
        <Link
          to={altLabelLinkTo}
          className={`font-weight-bolder mt-2 ${
            darkMode && 'text-light-primary text-hover-primary'
          }`}
        >
          {altLabel}
        </Link>

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
