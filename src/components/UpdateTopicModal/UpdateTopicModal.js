import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import CreateableTagInput from 'components/TagInput/CreateableTagInput';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import SelectTagInput from 'components/TagInput/SelectTagInput';
import SelectBox from 'components/SelectBox/SelectBox';

const UpdateTopicModal = ({ isShowFlg, onHide, onCreate, selectedId }) => {
  const [currentTopic, setCurrentTopic] = React.useState(null);
  const [isFromStudentFlg, setIsFromStudentFlg] = React.useState(false);
  const [mentorGroup, setMentorGroup] = React.useState(null);
  const [keywords, setKeywords] = React.useState([]);
  // const [selectedDepartment, setSelectedDepartment] = React.useState(null);
  const [departmentOptions, setDepartmentOptions] = React.useState([]);

  React.useEffect(() => {
    // Axios for get all departments
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

    // Axios for get selected topic with selectedId
    const topicResponse = {
      topicCode: 'Huhuhu',
      name: '',
      description: '',
      note: '',
      minimumMembers: 0,
      maximumMembers: 0,
      department: 'cc',
      isFromStudent: false,
      mentorGroup: [
        {
          id: 1,
          email: 'thanhptse130359@fpt.edu.vn',
        },
      ],
      keywords: ['Lol1', 'Lol2'],
      attachment: '',
    };
    setIsFromStudentFlg(topicResponse.isFromStudent);
    setMentorGroup(topicResponse.mentorGroup);
    setKeywords(topicResponse.keywords);
    setCurrentTopic(topicResponse);
  }, []);

  const handleIsFromStudentChange = React.useCallback(() => {
    setIsFromStudentFlg(!isFromStudentFlg);
  }, [isFromStudentFlg]);

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

  const handleLoadSelectedKeywords = () => {
    setKeywords([
      {
        value: 'capstone',
        label: 'Capstone',
      },
      {
        value: 'management',
        label: 'Management',
      },
      {
        value: 'system',
        label: 'System',
      },
    ]);
  };

  const handleOnMentorSelectChange = React.useCallback(value => {
    setMentorGroup(value);
  }, []);

  const handleOnKeywordChange = React.useCallback(value => {
    console.log(value);
    setKeywords(value);
    // Pending
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
          Update selected topics
          <small className="form-text text-muted">
            Change this topic information
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentTopic ? (
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Topic code
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Topic code"
                  defaultValue={currentTopic.topicCode}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  defaultValue={currentTopic.name}
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
                  placeholder="Topic description..."
                  defaultValue={currentTopic.description}
                />
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
                <Form.Control
                  type="text"
                  placeholder="Note..."
                  defaultValue={currentTopic.note}
                />
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
                  defaultValue={currentTopic.minimumMembers}
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
                  defaultValue={currentTopic.maximumMembers}
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
                  value={currentTopic.department}
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
                <ToggleSwitch
                  onChange={handleIsFromStudentChange}
                  isActive={isFromStudentFlg}
                />
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
                <SelectTagInput
                  load={handleLoadMentorList}
                  onChange={handleOnMentorSelectChange}
                  placeholder="Enter lecturer email"
                  value={mentorGroup}
                  isMulti
                />
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
                <CreateableTagInput
                  onChange={handleOnKeywordChange}
                  load={handleLoadSelectedKeywords}
                  value={keywords}
                />
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

export default UpdateTopicModal;
