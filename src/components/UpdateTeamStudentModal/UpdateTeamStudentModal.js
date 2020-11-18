import SelectBox from 'components/SelectBox/SelectBox';
import SelectTagInput from 'components/TagInput/SelectTagInput';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const UpdateTeamStudentModal = ({
  isShowFlg,
  onHide,
  onCreate,
  selectedId,
}) => {
  const [currentTeamInfo, setCurrentTeamInfo] = React.useState();
  const [departmentOptions, setDepartmentOptions] = React.useState([]);
  // const [topicOptions, setTopicOptions] = React.useState();
  const [selectedStudentList, setselectedStudentList] = React.useState();

  const handleLoadStudentList = React.useCallback((mentorMail, callback) => {
    setTimeout(() => {
      setselectedStudentList([
        // Load selected student list
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

  const handleOnStudentListSelectChange = React.useCallback(value => {
    setselectedStudentList(value);
  }, []);

  React.useEffect(() => {
    setCurrentTeamInfo({
      id: '',
      name: 'HKT Council',
      department: 'cc',
      studentMembers: [
        {
          id: '',
          mail: 'thanhptse130359@fpt.edu.vn',
        },
        {
          id: '',
          mail: 'duyhdse130000@fpt.edu.vn',
        },
        {
          id: '',
          mail: 'trungttse130001@fpt.edu.vn',
        },
        {
          id: '',
          mail: 'anhttse130002@fpt.edu.vn',
        },
      ],
      selectedTopic: {
        id: '',
        name: '',
      },
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

  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Update student team
          <small className="form-text text-muted">
            Update this student team information
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentTeamInfo ? (
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Team name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Give this team a name..."
                  defaultValue={currentTeamInfo.name}
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
                  value={currentTeamInfo.department}
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
                <SelectTagInput
                  onChange={handleOnStudentListSelectChange}
                  value={selectedStudentList}
                  load={handleLoadStudentList}
                  placeholder="Enter student fptu mail"
                  isMulti
                />
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

export default UpdateTeamStudentModal;
