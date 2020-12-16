import React from 'react';

import { useHistory } from 'react-router-dom';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import semesterAtom from 'store/semester';
import userAtom from 'store/user';

import { toAbsoluteUrl } from '_metronic/_helpers';

import { LIST_TOPIC, READ_LECTURER } from 'endpoints';
import { applicationRowActionFormatter, rowActionFormatter } from './constants';
import * as topicTranformer from 'modules/semester/topic/transformers';

import Anouncement from 'components/CMSWidgets/Anouncement';
import QuickAction from 'components/CMSWidgets/QuickAction';
import CMSList from 'components/CMSList';
import StatTile from 'components/CMSWidgets/StatTile';
import DropdownPopover from 'components/DropdownPopover';
import FlowTimeline from 'components/CMSWidgets/FlowTimeline';
import CMSAnotherList from 'components/CMSAnotherList';
import SemesterPhase from 'components/CMSWidgets/SemesterPhase';
import { handleErrors } from 'utils/common';
import request from 'utils/request';

export default React.memo(function LecturerDashboard() {
  const setMeta = useSetRecoilState(metaAtom);
  const currentSemester = useRecoilValue(semesterAtom);
  const currentUser = useRecoilValue(userAtom);

  const history = useHistory();

  const [topicType, setTopicType] = React.useState('Submited');
  const [totalTopic, setTotalTopics] = React.useState(0);
  const [totalMentoring, setTotalMentoring] = React.useState(0);
  const [totalSubmitted, setTotalSubmitted] = React.useState(0);

  const [topicPreviews, setTopicPreviews] = React.useState([]);
  const [flowTimelines, setFlowTimelines] = React.useState([]);
  const [topicNeedFeedback, setTopicNeedFeedback] = React.useState([]);
  const [applications, setApplications] = React.useState([]);

  // --------------------------------------------------------------------

  const handleRouteToTopics = React.useCallback(
    e => {
      if (e) e.preventDefault();
      history.push('/topic');
    },
    [history]
  );

  const handleRouteToSpecificTopic = React.useCallback(
    id => {
      return function () {
        history.push('/' + id);
      };
    },
    [history]
  );

  // ---------------------------------------------------------------------

  const fetchWaitingTopics = React.useCallback(
    depId => {
      request({
        to: LIST_TOPIC.url,
        method: LIST_TOPIC.method,
        params: {
          pageNumber: 1,
          pageSize: 5,
          semesterId: currentSemester.id,
          departmentId: depId,
          status: 0,
        },
      })
        .then(res => {
          if (res.data.data.length) {
            setTopicNeedFeedback(
              res.data.data.map(topicTranformer.downList).map(topic => ({
                labelId: topic.id,
                label: topic.name,
                subLabel: topic.code,
                emailAvatar: '',
                altLabel: topic.submitter.label,
                altLabelLinkTo: `/profile/lecturer/${topic.submitter.value}`,
                altLabelExtended: 'Submit by',
                darkMode: true,
              }))
            );
          }
        })
        .catch(err => {
          handleErrors(err);
        });
    },
    [currentSemester.id]
  );

  const fetchTopicsByStatus = React.useCallback(
    status => {
      request({
        to: LIST_TOPIC.url,
        method: LIST_TOPIC.method,
        params: {
          pageNumber: 1,
          pageSize: 5,
          semesterId: currentSemester.id,
          status: status,
        },
      })
        .then(res => {
          if (res.data.data.length) {
            setTotalTopics(res.data.data.map(topicTranformer.downList).length);
          }
        })
        .catch(err => {
          handleErrors(err);
        });
    },
    [currentSemester.id]
  );

  const fetchTopicsByType = React.useCallback(
    type => {
      let params = {};
      params =
        type === 'mentoring'
          ? {
              isOwnMentorTopic: true,
            }
          : {
              isOwnSubmit: true,
            };
      request({
        to: LIST_TOPIC.url,
        method: LIST_TOPIC.method,
        params: {
          pageNumber: 1,
          pageSize: 5,
          semesterId: currentSemester.id,
          ...params,
        },
      })
        .then(res => {
          if (res.data.data.length) {
            if (type === 'mentoring') {
              setTotalMentoring(
                res.data.data.map(topicTranformer.downList).length
              );
            } else
              setTotalSubmitted(
                res.data.data.map(topicTranformer.downList).length
              );
          }
        })
        .catch(err => {
          handleErrors(err);
        });
    },
    [currentSemester.id]
  );

  const fetchCurrentLecturer = React.useCallback(() => {
    request({
      to: READ_LECTURER(currentUser.id).url,
      method: READ_LECTURER(currentUser.id).method,
    })
      .then(res => {
        const lecturerApproverDepIDs = res.data.data.departments
          .filter(dep => dep.isApprover === true)
          .map(dep => dep.id);
        lecturerApproverDepIDs.map(id => fetchWaitingTopics(id));
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [currentUser.id, fetchWaitingTopics]);

  // --------------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: 'Dashboard',
      breadcrumb: [{ title: 'Dashboard', path: '/dashboard' }],
    });
  }, [setMeta]);

  React.useEffect(() => {
    fetchCurrentLecturer();
    if (currentSemester.status === 0) {
      fetchTopicsByStatus(2);
    }
    if (currentSemester.status === 1) {
      fetchTopicsByStatus(3);
    }
    fetchTopicsByType('mentoring');
    fetchTopicsByType('submitted');
  }, [
    currentSemester.status,
    fetchCurrentLecturer,
    fetchTopicsByStatus,
    fetchTopicsByType,
  ]);

  // My topic
  React.useEffect(() => {
    const response =
      topicType === 'Submited'
        ? [
            {
              id: 1,
              label: 'Capstone Management System',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE13',
              actions: rowActionFormatter(1),
            },
            {
              id: 2,
              label: 'Web Checker System',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE11',
              actions: rowActionFormatter(0),
            },
            {
              id: 3,
              label: 'Example topic name',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              actions: rowActionFormatter(2),
            },
            {
              id: 4,
              label: 'Example topic name 2',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              actions: rowActionFormatter(1),
            },
            {
              id: 5,
              label: 'Example topic name 3',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              actions: rowActionFormatter(0),
            },
            {
              id: 6,
              label: 'Example topic name 4',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE11',
              actions: rowActionFormatter(0),
            },
            {
              id: 7,
              label: 'Example topic name 5',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              actions: rowActionFormatter(2),
            },
            {
              id: 8,
              label: 'Example topic name 5',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              actions: rowActionFormatter(2),
            },
          ]
        : [
            {
              id: 1,
              label: 'Example topic name 2',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              action: rowActionFormatter(1),
            },
            {
              id: 2,
              label: 'Example topic name 3',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              action: rowActionFormatter(0),
            },
            {
              id: 3,
              label: 'Example topic name 4',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE11',
              action: rowActionFormatter(0),
            },
            {
              id: 4,
              label: 'Example topic name 5',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              action: rowActionFormatter(2),
            },
          ];
    setTopicPreviews(response);
  }, [handleRouteToSpecificTopic, topicType]);

  // Applications
  React.useEffect(() => {
    const response = [
      {
        id: 0,
        label: 'Capstone Management System',
        onLabelClick: handleRouteToSpecificTopic(0),
        subLabel: 'FA20SE13',
        actions: applicationRowActionFormatter(10),
      },
      {
        id: 0,
        label: 'Web Checker System',
        onLabelClick: handleRouteToSpecificTopic(0),
        subLabel: 'FA20SE11',
        actions: applicationRowActionFormatter(5),
      },
      {
        id: 0,
        label: 'Example topic name',
        onLabelClick: handleRouteToSpecificTopic(0),
        subLabel: 'FA20SE15',
        actions: applicationRowActionFormatter(2),
      },
      {
        id: 0,
        label: 'Example topic name 2',
        onLabelClick: handleRouteToSpecificTopic(0),
        subLabel: 'FA20SE15',
        actions: applicationRowActionFormatter(2),
      },
      {
        id: 0,
        label: 'Example topic name 3',
        onLabelClick: handleRouteToSpecificTopic(0),
        subLabel: 'FA20SE15',
        actions: applicationRowActionFormatter(2),
      },
      {
        id: 0,
        label: 'Example topic name 4',
        onLabelClick: handleRouteToSpecificTopic(0),
        subLabel: 'FA20SE15',
        actions: applicationRowActionFormatter(2),
      },
    ];
    setApplications(response);
  }, [handleRouteToSpecificTopic]);

  // Flow timelines
  React.useEffect(() => {
    setFlowTimelines([
      {
        date: '12 May',
        content: (
          <div className="font-weight-bolder font-size-lg timeline-content pl-3">
            Start in-capstone phase
          </div>
        ),
      },
      {
        date: '20 May',
        content: (
          <div className="timeline-content flex-row d-flex">
            <span className="font-weight-normal text-muted text-dark-75 pl-3 font-size-lg mr-5">
              Send topic for approvals
              <span className="font-weight-bolder text-dark-75">
                Lam Huu Khanh Phuong, Tran Tuan Anh
              </span>
            </span>
          </div>
        ),
      },
      {
        date: '1 Jun',
        content: (
          <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
            Send report
            <a href="/" className="text-primary ml-1">
              #1
            </a>
          </div>
        ),
      },
      {
        date: '10 Jun',
        content: (
          <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
            Send report
            <a href="/" className="text-primary ml-1">
              #2
            </a>
          </div>
        ),
      },
      {
        date: '15 Jun',
        content: (
          <div className="timeline-content font-weight-bolder font-size-lg text-dark-75 pl-3">
            Send report
            <a href="/" className="text-primary ml-1">
              #3
            </a>
          </div>
        ),
      },
      {
        date: '25 Jun',
        content: (
          <div className="timeline-content flex-row d-flex">
            <span className="font-weight-normal text-muted text-dark-75 pl-3 font-size-lg mr-5">
              Checkpoint meeting with{' '}
              <span className="font-weight-bolder text-dark-75">
                Council SE
              </span>
            </span>
          </div>
        ),
      },
      {
        date: '30 Jun',
        content: (
          <div className="timeline-content font-weight-mormal font-size-lg text-muted pl-3">
            ...
          </div>
        ),
      },
    ]);
  }, []);

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
          {currentSemester.status === 0 && (
            <QuickAction
              className="gutter-b"
              title="Quick topic actions"
              actionsRows={[
                [
                  {
                    className: 'col px-6 py-8 rounded-xl mr-7 mb-7',
                    type: 'danger',
                    iconSrc: toAbsoluteUrl(
                      '/media/svg/icons/Design/Join-1.svg'
                    ),
                    label: 'Apply for mentor',
                    onClick: handleRouteToTopics,
                  },
                  {
                    className: 'col px-6 py-8 rounded-xl mb-7',
                    type: 'success',
                    iconSrc: toAbsoluteUrl('/media/svg/icons/Files/Export.svg'),
                    label: 'Submit topic',
                    onClick: handleRouteToTopics,
                  },
                ],
              ]}
            />
          )}

          {/* Fetch departments to check approver */}
          {currentSemester.status === 0 && (
            <CMSAnotherList
              className="gutter-b"
              title="Topic need feedback"
              subTitle="Consider giving feedback for these topics"
              fallbackMsg="Awaiting for topic submission..."
              rows={topicNeedFeedback}
              darkMode={true}
            />
          )}
        </div>
        <div className="col-lg-6 col-xxl-4">
          <Anouncement
            className="gutter-b"
            date="20 Jun 2020"
            body={
              <>
                Lorem ipsum dolor,
                <br />
                <br /> Consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. <br />
              </>
            }
          />

          <FlowTimeline className="gutter-b" items={flowTimelines} />

          {currentSemester.status === 1 && (
            <div className="row">
              <div className="col-lg-12 col-xxl-12">
                <CMSList
                  className="gutter-b card-stretch"
                  title="Topic applications"
                  rows={applications}
                />
              </div>
            </div>
          )}
        </div>
        <div className="col-lg-6 col-xxl-4">
          <div className="row">
            <div className="col-6">
              <StatTile
                className="gutter-b"
                baseColor="primary"
                iconColor="white"
                dataText={totalTopic}
                desciption="Topics in this semester"
                iconSrc={toAbsoluteUrl(
                  '/media/svg/icons/Communication/Clipboard-list.svg'
                )}
              />
            </div>
            <div className="col-6">
              <StatTile
                className="gutter-b"
                baseColor="white"
                iconColor="primary"
                dataText={totalMentoring}
                desciption="Topic you are mentoring"
                iconSrc={toAbsoluteUrl(
                  '/media/svg/icons/General/Half-star.svg'
                )}
              />
            </div>
          </div>

          {currentSemester.status === 0 && (
            <div className="row">
              <div className="col-12">
                <StatTile
                  className="gutter-b"
                  baseColor="info"
                  iconColor="white"
                  dataText={totalSubmitted}
                  desciption="Submitted"
                  iconSrc={toAbsoluteUrl(
                    '/media/svg/icons/Communication/Urgent-mail.svg'
                  )}
                />
              </div>
            </div>
          )}

          <CMSList
            className="gutter-b"
            title="My topic"
            toolBar={
              <DropdownPopover
                value="Submited"
                items={[
                  {
                    label: 'Submited',
                    value: 'Submited',
                  },
                  {
                    label: 'Mentoring',
                    value: 'Mentoring',
                  },
                ]}
                onChange={value => setTopicType(value)}
              />
            }
            rows={topicPreviews}
          />
        </div>
      </div>
    </>
  );
});
