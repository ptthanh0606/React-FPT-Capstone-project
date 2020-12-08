import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import request from 'utils/request';
import * as endpoints from 'endpoints';
import { handleErrors } from 'utils/common';
import { Row, Col, Form } from 'react-bootstrap';
import Card from 'components/Card';
import Button from 'components/Button';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import metaAtom from 'store/meta';

import * as transformers from 'modules/semester/topic/transformers';

import MarkdownIt from 'markdown-it';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import SelectTagInput from 'components/TagInput/SelectTagInput';

import { mDown as mDownDep } from 'modules/department/transformers';
import { mDown as mDownTeam } from 'modules/semester/team/transformers';
import { mDown as mDownLec } from 'modules/lecturer/transformers';
import { useSetRecoilState } from 'recoil';

const mdParser = new MarkdownIt();

const Topic = ({ semester }) => {
  const { id: semId, topicId } = useParams();
  const history = useHistory();
  const setMeta = useSetRecoilState(metaAtom);

  const [data, setData] = React.useReducer((state, action) => {
    return {
      ...state,
      [action.name]: action.value,
    };
  }, {});

  const handleChangeField = React.useCallback(e => {
    setData({
      name: e.currentTarget.getAttribute('data-name'),
      value: e.currentTarget.value,
    });
  }, []);

  const handleDescriptionChange = React.useCallback(event => {
    setData({
      name: 'description',
      value: event.text,
    });
  }, []);

  React.useEffect(() => {
    console.log(semId, topicId);
    request({
      to: endpoints.READ_TOPIC(topicId).url,
      method: endpoints.READ_TOPIC(topicId).method,
    })
      .then(res => {
        const d = transformers.downRead(res?.data?.data);
        setData({
          name: 'name',
          value: d.name,
        });
        setData({
          name: 'code',
          value: d.code,
        });
        setData({
          name: 'abstract',
          value: d.abstract,
        });
        setData({
          name: 'description',
          value: d.description,
        });
        setData({
          name: 'department',
          value: d.department,
        });
        setData({
          name: 'note',
          value: d.note,
        });
        setData({
          name: 'minMembers',
          value: d.minMembers,
        });
        setData({
          name: 'maxMembers',
          value: d.maxMembers,
        });
        setData({
          name: 'isByStudent',
          value: d.isByStudent,
        });
        setData({
          name: 'abstract',
          value: d.abstract,
        });
        setData({
          name: 'submitter',
          value: d.submitter,
        });
        setData({
          name: 'keyword',
          value: d.keyword,
        });
        setData({
          name: 'attachment',
          value: d.attachment,
        });
      })
      .catch(err => {
        handleErrors(err);
        history.go(-1);
      });
  }, [history, semId, topicId]);

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Topic ' + data?.name,
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: semester.name, path: '/semester/' + semId },
        { title: 'Topic', path: '/semester/' + semId + '/topic' },
        { title: data?.code, path: '/semester/' + semId + '/topic/' + topicId },
      ],
    }));
  }, [setMeta, semId, semester.name, data.name, data.code, topicId]);

  return (
    <>
      <Row>
        <Col lg={12}>
          <Card
            title="Information of topic"
            toolbar={
              <>
                <Button variant="danger" className="mr-2" size="sm">
                  <i
                    className="fas fa-trash mr-1"
                    style={{ fontSize: '1rem' }}
                  ></i>
                  Delete topic
                </Button>
                <Button size="sm">
                  <i
                    className="fas fa-save mr-1"
                    style={{ fontSize: '1rem' }}
                  ></i>
                  Save
                </Button>
              </>
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Department
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  readOnly
                  className="form-control form-control-md form-control-solid"
                  value={data?.department?.fullName}
                />
                <small className="form-text text-muted">hahah</small>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Code
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  className="form-control form-control-md form-control-solid"
                  value={data.code}
                  data-name="code"
                  onChange={handleChangeField}
                />
                <small className="form-text text-muted">hahah</small>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  className="form-control form-control-md form-control-solid"
                  value={data.name}
                  data-name="name"
                  onChange={handleChangeField}
                />
                <small className="form-text text-muted">hahah</small>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Abstract
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  className="form-control form-control-md form-control-solid"
                  value={data.abstract}
                  data-name="abstract"
                  onChange={handleChangeField}
                />
                <small className="form-text text-muted">hahah</small>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Description
              </Form.Label>
              <Col sm={9}>
                <MdEditor
                  style={{ height: '200px' }}
                  value={data.description}
                  renderHTML={text => mdParser.render(text)}
                  data-name="description"
                  onChange={handleDescriptionChange}
                />
                <small className="form-text text-muted">hahah</small>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Note
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  className="form-control form-control-md form-control-solid"
                  value={data.note}
                  data-name="note"
                  onChange={handleChangeField}
                />
                <small className="form-text text-muted">hahah</small>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Note
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  className="form-control form-control-md form-control-solid"
                  value={data.note}
                  data-name="note"
                  onChange={handleChangeField}
                />
                <small className="form-text text-muted">hahah</small>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Minimum members
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="number"
                  className="form-control form-control-md form-control-solid"
                  value={data.minMembers}
                  data-name="minMembers"
                  onChange={handleChangeField}
                />
                <small className="form-text text-muted">hahah</small>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Maximum members
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="number"
                  className="form-control form-control-md form-control-solid"
                  value={data.maxMembers}
                  data-name="maxMembers"
                  onChange={handleChangeField}
                />
                <small className="form-text text-muted">hahah</small>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Submit by student?
              </Form.Label>
              <Col sm={9}>
                <ToggleSwitch
                  onChange={event =>
                    setData({
                      value: event.currentTarget.checked,
                      name: 'isByStudent',
                    })
                  }
                  isActive={data.isByStudent}
                />
                <small className="form-text text-muted">hahah</small>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Keywords
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  className="form-control form-control-md form-control-solid"
                  value={data.keywords}
                  data-name="keywords"
                  onChange={handleChangeField}
                />
                <small className="form-text text-muted">hahah</small>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Submitter
              </Form.Label>
              <Col sm={9}>
                <SelectTagInput
                  onChange={value => setData({ value, name: 'submitter' })}
                  load={(input, callback) => {
                    request({
                      to: endpoints.LIST_LECTURER.url,
                      method: endpoints.LIST_LECTURER.method,
                      params: {
                        term: input,
                        pageSize: 10,
                      },
                    })
                      .then(res => {
                        callback(res.data.data?.map(mDownLec) || []);
                      })
                      .catch(() => callback([]));
                  }}
                  value={data.submitter}
                />
                <small className="form-text text-muted">hahah</small>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Attachment
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  className="form-control form-control-md form-control-solid"
                  value={data.attachment}
                  data-name="attachment"
                  onChange={handleChangeField}
                />
                <small className="form-text text-muted">hahah</small>
              </Col>
            </Form.Group>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Card title="Team" />
        </Col>
        <Col lg={6}>
          <Card title="Mentors" />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Card
            title="Feedbacks"
            toolbar={
              <>
                <Button variant="danger" className="mr-2" size="sm">
                  <i
                    className="fas fa-thumbs-up mr-1"
                    style={{ fontSize: '1rem' }}
                  ></i>
                  Reject
                </Button>
                <Button variant="success" size="sm">
                  <i
                    className="fas fa-thumbs-down mr-1"
                    style={{ fontSize: '1rem' }}
                  ></i>
                  Approve
                </Button>
              </>
            }
          />
        </Col>
        <Col lg={6}>
          <Card title="Application" />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Card
            title="Checkpoints"
            toolbar={
              <>
                <Button>
                  <i className="fas fa-trash mr-2"></i>Save
                </Button>
              </>
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default Topic;
