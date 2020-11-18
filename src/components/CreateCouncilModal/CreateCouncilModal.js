import SelectBox from 'components/SelectBox/SelectBox';
import SelectTagInput from 'components/TagInput/SelectTagInput';
import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const CreateCouncilModal = ({ isShowFlg, onHide, onCreate }) => {
  const [departmentOptions, setDepartmentOptions] = React.useState([]);
  const [mentorGroup, setMentorGroup] = React.useState();

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
  }, []);

  const handleLoadMentorList = React.useCallback((mentorMail, callback) => {
    setTimeout(() => {
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
          Create new council
          <small className="form-text text-muted">
            Assign councils to this semester
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Council name
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Give this department a name..."
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

export default CreateCouncilModal;
