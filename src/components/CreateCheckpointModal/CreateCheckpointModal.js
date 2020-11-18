import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import SelectBox from 'components/SelectBox/SelectBox';

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

const CreateCheckpointModal = ({ isShowFlg, onHide, onCreate }) => {
  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Create new checkpoint phase
          <small className="form-text text-muted">
            Add new checkpoint phase for this semester
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Checkpoint name
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Give this topic a name..."
                defaultValue=""
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Description
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Name" defaultValue="" />
              <small className="form-text text-muted">
                Brief description for this checkpoint
              </small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Weight
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="number" placeholder="30" defaultValue="" />
              <small className="form-text text-muted">Enter 30 for 30%</small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Due date
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="date" placeholder="" defaultValue="" />
              <small className="form-text text-muted">
                Pick a due date for this checkpoint
              </small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Attachment
            </Form.Label>
            <Col sm={9}>
              <Form.File />
              <small className="form-text text-muted">
                Attachment for this checkpoint
              </small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Margin pass
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                placeholder="Maximum team member..."
                defaultValue="4"
              />
              <small className="form-text text-muted">
                Ceil value for passing this checkpoint
              </small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Margin fail
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                placeholder="Maximum team member..."
                defaultValue="4"
              />
              <small className="form-text text-muted">
                Floor value for failing this checkpoint
              </small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Department
            </Form.Label>
            <Col sm={9}>
              <SelectBox
                options={departmentOptions}
                placeholder="Select a department"
              />
              <small className="form-text text-muted">
                Is this topic from student
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
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCheckpointModal;
