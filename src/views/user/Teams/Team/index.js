import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import semesterAtom from 'store/semester';
import metaAtom from 'store/meta';
import userAtom from 'store/user';
import { role } from 'auth/recoil/selectors';

import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toAbsoluteUrl } from '_metronic/_helpers';

import request from 'utils/request';
import * as endpoints from 'endpoints';
import { handleErrors } from 'utils/common';

import * as transformers from 'modules/semester/team/transformers';

import Member from './Member';
import Application from './Application';
import TeamHeader from 'components/CMSWidgets/TeamHeader';
import UtilityButtonTile from 'components/CMSWidgets/UtilityButtonTile';
import CMSModal from 'components/CMSModal/CMSModal';
import { createTeamSettingFieldTemplate, modalConfigs } from './constants';
import toast from 'utils/toast';
import useConfirm from 'utils/confirm';
import Engaging from 'components/CMSWidgets/Engaging';

const Team = () => {
  const [l, loadData] = React.useReducer(() => ({}));
  const history = useHistory();
  const [currentTeam, setCurrentTeam] = React.useState({});
  const [isTeamMatched, setIsTeamMatched] = React.useState(false);
  const [isUserHaveTeam, setIsUserHaveTeam] = React.useState(true);
  const [isUserInTeam, setIsUserInTeam] = React.useState(false);
  const [isUserLeader, setIsUserLeader] = React.useState(false);
  const [showSetting, setShowSetting] = React.useState(false);
  const [showNoTeamWarn, setShowNoTeamWarn] = React.useState(false);

  const [settingFieldTemplate, setSettingFieldTemplate] = React.useState({});
  const [isProcessing, setIsProcessing] = React.useState(false);

  // ------------------------------------------------------------------

  const { id } = useParams();
  const confirm = useConfirm();

  // ------------------------------------------------------------------

  const setMeta = useSetRecoilState(metaAtom);
  const currentSemester = useRecoilValue(semesterAtom);
  const currentUser = useRecoilValue(userAtom);
  const userRole = useRecoilValue(role);

  // ------------------------------------------------------------------

  const processCheckCurrentStudentInTeam = React.useCallback(
    studentTeam => {
      let isIn = false;
      isIn = studentTeam.some(member => member.value === currentUser.id);
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
        setIsUserLeader(transformedRes.leader?.value === currentUser.id);
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

  const fetchOwnTeam = React.useCallback(() => {
    request({
      to: endpoints.READ_TEAM(0).url,
      method: endpoints.READ_TEAM(0).method,
      params: {
        semesterId: currentSemester.id,
      },
    })
      .then(res => {
        const transformedRes = transformers.down(res.data.data);
        // Check user co phai la leader trong team khong
        setIsUserLeader(transformedRes.leader?.value === currentUser.id);
        // Check user co phai la member trong team khong
        processCheckCurrentStudentInTeam(transformedRes.members);
        setSettingFieldTemplate(createTeamSettingFieldTemplate(transformedRes));
        setCurrentTeam(transformedRes);
        setIsTeamMatched(transformedRes.status);
      })
      .catch(err => {
        setShowNoTeamWarn(true);
        // ----
      });
  }, [currentSemester.id, currentUser.id, processCheckCurrentStudentInTeam]);

  const checkUserInTeam = React.useCallback(() => {
    request({
      to: endpoints.READ_TEAM(0).url,
      method: endpoints.READ_TEAM(0).method,
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

  const checkInitAction = React.useCallback(() => {
    if (id) {
      fetchTeam();
      checkUserInTeam();
    } else {
      fetchOwnTeam();
      checkUserInTeam();
    }
  }, [checkUserInTeam, fetchOwnTeam, fetchTeam, id]);

  const handleConfirmSetting = React.useCallback(
    data => {
      setIsProcessing(true);
      request({
        to: endpoints.UPDATE_TEAM(currentTeam.id).url,
        method: endpoints.UPDATE_TEAM(currentTeam.id).method,
        params: {
          teamId: currentTeam.id,
          semesterId: currentSemester.id,
        },
        data: {
          ...data,
          semesterId: currentSemester.id,
          teamId: currentTeam.id,
        },
      })
        .then(() => {
          toast.success('Updated team info.');
          setShowSetting(false);
          setIsProcessing(false);
          loadData();
        })
        .catch(err => {
          handleErrors(err);
        });
    },
    [currentSemester.id, currentTeam.id]
  );

  const handleRefreshJoinCode = React.useCallback(() => {
    request({
      to: endpoints.REFRESH_CODE_TEAM(currentTeam.id).url,
      method: endpoints.REFRESH_CODE_TEAM(currentTeam.id).method,
      params: {
        teamId: currentTeam.id,
      },
    })
      .then(() => {
        toast.success('Join code updated.');
        loadData();
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [currentTeam.id]);

  const handleChangeLockTeam = React.useCallback(() => {
    request({
      to: endpoints.LOCK_TEAM(currentTeam.id).url,
      method: endpoints.LOCK_TEAM(currentTeam.id).method,
      params: {
        teamId: currentTeam.id,
        newStatus: !currentTeam?.lock,
      },
    })
      .then(() => {
        toast.success('Lock state changed!');
        loadData();
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [currentTeam.id, currentTeam.lock]);

  const onLeaveConfirm = React.useCallback(() => {
    request({
      to: endpoints.LEAVE_TEAM(currentTeam.id).url,
      method: endpoints.LEAVE_TEAM(currentTeam.id).method,
      params: {
        teamId: currentTeam.id,
        semesterId: currentSemester.id,
      },
    })
      .then(() => {
        history.push('/team');
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [currentSemester.id, currentTeam.id, history]);

  const handleLeaveTeam = React.useCallback(() => {
    confirm({
      title: 'Confirm required',
      body: 'Are you sure you want to leave this team?',
      onConfirm: onLeaveConfirm,
    });
  }, [confirm, onLeaveConfirm]);

  const onJoinTeamConfirm = React.useCallback(() => {
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
        loadData();
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [currentSemester.id, currentTeam.code, id]);

  const handleJoinTeam = React.useCallback(() => {
    confirm({
      title: 'Confirm required',
      body: 'Are you sure you want to join this team?',
      onConfirm: onJoinTeamConfirm,
    });
  }, [confirm, onJoinTeamConfirm]);

  const handleConfirmDumpTeam = React.useCallback(() => {
    request({
      to: endpoints.DELETE_TEAM(currentTeam.id).url,
      method: endpoints.DELETE_TEAM(currentTeam.id).method,
    })
      .then(() => {
        toast.success('Team dumped!');
        history.push('/team');
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [currentTeam.id, history]);

  // ------------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: 'Team detail',
      breadcrumb: [
        { title: 'Semester', path: '/select-semester' },
        {
          title: currentSemester.name,
          path: `/select-semester/#`,
        },
        { title: 'Team', path: '/team' },
        { title: currentTeam.name, path: `/team/${currentTeam.id}` },
      ],
      toolbar: (
        <>
          {userRole === 'student' && (
            <>
              {currentSemester.status !== 3 &&
                isUserLeader &&
                !isTeamMatched &&
                !currentTeam.lock && (
                  <>
                    <button
                      type="button"
                      className="btn btn-light-info font-weight-bold btn-sm ml-2"
                      onClick={() => setShowSetting(true)}
                    >
                      <i className="fas fa-cog mr-2"></i>
                      Settings
                    </button>
                    <button
                      type="button"
                      className="btn btn-light-danger font-weight-bold btn-sm ml-2"
                      onClick={() =>
                        confirm({
                          title: 'Confirm required',
                          body:
                            'Are you sure you want to dump this team (All member will be disposed!)',
                          onConfirm: handleConfirmDumpTeam,
                        })
                      }
                    >
                      <i className="fas fa-trash mr-2"></i>
                      Dump team
                    </button>
                    <CMSModal
                      title="Settings"
                      subTitle="Update for this team"
                      primaryButtonLabel="Save changes"
                      configs={modalConfigs}
                      isShowFlg={showSetting}
                      fieldTemplate={settingFieldTemplate}
                      onConfirmForm={handleConfirmSetting}
                      onHide={() => setShowSetting(false)}
                      isProcessing={isProcessing}
                    />
                  </>
                )}

              {currentSemester.status !== 3 && isUserInTeam ? (
                <>
                  {!isTeamMatched && !isUserLeader && !currentTeam.lock && (
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
                  {currentSemester.status !== 3 &&
                    !showNoTeamWarn &&
                    !isUserHaveTeam && (
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
    confirm,
    currentSemester.id,
    currentSemester.name,
    currentSemester.status,
    currentTeam,
    currentTeam.leader,
    currentTeam.name,
    currentUser.id,
    handleConfirmDumpTeam,
    handleConfirmSetting,
    handleJoinTeam,
    handleLeaveTeam,
    id,
    isProcessing,
    isTeamMatched,
    isUserHaveTeam,
    isUserInTeam,
    isUserLeader,
    setMeta,
    settingFieldTemplate,
    showNoTeamWarn,
    showSetting,
    userRole,
  ]);

  // ------------------------------------------------------------------

  React.useEffect(() => {
    checkInitAction();
  }, [l, id, checkInitAction]);

  // ------------------------------------------------------------------

  return (
    <>
      {[0, 1].includes(currentSemester.status) ? (
        showNoTeamWarn ? (
          <div className="row" style={{ height: '105%' }}>
            <div className="col-12">
              <Engaging
                className="gutter-b card-stretch"
                bgColor="#FFF4DE"
                imageUrl="/media/svg/illustrations/login-visual-2.svg"
                textColorTitle="danger"
                textColorSubTitle="dark"
                bgSize="50%"
                titleSize="h1"
                title="You have no team"
                action={
                  <Link
                    to="/team?type=teamguide"
                    className="btn btn-danger font-weight-bolder py-2 px-6 mt-3"
                  >
                    Take me there
                  </Link>
                }
                subTitle={
                  <>
                    Looks like you are not a member of any teams...
                    <br />
                    Start by <b>create a team</b> or <b>join one</b> to prepare
                    for a capstone topic.
                  </>
                }
                subTitleSize="lg"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-lg-12 col-xxl-12">
                <TeamHeader
                  teamName={currentTeam?.name || ''}
                  department={currentTeam?.department?.fullLabel}
                  teamType={currentTeam?.privacy ? 'Public' : 'Private'}
                  teamStatus={currentTeam?.status ? 'Assigned' : 'Assigning'}
                  withTopic={currentTeam?.topic}
                />
              </div>
            </div>
            <div className="row">
              <div
                className={`col-lg-12 col-xxl-${
                  userRole === 'student' ? '9' : '12'
                }`}
              >
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
                      <span
                        className={`symbol symbol-light-${
                          (currentTeam?.members?.length ===
                            currentTeam?.maxMembers &&
                            'danger') ||
                          'success'
                        } symbol-45`}
                      >
                        <span className="symbol-label font-weight-bolder font-size-h6">
                          {currentTeam?.members?.length}/
                          {currentTeam?.maxMembers}
                        </span>
                      </span>
                    </div>
                    <Row className="d-flex flex-grow-1 px-8 pb-4">
                      {currentTeam?.members?.length ? (
                        <>
                          <Col sm={12} md={6} lg={6} xl={4}>
                            <Member
                              id={currentTeam?.leader?.value}
                              teamId={currentTeam?.id}
                              name={currentTeam?.leader?.label}
                              email={currentTeam?.leader?.email}
                              isLeader
                              leaderId={currentTeam?.leader?.value}
                              onOperationSuccess={
                                (id && fetchTeam) || fetchOwnTeam
                              }
                            />
                          </Col>
                          {currentTeam?.members
                            .filter(
                              ({ value }) =>
                                value !== currentTeam?.leader?.value
                            )
                            .map(member => (
                              <Col sm={12} md={6} lg={6} xl={4}>
                                <Member
                                  id={member.value}
                                  teamId={currentTeam.id}
                                  name={member.label}
                                  email={member.email}
                                  leaderId={currentTeam?.leader?.value}
                                  onOperationSuccess={
                                    (id && fetchTeam) || fetchOwnTeam
                                  }
                                  role="student"
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
                          Applications history
                        </span>
                        <span className="text-muted font-weight-bold mt-2">
                          Topic that this team applied
                        </span>
                      </div>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip>
                            Amount of pending topics team can send.
                          </Tooltip>
                        }
                      >
                        <span
                          className={`symbol symbol-light-${
                            (currentTeam?.applications?.filter(
                              app => app.status === 0
                            ).length === currentSemester.maxApplications &&
                              'danger') ||
                            'success'
                          } symbol-45`}
                        >
                          <span className="symbol-label font-weight-bolder font-size-h6">
                            {currentTeam?.applications
                              ? currentTeam?.applications?.filter(
                                  app => app.status === 0
                                ).length
                              : 0}
                            /{currentSemester.maxApplications}
                          </span>
                        </span>
                      </OverlayTrigger>
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
                                  leaderId={currentTeam?.leader?.value}
                                  onOperationSuccess={
                                    (id && fetchTeam) || fetchOwnTeam
                                  }
                                />
                              ))
                            ) : (
                              <tr>
                                <td className="text-muted">
                                  No applications found.
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
              {userRole === 'student' && (
                <div className="col-lg-12 col-xxl-3">
                  <UtilityButtonTile
                    className="gutter-b"
                    smallTitle="Join code"
                    baseColor="info"
                    label={currentTeam?.code}
                    clickAbleIcon={currentSemester.status !== 3 && isUserLeader}
                    onIconClick={handleRefreshJoinCode}
                    iconTooltipMsg="Change code"
                    tooltipMsg={
                      <>
                        You can give this code to another student for joining.
                        <br />
                        <br /> Click the "refresh icon" to get new code (Team
                        leader only).
                      </>
                    }
                    buttonIcon={toAbsoluteUrl(
                      '/media/svg/icons/General/Update.svg'
                    )}
                  />

                  {currentTeam.lock ? (
                    <UtilityButtonTile
                      className="gutter-b"
                      smallTitle="Team state"
                      baseColor="danger"
                      label="Locked"
                      onIconClick={handleChangeLockTeam}
                      iconTooltipMsg="Unlock team"
                      clickAbleIcon={
                        currentSemester.status !== 3 &&
                        isUserLeader &&
                        currentTeam?.topic
                      }
                      buttonIcon={toAbsoluteUrl(
                        '/media/svg/icons/General/Lock.svg'
                      )}
                    />
                  ) : (
                    <UtilityButtonTile
                      className="gutter-b"
                      smallTitle="Team state"
                      baseColor="success"
                      label="Unlocked"
                      clickAbleIcon={
                        currentSemester.status !== 3 && isUserLeader
                      }
                      tooltipMsg={
                        <>
                          Lock this team (Locked team can not accept joining
                          from other student)
                          <br />
                          <br /> Click the "lock icon" to lock (Team leader
                          only).
                        </>
                      }
                      iconTooltipMsg="Lock team"
                      onIconClick={handleChangeLockTeam}
                      buttonIcon={toAbsoluteUrl(
                        '/media/svg/icons/General/Unlock.svg'
                      )}
                    />
                  )}
                </div>
              )}
            </div>
          </>
        )
      ) : !id && !isUserHaveTeam ? (
        <div className="row" style={{ height: '105%' }}>
          <div className="col-12">
            <Engaging
              className="gutter-b card-stretch"
              bgColor="#1B283F"
              imageUrl="/media/svg/illustrations/working.svg"
              textColorTitle="white"
              textColorSubTitle="white"
              bgSize="50%"
              titleSize="h1"
              title="Hello"
              action={
                <Link
                  to="/dashboard"
                  className="btn btn-danger font-weight-bolder py-2 px-6 mt-3"
                >
                  Okay
                </Link>
              }
              subTitle={
                <>
                  You don't have access in this semester phase.
                  <br />
                  If this is a problem, consider{' '}
                  <b>contact the administrator.</b>
                </>
              }
              subTitleSize="lg"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col-lg-12 col-xxl-12">
              <TeamHeader
                teamName={currentTeam?.name || ''}
                department={currentTeam?.department?.fullLabel}
                teamType={currentTeam?.privacy ? 'Public' : 'Private'}
                teamStatus={currentTeam?.status ? 'Assigned' : 'Assigning'}
                withTopic={currentTeam?.topic}
              />
            </div>
          </div>
          <div className="row">
            <div
              className={`col-lg-12 col-xxl-${
                userRole === 'student' ? '9' : '12'
              }`}
            >
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
                    <span
                      className={`symbol symbol-light-${
                        (currentTeam?.members?.length ===
                          currentTeam?.maxMembers &&
                          'danger') ||
                        'success'
                      } symbol-45`}
                    >
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
                            id={currentTeam?.leader?.value}
                            teamId={currentTeam?.id}
                            name={currentTeam?.leader?.label}
                            email={currentTeam?.leader?.email}
                            isLeader
                            leaderId={currentTeam?.leader?.value}
                            onOperationSuccess={
                              (id && fetchTeam) || fetchOwnTeam
                            }
                          />
                        </Col>
                        {currentTeam?.members
                          .filter(
                            ({ value }) => value !== currentTeam?.leader?.value
                          )
                          .map(member => (
                            <Col sm={12} md={6} lg={6} xl={4}>
                              <Member
                                id={member.value}
                                teamId={currentTeam.id}
                                name={member.label}
                                email={member.email}
                                leaderId={currentTeam?.leader?.value}
                                onOperationSuccess={
                                  (id && fetchTeam) || fetchOwnTeam
                                }
                                role="student"
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
                        Applications history
                      </span>
                      <span className="text-muted font-weight-bold mt-2">
                        Topic that this team applied
                      </span>
                    </div>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip>
                          Amount of pending topics team can send.
                        </Tooltip>
                      }
                    >
                      <span
                        className={`symbol symbol-light-${
                          (currentTeam?.applications?.filter(
                            app => app.status === 0
                          ).length === currentSemester.maxApplications &&
                            'danger') ||
                          'success'
                        } symbol-45`}
                      >
                        <span className="symbol-label font-weight-bolder font-size-h6">
                          {currentTeam?.applications
                            ? currentTeam?.applications?.filter(
                                app => app.status === 0
                              ).length
                            : 0}
                          /{currentSemester.maxApplications}
                        </span>
                      </span>
                    </OverlayTrigger>
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
                                leaderId={currentTeam?.leader?.value}
                                onOperationSuccess={
                                  (id && fetchTeam) || fetchOwnTeam
                                }
                              />
                            ))
                          ) : (
                            <tr>
                              <td className="text-muted">
                                No applications found.
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
            {userRole === 'student' && (
              <div className="col-lg-12 col-xxl-3">
                <UtilityButtonTile
                  className="gutter-b"
                  smallTitle="Join code"
                  baseColor="info"
                  label={currentTeam?.code}
                  clickAbleIcon={currentSemester.status !== 3 && isUserLeader}
                  onIconClick={handleRefreshJoinCode}
                  iconTooltipMsg="Change code"
                  tooltipMsg={
                    <>
                      You can give this code to another student for joining.
                      <br />
                      <br /> Click the "refresh icon" to get new code (Team
                      leader only).
                    </>
                  }
                  buttonIcon={toAbsoluteUrl(
                    '/media/svg/icons/General/Update.svg'
                  )}
                />

                {currentTeam.lock ? (
                  <UtilityButtonTile
                    className="gutter-b"
                    smallTitle="Team state"
                    baseColor="danger"
                    label="Locked"
                    onIconClick={handleChangeLockTeam}
                    iconTooltipMsg="Unlock team"
                    clickAbleIcon={
                      currentSemester.status !== 3 &&
                      isUserLeader &&
                      currentTeam?.topic
                    }
                    buttonIcon={toAbsoluteUrl(
                      '/media/svg/icons/General/Lock.svg'
                    )}
                  />
                ) : (
                  <UtilityButtonTile
                    className="gutter-b"
                    smallTitle="Team state"
                    baseColor="success"
                    label="Unlocked"
                    clickAbleIcon={currentSemester.status !== 3 && isUserLeader}
                    tooltipMsg={
                      <>
                        Lock this team (Locked team can not accept joining from
                        other student)
                        <br />
                        <br /> Click the "lock icon" to lock (Team leader only).
                      </>
                    }
                    iconTooltipMsg="Lock team"
                    onIconClick={handleChangeLockTeam}
                    buttonIcon={toAbsoluteUrl(
                      '/media/svg/icons/General/Unlock.svg'
                    )}
                  />
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default Team;
