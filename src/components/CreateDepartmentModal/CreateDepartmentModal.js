import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';

const CreateDepartmentModal = ({ isShowFlg, onHide, onCreate }) => {
  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Create new department
          <small className="form-text text-muted">
            Add new department to this semester
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Department name
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Give this department a name..."
                defaultValue=""
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Department code
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Code..." defaultValue="" />
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
              <ToggleSwitch name="quick_panel_notifications_2" />
              <small className="form-text text-muted">
                Is this department active?
              </small>
            </Col>
          </Form.Group>
        </Form>
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

export default CreateDepartmentModal;
