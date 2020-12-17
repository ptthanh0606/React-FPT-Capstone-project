import Row from 'components/CMSList/Row';
import React from 'react';
import { Spinner } from 'react-bootstrap';

const CMSList = ({
  className = '',
  title = '',
  subTitle = '',
  rows = [{ label: '', subLabel: '', actions: <></> }],
  rowActions = <></>,
  toolBar = <></>,
  fallbackMsg = '',
  isLoading = false,
}) => {
  // -------------------------------------------------------------

  return (
    <div className={`card card-custom card-border ${className}`}>
      <div
        className={`card-header align-items-center border-0 mt-${
          subTitle ? '7' : '0'
        }`}
      >
        <h3 className="card-title font-weight-bolder align-items-start text-dark flex-column">
          {title}
          {subTitle && (
            <span className="text-muted mt-3 font-weight-bold font-size-sm mb-5">
              {subTitle}
            </span>
          )}
        </h3>
        <div className="card-toolbar">{toolBar}</div>
      </div>
      <div className="card-body pt-2">
        {!isLoading ? (
          rows?.length ? (
            rows.map(row => (
              <Row
                key={row.label}
                label={row.label}
                subLabel={row.subLabel}
                action={row.actions || rowActions}
                onLabelClick={row.onLabelClick}
                labelLinkTo={row.labelLinkTo}
              />
            ))
          ) : (
            <>{fallbackMsg}</>
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

export default CMSList;
