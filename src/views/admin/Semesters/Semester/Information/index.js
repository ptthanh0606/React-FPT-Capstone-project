import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';

import { Form } from 'react-bootstrap';

const Infomation = () => {
  const setMeta = useSetRecoilState(metaAtom);
  const { id } = useParams();

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Information of Fall 2020',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'Fall 2020', path: '/semester/' + id },
        { title: 'Information', path: '/semester/' + id + '/information' },
      ],
    }));
  }, [setMeta, id]);

  return (
    <>
      <Card>
        <CardHeader title="Basic informations">
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary font-weight-bold"
              // onClick={}
            >
              <i className="fas fa-save mr-2"></i>
              Save
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
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
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="formHorizontalEmail"
              style={{ marginBottom: 0 }}
            >
              <Form.Label column sm={3}>
                Maximum applications per team
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="number"
                  placeholder="Maximum applications per team"
                  defaultValue="3"
                />
              </Col>
            </Form.Group>
          </Form>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Phases">
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary font-weight-bold"
              // onClick={}
            >
              <i className="fas fa-save mr-2"></i>
              Save
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Form>
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
              </Col>
            </Form.Group>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default Infomation;
