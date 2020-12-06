import React from 'react';
import { Dropdown } from 'react-bootstrap';
import md5 from 'utils/md5';

import { toAbsoluteUrl } from '_metronic/_helpers/AssetsHelpers';

const DropdownCustomToggler = React.forwardRef((props, ref) => {
  return (
    <a
      ref={ref}
      className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
      onClick={e => {
        e.preventDefault();
        props.onClick(e);
      }}
    >
      {props.children}
    </a>
  );
});

const Member = ({ email = '', name = '', isLeader = false }) => {
  return (
    <>
      <div class="d-flex justify-content-between mb-4">
        <div class="d-flex align-items-center">
          <div class="flex-shrink-0 mr-4 mt-lg-0 mt-3">
            <div className="symbol symbol-100 mr-5">
              <div
                className="symbol-label"
                style={{
                  backgroundImage: `url(https://www.gravatar.com/avatar/${md5(
                    email.toLowerCase()
                  )})`,
                }}
              />
            </div>
          </div>
          <div class="d-flex flex-column align-items-start">
            <a
              href="/"
              class="text-dark font-weight-bold text-hover-primary font-size-h4 mb-0"
            >
              {name}
            </a>
            <span class="text-muted font-weight-bold">{email}</span>
            <span class="label label-inline label-danger font-weight-bold">
              {isLeader && 'Leader'}
            </span>
          </div>
        </div>
        <div className="px-2">
          <Dropdown className="dropdown-inline" alignRight>
            <Dropdown.Toggle
              className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
              variant="transparent"
              id="dropdown-toggle-top"
              as={DropdownCustomToggler}
            >
              <i className="ki ki-bold-more-hor" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
              <ul className="navi navi-hover">
                <li className="navi-item">
                  <a href="/" className="navi-link">
                    <span className="navi-icon">
                      <i className="flaticon2-drop"></i>
                    </span>
                    <span className="navi-text">Make leader</span>
                  </a>
                </li>
                <li className="navi-item">
                  <a href="/" className="navi-link">
                    <span className="navi-icon">
                      <i className="flaticon2-list-3"></i>
                    </span>
                    <span className="navi-text">Kick</span>
                  </a>
                </li>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default Member;
