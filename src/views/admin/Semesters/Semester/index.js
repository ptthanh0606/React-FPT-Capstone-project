import React from 'react';
import { Tab, Row, Col } from 'react-bootstrap';
import {
  useParams,
  Route,
  Switch,
  NavLink,
  Redirect,
  useHistory,
} from 'react-router-dom';

import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';

import styles from './styles.module.scss';

import Information from './Information';
import Topics from './Topics';
import ActiveStudents from './ActiveStudents';
import Councils from './Councils';
import Teams from './Teams';
import Checkpoints from './Checkpoints';

import request from 'utils/request';
import { READ_SEMESTER } from 'endpoints';
import { down } from 'modules/semester/transformers';
import { statusTitles } from 'modules/semester/constants';

import toast from 'utils/toast';
import useConfirm from 'utils/confirm';
import * as endpoints from 'endpoints';
import { handleErrors } from 'utils/common';

const withSemesterInfo = (semester, Component) => {
  return <Component semester={semester} />;
};

const Semester = () => {
  const confirm = useConfirm();
  const setMeta = useSetRecoilState(metaAtom);
  const { id } = useParams();
  const [data, setData] = React.useState({
    name: '',
    status: 0,
  });
  const [l, loadData] = React.useReducer(() => ({}), {});
  const history = useHistory();

  const TopicsWithSemester = React.useCallback(() => {
    return withSemesterInfo(data, Topics);
  }, [data]);

  const ActiveStudentsWithSemester = React.useCallback(() => {
    return withSemesterInfo(data, ActiveStudents);
  }, [data]);

  const CouncilsWithSemester = React.useCallback(() => {
    return withSemesterInfo(data, Councils);
  }, [data]);

  const TeamsWithSemester = React.useCallback(() => {
    return withSemesterInfo(data, Teams);
  }, [data]);

  const CheckpointsWithSemester = React.useCallback(() => {
    return withSemesterInfo(data, Checkpoints);
  }, [data]);

  const handleRemove = React.useCallback(
    e => {
      e.preventDefault();
      const id = Number(e.currentTarget.getAttribute('data-id'));
      if (!Number.isInteger(id)) {
        toast.error('Internal Server Error');
        return;
      }
      confirm({
        title: 'Removal Confirmation',
        body: (
          <>
            Do you wanna remove this semester?
            <br />
            This semester will be <b>permanently removed</b>, and all historical
            data belong to this semester too.
          </>
        ),
        onConfirm: () =>
          request({
            to: endpoints.DELETE_SEMESTER(id).url,
            method: endpoints.DELETE_SEMESTER(id).method,
          })
            .then(res => {
              toast.success('Successfully remove semester');
              history.push('/semester');
            })
            .catch(handleErrors),
      });
    },
    [confirm, history]
  );

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      toolbar: (
        <>
          <button
            type="button"
            className="btn btn-danger font-weight-bold btn-sm"
            data-id={id}
            onClick={handleRemove}
          >
            <i className="fas fa-trash mr-2"></i>
            Remove
          </button>
        </>
      ),
    }));
  }, [setMeta, id, handleRemove]);

  React.useEffect(() => {
    request({
      to: READ_SEMESTER(id).url,
      method: READ_SEMESTER(id).method,
    })
      .then(res => {
        const data = down(res?.data?.data);
        setData({
          name: data.name,
          status: data.status,
        });
      })
      .catch(err => {
        history.push('/semester');
      });
  }, [history, id, l]);

  const WrappedInformation = React.useCallback(
    () => <Information loadData={loadData} />,
    [loadData]
  );

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3} className="mb-4">
          <div className={'alert-shadow bg-white p-5 rounded'}>
            <span className="font-size-h2">{data.name}</span>
            <br />
            <span className="font-size-h6">{statusTitles[data.status]}</span>
            <div className={styles['menu-container']}>
              <NavLink
                to={'/semester/' + id + '/information'}
                activeClassName={styles['active']}
                className={styles['menu-item']}
              >
                Information
              </NavLink>
              <NavLink
                to={'/semester/' + id + '/checkpoint'}
                activeClassName={styles['active']}
                className={styles['menu-item']}
              >
                Checkpoints
              </NavLink>
              <NavLink
                to={'/semester/' + id + '/topic' + '?dep=all&status=all'}
                activeClassName={styles['active']}
                className={styles['menu-item']}
              >
                Topics
              </NavLink>
              <NavLink
                to={
                  '/semester/' + id + '/active-student' + '?dep=all&status=all'
                }
                activeClassName={styles['active']}
                className={styles['menu-item']}
              >
                Active students
              </NavLink>
              <NavLink
                to={'/semester/' + id + '/council' + '?dep=all'}
                activeClassName={styles['active']}
                className={styles['menu-item']}
              >
                Councils
              </NavLink>
              <NavLink
                to={
                  '/semester/' +
                  id +
                  '/team' +
                  '?dep=all&status=all&lock=all&private=all'
                }
                activeClassName={styles['active']}
                className={styles['menu-item']}
              >
                Teams
              </NavLink>
            </div>
          </div>
        </Col>
        <Col sm={9}>
          <Switch>
            <Route
              path="/semester/:id/information"
              component={WrappedInformation}
            />
            <Route path="/semester/:id/topic" component={TopicsWithSemester} />
            <Route
              path="/semester/:id/active-student"
              component={ActiveStudentsWithSemester}
            />
            <Route
              path="/semester/:id/council"
              component={CouncilsWithSemester}
            />
            <Route path="/semester/:id/team" component={TeamsWithSemester} />
            <Route
              path="/semester/:id/checkpoint"
              component={CheckpointsWithSemester}
            />
            <Route>
              <Redirect to={'/semester/' + id + '/information'} />
            </Route>
          </Switch>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default Semester;
