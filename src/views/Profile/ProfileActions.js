import React from 'react';
import md5 from 'utils/md5';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '_metronic/_helpers';

const ProfileActions = ({
  className = '',
  fullName = '',
  departments = [],
  email = '',
  code = '',
}) => {
  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-body pt-4">
        <div className="d-flex align-items-center">
          <div className="symbol symbol-60 symbol-xxl-100 mr-5 align-self-start align-self-xxl-center">
            <div
              className="symbol-label"
              style={{
                backgroundImage: `url(https://www.gravatar.com/avatar/${
                  email && md5(email.toLowerCase())
                })`,
              }}
            ></div>
            <i className="symbol-badge bg-success"></i>
          </div>
          <div>
            <span className="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary">
              {fullName}
            </span>
            <div className="text-muted">{code}</div>
          </div>
        </div>

        <div className="py-9">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="font-weight-bold mr-2">Email:</span>
            <span className="text-muted text-hover-primary">{email}</span>
          </div>
          <div className="d-flex align-items-start justify-content-between mb-2">
            <span className="font-weight-bold mr-2">Department:</span>
            <span className="text-muted">
              {departments?.length ? (
                departments.map((dep, index) => (
                  <span key={index} className="text-hover-primary">
                    {dep}
                    <br />
                  </span>
                ))
              ) : (
                <></>
              )}
            </span>
          </div>
        </div>

        <div className="navi navi-bold navi-hover navi-active navi-link-rounded">
          <div className="navi-item mb-2">
            <span className="navi-link py-4 active">
              <span className="navi-icon mr-2">
                <span className="svg-icon">
                  <SVG
                    src={toAbsoluteUrl('/media/svg/icons/General/User.svg')}
                  ></SVG>
                </span>{' '}
              </span>
              <span className="navi-text font-size-lg">
                Personal Information
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfileActions);
