import React from 'react';

const GroupInfo = ({ className, name, department, leader }) => {
  return (
    <div className={`d-flex-column align-items-center mb-10 ${className}`}>
      <div className="form-group row mb-2">
        <label className="col-4 col-form-label">Name:</label>
        <div className="col-8">
          <span className="form-control-plaintext font-weight-bolder">
            {name}
          </span>
        </div>
      </div>
      <div className="form-group row my-2">
        <label className="col-4 col-form-label">Department:</label>
        <div className="col-8">
          <span className="form-control-plaintext">
            <span className="font-weight-bolder">{department}</span> &nbsp;
            {/* <span className="label label-inline label-danger label-bold">
              SE
            </span> */}
          </span>
        </div>
      </div>
      <div className="form-group row my-2">
        <label className="col-4 col-form-label">Leader:</label>
        <div className="col-8">
          <span className="form-control-plaintext font-weight-bolder">
            <a href="/">{leader}</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;
