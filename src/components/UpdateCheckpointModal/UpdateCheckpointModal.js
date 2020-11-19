import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import SelectBox from 'components/SelectBox/SelectBox';

const UpdateCheckpointModal = ({ isShowFlg, onHide, selectedId }) => {
  const [currentCheckpoint, setCurrentCheckpoint] = React.useState(null);
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

    // Axios for get checkpoint data using selectedId
    setCurrentCheckpoint({
      name: 'Check point 1',
      description: 'Lorem ipsum dolor hihi',
      weight: '40',
      dueDate: '2020-12-06',
      marginPass: '10',
      marginFail: '0',
      attachment: '',
      department: 'cc',
    });
  }, []);

  const onDepartmentSelectBoxChange = React.useCallback(value => {
    setSelectedDepartment(value);
  }, []);

  const handleUpdateCheckpoint = React.useCallback(() => {
    // Axios for update checkpoint with selectedId
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
          Update checkpoint
          <small className="form-text text-muted">
            Change this checkpoint info
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentCheckpoint ? (
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
                  defaultValue={currentCheckpoint.name}
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
                  defaultValue={currentCheckpoint.description}
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
                  defaultValue={currentCheckpoint.weight}
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
                  defaultValue={currentCheckpoint.dueDate}
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
                  defaultValue={currentCheckpoint.marginPass}
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
                  defaultValue={currentCheckpoint.marginFail}
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
                  value={currentCheckpoint.department}
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
        ) : (
          <span>Error</span>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateCheckpoint}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateCheckpointModal;
