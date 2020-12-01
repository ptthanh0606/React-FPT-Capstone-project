import ApplicationRow from 'components/CMSModal/ApplicationsModal/ApplicationRow';
import React from 'react';
import toast from 'utils/toast';

const CMSList = ({ className, label, subLabel, rows }) => {
  // -------------------------------------------------------------

  const handleApproveTeam = React.useCallback(id => {
    toast.success('Approved selected team to topic!');
  }, []);

  const handleRejectTeam = React.useCallback(id => {
    toast.success('Rejected selected team!');
  }, []);

  // -------------------------------------------------------------

  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-header border-0">
        <h3 className="card-title font-weight-bolder text-dark">{label}</h3>
      </div>
      <div className="card-body pt-2">
        {rows &&
          rows.map(row => (
            <ApplicationRow
              label={row.name}
              subLabel={row.leader}
              buttonLabel="Approve"
              onApprove={handleApproveTeam}
              onReject={handleRejectTeam}
            />
          ))}
      </div>
    </div>
  );
};

export default CMSList;
