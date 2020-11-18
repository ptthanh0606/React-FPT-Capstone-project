import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';

const UpdateDepartmentModal = ({ isShowFlg, onHide, onCreate, selectedId }) => {
  const [currentDepartment, setCurrentDepartment] = React.useState();
  const [isActiveFlg, setIsActiveFlg] = React.useState(false);

  React.useEffect(() => {
    setCurrentDepartment({
      id: '',
      name: 'Software Engineer',
      code: 'SE',
      isActive: true,
    });
  }, []);

  React.useEffect(() => {
    setIsActiveFlg(currentDepartment && currentDepartment.isActive);
  }, [currentDepartment]);

  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Update department
          <small className="form-text text-muted">
            Change this department info
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentDepartment ? (
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Department name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Give this department a name..."
                  defaultValue={currentDepartment.name}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Department code
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Code..."
                  defaultValue={currentDepartment.code}
                />
                <small className="form-text text-muted">
                  Ex: Software Engineer to be "SE"
                </small>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Active state
              </Form.Label>
              <Col sm={9}>
                <ToggleSwitch
                  isActive={isActiveFlg}
                  onChange={e => setIsActiveFlg(e.currentTarget.checked)}
                />
                <small className="form-text text-muted">
                  Is this department active?
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

export default UpdateDepartmentModal;
