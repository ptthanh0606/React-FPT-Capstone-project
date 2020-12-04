import React from 'react';
import Row from './Row';

const CMSAnotherList = ({
  darkMode = false,
  className,
  title,
  subTitle,
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
}) => {
  // -------------------------------------------------------------

  return (
    <div
      className={`card card-custom card-border ${
        darkMode && 'bg-dark'
      } ${className}`}
    >
      <div className="card-header align-items-center border-0 mt-4">
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
              } mt-3 font-weight-bold font-size-sm mb-5`}
            >
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
              label={row.label}
              subLabel={row.subLabel}
              emailAvatar={row.emailAvatar}
              altLabel={row.altLabel}
              darkMode={darkMode}
              onLabelClick={row.onLabelClick}
            />
          ))}
      </div>
    </div>
  );
};

export default React.memo(CMSAnotherList);
