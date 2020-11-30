import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import { handleErrors } from 'utils/common';

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';

import { Form } from 'react-bootstrap';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { convertDateDown, convertDateUp } from './transformers';
import toast from 'utils/toast';
import { down } from './transformers';

const Information = ({ loadData = function () {} }) => {
  const [semesterName, setSemesterName] = React.useState('');
  const [maxApplication, setMaxApplication] = React.useState('');
  const [matchingDate, setMatchingDate] = React.useState('');
  const [inprogressDate, setInprogressDate] = React.useState('');
  const [finishedDate, setFinishedDate] = React.useState('');

  const setMeta = useSetRecoilState(metaAtom);
  const { id } = useParams();

  React.useEffect(() => {
    request({
      to: endpoints.READ_SEMESTER(id).url,
      method: endpoints.READ_SEMESTER(id).method,
    })
      .then(({ data: { data } }) => {
        console.log(down(data));
        setSemesterName(data?.name);
        setMaxApplication(data?.maxTopicApplication);
        setMatchingDate(convertDateDown(data?.assigningDate));
        setInprogressDate(convertDateDown(data?.inProgressDate));
        setFinishedDate(convertDateDown(data?.finishedDate));
      })
      .catch(handleErrors)
      .finally();
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

  const handleSave = React.useCallback(() => {
    const payload = {
      name: semesterName,
      assigningDate: convertDateUp(matchingDate),
      inProgressDate: convertDateUp(inprogressDate),
      finishedDate: convertDateUp(finishedDate),
      maxTopicApplication: maxApplication,
    };
    request({
      to: endpoints.UPDATE_SEMESTER(id).url,
      method: endpoints.UPDATE_SEMESTER(id).method,
      data: payload,
    })
      .then(res => {
        toast.success('Update successfully!');
        loadData();
      })
      .catch(handleErrors)
      .finally();
  }, [
    finishedDate,
    id,
    inprogressDate,
    loadData,
    matchingDate,
    maxApplication,
    semesterName,
  ]);

  return (
    <>
      <Card>
        <CardHeader title="Basic informations">
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary font-weight-bold"
              onClick={handleSave}
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
                  onChange={e => setSemesterName(e.currentTarget.value)}
                  defaultValue={semesterName}
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
                  onChange={e => setMaxApplication(e.currentTarget.value)}
                  defaultValue={maxApplication}
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
              onClick={handleSave}
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
                  type="datetime-local"
                  placeholder="Date"
                  onChange={e =>
                    setMatchingDate(convertDateDown(e.currentTarget.value))
                  }
                  value={matchingDate && convertDateUp(matchingDate)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                In progress
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="datetime-local"
                  placeholder="Date"
                  onChange={e =>
                    setInprogressDate(convertDateDown(e.currentTarget.value))
                  }
                  value={inprogressDate && convertDateUp(inprogressDate)}
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
                  type="datetime-local"
                  placeholder="Date"
                  onChange={e =>
                    setFinishedDate(convertDateDown(e.currentTarget.value))
                  }
                  value={finishedDate && convertDateUp(finishedDate)}
                />
              </Col>
            </Form.Group>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default React.memo(Information);
