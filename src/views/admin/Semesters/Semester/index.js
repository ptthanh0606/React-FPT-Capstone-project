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
import ConfirmRemoveModal from 'components/ConfirmModal/ConfirmModal';

const Semester = () => {
  const setMeta = useSetRecoilState(metaAtom);
  const { id } = useParams();

  const [
    isShowConfirmRemoveSemesterModalFlg,
    setShowConfirmRemoveSemsterModalFlg,
  ] = React.useState(false);

  const onShowConfirmRemoveSemesterModal = React.useCallback(() => {
    setShowConfirmRemoveSemsterModalFlg(true);
  }, []);

  const onHideConfirmRemoveSemesterModal = React.useCallback(() => {
    setShowConfirmRemoveSemsterModalFlg(false);
  }, []);

  const onConfirmRemoveSemester = React.useCallback(() => {
    // Handle remove
  }, []);

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      toolbar: (
        <>
          <button
            type="button"
            className="btn btn-danger font-weight-bold btn-sm"
            onClick={onShowConfirmRemoveSemesterModal}
          >
            <i className="fas fa-trash mr-2"></i>
            Remove
          </button>
        </>
      ),
    }));
  }, [setMeta, id, onShowConfirmRemoveSemesterModal]);

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
      <ConfirmRemoveModal
        title="Confirm on remove"
        body={<h5>Are you sure you want to remove this semester?</h5>}
        isShowFlg={isShowConfirmRemoveSemesterModalFlg}
        onHide={onHideConfirmRemoveSemesterModal}
        onConfirm={onConfirmRemoveSemester}
      />
    </Tab.Container>
  );
};

export default Semester;
