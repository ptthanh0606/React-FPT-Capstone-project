import React from 'react';
import { Spinner } from 'react-bootstrap';
import Row from './Row';

const CMSAnotherList = ({
  darkMode = false,
  className = '',
  title = '',
  subTitle = '',
  rows = [
    {
      id: 0,
      label: '',
      onLabelClick: () => {},
      subLabel: '',
      altLabel: '',
      emailAvatar: '',
      action: () => {},
    },
  ],
  toolBar = <></>,
  fallbackMsg = '',
  isLoading = false,
}) => {
  // -------------------------------------------------------------

  return (
    <div
      className={`card card-custom card-border ${
        darkMode && 'bg-dark'
      } ${className}`}
    >
      <div
        className={`card-header align-items-center border-0 mt-${
          subTitle ? '7' : '0'
        }`}
      >
        <h3
          className={`card-title font-weight-bolder align-items-start text-${
            darkMode && 'white'
          } flex-column`}
        >
          {title}
          {subTitle && (
            <span
              className={`text-muted text-${
                darkMode && 'white'
              } mt-3 font-weight-bolder font-size-sm mb-0`}
            >
              {subTitle}
            </span>
          )}
        </h3>
        <div className="card-toolbar">{toolBar}</div>
      </div>
      <div className="card-body pt-2">
        {!isLoading ? (
          rows?.length ? (
            rows.map(row => <Row {...row} />)
          ) : (
            <span className="text-white">{fallbackMsg}</span>
          )
        ) : (
          <div className="d-flex align-items-center">
            <Spinner
              className="mr-5"
              variant="primary"
              animation="border"
            ></Spinner>
            <span className="text-primary">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(CMSAnotherList);
