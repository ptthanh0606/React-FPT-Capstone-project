import React from 'react';
import { Tab, Row, Col } from 'react-bootstrap';
import { useParams, Route, Switch, NavLink, Redirect } from 'react-router-dom';

import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';

import styles from './styles.module.scss';

import Information from './Information';
import Topics from './Topics';
import ActiveStudents from './ActiveStudents';
import Councils from './Councils';
import Teams from './Teams';
import Checkpoints from './Checkpoints';

const Semester = () => {
  const setMeta = useSetRecoilState(metaAtom);
  const { id } = useParams();

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Fall 2020',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'Fall 2020', path: '/semester/' + id },
      ],
      toolbar: (
        <>
          <button
            type="button"
            className="btn btn-danger font-weight-bold btn-sm"
            // onClick={}
          >
            <i class="fas fa-trash mr-2"></i>
            Remove
          </button>
        </>
      ),
    }));
  }, [setMeta, id]);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3} className="mb-4">
          <div className={'alert-shadow bg-white p-5 rounded'}>
            <span className="font-size-h2">Fall 2020</span>
            <br />
            <span className="font-size-h6">Preparing</span>
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
                to={'/semester/' + id + '/topic'}
                activeClassName={styles['active']}
                className={styles['menu-item']}
              >
                Topics
              </NavLink>
              <NavLink
                to={'/semester/' + id + '/active-student'}
                activeClassName={styles['active']}
                className={styles['menu-item']}
              >
                Active students
              </NavLink>
              <NavLink
                to={'/semester/' + id + '/council'}
                activeClassName={styles['active']}
                className={styles['menu-item']}
              >
                Councils
              </NavLink>
              <NavLink
                to={'/semester/' + id + '/team'}
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
            <Route path="/semester/:id/information" component={Information} />
            <Route path="/semester/:id/topic" component={Topics} />
            <Route
              path="/semester/:id/active-student"
              component={ActiveStudents}
            />
            <Route path="/semester/:id/council" component={Councils} />
            <Route path="/semester/:id/team" component={Teams} />
            <Route path="/semester/:id/checkpoint" component={Checkpoints} />
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
