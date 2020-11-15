import React from 'react';
import { Link } from 'react-router-dom';

import { Modal, Form, Row, Col, Button } from 'react-bootstrap';

import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';

import SemesterCard from './SemesterCard';
import ScrollContainer from 'react-indiana-drag-scroll';
import styles from './NearestSemester.module.scss';

const semesters = [
  {
    title: 'Fall 2021',
    id: 1,
    status: 'Preparing',
    color: 'danger',
  },
  {
    title: 'Summer 2021',
    id: 2,
    status: 'Preparing',
    color: 'warning',
  },
  {
    title: 'Spring 2021',
    id: 3,
    status: 'In progress',
    color: 'success',
  },
  {
    title: 'Fall 2020',
    id: 3,
    status: 'Finished',
    color: 'primary',
  },
  {
    title: 'Summer 2020',
    id: 3,
    status: 'Finished',
    color: 'info',
  },
];

export default React.memo(function DashboardPage() {
  const setMeta = useSetRecoilState(metaAtom);
  const [showedNewModal, setShowedNewModal] = React.useState(false);

  const hideNewModal = React.useCallback(() => {
    setShowedNewModal(false);
  });

  const showNewModal = React.useCallback(() => {
    setShowedNewModal(true);
  });

  React.useEffect(() => {
    setMeta({
      title: 'Nearest semesters',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'Nearest semesters', path: '/semester/nearest' },
      ],
      toolbar: (
        <button
          type="button"
          className="btn btn-primary font-weight-bold btn-sm"
          onClick={showNewModal}
        >
          <i class="fas fa-plus mr-2"></i>
          New
        </button>
      ),
    });
  }, [setMeta, showNewModal]);

  return (
    <>
      <ScrollContainer
        className={styles['semester-scroll'] + ' alert-shadow gutter-b'}
      >
        {semesters.map(s => (
          <SemesterCard {...s} key={s.title} />
        ))}
      </ScrollContainer>
      <div className={styles['nav-box']}>
        <Link to="/semester/all">View all semesters</Link>
      </div>
      <Modal
        size="xl"
        show={showedNewModal}
        onHide={hideNewModal}
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
                <Form.Control
                  type="text"
                  placeholder="Name"
                  defaultValue="Fall 2020"
                />
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
                  defaultValue="4"
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
                  defaultValue="3"
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
                  defaultValue="3"
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
                  defaultValue="11-11-2011"
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
          <Button variant="secondary" onClick={hideNewModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {}}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});
