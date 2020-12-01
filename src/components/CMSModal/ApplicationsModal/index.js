import React from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'utils/toast';
import ApplicationRow from './ApplicationRow';
import Button from '../../Button';

const ApplicationsModal = ({ isShowFlg, onHide, onAdd }) => {
  const [applications, setApplications] = React.useState([]);

  // -------------------------------------------------------------

  const handleApproveTeam = React.useCallback(id => {
    toast.success('Approved selected team to topic!');
  }, []);

  const handleRejectTeam = React.useCallback(id => {
    toast.success('Rejected selected team!');
  }, []);

  // -------------------------------------------------------------

  React.useEffect(() => {
    const response = [
      {
        name: 'Team name example 1',
        leader: 'Huynh Duc Duy',
      },
      {
        name: 'Team name example 2',
        leader: 'Huynh Duc Duy',
      },
      {
        name: 'Team name example 3',
        leader: 'Huynh Duc Duy',
      },
    ];
    setApplications(response);
  }, []);

  // -------------------------------------------------------------

  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Team applications
          <small className="form-text text-muted">
            Student teams that are applying for this topic
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {applications &&
          applications.map(application => (
            <ApplicationRow
              label={application.name}
              subLabel={application.leader}
              buttonLabel="Approve"
              onApprove={handleApproveTeam}
              onReject={handleRejectTeam}
            />
          ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default React.memo(ApplicationsModal);
