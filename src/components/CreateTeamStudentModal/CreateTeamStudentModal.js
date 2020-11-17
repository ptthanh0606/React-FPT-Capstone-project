import SelectBox from 'components/SelectBox/SelectBox';
import SelectTagInput from 'components/TagInput/SelectTagInput';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
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

const CreateTeamStudentModal = ({ isShowFlg, onHide, onCreate }) => {
  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Create new student team
          <small className="form-text text-muted">
            Add student team to this capstone semester
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Team name
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Give this team a name..."
                defaultValue=""
              />
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
                This team belong to which department
              </small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Student member
            </Form.Label>
            <Col sm={9}>
              <SelectTagInput placeholder="Enter student fptu mail" isMulti />
              <small className="form-text text-muted">
                First added user will be leader
              </small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Topic assign
            </Form.Label>
            <Col sm={9}>
              <SelectTagInput placeholder="Enter topic name/code" />
              <small className="form-text text-muted">
                Select a topic to assign to this student team
              </small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Private team
            </Form.Label>
            <Col sm={9}>
              <ToggleSwitch name="quick_panel_notifications_2" />
              <small className="form-text text-muted">
                Is this team private
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

export default CreateTeamStudentModal;
