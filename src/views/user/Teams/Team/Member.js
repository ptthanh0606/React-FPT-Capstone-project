import React from 'react';
import { Dropdown } from 'react-bootstrap';

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

const Member = () => {
  return (
    <>
      <div class="d-flex justify-content-between mb-4">
        <div class="d-flex align-items-center">
          <div class="flex-shrink-0 mr-4 mt-lg-0 mt-3">
            <div class="symbol symbol-rounded symbol-lg-75">
              <img src={toAbsoluteUrl('/media/users/300_1.jpg')} alt="image" />
            </div>
            <div class="symbol symbol-lg-75 symbol-circle symbol-primary d-none">
              <span class="font-size-h3 font-weight-boldest">JM</span>
            </div>
          </div>
          <div class="d-flex flex-column">
            <a
              href="#"
              class="text-dark font-weight-bold text-hover-primary font-size-h4 mb-0"
            >
              Huynh Duc Duy
            </a>
            <span class="text-muted font-weight-bold">SE130491</span>
            <span class="text-muted font-weight-bold">
              duyhdse130491@fpt.edu.vn
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
                  <a href="#" className="navi-link">
                    <span className="navi-icon">
                      <i className="flaticon2-drop"></i>
                    </span>
                    <span className="navi-text">Make leader</span>
                  </a>
                </li>
                <li className="navi-item">
                  <a href="#" className="navi-link">
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
