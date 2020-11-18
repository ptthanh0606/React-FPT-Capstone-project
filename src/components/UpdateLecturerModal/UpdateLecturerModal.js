import SelectTagInput from 'components/TagInput/SelectTagInput';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const UpdateLecturerModal = ({ isShowFlg, onHide, onCreate, selectedId }) => {
  const [currentLecturer, setCurrentLecturer] = React.useState();
  const [departmentOptions, setDepartmentOptions] = React.useState([]);
  const [isActiveFlg, setIsActiveFlg] = React.useState(false);

  const handleLoadDepartmentList = React.useCallback(
    (departmentCode, callback) => {
      setTimeout(() => {
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
        // get departments in DB
        callback([
          {
            label: 'KO',
            value: 'ko',
          },
          {
            label: 'DD',
            value: 'dd',
          },
          {
            label: 'FF',
            value: 'ff',
          },
        ]);
      }, 2000);
    },
    []
  );

  React.useEffect(() => {
    setCurrentLecturer({
      id: '',
      name: 'Phan Thong Thanh',
      email: 'thanhptse130359@fpt.edu.vn',
      department: [
        {
          id: '',
          name: '',
        },
        {
          id: '',
          name: '',
        },
      ],
      isActive: false,
    });
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

  React.useEffect(() => {
    setIsActiveFlg(currentLecturer && currentLecturer.isActive);
  }, [currentLecturer]);

  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Update lecturer
          <small className="form-text text-muted">
            Change this lecturer info
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentLecturer ? (
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Lecturer full name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Full name..."
                  defaultValue={currentLecturer.name}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Lecturer email
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter lecturer .fpt.edu.vn email"
                  defaultValue={currentLecturer.email}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Department
              </Form.Label>
              <Col sm={9}>
                <SelectTagInput
                  value={departmentOptions}
                  load={handleLoadDepartmentList}
                  onChange={value => setDepartmentOptions(value)}
                  placeholder="Enter department code"
                  isMulti
                />
                <small className="form-text text-muted">
                  Departments for this lecturer
                </small>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Active
              </Form.Label>
              <Col sm={9}>
                <ToggleSwitch
                  isActive={isActiveFlg}
                  onChange={e => setIsActiveFlg(e.currentTarget.checked)}
                />
                <small className="form-text text-muted">
                  Is this lecturer active for this semester
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
        <Button variant="primary" onClick={onCreate}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateLecturerModal;
