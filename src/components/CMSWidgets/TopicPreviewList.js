/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button } from 'react-bootstrap';

const TopicPreviewList = ({
  title = 'Newly added topics',
  expandbuttonlabel = 'View all topic',
  className = '',
  ...props
}) => {
  return (
    <div className={`card card-custom ${className}`} {...props}>
      {/* Header */}
      <div className="card-header border-0">
        <h3 className="card-title font-weight-bolder text-dark">{title}</h3>

        <div className="card-toolbar">
          <a
            href="/"
            className="font-weight-bold text-dark-75 text-hover-primary font-size-lg "
          >
            {expandbuttonlabel}
          </a>
        </div>
      </div>

      {/* Body */}
      <div className="card-body pt-0">
        <div className="mb-6">
          <div className="d-flex align-items-center flex-grow-1">
            <div className="d-flex flex-wrap align-items-center justify-content-between w-100">
              <div className="d-flex flex-column align-items-cente py-2 w-75">
                <a
                  href="#"
                  className="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1"
                >
                  Daily Standup Meeting
                </a>

                <span className="text-muted font-weight-bold">
                  Due in 2 Days
                </span>
              </div>

              <Button
                className="btn-light-primary"
                style={{
                  width: '7em',
                  lineHeight: '35px',
                  padding: '0px 1rem',
                  fontWeight: '600',
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="d-flex align-items-center flex-grow-1">
            {/* begin::Section */}
            <div className="d-flex flex-wrap align-items-center justify-content-between w-100">
              {/* begin::Info */}
              <div className="d-flex flex-column align-items-cente py-2 w-75">
                {/* begin::Title */}
                <a
                  href="#"
                  className="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1"
                >
                  Group Town Hall Meet-up with showcase
                </a>
                {/* end::Title */}

                {/* begin::Data */}
                <span className="text-muted font-weight-bold">
                  Due in 2 Days
                </span>
                {/* end::Data */}
              </div>
              {/* end::Info */}

              {/* begin::Label */}
              <Button
                className="btn-light-primary"
                style={{
                  width: '7em',
                  lineHeight: '35px',
                  padding: '0px 1rem',
                  fontWeight: '600',
                }}
              >
                Apply
              </Button>
              {/* end::Label */}
            </div>
            {/* end::Section */}
          </div>
          {/* end::Content */}
        </div>

        <div className="mb-6">
          {/* begin::Content */}
          <div className="d-flex align-items-center flex-grow-1">
            {/* begin::Checkbox */}

            {/* end::Checkbox */}

            {/* begin::Section */}
            <div className="d-flex flex-wrap align-items-center justify-content-between w-100">
              {/* begin::Info */}
              <div className="d-flex flex-column align-items-cente py-2 w-75">
                {/* begin::Title */}
                <a
                  href="#"
                  className="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1"
                >
                  Next sprint planning and estimations
                </a>
                {/* end::Title */}

                {/* begin::Data */}
                <span className="text-muted font-weight-bold">
                  Due in 2 Days
                </span>
                {/* end::Data */}
              </div>
              {/* end::Info */}

              {/* begin::Label */}
              <Button
                className="btn-light-primary"
                style={{
                  width: '7em',
                  lineHeight: '35px',
                  padding: '0px 1rem',
                  fontWeight: '600',
                }}
              >
                Apply
              </Button>
              {/* end::Label */}
            </div>
            {/* end::Section */}
          </div>
          {/* end::Content */}
        </div>

        <div className="">
          {/* begin::Content */}
          <div className="d-flex align-items-center flex-grow-1">
            {/* begin::Checkbox */}

            {/* end::Checkbox */}

            {/* begin::Section */}
            <div className="d-flex flex-wrap align-items-center justify-content-between w-100">
              {/* begin::Info */}
              <div className="d-flex flex-column align-items-cente py-2 w-75">
                {/* begin::Title */}
                <a
                  href="#"
                  className="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1"
                >
                  Data analytics research showcase
                </a>
                {/* end::Title */}

                {/* begin::Data */}
                <span className="text-muted font-weight-bold">
                  Due in 2 Days
                </span>
                {/* end::Data */}
              </div>
              {/* end::Info */}

              {/* begin::Label */}
              <Button
                className="btn-light-primary"
                style={{
                  width: '7em',
                  lineHeight: '35px',
                  padding: '0px 1rem',
                  fontWeight: '600',
                }}
              >
                Apply
              </Button>
              {/* end::Label */}
            </div>
            {/* end::Section */}
          </div>
          {/* end::Content */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TopicPreviewList);
