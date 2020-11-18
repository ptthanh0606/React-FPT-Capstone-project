import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';

const CreateSemesterModal = ({ isShowFlg, onHide, onCreate, selectedId }) => {
  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Create new semester
          <small className="form-text text-muted">
            Add new semester to CMS
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Name
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Name" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Maximum topic per mentor
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                placeholder="Maximum topic per mentor"
              />
              <small className="form-text text-muted">
                Maximun number of topic that a lecturer can supervise
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
                defaultValue="2020-06-13"
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
                defaultValue="11-11-2011"
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
                defaultValue="11-11-2011"
              />
              <small className="form-text text-muted">
                Ending date of Finished-phase (and semester as well), all
                evaluation is published.
              </small>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {}}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateSemesterModal;
