import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import SelectBox from 'components/SelectBox/SelectBox';

const CreateCheckpointModal = ({ isShowFlg, onHide }) => {
  const [checkpointName, setCheckpointName] = React.useState('');
  const [checkpointDescription, setCheckpointDescription] = React.useState('');
  const [checkpointWeight, setCheckpointWeight] = React.useState(0);
  const [checkpointDueDate, setCheckpointDueDate] = React.useState(
    '0000/00/00'
  );
  const [checkpointMarginPass, setCheckpointMarginPass] = React.useState(0);
  const [checkpointMarginFail, setCheckpointMarginFail] = React.useState(0);
  const [checkpointAttachment, setCheckpointAttachment] = React.useState('');
  const [selectedDepartment, setSelectedDepartment] = React.useState(null);
  const [departmentOptions, setDepartmentOptions] = React.useState([]);

  React.useEffect(() => {
    // Axios for get department options
    setDepartmentOptions([
      {
        label: 'SE',
        value: 'se',
      },
      {
        label: 'GD',
        value: 'gd',
      },
      {
        label: 'CC',
        value: 'cc',
      },
    ]);
  }, []);

  const onDepartmentSelectBoxChange = React.useCallback(value => {
    setSelectedDepartment(value);
  }, []);

  const handleCreateCheckpoint = React.useCallback(() => {
    // Axios for create checkpoint
    const payload = {
      name: checkpointName,
      description: checkpointDescription,
      weight: checkpointWeight,
      dueDate: checkpointDueDate,
      marginPass: checkpointMarginPass,
      marginFail: checkpointMarginFail,
      department: selectedDepartment,
      attachment: checkpointAttachment,
    };
  }, [
    checkpointAttachment,
    checkpointDescription,
    checkpointDueDate,
    checkpointMarginFail,
    checkpointMarginPass,
    checkpointName,
    checkpointWeight,
    selectedDepartment,
  ]);

  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Create checkpoint
          <small className="form-text text-muted">
            Add this checkpoint to this semester
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
                onChange={e => setCheckpointName(e.target.value)}
                placeholder="Give this topic a name..."
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Description
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                onChange={e => setCheckpointDescription(e.target.value)}
                placeholder="Name"
              />
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
              <Form.Control
                type="number"
                onChange={e => setCheckpointWeight(e.target.value)}
                placeholder="A valid number"
              />
              <small className="form-text text-muted">Enter 30 for 30%</small>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Due date
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                onChange={e => setCheckpointDueDate(e.target.value)}
                placeholder=""
              />
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
                onChange={e => setCheckpointMarginPass(e.target.value)}
                placeholder="Maximum team member..."
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
                onChange={e => setCheckpointMarginFail(e.target.value)}
                placeholder="Maximum team member..."
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
                onChange={onDepartmentSelectBoxChange}
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
        <Button variant="primary" onClick={handleCreateCheckpoint}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCheckpointModal;
