import SelectBox from 'components/SelectBox/SelectBox';
import SelectTagInput from 'components/TagInput/SelectTagInput';
import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const UpdateCouncilModal = ({ isShowFlg, onHide, onCreate }) => {
  const [currentCouncilInfo, setCurrentCouncilInfo] = React.useState();
  const [departmentOptions, setDepartmentOptions] = React.useState([]);
  const [mentorGroup, setMentorGroup] = React.useState();

  React.useEffect(() => {
    setCurrentCouncilInfo({
      id: '',
      name: 'HKT Council',
      councilMembers: [
        {
          id: '',
          mail: 'thanhptse130359@fpt.edu.vn',
          name: 'Phan Thong Thanh',
        },
      ],
      department: 'cc',
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
  }, [setCurrentCouncilInfo]);

  const handleLoadMentorList = React.useCallback((mentorMail, callback) => {
    setTimeout(() => {
      setMentorGroup([
        // Load selected lecturer
        {
          value: 'thanhptse130359@fpt.edu.vn',
          label: 'thanhptse130359@fpt.edu.vn',
        },
        {
          value: 'duyhdse130000@fpt.edu.vn',
          label: 'duyhdse130000@fpt.edu.vn',
        },
        {
          value: 'trungttse130001@fpt.edu.vn',
          label: 'trungttse130001@fpt.edu.vn',
        },
        {
          value: 'anhttse130002@fpt.edu.vn',
          label: 'anhttse130002@fpt.edu.vn',
        },
      ]);
      callback([
        // Load all lecturer in DB
        {
          value: 'haidnse130123@fpt.edu.vn',
          label: 'haidnse130123@fpt.edu.vn',
        },
        {
          value: 'thuanntmse130124@fpt.edu.vn',
          label: 'thuanntmse130124@fpt.edu.vn',
        },
        {
          value: 'dungnh130125@fpt.edu.vn',
          label: 'dungnh130125@fpt.edu.vn',
        },
        {
          value: 'nganlhse130126@fpt.edu.vn',
          label: 'nganlhse130126@fpt.edu.vn',
        },
      ]);
    }, 2000);
  }, []);

  const handleOnMentorSelectChange = React.useCallback(value => {
    setMentorGroup(value);
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
          Update council
          <small className="form-text text-muted">
            Update this council information
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentCouncilInfo ? (
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Council name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Give this department a name..."
                  defaultValue={currentCouncilInfo.name}
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
                  value={currentCouncilInfo.department}
                />
                <small className="form-text text-muted">
                  This council belong to which department
                </small>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Council member
              </Form.Label>
              <Col sm={9}>
                <SelectTagInput
                  placeholder="Enter user/lecturer fptu mail"
                  load={handleLoadMentorList}
                  onChange={handleOnMentorSelectChange}
                  value={mentorGroup}
                  isMulti
                />
                <small className="form-text text-muted">
                  First added user will be leader
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
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateCouncilModal;
