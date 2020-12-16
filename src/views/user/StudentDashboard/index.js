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
  READ_TEAM,
} from 'endpoints';
import * as TeamTransformer from 'modules/semester/team/transformers';
import { Button } from 'react-bootstrap';
import SemesterPhase from 'components/CMSWidgets/SemesterPhase';
import { handleErrors } from 'utils/common';
import useConfirm from 'utils/confirm';
import toast from 'utils/toast';
import StatTile from 'components/CMSWidgets/StatTile';
import CMSModal from 'components/CMSModal/CMSModal';
import { createTeamAsStudentModalConfigs } from 'modules/semester/team/constants';

export default React.memo(function LecturerDashboard() {
  const confirm = useConfirm();
  const history = useHistory();

  // -------------------------------------------------------------------------

  const [
    currentPublicTeamPreviews,
    setCurrentPublicTeamPreviews,
  ] = React.useState([]);
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
        })
        .catch(handleErrors)
        .finally(() => setIsProcessing(false));
    },
    [currentSemester.id]
  );

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
        .catch(err => {
          handleErrors(err);
        });
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
          .catch(err => {
            handleErrors(err);
          });
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
      .catch(err => {
        handleErrors(err);
      });
  }, [currentSemester.id]);

  const fetchOtherTeams = React.useCallback(
    isPublic => {
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
              transformedRes.map(team => ({
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
        })
        .catch(err => {
          handleErrors(err);
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
  }, [checkUserInTeam, fetchAllTopics, fetchOtherTeams, setMeta]);

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
        <div className="col-lg-6 col-xxl-4">
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

          {currentSemester.status !== 3 && (
            <TopicTeamPreview
              className="card-stretch gutter-b"
              isStudentHaveTeam={isStudentHaveTeam}
              isStudentHaveTopic={isStudentHaveTopic}
              members={userTeam.members}
              topic={userTeam.topic}
            />
          )}

          {currentSemester.status !== 3 &&
            isStudentHaveTeam &&
            isStudentHaveTopic && (
              <CMSList
                className="gutter-b"
                title="Report progress"
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
        </div>
        <div className="col-lg-6 col-xxl-4">
          <Anouncement
            body={
              <>
                Lorem ipsum dolor sit amet, <br />
                <br />
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor. Ut enim ad minim
                veniam sed do eiusmod tempor incididunt. <br />
                <br />
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor. Ut enim ad minim
                veniam sed do eiusmod tempor incididunt. Consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et{' '}
              </>
            }
            date="2020-06-06"
          />
        </div>
        <div className="col-lg-6 col-xxl-4">
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
                  desciption="Teams created"
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

          {![0, 3].includes(currentSemester.status) && !isStudentHaveTopic && (
            <NumberOfTopic
              className="gutter-b"
              totalAvailable={totalAvailableTopics}
              total={totalTopics}
            />
          )}

          {currentSemester.status !== 3 &&
            isStudentHaveTeam &&
            isStudentHaveTopic && <FlowTimeline className=" gutter-b" />}

          {currentSemester.status !== 3 &&
            !isStudentHaveTeam &&
            !isStudentHaveTopic && (
              <CMSList
                title="Available public team"
                fallbackMsg="No team yet, be the first to create team now!"
                rows={currentPublicTeamPreviews}
                toolBar={<Link to="/team">View all teams</Link>}
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
