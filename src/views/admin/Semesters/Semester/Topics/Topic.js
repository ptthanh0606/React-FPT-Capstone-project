import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import request from 'utils/request';
import * as endpoints from 'endpoints';
import { handleErrors } from 'utils/common';
import { Row, Col, Form, Card, Accordion, InputGroup } from 'react-bootstrap';
import CMSCard from 'components/Card';
import Button from 'components/Button';
import MdEditor from 'react-markdown-editor-lite';
import metaAtom from 'store/meta';
import Datasheet from 'react-datasheet';
import './Topic.scss';

import * as transformers from 'modules/semester/topic/transformers';
import * as constantsCp from 'modules/semester/topic/checkpoints/constants';

import MarkdownIt from 'markdown-it';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import SelectTagInput from 'components/TagInput/SelectTagInput';

import {
  mDown as mDownTeam,
  down as downTeam,
} from 'modules/semester/team/transformers';
import { mDown as mDownLec } from 'modules/lecturer/transformers';
import { useSetRecoilState } from 'recoil';
import Member from 'views/user/Teams/Team/Member';
import Comment from 'components/CMSWidgets/FeedbackSection/Comment';
import * as constants from 'modules/semester/topic/constants';
import * as constantsA from 'modules/semester/team/application/constants';
import * as appTransformers from 'modules/semester/team/application/transformers';
import useConfirm from 'utils/confirm';
import toast from 'utils/toast';

const mdParser = new MarkdownIt();

function transformToGrid(data) {
  const final = [];
  const header = [
    { value: '', readOnly: true, colSpan: 4 },
    ...data.students.map(i => ({
      value: '[' + i.code + '] ' + i.name,
      readOnly: true,
      colSpan: 2,
      id: i.id,
      className: 'text-nowrap',
    })),
    { value: 'Team', readOnly: true },
  ];

  for (const z of data.checkpoints) {
    // z = current checkpoints
    const grid = [header];

    for (const i of z.markColumns) {
      // i = current column

      const firstEvaluator = z.council.members[0] || {
        id: -1,
        code: '',
        weight: '',
      };
      const evaluatorNum = z.council.members.length || 1;
      const toPush = [
        {
          value: i.name,
          readOnly: true,
          rowSpan: evaluatorNum,
          width: '400px',
        },
        {
          value: i.weight,
          readOnly: true,
          rowSpan: evaluatorNum,
        },
        { value: firstEvaluator?.code, readOnly: true },
        { value: firstEvaluator?.weight, readOnly: true },
      ];

      for (const j of data.students) {
        // j = current student
        toPush.push(
          {
            value: i.marks
              ?.find(e => e.studentId === j.id)
              ?.lecturers?.find(e => e.id === firstEvaluator?.id)?.value,
            studentId: j.id,
            lecturerId: firstEvaluator?.id,
            markColumnId: i.id,
            evaluationId: z.evaluationId,
          },
          {
            value: i.marks?.find(e => e.studentId === j.id)?.totalColumnStudent,
            rowSpan: evaluatorNum,
            readOnly: true,
          }
        );
      }

      toPush.push({
        value: i.totalColumnTeam,
        rowSpan: evaluatorNum,
        readOnly: true,
      });

      grid.push(toPush);

      for (const k of z.council.members.slice(1)) {
        // k: current council members
        grid.push([
          { value: k.code, readOnly: true },
          { value: k.weight, readOnly: true },
          ...data.students.map(x => ({
            value: i.marks
              ?.find(t => t.studentId === x.id)
              ?.lecturers?.find(t => t.id === k.id)?.value,
            studentId: x.id,
            lecturerId: k.id,
            markColumnId: i.id,
            evaluationId: z.evaluationId,
          })),
        ]);
      }
    }

    grid.push([
      { value: 'Total', colSpan: 4, readOnly: true },
      ...data.students?.map(x => ({
        value: z?.totalCheckpointStudent?.find(y => y.studentId === x.id)
          ?.value,
        colSpan: 2,
        readOnly: true,
      })),
      { value: z.totalTeam, readOnly: true },
    ]);

    final.push({
      id: z.id,
      name: z.name,
      weight: z.weight,
      submitDueDate: z.submitDueDate,
      evaluateDueDate: z.evaluateDueDate,
      council: z.council,
      status: z.status,
      grid,
    });
  }

  return final;
}

function transformToData(data) {
  const marks = [];
  for (const k of data) {
    for (const i of k.grid) {
      for (const j of i) {
        if (j.readOnly !== true && j.value !== undefined && j.value !== null)
          marks.push(j);
      }
    }
  }
  return marks;
}

const Topic = ({ semester }) => {
  const { id: semId, topicId } = useParams();
  const history = useHistory();
  const setMeta = useSetRecoilState(metaAtom);
  const [l, loadData] = React.useReducer(() => ({}), {});
  const [l2, loadData2] = React.useReducer(() => ({}), {});
  const confirm = useConfirm();
  const [evals, setEvals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [data, setData] = React.useReducer((state, action) => {
    if (action.name === 'all') return { ...state, ...action.value };
    return {
      ...state,
      [action.name]: action.value,
    };
  }, {});

  const fileRef = React.useRef(null);
  const handleClickFile = React.useCallback(e => {
    e.preventDefault();
    fileRef.current.click();
  }, []);

  const handleFileChange = React.useCallback(event => {
    event.preventDefault();
    setData({
      value: event.currentTarget.files[0],
      name: 'attachment',
    });
  }, []);

  const [teamMembers, setTeamMembers] = React.useState([]);

  const handleReject = React.useCallback(
    e => {
      e.preventDefault();
      if (semester.status === 3) {
        toast.warn('Semester is finished, cannot make any further changes.');
        return;
      }
      request({
        to: endpoints.REJECT_TOPIC(topicId).url,
        method: endpoints.REJECT_TOPIC(topicId).method,
      })
        .then(() => {
          loadData();
        })
        .catch(handleErrors);
    },
    [semester.status, topicId]
  );

  const handleApprove = React.useCallback(
    e => {
      e.preventDefault();
      if (semester.status === 3) {
        toast.warn('Semester is finished, cannot make any further changes.');
        return;
      }
      request({
        to: endpoints.APPROVE_TOPIC(topicId).url,
        method: endpoints.APPROVE_TOPIC(topicId).method,
      })
        .then(() => {
          loadData();
        })
        .catch(handleErrors);
    },
    [semester.status, topicId]
  );

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

  const handleUpdate = React.useCallback(
    e => {
      e.preventDefault();
      if (semester.status === 3) {
        toast.warn('Semester is finished, cannot make any further changes.');
        return;
      }
      const data2 = {
        ...transformers.up(data),
        semesterId: Number(semId),
      };

      const formData = new FormData();

      for (const i of Object.keys(data2)) {
        if (!data2?.[i]) continue;
        if (data2[i]?.constructor?.name !== 'File') {
          formData.append(i, data2[i]);
        } else {
          formData.append(i, data2[i], data2[i].name);
        }
      }
      request({
        to: endpoints.UPDATE_TOPIC(topicId).url,
        method: endpoints.UPDATE_TOPIC(topicId).method,
        params: {
          topicId,
        },
        data: formData,
      })
        .then(loadData)
        .then(() => toast.success('Save topic successfully!'))
        .catch(handleErrors);
    },
    [data, semId, semester.status, topicId]
  );

  const handleDelete = React.useCallback(
    e => {
      e.preventDefault();
      if (semester.status === 3) {
        toast.warn('Semester is finished, cannot make any further changes.');
        return;
      }
      confirm({
        title: 'Removal Confirmation',
        body: (
          <>
            Do you wanna remove this topic?
            <br />
            This topic will be <b>permanently removed</b>, and all historical
            data belong to this topic too.
          </>
        ),
        onConfirm: () =>
          request({
            to: endpoints.DELETE_TOPIC(topicId).url,
            method: endpoints.DELETE_TOPIC(topicId).method,
            params: {
              topicId,
            },
          })
            .then(res => {
              history.push('/semester/' + semId + '/topic');
              toast.error('Delete topic successfully!');
            })
            .catch(handleErrors),
      });
    },
    [confirm, history, semId, semester.status, topicId]
  );

  React.useEffect(() => {
    setIsLoading(true);
    request({
      to: endpoints.READ_TOPIC(topicId).url,
      method: endpoints.READ_TOPIC(topicId).method,
    })
      .then(res => {
        const d = transformers.downRead(res?.data?.data);
        setData({
          name: 'all',
          value: d,
        });
      })
      .catch(err => {
        handleErrors(err);
        history.go(-1);
      })
      .finally(() => setIsLoading(false));
  }, [history, semId, topicId, l]);

  const handleGradeChange = React.useCallback(
    (changes, index) => {
      changes.forEach(({ cell, row, col, value }) => {
        evals[index].grid[row][col] = {
          ...evals[index].grid[row][col],
          value: Number(value),
        };
      });
      setEvals(evals);
    },
    [evals]
  );

  const onSaveEvals = React.useCallback(
    e => {
      e.preventDefault();
      if (semester.status === 3) {
        toast.warn('Semester is finished, cannot make any further changes.');
        return;
      }
      setIsUpdating(true);
      request({
        to: endpoints.PUT_EVALUATION(topicId).url,
        method: endpoints.PUT_EVALUATION(topicId).method,
        data: {
          marks: transformToData(evals),
        },
      })
        .then(res => {
          toast.success('Updated');
          loadData2();
        })
        .catch(handleErrors)
        .finally(() => setIsUpdating(false));
    },
    [evals, semester.status, topicId]
  );

  React.useEffect(() => {
    if (data?.team?.value) {
      setIsLoading(true);
      request({
        to: endpoints.READ_TEAM(data.team.value).url,
        method: endpoints.READ_TEAM(data.team.value).method,
      })
        .then(res => {
          const data = downTeam(res?.data?.data);
          setTeamMembers(data.members);
        })
        .catch(handleErrors)
        .finally(() => setIsLoading(false));
    }
  }, [data]);

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

  React.useEffect(() => {
    if (topicId) {
      request({
        to: endpoints.GET_EVALUATION(topicId).url,
        method: endpoints.GET_EVALUATION(topicId).method,
      })
        .then(res => {
          const data = transformToGrid(res.data.data);
          console.log(data);
          setEvals(data);
        })
        .catch(handleErrors)
        .finally(() => setIsLoading(false));
    }
  }, [l2, topicId]);

  React.useEffect(() => {
    console.log(evals);
  }, [evals]);

  return (
    <>
      <Row>
        <Col lg={12}>
          <CMSCard
            isLoading={isLoading}
            title={'Information of topic ' + (data.name || '')}
            toolbar={
              <>
                <Button
                  variant="danger"
                  className="mr-2"
                  size="sm"
                  onClick={handleDelete}
                >
                  <i
                    className="fas fa-trash mr-1"
                    style={{ fontSize: '1rem' }}
                  ></i>
                  Delete topic
                </Button>
                <Button size="sm" onClick={handleUpdate}>
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
                Status
              </Form.Label>
              <Col sm={9}>
                <span
                  class={`label label-inline font-weight-bold label-${
                    constants.statusClasses[data.status]
                  }`}
                  style={{ fontSize: '1.25rem', padding: '1rem' }}
                >
                  {constants.statusTitles[data.status]}
                </span>
              </Col>
            </Form.Group>
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
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Team
              </Form.Label>
              <Col sm={9}>
                <SelectTagInput
                  onChange={value => setData({ value, name: 'team' })}
                  load={(input, callback) => {
                    request({
                      to: endpoints.LIST_TEAM.url,
                      method: endpoints.LIST_TEAM.method,
                      params: {
                        term: input,
                        pageSize: 10,
                        semesterId: semId,
                      },
                    })
                      .then(res => {
                        callback(res.data.data?.map(mDownTeam) || []);
                      })
                      .catch(() => callback([]));
                  }}
                  value={data.team}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Attachment
              </Form.Label>
              <Col sm={9}>
                <InputGroup
                  style={{
                    marginBottom: '-0.5rem',
                  }}
                >
                  <Form.Control
                    className="form-control form-control-md form-control-solid mb-2"
                    value={data.attachment?.name}
                    readOnly
                  />
                  <InputGroup.Append
                    style={{
                      zIndex: 1,
                    }}
                  >
                    <Button className="form-control" onClick={handleClickFile}>
                      <i class="fas fa-upload pr-0"></i>
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
                <Form.File
                  ref={fileRef}
                  label={undefined}
                  onChange={handleFileChange}
                  className="d-none"
                />
              </Col>
            </Form.Group>
          </CMSCard>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <CMSCard isLoading={isLoading} title="Team">
            {teamMembers && teamMembers.length > 0
              ? teamMembers?.map(i => (
                  <Member
                    id={i?.value}
                    name={i?.label}
                    email={i?.email}
                    isLeader={i?.isLeader}
                  />
                ))
              : 'This topic does not have team yet.'}
          </CMSCard>
        </Col>
        <Col lg={6}>
          <CMSCard isLoading={isLoading} title="Mentors">
            {data && data.mentorMembers && data.mentorMembers.length > 0
              ? data?.mentorMembers?.map(i => (
                  <Member
                    id={i?.value}
                    name={i?.label}
                    email={i?.email}
                    isLeader={i?.isLeader}
                  />
                ))
              : 'This topic does not have any mentor'}
          </CMSCard>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <CMSCard
            isLoading={isLoading}
            title="Feedbacks"
            toolbar={
              data?.status === 0 ? (
                <>
                  <Button
                    variant="danger"
                    className="mr-2"
                    size="sm"
                    onClick={handleReject}
                  >
                    <i
                      className="fas fa-thumbs-down mr-1"
                      style={{ fontSize: '1rem' }}
                    ></i>
                    Reject
                  </Button>
                  <Button variant="success" size="sm" onClick={handleApprove}>
                    <i
                      className="fas fa-thumbs-up mr-1"
                      style={{ fontSize: '1rem' }}
                    ></i>
                    Approve
                  </Button>
                </>
              ) : data?.status === 1 ? (
                <span
                  class="label label-inline label-danger font-weight-bold"
                  style={{ fontSize: '1.25rem', padding: '1rem' }}
                >
                  Rejected
                </span>
              ) : (
                <span
                  class="label label-inline label-success font-weight-bold"
                  style={{ fontSize: '1.25rem', padding: '1rem' }}
                >
                  Approved
                </span>
              )
            }
          >
            <div className="timeline timeline-3">
              <div className="timeline-items">
                {(data?.feedbacks?.length > 0 &&
                  data?.feedbacks?.map(i => {
                    return (
                      <Comment
                        key={i.id}
                        email={i.approver.email || ''}
                        name={i.approver.name}
                        date={i.date}
                        content={i.content}
                      />
                    );
                  })) || <>No feedback</>}
              </div>
            </div>
          </CMSCard>
        </Col>
        <Col lg={6}>
          <CMSCard isLoading={isLoading} title="Application">
            <div className="table-responsive">
              {data?.applications?.length > 0 ? (
                <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
                  <thead>
                    <tr className="text-left text-uppercase">
                      <th className="pl-4">
                        <span className="text-dark-75">Team</span>
                      </th>
                      <th>Sent at</th>
                      <th>Updated at</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.applications?.length &&
                      data?.applications.map(app => (
                        <tr>
                          <td className="pl-4">
                            <a
                              href="/"
                              className="text-dark-75 text-nowrap font-weight-bolder text-hover-primary mb-1 font-size-lg"
                            >
                              {app.team.name}
                            </a>
                          </td>
                          <td className="text-left pl-0">
                            <span className="text-muted font-weight-500 text-nowrap">
                              {appTransformers.convertDateDown(app.createdAt)}
                            </span>
                          </td>
                          <td className="text-left pl-0">
                            <span className="text-muted font-weight-500 text-nowrap">
                              {appTransformers.convertDateDown(app.updatedAt)}
                            </span>
                          </td>
                          <td className="text-left pl-0 text-nowrap">
                            <span
                              className={`label label-lg label-light-${
                                constantsA.statusClass[app.status]
                              } label-inline`}
                            >
                              {constantsA.statusTitles[app.status]}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                "This topic don't have any application from teams"
              )}
            </div>
          </CMSCard>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <CMSCard
            isLoading={isLoading}
            title="Evaluations"
            toolbar={
              <>
                <Button isLoading={isUpdating}>
                  <i className="fas fa-save mr-2" onClick={onSaveEvals}></i>
                  Save
                </Button>
              </>
            }
          >
            <Accordion>
              {evals?.length > 0
                ? evals?.map((i, index) => (
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Card.Header}
                          variant="span"
                          eventKey={i.name}
                          style={{
                            padding: '1rem',
                            fontSize: '1.25rem',
                          }}
                        >
                          {i.name}
                          <span
                            class={`label label-inline label-${
                              constantsCp.statusClasses[i.status]
                            } font-weight-bold float-right`}
                            style={{ fontSize: '1.25rem', padding: '1rem' }}
                          >
                            {constantsCp.statusTitles[i.status]}
                          </span>
                          <small className="form-text text-muted">
                            Weight: <b>{i.weight}</b>, Submit at:{' '}
                            <b>
                              {constantsCp.convertDateDown(i.submitDueDate)}
                            </b>
                            , Evaluate at:{' '}
                            <b>
                              {constantsCp.convertDateDown(i.evaluateDueDate)}
                            </b>
                            , by: <b>{i.council.name}</b>
                          </small>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey={i.name}>
                        <Card.Body>
                          <div className="marks-table">
                            <Datasheet
                              data={i.grid || []}
                              valueRenderer={cell => cell.value}
                              onCellsChanged={changes =>
                                handleGradeChange(changes, index)
                              }
                              dataEditor={props => {
                                return (
                                  <input
                                    onChange={e =>
                                      props.onChange(e.currentTarget.value)
                                    }
                                    value={props.value}
                                    onKeyDown={props.onKeyDown}
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.01"
                                  />
                                );
                              }}
                            />
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  ))
                : 'No evaluation data'}
            </Accordion>
          </CMSCard>
        </Col>
      </Row>
      {/* <Row>
        <Col lg={12}>
          <Card
            isLoading={isLoading}
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
      </Row> */}
    </>
  );
};

export default Topic;
