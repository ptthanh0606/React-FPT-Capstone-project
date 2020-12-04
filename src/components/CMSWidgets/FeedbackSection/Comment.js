import React from 'react';
import { toAbsoluteUrl } from '_metronic/_helpers';
import 'react-markdown-editor-lite/lib/index.css';
import md5 from 'utils/md5';

const Comment = ({ className, email, name, date, content }) => {
  return (
    <>
      <div className="timeline-item">
        <div className="timeline-media">
          <img
            alt="Pic"
            src={`https://www.gravatar.com/avatar/${md5(email.toLowerCase())}`}
          />
        </div>
        <div className="timeline-content">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="mr-2">
              <a
                href="/"
                className="text-dark-75 text-hover-primary font-weight-bolder"
              >
                {name}
              </a>
              <span className="text-muted ml-2">{date}</span>
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