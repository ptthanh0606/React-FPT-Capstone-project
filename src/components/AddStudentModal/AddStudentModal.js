import SelectTagInput from 'components/TagInput/SelectTagInput';
import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const departmentOptions = [
  {
    label: 'SE',
    value: '',
  },
  {
    label: 'GD',
    value: '',
  },
  {
    label: 'CC',
    value: '',
  },
];

const AddStudentModal = ({ isShowFlg, onHide, onCreate }) => {
  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Add Student
          <small className="form-text text-muted">
            Add student to the system
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Student full name
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
              Student code
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Enter student code"
                defaultValue=""
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Student email
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
              Department
            </Form.Label>
            <Col sm={9}>
              <SelectTagInput placeholder="Enter department code" />
              <small className="form-text text-muted">
                Departments for this lecturer
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

export default AddStudentModal;
