import { formatRelative, subMinutes } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'utils/md5';

const Comment = ({
  className = '',
  email = '',
  name = '',
  date = '',
  content = '',
  id = '',
}) => {
  return (
    <>
      <div className={`timeline-item ${className}`}>
        <div className="timeline-media">
          <img
            alt="Pic"
            src={`https://www.gravatar.com/avatar/${md5(email.toLowerCase())}`}
          />
        </div>
        <div className="timeline-content">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="mr-2">
              <Link
                to={`/profile/lecturer/${id}`}
                className="text-dark-75 text-hover-primary font-weight-bolder"
              >
                {name}
              </Link>
              <span className="text-muted ml-2">
                {formatRelative(
                  subMinutes(new Date(date), new Date().getTimezoneOffset()),
                  new Date()
                )}
              </span>
            </div>
          </div>
          <p
            className="p-0"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></p>
        </div>
      </div>
    </>
  );
};

export default React.memo(Comment);
