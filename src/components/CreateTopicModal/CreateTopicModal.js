import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import CreateableTagInput from 'components/TagInput/CreateableTagInput';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import SelectTagInput from 'components/TagInput/SelectTagInput';
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

const CreateTopicModal = ({ isShowFlg, onHide, onCreate }) => {
  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Create new topics
          <small className="form-text text-muted">
            Add new topic to this semester
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Topic code
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Topic code" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Name
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Name" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Description
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Topic description..." />
              <small className="form-text text-muted">
                Brief description for this topic
              </small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Note
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Note..." />
              <small className="form-text text-muted">Note</small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Minimum team members
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                placeholder="Minimum team member..."
              />
              <small className="form-text text-muted">
                Minimum team member for this topic
              </small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Maximum team members
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                placeholder="Maximum team member..."
              />
              <small className="form-text text-muted">
                Maximum team member for this topic
              </small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              From department
            </Form.Label>
            <Col sm={9}>
              <SelectBox
                options={departmentOptions}
                placeholder="Select a department"
              />
              <small className="form-text text-muted">
                Topic in which department
              </small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              By student
            </Form.Label>
            <Col sm={9}>
              <ToggleSwitch name="quick_panel_notifications_2" />
              <small className="form-text text-muted">
                Is this topic from student
              </small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Mentor group
            </Form.Label>
            <Col sm={9}>
              <SelectTagInput />
              <small className="form-text text-muted">
                Mentor group for this topic
              </small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Keywords
            </Form.Label>
            <Col sm={9}>
              <CreateableTagInput />
              <small className="form-text text-muted">
                Some keywords for this topic
              </small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Additional attachment file
            </Form.Label>
            <Col sm={9}>
              <Form.File id="exampleFormControlFile1" />
              <small className="form-text text-muted">.pdf, .docx</small>
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

export default CreateTopicModal;
