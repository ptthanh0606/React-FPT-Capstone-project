import SelectTagInput from 'components/TagInput/SelectTagInput';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const UpdateAdminModal = ({ isShowFlg, onHide, onCreate, selectedId }) => {
  const [currentAdmin, setCurrentAdmin] = React.useState(null);
  const [selectedAdminEmail, setSelectedAdminEmail] = React.useState(null);

  React.useEffect(() => {
    setCurrentAdmin({
      id: '',
      name: 'Nguyen Truong Minh Thuan',
      email: 'thuanntmse130124@fpt.edu.vn',
      isActive: false,
    });
  }, []);

  React.useEffect(() => {
    setSelectedAdminEmail(
      currentAdmin && {
        label: currentAdmin.email,
        value: currentAdmin.email,
      }
    );
  }, [currentAdmin]);

  const handleLoadUserList = React.useCallback((mentorMail, callback) => {
    setTimeout(() => {
      callback([
        // Load all user in DB
        {
          value: 'haidnse130123@fpt.edu.vn',
          label: 'haidnse130123@fpt.edu.vn',
        },
        {
          value: 'thuanntmse130124@fpt.edu.vn',
          label: 'thuanntmse130124@fpt.edu.vn',
        },
        {
          value: 'dungnh130125@fpt.edu.vn',
          label: 'dungnh130125@fpt.edu.vn',
        },
        {
          value: 'nganlhse130126@fpt.edu.vn',
          label: 'nganlhse130126@fpt.edu.vn',
        },
      ]);
    }, 2000);
  }, []);

  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Update admin
          <small className="form-text text-muted">
            Change this admin detail
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentAdmin ? (
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Admin full name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Full name..."
                  defaultValue={currentAdmin.name}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Admin email
              </Form.Label>
              <Col sm={9}>
                <SelectTagInput
                  onChange={user =>
                    setSelectedAdminEmail({
                      label: user.label,
                      value: user.value,
                    })
                  }
                  load={handleLoadUserList}
                  value={selectedAdminEmail}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Active
              </Form.Label>
              <Col sm={9}>
                <ToggleSwitch name="quick_panel_notifications_2" />
                <small className="form-text text-muted">
                  Is this admin active in the system
                </small>
              </Col>
            </Form.Group>
          </Form>
        ) : (
          <span></span>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onCreate}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateAdminModal;
