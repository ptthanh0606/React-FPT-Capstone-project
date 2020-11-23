import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const AddAdminModal = ({ isShowFlg, onHide, onCreate }) => {
  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Add admin
          <small className="form-text text-muted">
            Add admin to the system
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Admin full name
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Full name..."
                defaultValue=""
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Admin email
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Enter lecturer .fpt.edu.vn email"
                defaultValue=""
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

export default AddAdminModal;