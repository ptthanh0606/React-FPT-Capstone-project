import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import { handleErrors } from 'utils/common';

// import {
//   Card,
//   CardBody,
//   CardHeader,
//   CardHeaderToolbar,
// } from '_metronic/_partials/controls';
import Card from 'components/Card';

import { Form } from 'react-bootstrap';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import toast from 'utils/toast';
import { down, up } from '../../../../../modules/semester/transformers';
import Button from 'components/Button';

const Information = ({ loadData = function () {} }) => {
  const [name, setName] = React.useState('');
  const [maxApplication, setMaxApplication] = React.useState('');
  const [matchingDate, setMatchingDate] = React.useState('');
  const [inprogressDate, setInprogressDate] = React.useState('');
  const [finishedDate, setFinishedDate] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const setMeta = useSetRecoilState(metaAtom);
  const { id } = useParams();

  React.useEffect(() => {
    setIsLoading(true);
    request({
      to: endpoints.READ_SEMESTER(id).url,
      method: endpoints.READ_SEMESTER(id).method,
    })
      .then(({ data: { data } }) => {
        const downData = down(data);
        setName(downData?.name);
        setMaxApplication(downData?.maxApplication);
        setMatchingDate(downData?.matchingDate);
        setInprogressDate(downData?.inprogressDate);
        setFinishedDate(downData?.finishedDate);

        setMeta(meta => ({
          ...meta,
          title: 'Information of ' + downData?.name,
          breadcrumb: [
            { title: 'Semester', path: '/semester' },
            { title: downData?.name, path: '/semester/' + id },
            { title: 'Information', path: '/semester/' + id + '/information' },
          ],
        }));

        setIsLoading(false);
      })
      .catch(handleErrors)
      .finally();
  }, [setMeta, id]);

  const handleSave = React.useCallback(() => {
    setIsLoading(true);
    request({
      to: endpoints.UPDATE_SEMESTER(id).url,
      method: endpoints.UPDATE_SEMESTER(id).method,
      data: up({
        name,
        maxApplication,
        matchingDate,
        inprogressDate,
        finishedDate,
      }),
    })
      .then(res => {
        toast.success('Update successfully!');
        loadData();
      })
      .catch(handleErrors)
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    finishedDate,
    id,
    inprogressDate,
    loadData,
    matchingDate,
    maxApplication,
    name,
  ]);

  return (
    <>
      <Card
        title="Basic information"
        isLoading={isLoading}
        toolbar={
          <Button
            type="button"
            className="btn btn-primary font-weight-bold"
            onClick={handleSave}
            isLoading={isLoading}
          >
            <i className="fas fa-save mr-2"></i>
            Save
          </Button>
        }
      >
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Name
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                className="form-control form-control-md form-control-solid"
                type="text"
                placeholder="Name"
                onChange={e => setName(e.currentTarget.value)}
                value={name}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Maximum applications per team
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                className="form-control form-control-md form-control-solid"
                type="number"
                placeholder="Maximum applications per team"
                onChange={e => setMaxApplication(e.currentTarget.value)}
                value={maxApplication}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Matching
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                className="form-control form-control-md form-control-solid"
                type="datetime-local"
                onChange={e => setMatchingDate(e.currentTarget.value)}
                value={matchingDate}
                step={3600}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              In progress
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                className="form-control form-control-md form-control-solid"
                type="datetime-local"
                onChange={e => setInprogressDate(e.currentTarget.value)}
                value={inprogressDate}
                step={3600}
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
                className="form-control form-control-md form-control-solid"
                type="datetime-local"
                onChange={e => setFinishedDate(e.currentTarget.value)}
                value={finishedDate}
                step={3600}
              />
            </Col>
          </Form.Group>
        </Form>
      </Card>
    </>
  );
};

export default React.memo(Information);
