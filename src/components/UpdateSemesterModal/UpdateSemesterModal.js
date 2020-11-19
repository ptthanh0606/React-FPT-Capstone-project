import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';

const UpdateSemesterModal = ({ isShowFlg, onHide, onCreate, selectedId }) => {
  const [currentSemester, setCurrentSemester] = React.useState();
  const [currentSemesterPhases, setCurrentSemesterPhases] = React.useState();

  React.useEffect(() => {
    setCurrentSemester({
      id: '',
      name: 'Fall 2020',
      maxMentor: 10,
      minMentor: 0,
      applicationsPerTeam: 0,
    });
    setCurrentSemesterPhases({
      id: '',
      matchPhase: '2020-06-06',
      inProgressPhase: '2020-06-06',
      finishedPhase: '2020-06-06',
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
          Update semester
          <small className="form-text text-muted">
            Change this semester info
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {currentSemester ? (
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  defaultValue={currentSemester.name}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Minimum topic per mentor
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="number"
                  placeholder="Minimum topic per mentor"
                  defaultValue={currentSemester.minMentor}
                />
                <small className="form-text text-muted">
                  Minimum number of topic that a lecturer can supervise
                </small>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Maximum mentor per topic
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="number"
                  placeholder="Maximum mentor per topic"
                  defaultValue={currentSemester.maxMentor}
                />
                <small className="form-text text-muted">
                  Maximum number of lecturer to supervise a topic
                </small>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Maximum applications per team
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="number"
                  placeholder="Maximum applications per team"
                  defaultValue={currentSemester.applicationsPerTeam}
                />
                <small className="form-text text-muted">
                  Maximum number of application that a team can send at any-time
                </small>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Matching
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  defaultValue={currentSemesterPhases.matchPhase}
                />
                <small className="form-text text-muted">
                  Ending date of Matching-phase, all team must matched with a
                  topic before this day
                </small>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                In progress
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  defaultValue={currentSemesterPhases.inProgressPhase}
                />
                <small className="form-text text-muted">
                  Ending date of In-progress-phase, all team must have done the
                  capstone project and waiting for final evaluation
                </small>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formHorizontalEmail"
              style={{ marginBottom: 0 }}
            >
              <Form.Label column sm={3}>
                Finished
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  defaultValue={currentSemesterPhases.finishedPhase}
                />
                <small className="form-text text-muted">
                  Ending date of Finished-phase (and semester as well), all
                  evaluation is published.
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
        <Button variant="primary" onClick={() => {}}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateSemesterModal;
