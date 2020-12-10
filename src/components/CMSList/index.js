import Row from 'components/CMSList/Row';
import React from 'react';

const CMSList = ({
  className,
  title,
  subTitle,
  rows,
  rowActions = <></>,
  toolBar,
  fallbackMsg,
}) => {
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
        {rows?.length ? (
          rows.map(row => (
            <Row
              key={row.label}
              label={row.label}
              subLabel={row.subLabel}
              action={row.actions || rowActions}
              onLabelClick={row.onLabelClick}
            />
          ))
        ) : (
          <>{fallbackMsg}</>
        )}
      </div>
    </div>
  );
};

export default CMSList;
