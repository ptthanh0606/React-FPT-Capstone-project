import Row from 'components/CMSList/Row';
import React from 'react';

const CMSList = ({ className, title, subTitle, rows, toolBar }) => {
  // -------------------------------------------------------------

  // -------------------------------------------------------------

  return (
    <div className={`card card-custom card-border ${className}`}>
      <div className="card-header align-items-center border-0 mt-4">
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
        {rows &&
          rows.map(row => (
            <Row
              key={row.label}
              label={row.label}
              subLabel={row.subLabel}
              buttonLabel="Approve"
              action={row.action}
              onLabelClick={row.onLabelClick}
            />
          ))}
      </div>
    </div>
  );
};

export default CMSList;
