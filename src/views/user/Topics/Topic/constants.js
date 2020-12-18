import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Button from 'components/Button';

export const rowActionFormatter = (handleApproveTeam, handleRejectTeam) => {
  return (
    <>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip>Approve selected team</Tooltip>}
      >
        <Button
          className="btn btn-primary btn-success font-weight-bold btn-sm mr-2"
          onClick={handleApproveTeam}
        >
          <i class="far fa-thumbs-up icon-xs"></i>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip>Reject selected team</Tooltip>}
      >
        <Button
          className="btn btn-light-danger font-weight-bold btn-sm "
          onClick={handleRejectTeam}
        >
          <i class="far fa-thumbs-down icon-xs"></i>
        </Button>
      </OverlayTrigger>
    </>
  );
};
