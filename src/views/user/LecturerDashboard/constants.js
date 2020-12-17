import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const rowActionFormatter = statusCode => {
  const statusClasses = [
    'warning',
    'danger',
    'info',
    'primary',
    'info',
    'success',
    'danger',
  ];
  const statusTitles = [
    'Waiting',
    'Rejected',
    'Approved',
    'Ready',
    'Assigned',
    'Passed',
    'Failed',
  ];

  return (
    <>
      <div
        className={`label label-light-${statusClasses[statusCode]} label-inline font-weight-bolder text-dark-50 py-4 px-3 fontSize-base`}
      >
        <span
          className={`text-${statusClasses[statusCode]} font-size-sm font-weight-bolder`}
        >
          {statusTitles[statusCode]}
        </span>
      </div>
    </>
  );
};

export const applicationRowActionFormatter = (numberOfApplication, topicId) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip>Number of waiting applications for this topic.</Tooltip>
      }
    >
      <Link
        to={`/topic/${topicId}`}
        className={`label label-danger label-inline font-weight-bolder text-dark-50 py-4 px-3 fontSize-base`}
      >
        <span className={`text-white font-weight-bolder font-size-sm`}>
          {numberOfApplication}
        </span>
      </Link>
    </OverlayTrigger>
  );
};
