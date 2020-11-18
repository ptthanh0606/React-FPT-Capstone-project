import SelectBox from 'components/SelectBox/SelectBox';
import SelectTagInput from 'components/TagInput/SelectTagInput';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const UpdateStudentModal = ({ isShowFlg, onHide, onCreate, selectedId }) => {
  const [departmentOptions, setDepartmentOptions] = React.useState([]);
  const [currentStudentInfo, setCurrentStudentInfo] = React.useState([]);

  React.useEffect(() => {
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
    setCurrentStudentInfo({
      id: '',
      name: 'Phan Thong Thanh',
      code: 'SE130359',
      email: 'thanhptse130359@fpt.edu.vn',
      department: 'CC',
    });
  }, []);

  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Update student
          <small className="form-text text-muted">
            Change this student detail
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentStudentInfo ? (
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Student full name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Full name..."
                  defaultValue={currentStudentInfo.name}
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
                  defaultValue={currentStudentInfo.code}
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
                  defaultValue={currentStudentInfo.email}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Department
              </Form.Label>
              <Col sm={9}>
                <SelectBox
                  value={currentStudentInfo.department}
                  options={departmentOptions}
                  placeholder="Enter department code"
                />
                <small className="form-text text-muted">
                  Departments for this lecturer
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

export default UpdateStudentModal;
