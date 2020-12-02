import React from 'react';
import { toAbsoluteUrl } from '_metronic/_helpers';
import ActionCard from './ActionCard';

const QuickAction = ({
  className,
  title,
  subTitle,
  toolBar,
  actionsRows = [
    [
      {
        className: 'col px-6 py-8 rounded-xl mr-7 mb-7',
        type: 'success',
        iconSrc: toAbsoluteUrl(
          '/media/svg/icons/Communication/Urgent-mail.svg'
        ),
        label: 'Hii',
      },
    ],
    [
      {
        className: 'col px-6 py-8 rounded-xl mr-7 mb-7',
        type: 'success',
        iconSrc: toAbsoluteUrl(
          '/media/svg/icons/Communication/Urgent-mail.svg'
        ),
        label: 'Hii',
      },
    ],
  ],
}) => {
  return (
    <div className={`card card-custom bg-white ${className}`}>
      <div className="card-header align-items-center border-0">
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
      <div className="card-body p-0 position-relative overflow-hidden">
        <div className="card-spacer mt-n25">
          {actionsRows &&
            actionsRows.map(row => (
              <div key={actionsRows.indexOf(row)} className="row m-0">
                {row.map(action => (
                  <ActionCard
                    key={action.label}
                    className={action.className}
                    type={action.type}
                    iconSrc={action.iconSrc}
                    label={action.label}
                    onClick={action.onClick}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(QuickAction);
