import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

export const statusClasses = ['danger', 'info', 'success', ''];
export const statusTitles = ['Not in a team', 'Matching', 'Matched', ''];
export const defaultSorted = [{ dataField: 'id', order: 'asc' }];
export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
];

const UpdateActiveStudentModal = ({ isShowFlg, onHide, onAdd, selectedId }) => {
  const [currentStudentTeamCode, setCurrentStudentTeamCode] = React.useState();

  React.useEffect(() => {
    setCurrentStudentTeamCode('CAS1CS');
  }, []);

  const handleAddStudent = () => {
    // Do stuffs?
    onAdd();
  };

  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Available students
          <small className="form-text text-muted">
            Add students to this capstone semester
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Team code
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Team code..."
                defaultValue={currentStudentTeamCode}
              />
              <small className="form-text text-muted">
                Assign this student to team by change team code
              </small>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddStudent}>
          Update selected
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateActiveStudentModal;
