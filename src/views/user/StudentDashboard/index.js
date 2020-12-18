import React from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import semesterAtom from 'store/semester';

import TopicTeamPreview from 'components/CMSWidgets/TopicTeamPreview';
import Anouncement from 'components/CMSWidgets/Anouncement';
import FlowTimeline from 'components/CMSWidgets/FlowTimeline';
import QuickAction from 'components/CMSWidgets/QuickAction';
import { toAbsoluteUrl } from '_metronic/_helpers';
import NumberOfTopic from 'components/CMSWidgets/NumberOfTopic';
import CMSList from 'components/CMSList';
import { Link, useHistory } from 'react-router-dom';
import request from 'utils/request';
import {
  CREATE_TEAM,
  JOIN_TEAM,
  LIST_TEAM,
  LIST_TOPIC,
  LIST_ANNOUNCEMENT,
  READ_TEAM,
} from 'endpoints';
import * as TeamTransformer from 'modules/semester/team/transformers';
import * as AnouncementTransformer from 'modules/semester/announcement/transformers';

import { Button } from 'react-bootstrap';
import SemesterPhase from 'components/CMSWidgets/SemesterPhase';
import { handleErrors } from 'utils/common';
import useConfirm from 'utils/confirm';
import toast from 'utils/toast';
import StatTile from 'components/CMSWidgets/StatTile';
import CMSModal from 'components/CMSModal/CMSModal';
import { createTeamAsStudentModalConfigs } from 'modules/semester/team/constants';
import Engaging2 from 'components/CMSWidgets/Engaging2';
import {
  statusClass,
  statusTitles,
} from 'modules/semester/team/application/constants';
import { formatRelative, subMinutes } from 'date-fns';
import { ProgressChart } from 'components/CMSWidgets/ProgressChart';
import Engaging from 'components/CMSWidgets/Engaging';

export default React.memo(function LecturerDashboard() {
  const confirm = useConfirm();
  const history = useHistory();

  // -------------------------------------------------------------------------

  const [
    currentPublicTeamPreviews,
    setCurrentPublicTeamPreviews,
  ] = React.useState([]);
  const [teamApplications, setTeamApplications] = React.useState([]);
  const [anouncements, setAnouncements] = React.useState([]);

  const [numberOfTeams, setNumberOfTeams] = React.useState(0);
  const [totalTopics, setTotalTopics] = React.useState(0);
  const [totalAvailableTopics, setTotalAvailableTopics] = React.useState(0);

  // -------------------------------------------------------------------------

  const [isStudentHaveTeam, setIsStudentHaveTeam] = React.useState(false);
  const [isStudentHaveTopic, setIsStudentHaveTopic] = React.useState(false);

  // -------------------------------------------------------------------------

  const [userTeam, setUserTeam] = React.useState([]);

  // -------------------------------------------------------------------------

  const setMeta = useSetRecoilState(metaAtom);
  const currentSemester = useRecoilValue(semesterAtom);

  // -------------------------------------------------------------------------

  const [showCreateTeam, setShowCreateTeam] = React.useState(false);
  const [showJoinCode, setShowJoinCode] = React.useState(false);
  const [fieldTemplate, setFieldTemplate] = React.useState({});
  const [modalConfigs, setModalConfigs] = React.useState([]);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // -------------------------------------------------------------------------

  const handleJoinWithCode = React.useCallback(
    data => {
      request({
        to: JOIN_TEAM(0).url,
        method: JOIN_TEAM(0).method,
        params: {
          semesterId: currentSemester.id,
          teamCode: data.code,
        },
      })
        .then(res => {
          setShowJoinCode(false);
          history.push(`/team/${res.data.data}`);
          toast.success(`Joined!`);
        })
        .catch(err => {});
    },
    [currentSemester.id, history]
  );

  const onConfirmJoinPublicTeam = React.useCallback(
    (id, code, name) => {
      return () => {
        request({
          to: JOIN_TEAM(id).url,
          method: JOIN_TEAM(id).method,
          params: {
            teamId: id,
            semesterId: currentSemester.id,
            teamCode: code,
          },
        })
          .then(() => {
            history.push(`/team/${id}`);
            toast.success(`Joined, you are now a member of ${name}!`);
          })
          .catch(err => {});
      };
    },
    [currentSemester.id, history]
  );

  const handleJoinPublicTeam = React.useCallback(
    (...args) => {
      return () => {
        confirm({
          title: 'Confirm required',
          body: 'Are you sure you want to join this team?',
          onConfirm: onConfirmJoinPublicTeam(...args),
        });
      };
    },
    [confirm, onConfirmJoinPublicTeam]
  );

  // ---------------------------------------------------------------------

  const fetchAllTopics = React.useCallback(() => {
    request({
      to: LIST_TOPIC.url,
      method: LIST_TOPIC.method,
      params: {
        semesterId: currentSemester.id,
      },
    })
      .then(res => {
        setTotalTopics(res.data?.totalRecords);
        setTotalAvailableTopics(
          res.data?.data?.filter(topic => topic.teamMembers.length === 0).length
        );
      })
      .catch(err => {});
  }, [currentSemester.id]);

  const fetchOtherTeams = React.useCallback(
    isPublic => {
      setIsProcessing(true);
      request({
        to: LIST_TEAM.url,
        method: LIST_TEAM.method,
        params: isPublic
          ? {
              isPublic: true,
              pageNumber: 1,
              pageSize: 4,
              semesterId: currentSemester.id,
            }
          : {
              pageNumber: 1,
              pageSize: 4,
              semesterId: currentSemester.id,
            },
      })
        .then(res => {
          const transformedRes = res.data?.data?.map(TeamTransformer.down);
          console.log(transformedRes);
          if (isPublic) {
            setCurrentPublicTeamPreviews(
              transformedRes
                .filter(team => team.members.length < team.maxMembers)
                .map(team => ({
                  label: team.name,
                  subLabel: (
                    <>
                      <b>Lead by </b>
                      {team.leader.label}
                    </>
                  ),
                  actions: (
                    <button
                      className="btn btn-light-info font-weight-bolder"
                      onClick={handleJoinPublicTeam(
                        team.id,
                        team.code,
                        team.name
                      )}
                    >
                      Apply
                    </button>
                  ),
                }))
            );
          } else {
            setNumberOfTeams(transformedRes.length);
          }
          setIsProcessing(false);
        })
        .catch(err => {
          setIsProcessing(false);
        });
    },
    [currentSemester.id, handleJoinPublicTeam]
  );

  const checkUserInTeam = React.useCallback(() => {
    request({
      to: READ_TEAM(0).url,
      method: READ_TEAM(0).method,
      params: {
        semesterId: currentSemester.id,
      },
    })
      .then(res => {
        const transformedRes = TeamTransformer.down(res.data.data);
        setTeamApplications(
          transformedRes.applications
            .filter(app => [0, 2].includes(app.status))
            .map(app => ({
              label: app.topic.name,
              subLabel: formatRelative(
                subMinutes(
                  new Date(app.createdAt),
                  new Date().getTimezoneOffset()
                ),
                new Date()
              ),
              labelLinkTo: `/topic/${app.topic.id}`,
              actions: (
                <span
                  className={`label label-lg label-light-${
                    statusClass[app.status]
                  } label-inline`}
                >
                  {statusTitles[app.status]}
                </span>
              ),
            }))
        );
        setIsStudentHaveTopic(!!transformedRes.topic.label);
        setIsStudentHaveTeam(true);
        setUserTeam(transformedRes);
      })
      .catch(() => {
        setIsStudentHaveTeam(false);
        fetchOtherTeams(true);
        setModalConfigs(createTeamAsStudentModalConfigs(currentSemester.id));
      });
  }, [currentSemester.id, fetchOtherTeams]);

  const onCreateTeam = React.useCallback(
    fieldData => {
      setIsProcessing(true);
      request({
        to: CREATE_TEAM.url,
        method: CREATE_TEAM.method,
        data: {
          ...fieldData,
          semesterId: Number(currentSemester.id),
        },
        params: {
          semesterId: currentSemester.id,
        },
      })
        .then(res => {
          toast.success('Create team successfully');
          setShowCreateTeam(false);
          setFieldTemplate({});
          checkUserInTeam();
          fetchOtherTeams();
          fetchAllTopics();
        })
        .catch(handleErrors)
        .finally(() => setIsProcessing(false));
    },
    [checkUserInTeam, currentSemester.id, fetchAllTopics, fetchOtherTeams]
  );

  const fetchAnouncements = React.useCallback(() => {
    request({
      to: LIST_ANNOUNCEMENT(currentSemester.id).url,
      method: LIST_ANNOUNCEMENT(currentSemester.id).method,
    })
      .then(res => {
        console.log(
          res.data.data
            .map(AnouncementTransformer.down)
            .filter(anounce => anounce.role === 0)
        );
        setAnouncements(
          res.data.data
            .map(AnouncementTransformer.down)
            .filter(anounce => anounce.role === 0)
        );
      })
      .catch(err => {});
  }, [currentSemester.id]);

  // -------------------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: 'Dashboard',
      breadcrumb: [{ title: 'Dashboard', path: '/dashboard' }],
    });
  }, [setMeta]);

  React.useEffect(() => {
    checkUserInTeam();
    fetchOtherTeams();
    fetchAllTopics();
    fetchAnouncements();
  }, [
    checkUserInTeam,
    fetchAllTopics,
    fetchAnouncements,
    fetchOtherTeams,
    setMeta,
  ]);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <SemesterPhase
            phaseStatus={currentSemester.status}
            semesterName={currentSemester.name}
            className="gutter-b"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-xxl-4">
          <Engaging
            className="gutter-b"
            bgColor="#8950FC"
            bgSize="40%"
            title="Semester over"
            textColorTitle="white"
            textColorSubTitle="white"
            imageUrl="/media/svg/humans/custom-8.svg"
            subTitle={
              <>All activities are finished, all informations are view only</>
            }
          />

          {currentSemester.status !== 3 && (
            <TopicTeamPreview
              className="card-stretch gutter-b"
              isStudentHaveTeam={isStudentHaveTeam}
              isStudentHaveTopic={isStudentHaveTopic}
              members={userTeam.members}
              topic={userTeam.topic}
            />
          )}

          {currentSemester.status !== 3 && !isStudentHaveTeam && (
            <QuickAction
              className="gutter-b"
              title="Quick team actions"
              subTitle="This will make you have a team in no time."
              actionsRows={[
                [
                  {
                    className: 'col px-6 py-8 rounded-xl mr-7 mb-7',
                    type: 'primary',
                    iconSrc: toAbsoluteUrl(
                      '/media/svg/icons/Communication/Address-card.svg'
                    ),
                    label: 'Create a team',
                    onClick: () => setShowCreateTeam(true),
                  },
                  {
                    className: 'col px-6 py-8 rounded-xl mb-7',
                    type: 'info',
                    iconSrc: toAbsoluteUrl(
                      '/media/svg/icons/Code/Lock-circle.svg'
                    ),
                    label: 'Join team with code',
                    onClick: () => setShowJoinCode(true),
                  },
                ],
              ]}
            />
          )}

          {currentSemester.status === 0 && !isStudentHaveTeam && (
            <Engaging2
              className="gutter-b"
              title={
                <>
                  <span>Welcome</span>
                  <br />
                  <br />
                  This is your dasboard, from here you can quickly start with
                  some actions before assigning for a capstone topic.
                </>
              }
              textColorTitle="white"
              textColorSubTitle="white"
              svgVariant={7}
              bgColor="danger"
            />
          )}

          {currentSemester.status === 1 &&
            isStudentHaveTeam &&
            !isStudentHaveTopic && (
              <Engaging2
                className="gutter-b"
                title={
                  <>
                    Assigning phase is now! apply matching for a topic and
                    arrange an interview with mentors.
                  </>
                }
                textColorTitle="white"
                textColorSubTitle="white"
                svgVariant={12}
                bgColor="primary"
              />
            )}

          {currentSemester.status === 1 &&
            isStudentHaveTeam &&
            isStudentHaveTopic && (
              <Engaging2
                className="gutter-b"
                title={
                  <>
                    <span>You are all set!</span>
                    <br />
                    <br />
                    When semester reaches next phase, all activities will be
                    started.
                  </>
                }
                textColorTitle="white"
                subTitle="Happy capstoning!"
                textColorSubTitle="white"
                svgVariant={4}
                bgColor="success"
              />
            )}
        </div>
        <div className="col-lg-6 col-xxl-4">
          <StatTile
            dataText={numberOfTeams}
            className="gutter-b"
            desciption="Teams in this semester"
            iconColor="white"
            iconSrc={toAbsoluteUrl('/media/svg/icons/Communication/Group.svg')}
            baseColor="danger"
          />

          <StatTile
            className="gutter-b"
            dataText={totalTopics}
            iconColor="white"
            desciption="Topics in this semester"
            iconSrc={toAbsoluteUrl('/media/svg/icons/Design/Pixels.svg')}
          />

          {currentSemester.status !== 3 && (
            <>
              <Anouncement announcements={anouncements} />
              <FlowTimeline className=" gutter-b" />
            </>
          )}
        </div>
        <div className="col-lg-6 col-xxl-4">
          {currentSemester.status === 3 && (
            <>
              <Anouncement announcements={anouncements} />
              <FlowTimeline className=" gutter-b" />
            </>
          )}
          {!isStudentHaveTopic && (
            <div className="row">
              <div
                className={`col-${
                  (currentSemester.status === 0 && '6') || '12'
                }`}
              >
                <StatTile
                  dataText={numberOfTeams}
                  className="gutter-b"
                  desciption="Teams in this semester"
                  iconColor="white"
                  iconSrc={toAbsoluteUrl(
                    '/media/svg/icons/Communication/Group.svg'
                  )}
                  baseColor="danger"
                />
              </div>

              {currentSemester.status === 0 && (
                <div className="col-6">
                  <StatTile
                    className="gutter-b"
                    dataText={totalTopics}
                    iconColor="white"
                    desciption="Topics incomming"
                    toolTipMsg="Expected topics will be available when semester reaches next phase."
                    iconSrc={toAbsoluteUrl(
                      '/media/svg/icons/Design/Pixels.svg'
                    )}
                  />
                </div>
              )}
            </div>
          )}

          {currentSemester.status === 0 && isStudentHaveTeam && (
            <Engaging2
              className="gutter-b"
              title={
                <>
                  <span>Topics comming soon!</span>
                  <br />
                  <br />
                  Topics will be published when semester reaches next phase,
                  keep track of the timeline.
                </>
              }
              textColorTitle="white"
              subTitle="Please be patient..."
              textColorSubTitle="white"
              svgVariant={3}
              bgColor="info"
            />
          )}

          {![0, 2, 3].includes(currentSemester.status) && (
            <NumberOfTopic
              className="gutter-b"
              totalAvailable={totalAvailableTopics}
              total={totalTopics}
            />
          )}

          {currentSemester.status !== 3 &&
            !isStudentHaveTeam &&
            !isStudentHaveTopic && (
              <CMSList
                title="Available public team"
                fallbackMsg="No team available!"
                rows={currentPublicTeamPreviews}
                toolBar={<Link to="/team">View all teams</Link>}
                isLoading={isProcessing}
              />
            )}

          {currentSemester.status === 1 &&
            isStudentHaveTeam &&
            !isStudentHaveTopic && (
              <CMSList
                title="Applications status"
                fallbackMsg="No applications!"
                rows={teamApplications}
                toolBar={<Link to="/my-team">View all</Link>}
                isLoading={isProcessing}
              />
            )}

          {currentSemester.status === 2 &&
            isStudentHaveTeam &&
            isStudentHaveTopic && (
              <CMSList
                className="gutter-b"
                title="Your team reports"
                fallbackMsg="No reports found from team..."
                rows={[
                  {
                    label: 'Report #1',
                    subLabel: 'At 2020-03-03',
                    actions: (
                      <button class="btn btn-light">
                        <i class="fas fa-download p-0"></i>
                      </button>
                    ),
                  },
                ]}
                toolBar={<Button>Send report</Button>}
              />
            )}

          {currentSemester.status === 2 && (
            <ProgressChart
              title="Checkpoints progress"
              subTitle="Overall status of checkpoints"
              percent={75}
              baseColor="info"
            />
          )}
        </div>
      </div>
      <CMSModal
        isShowFlg={showCreateTeam}
        onHide={() => setShowCreateTeam(false)}
        title="Create your team"
        subTitle="Before you can match a topic in this semester is you have to have a team"
        configs={modalConfigs}
        fieldTemplate={fieldTemplate}
        onConfirmForm={onCreateTeam}
        isProcessing={isProcessing}
      />
      <CMSModal
        isShowFlg={showJoinCode}
        onHide={() => setShowJoinCode(false)}
        title="Join team with code"
        fieldTemplate={{
          code: '',
        }}
        configs={[
          {
            type: 'text',
            name: 'code',
            label: 'Code',
            smallLabel: 'Enter team code to quickly join a team',
          },
        ]}
        onConfirmForm={handleJoinWithCode}
        primaryButtonLabel="Join"
        isProcessing={isProcessing}
      />
    </>
  );
});
