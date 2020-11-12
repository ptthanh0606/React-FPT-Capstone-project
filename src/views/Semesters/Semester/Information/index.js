import React from 'react';
import { Row, Col } from 'react-bootstrap';

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';

import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '_metronic/_helpers';

import { Form } from 'react-bootstrap';

const Infomation = ({ id }) => {
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
              <span className="svg-icon svg-icon-md svg-icon-white mr-3">
                <SVG
                  src={toAbsoluteUrl(
                    '/media/svg/icons/Communication/Write.svg'
                  )}
                />
              </span>
              Save
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  defaultValue="Fall 2020"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Maximum topic per mentor
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Maximum topic per mentor"
                  defaultValue="4"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Maximum mentor per topic
              </Form.Label>
              <Col sm={10}>
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
              <Form.Label column sm={2}>
                Maximum applications per team
              </Form.Label>
              <Col sm={10}>
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
              <span className="svg-icon svg-icon-md svg-icon-white mr-3">
                <SVG
                  src={toAbsoluteUrl(
                    '/media/svg/icons/Communication/Write.svg'
                  )}
                />
              </span>
              Save
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Matching
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  defaultValue="11-11-2011"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                In progress
              </Form.Label>
              <Col sm={10}>
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
              <Form.Label column sm={2}>
                Finished
              </Form.Label>
              <Col sm={10}>
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
