import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import semesterAtom from 'store/semester';
import metaAtom from 'store/meta';
import userAtom from 'store/user';
import { role } from 'auth/recoil/selectors';

import { Row, Col } from 'react-bootstrap';
import { toAbsoluteUrl } from '_metronic/_helpers';

import request from 'utils/request';
import * as endpoints from 'endpoints';
import { handleErrors } from 'utils/common';

import * as transformers from '../../../../modules/semester/team/transformers';

import Member from './Member';
import Application from './Application';
import TeamHeader from 'components/CMSWidgets/TeamHeader';
import UtilityButtonTile from 'components/CMSWidgets/UtilityButtonTile';
import CMSModal from 'components/CMSModal/CMSModal';
import { createTeamSettingFieldTemplate, modalConfigs } from './constants';
import toast from 'utils/toast';

const Team = () => {
  const history = useHistory();
  const [currentTeam, setCurrentTeam] = React.useState({});
  const [isTeamMatched, setIsTeamMatched] = React.useState(false);
  const [isUserHaveTeam, setIsUserHaveTeam] = React.useState(true);
  const [isUserInTeam, setIsUserInTeam] = React.useState(false);
  const [isUserLeader, setIsUserLeader] = React.useState(false);
  const [showSetting, setShowSetting] = React.useState(false);
  const [settingFieldTemplate, setSettingFieldTemplate] = React.useState({});

  // ------------------------------------------------------------------

  const { id } = useParams();

  // ------------------------------------------------------------------

  const setMeta = useSetRecoilState(metaAtom);
  const currentSemester = useRecoilValue(semesterAtom);
  const currentUser = useRecoilValue(userAtom);
  const userRole = useRecoilValue(role);

  // ------------------------------------------------------------------

  const processCheckCurrentStudentInTeam = React.useCallback(
    studentTeam => {
      let isIn = false;
      isIn = !!studentTeam.filter(member => member.value === currentUser.id)
        .length;
      setIsUserInTeam(isIn);
    },
    [currentUser.id]
  );

  const fetchTeam = React.useCallback(() => {
    request({
      to: endpoints.READ_TEAM(id).url,
      method: endpoints.READ_TEAM(id).method,
      params: {
        teamId: id,
        semesterId: currentSemester.id,
      },
    })
      .then(res => {
        const transformedRes = transformers.down(res.data.data);
        // Check user co phai la leader trong team khong
        setIsUserLeader(transformedRes.leader.value === currentUser.id);
        // Check user co phai la member trong team khong
        processCheckCurrentStudentInTeam(transformedRes.members);
        setSettingFieldTemplate(createTeamSettingFieldTemplate(transformedRes));
        setCurrentTeam(transformedRes);
        setIsTeamMatched(transformedRes.status);
      })
      .catch(err => {
        handleErrors(err);
        history.push('/team');
      });
  }, [
    currentSemester.id,
    currentUser.id,
    history,
    id,
    processCheckCurrentStudentInTeam,
  ]);

  const fetchUserTeam = React.useCallback(() => {
    request({
      to: endpoints.READ_TEAM(1).url,
      method: endpoints.READ_TEAM(1).method,
      params: {
        semesterId: currentSemester.id,
      },
    })
      .then(res => {
        setIsUserHaveTeam(true);
      })
      .catch(err => {
        setIsUserHaveTeam(false);
      });
  }, [currentSemester.id]);

  const handleConfirmSetting = React.useCallback(
    data => {
      request({
        to: endpoints.UPDATE_TEAM(id).url,
        method: endpoints.UPDATE_TEAM(id).method,
        data,
      })
        .then(() => {
          toast.success('Updated team info.');
        })
        .catch(err => {
          handleErrors(err);
        });
    },
    [id]
  );

  const handleRefreshJoinCode = React.useCallback(() => {
    request({
      to: endpoints.REFRESH_CODE_TEAM(id).url,
      method: endpoints.REFRESH_CODE_TEAM(id).method,
      params: {
        teamId: id,
      },
    })
      .then(() => {
        toast.success('Join code updated.');
        fetchTeam();
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [fetchTeam, id]);

  const handleChangeLockTeam = React.useCallback(() => {
    request({
      to: endpoints.LOCK_TEAM(id).url,
      method: endpoints.LOCK_TEAM(id).method,
      params: {
        teamId: id,
        newStatus: !currentTeam?.lock,
      },
    })
      .then(() => {
        toast.success('Locked team.');
        fetchTeam();
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [currentTeam.lock, fetchTeam, id]);

  const handleLeaveTeam = React.useCallback(() => {
    request({
      to: endpoints.LEAVE_TEAM(id).url,
      method: endpoints.LEAVE_TEAM(id).method,
      params: {
        teamId: id,
        forcedOut: currentUser.id,
        semesterId: currentSemester.id,
      },
    })
      .then(() => {
        history.push('/team');
        fetchTeam();
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [currentSemester.id, currentUser.id, fetchTeam, history, id]);

  const handleJoinTeam = React.useCallback(() => {
    request({
      to: endpoints.JOIN_TEAM(id).url,
      method: endpoints.JOIN_TEAM(id).method,
      params: {
        teamId: id,
        semesterId: currentSemester.id,
        teamCode: currentTeam?.code,
      },
    })
      .then(() => {
        toast.success('Welcome to our team!');
        fetchTeam();
        fetchUserTeam();
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [currentSemester.id, currentTeam.code, fetchTeam, fetchUserTeam, id]);

  // ------------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: 'Team detail',
      breadcrumb: [
        { title: 'Semester', path: '/select-semester' },
        {
          title: currentSemester.name,
          path: `/semester/${currentSemester.id}`,
        },
        { title: 'Team', path: '/team' },
        { title: currentTeam.name, path: `/team/${id}` },
      ],
      toolbar: (
        <>
          {userRole === 'student' && (
            <>
              {isUserLeader && (
                <>
                  <button
                    type="button"
                    className="btn btn-light-info font-weight-bold btn-sm ml-2"
                    onClick={() => setShowSetting(true)}
                  >
                    <i className="fas fa-cog mr-2"></i>
                    Settings
                  </button>
                  <CMSModal
                    title="Settings"
                    subTitle="Update for this team"
                    configs={modalConfigs}
                    isShowFlg={showSetting}
                    fieldTemplate={settingFieldTemplate}
                    onConfirmForm={handleConfirmSetting}
                    onHide={() => setShowSetting(false)}
                  />
                </>
              )}
              {isUserInTeam ? (
                <>
                  {!isTeamMatched && (
                    <button
                      type="button"
                      className="btn btn-light-danger font-weight-bold btn-sm ml-2"
                      onClick={handleLeaveTeam}
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      Leave
                    </button>
                  )}
                </>
              ) : (
                <>
                  {!isUserHaveTeam && (
                    <button
                      type="button"
                      className="btn btn-primary font-weight-bold btn-sm ml-2"
                      onClick={handleJoinTeam}
                    >
                      <i className="fas fa-sign-in-alt mr-2"></i>
                      Join this team
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </>
      ),
    });
  }, [
    currentSemester.id,
    currentSemester.name,
    currentTeam.leader,
    currentTeam.name,
    currentUser.id,
    handleConfirmSetting,
    handleJoinTeam,
    handleLeaveTeam,
    id,
    isTeamMatched,
    isUserHaveTeam,
    isUserInTeam,
    isUserLeader,
    setMeta,
    settingFieldTemplate,
    showSetting,
    userRole,
  ]);

  // ------------------------------------------------------------------

  React.useEffect(() => {
    fetchTeam();
    fetchUserTeam();
  }, [fetchTeam, fetchUserTeam]);

  // ------------------------------------------------------------------

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-xxl-12">
          <TeamHeader
            teamName={currentTeam?.name || ''}
            department={currentTeam?.department?.fullLabel}
            teamType={currentTeam?.privacy ? 'Public' : 'Private'}
            teamStatus={currentTeam?.status ? 'Matched' : 'Matching'}
            withTopic={currentTeam?.topic}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-xxl-9">
          <div className={`card card-custom gutter-b`}>
            <div className="card-body d-flex flex-column p-0">
              <div className="d-flex justify-content-between card-spacer flex-grow-1">
                <div className="d-flex flex-column mr-2">
                  <span className="text-dark-75 font-weight-bolder font-size-h5">
                    Members
                  </span>
                  <span className="text-muted font-weight-bold mt-2">
                    Student in this team
                  </span>
                </div>
                <span className="symbol symbol-light-success symbol-45">
                  <span className="symbol-label font-weight-bolder font-size-h6">
                    {currentTeam?.members?.length}/{currentTeam?.maxMembers}
                  </span>
                </span>
              </div>
              <Row className="d-flex flex-grow-1 px-8 pb-4">
                {currentTeam?.members?.length ? (
                  <>
                    <Col sm={12} md={6} lg={6} xl={4}>
                      <Member
                        id={currentTeam.leader.value}
                        teamId={id}
                        name={currentTeam.leader.label}
                        email={currentTeam.leader.email}
                        isLeader
                        leaderId={currentTeam.leader.value}
                        onOperationSuccess={fetchTeam}
                      />
                    </Col>
                    {currentTeam?.members
                      .filter(({ value }) => value !== currentTeam.leader.value)
                      .map(member => (
                        <Col sm={12} md={6} lg={6} xl={4}>
                          <Member
                            id={member.value}
                            teamId={id}
                            name={member.label}
                            email={member.email}
                            leaderId={currentTeam.leader.value}
                            onOperationSuccess={fetchTeam}
                          />
                        </Col>
                      ))}
                  </>
                ) : (
                  <Col sm={12} md={6} lg={6} xl={4}>
                    No member available, this might be a problem.
                  </Col>
                )}
              </Row>
            </div>
          </div>
          <div className={`card card-custom gutter-b`}>
            <div className="card-body d-flex flex-column p-0">
              <div className="d-flex justify-content-between card-spacer flex-grow-1">
                <div className="d-flex flex-column mr-2">
                  <span className="text-dark-75 font-weight-bolder font-size-h5">
                    Applications
                  </span>
                  <span className="text-muted font-weight-bold mt-2">
                    Topic that this team applied
                  </span>
                </div>
                <span className="symbol symbol-light-success symbol-45">
                  <span className="symbol-label font-weight-bolder font-size-h6">
                    {currentTeam?.applications?.length}
                  </span>
                </span>
              </div>
              <div className="d-flex justify-content-between flex-grow-1 px-8">
                <div className="table-responsive">
                  <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
                    <thead>
                      <tr className="text-left text-uppercase">
                        <th className="pl-4">
                          <span className="text-dark-75">Topic</span>
                        </th>
                        <th>Sent at</th>
                        <th>Updated at</th>
                        <th>Status</th>
                        <th width="1%"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTeam?.applications?.length ? (
                        currentTeam?.applications.map(app => (
                          <Application
                            key={app.id}
                            id={app.id}
                            createdAt={app.createdAt}
                            updatedAt={app.updatedAt}
                            topicId={app.topic.id}
                            topicName={app.topic.name}
                            abstract={app.topic.abstract}
                            status={app.status}
                            leaderId={currentTeam.leader.value}
                            onOperationSuccess={fetchTeam}
                          />
                        ))
                      ) : (
                        <tr>
                          <td className="text-muted">
                            This team currently don't have any applications yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-xxl-3">
          <UtilityButtonTile
            className="gutter-b"
            smallTitle="Join code"
            baseColor="info"
            label={currentTeam?.code}
            onIconClick={handleRefreshJoinCode}
            tooltipMsg={
              <>
                You can give this code to another student for joining.
                <br />
                <br /> Click the "refresh icon" to get new code (Team leader
                only).
              </>
            }
            buttonIcon={toAbsoluteUrl('/media/svg/icons/General/Update.svg')}
          />

          {currentTeam.lock ? (
            <UtilityButtonTile
              className="gutter-b"
              smallTitle="Team state"
              baseColor="danger"
              label="Locked"
              clickAbleIcon={isUserLeader}
              buttonIcon={toAbsoluteUrl('/media/svg/icons/General/Lock.svg')}
            />
          ) : (
            <UtilityButtonTile
              className="gutter-b"
              smallTitle="Team state"
              baseColor="success"
              label="Unlocked"
              clickAbleIcon={isUserLeader}
              tooltipMsg={
                <>
                  Lock this team (Locked team can not accept joining from other
                  student)
                  <br />
                  <br /> Click the "lock icon" to lock (Team leader only).
                </>
              }
              onIconClick={handleChangeLockTeam}
              buttonIcon={toAbsoluteUrl('/media/svg/icons/General/Unlock.svg')}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default Team;
