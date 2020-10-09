import React from 'react';
import './style.scss';

export default function NotFound() {
  return (
    <div className="d-flex flex-column flex-root">
      <div
        className="error error-4 d-flex flex-row-fluid bgi-size-cover bgi-position-center"
        style={{
          backgroundImage:
            'url(' + process.env.PUBLIC_URL + '/media/error/bg4.jpg)',
        }}
      >
        <div className="d-flex flex-column flex-row-fluid align-items-center align-items-md-start justify-content-md-center text-center text-md-left px-10 px-md-30 py-10 py-md-0 line-height-xs">
          <h1 className="error-title text-danger font-weight-boldest line-height-sm">
            404
          </h1>
          <p className="error-subtitle text-danger font-weight-boldest mb-10">
            ERROR
          </p>
          <p className="display-4 text-info font-weight-boldest mt-md-0 line-height-md">
            &nbsp;Nothing left to do here.
          </p>
        </div>
      </div>
    </div>
  );
}
