import React from 'react';

export const rowActionFormatter = statusCode => {
  const status = ['Waiting', 'Approved', 'Rejected'];
  const cssStatus = ['warning', 'success', 'danger'];

  return (
    <>
      <div
        className={`label label-light-${cssStatus[statusCode]} label-inline font-weight-bolder text-dark-50 py-4 px-3 fontSize-base`}
      >
        <span
          className={`text-${cssStatus[statusCode]} font-size-sm font-weight-bolder`}
        >
          {status[statusCode]}
        </span>
      </div>
    </>
  );
};

export const applicationRowActionFormatter = numberOfApplication => {
  return (
    <>
      <div
        className={`label label-danger label-inline font-weight-bolder text-dark-50 py-4 px-3 fontSize-base`}
      >
        <span className={`text-white font-weight-bolder font-size-sm`}>
          {numberOfApplication}
        </span>
      </div>
    </>
  );
};
