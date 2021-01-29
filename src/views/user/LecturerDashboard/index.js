import React from 'react';

import { Link, useHistory } from 'react-router-dom';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import semesterAtom from 'store/semester';
import userAtom from 'store/user';

import { toAbsoluteUrl } from '_metronic/_helpers';

import {
  CREATE_TOPIC,
  LIST_ANNOUNCEMENT,
  LIST_TIMELINES,
  LIST_TOPIC,
  READ_LECTURER,
  READ_TOPIC,
} from 'endpoints';
import { applicationRowActionFormatter, rowActionFormatter } from './constants';
import * as topicTranformer from 'modules/semester/topic/transformers';
import * as AnouncementTransformer from 'modules/semester/announcement/transformers';
import * as timelineTransformer from 'modules/timelines/transformers';

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
import CMSModal from 'components/CMSModal/CMSModal';

import * as constants from 'modules/semester/topic/constants';
import * as transformers from 'modules/semester/topic/transformers';
import toast from 'utils/toast';
import Engaging2 from 'components/CMSWidgets/Engaging2';

export default React.memo(function LecturerDashboard() {
  const setMeta = useSetRecoilState(metaAtom);
  const currentSemester = useRecoilValue(semesterAtom);
  const currentUser = useRecoilValue(userAtom);

  const history = useHistory();

  const [topicType, setTopicType] = React.useState('Mentoring');
  const [selectedDep, setSelectedDep] = React.useState('');
  const [totalTopic, setTotalTopics] = React.useState(0);
  const [totalMentoring, setTotalMentoring] = React.useState(0);
  const [totalSubmitted, setTotalSubmitted] = React.useState(0);

  const [topicPreviews, setTopicPreviews] = React.useState([]);
  const [flowTimelines, setFlowTimelines] = React.useState([]);
  const [topicNeedFeedback, setTopicNeedFeedback] = React.useState([]);
  const [applications, setApplications] = React.useState([]);
  const [anouncements, setAnouncements] = React.useState([]);
  const [currentLecturerDept, setCurrentLecturerDept] = React.useState([]);

  const [fieldTemplate, setFieldTemplate] = React.useState({});
  const [showCreate, setShowCreate] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // ---------------------------------------------------------------------

  const fetchTimelines = React.useCallback(
    depId => {
      console.log(depId);
      setIsProcessing(true);
      request({
        to: LIST_TIMELINES(currentSemester.id).url,
        method: LIST_TIMELINES(currentSemester.id).method,
        params: {
          departmentId: depId,
        },
      })
        .then(res => {
          console.log(res.data.data);
          if (res.data.data) {
            console.log(timelineTransformer.downLecturer(res.data.data));
            setFlowTimelines(timelineTransformer.downLecturer(res.data.data));
            setIsProcessing(false);
          }
        })
        .catch(err => {
          handleErrors(err);
        });
    },
    [currentSemester.id]
  );

  const fetchTopicApplications = React.useCallback(id => {
    if (id) {
      request({
        to: READ_TOPIC(id).url,
        method: READ_TOPIC(id).method,
      })
        .then(res => {
          const transformedRes = transformers.downRead(res.data.data);
          if (
            transformedRes.applications.some(
              application => application.status === 0
            )
          ) {
            setApplications(old => [
              ...old,
              {
                id: transformedRes.id,
                label: transformedRes.name,
                labelLinkTo: `/topic/${id}`,
                subLabel: transformedRes.code,
                actions: applicationRowActionFormatter(
                  transformedRes.applications.filter(
                    application => application.status === 0
                  ).length,
                  transformedRes.id
                ),
              },
            ]);
          }
        })
        .catch(err => {
          handleErrors(err);
        });
    }
  }, []);

  const fetchWaitingTopics = React.useCallback(
    depId => {
      setIsProcessing(true);
      request({
        to: LIST_TOPIC.url,
        method: LIST_TOPIC.method,
        params: {
          pageNumber: 1,
          pageSize: 2,
          semesterId: currentSemester.id,
          departmentId: depId,
          status: 0,
        },
      })
        .then(res => {
          if (res.data.data.length) {
            let transformedRes = res?.data?.data
              .map(topicTranformer.downList)
              .map(topic => ({
                labelId: topic.id,
                label: topic.name,
                subLabel: topic.department.fullLabel,
                emailAvatar: '',
                altLabel: topic.submitter.label,
                altLabelLinkTo: `/profile/lecturer/${topic.submitter.value}`,
                altLabelExtended: 'Submit by',
                darkMode: true,
              }));
            setTopicNeedFeedback(old => [...old, ...transformedRes]);
            setIsProcessing(false);
          }
        })
        .catch(err => {
          handleErrors(err);
        });
    },
    [currentSemester.id]
  );

  const fetchTotalTopicsByStatus = React.useCallback(
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

  const fetchTotalTopicsByType = React.useCallback(
    type => {
      setIsProcessing(true);
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
            const transformedres = res.data.data.map(topicTranformer.downList);
            if (type === 'mentoring') {
              setTotalMentoring(transformedres.length);
              transformedres
                .map(topic => topic.id)
                .map(id => fetchTopicApplications(id));
            } else {
              setTotalSubmitted(transformedres.length);
            }
          }
          setIsProcessing(false);
        })
        .catch(err => {
          handleErrors(err);
        });
    },
    [currentSemester.id, fetchTopicApplications]
  );

  const fetchTopicsByType = React.useCallback(
    type => {
      let params = {};
      params =
        type === 'Mentoring'
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
          const transformedres = res.data.data.map(topicTranformer.downList);
          setTopicPreviews(
            transformedres
              .map(topic => ({
                id: topic.id,
                label: topic.name,
                subLabel: topic.code,
                labelLinkTo: `/topic/${topic.id}`,
                actions: rowActionFormatter(topic.status),
              }))
              .slice(0, 4)
          );
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
        console.log(res.data.data);
        const lecturerApproverDepIDs = res.data.data.departments
          .filter(dep => dep.isApprover === true)
          .map(dep => dep.id);
        lecturerApproverDepIDs.map(id => fetchWaitingTopics(id));
        setCurrentLecturerDept(
          res.data.data.departments.map(dep => ({
            label: dep.name,
            value: dep.id,
          }))
        );
        setSelectedDep(res.data.data.departments[0].id);
        fetchTimelines(res.data.data.departments[0].id);
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [currentUser.id, fetchTimelines, fetchWaitingTopics]);

  const fetchAnouncements = React.useCallback(() => {
    request({
      to: LIST_ANNOUNCEMENT(currentSemester.id).url,
      method: LIST_ANNOUNCEMENT(currentSemester.id).method,
    })
      .then(res => {
        setAnouncements(
          res.data.data
            .map(AnouncementTransformer.down)
            .filter(anounce => anounce.role === 2)
        );
      })
      .catch(err => {});
  }, [currentSemester.id]);

  const fetchInit = React.useCallback(() => {
    fetchCurrentLecturer();
    if (currentSemester.status === 0) {
      fetchTotalTopicsByStatus(2);
    }
    if (currentSemester.status === 1) {
      fetchTotalTopicsByStatus(3);
    }
    if (currentSemester.status === 2) {
      fetchTotalTopicsByStatus(4);
    }
    if (currentSemester.status === 3) {
      fetchTotalTopicsByStatus(4);
    }
    fetchTotalTopicsByType('mentoring');
    fetchTotalTopicsByType('submitted');
    fetchAnouncements();
  }, [
    currentSemester.status,
    fetchAnouncements,
    fetchCurrentLecturer,
    fetchTotalTopicsByStatus,
    fetchTotalTopicsByType,
  ]);

  const handleCreate = React.useCallback(
    fieldData => {
      try {
        setIsProcessing(true);
        const data = new FormData();
        fieldData = {
          ...transformers.up(fieldData),
          semesterId: Number(currentSemester.id),
          submitterId: currentUser.id,
        };
        for (const i of Object.keys(fieldData)) {
          if (!fieldData?.[i]) continue;
          if (fieldData[i]?.constructor?.name !== 'File') {
            data.append(i, fieldData[i]);
          } else {
            data.append(i, fieldData[i], fieldData[i].name);
          }
        }
        request({
          to: CREATE_TOPIC.url,
          method: CREATE_TOPIC.method,
          data: data,
          params: {
            semesterId: currentSemester.id,
          },
        })
          .then(res => {
            toast.success('Create topic successfully');
            setShowCreate(false);
            setFieldTemplate({});
            fetchInit();
          })
          .catch(handleErrors)
          .finally(() => setIsProcessing(false));
      } catch (err) {
        handleErrors(err);
        setIsProcessing(false);
      }
    },
    [currentSemester.id, currentUser.id, fetchInit]
  );

  // --------------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: 'Dashboard',
      breadcrumb: [{ title: 'Dashboard', path: '/dashboard' }],
    });
  }, [setMeta]);

  React.useEffect(() => {
    fetchInit();
  }, [
    currentSemester.status,
    fetchCurrentLecturer,
    fetchInit,
    fetchTotalTopicsByStatus,
    fetchTotalTopicsByType,
  ]);

  // My topic
  React.useEffect(() => {
    if (topicType === 'Submitted') {
      fetchTopicsByType('Submitted');
    } else if (topicType === 'Mentoring') {
      fetchTopicsByType('Mentoring');
    }
  }, [fetchTopicsByType, topicType]);

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
          {currentSemester.status === 3 && (
            <Anouncement announcements={anouncements} />
          )}

          {currentSemester.status === 0 && (
            <Engaging2
              className="gutter-b"
              title={
                <>
                  <span>Welcome</span>
                  <br />
                  <br />
                  This is your dasboard, from here you can quickly start with
                  some actions for this semester.
                </>
              }
              textColorTitle="white"
              subTitle="Start by submit a topic or join mentoring a topic."
              textColorSubTitle="white"
              svgVariant={4}
              bgColor="primary"
            />
          )}

          {currentSemester.status === 0 && (
            <QuickAction
              className="gutter-b"
              title="Quick topic actions"
              subTitle="This will help you become a mentor or submit a topic in no time."
              actionsRows={[
                [
                  {
                    className: 'col px-6 py-8 rounded-xl mr-7 mb-7',
                    type: 'danger',
                    iconSrc: toAbsoluteUrl(
                      '/media/svg/icons/Design/Join-1.svg'
                    ),
                    label: 'Apply for mentor',
                    onClick: () => history.push('/topic?type=applymentor'),
                  },
                  {
                    className: 'col px-6 py-8 rounded-xl mb-7',
                    type: 'success',
                    iconSrc: toAbsoluteUrl('/media/svg/icons/Files/Export.svg'),
                    label: 'Submit topic',
                    onClick: () => setShowCreate(true),
                  },
                ],
              ]}
            />
          )}

          {[1, 2].includes(currentSemester.status) && (
            <FlowTimeline
              semesterName={currentSemester.name}
              className="gutter-b"
              items={flowTimelines}
              toolBar={
                <DropdownPopover
                  value={selectedDep}
                  items={currentLecturerDept}
                  onChange={fetchTimelines}
                />
              }
            />
          )}

          {currentSemester.status === 0 && (
            <>
              {topicNeedFeedback?.length ? (
                <CMSAnotherList
                  className="gutter-b"
                  title="Latest topics need feedback"
                  subTitle="Consider giving feedback for these topics"
                  fallbackMsg="Awaiting for topic submission..."
                  rows={topicNeedFeedback.slice(0, 4)}
                  darkMode={true}
                  isLoading={isProcessing}
                  toolBar={
                    <Link to={`/topic?type=needfeedback`}>View all</Link>
                  }
                />
              ) : (
                <></>
              )}
            </>
          )}
        </div>

        <div className="col-lg-6 col-xxl-4">
          {currentSemester.status !== 3 && (
            <Anouncement announcements={anouncements} />
          )}

          {currentSemester.status === 1 && (
            <div className="row">
              <div className="col-lg-12 col-xxl-12">
                <CMSList
                  className="gutter-b card-stretch"
                  title="Topic applications"
                  rows={applications}
                  fallbackMsg="No application available..."
                  isLoading={isProcessing}
                />
              </div>
            </div>
          )}

          {[0, 3].includes(currentSemester.status) && (
            <FlowTimeline
              semesterName={currentSemester.name}
              className="gutter-b"
              items={flowTimelines}
              toolBar={
                <DropdownPopover
                  value={selectedDep}
                  items={currentLecturerDept}
                  onChange={fetchTimelines}
                />
              }
            />
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

          {[0, 1].includes(currentSemester.status) && (
            <CMSList
              className="gutter-b"
              title="My latest topic status"
              toolBar={
                <DropdownPopover
                  value={topicType}
                  items={[
                    {
                      label: 'Submitted',
                      value: 'Submitted',
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
              isLoading={isProcessing}
              fallbackMsg="No topic found..."
            />
          )}
        </div>
      </div>
      <CMSModal
        isShowFlg={showCreate}
        onHide={() => setShowCreate(false)}
        configs={constants.submitterModalConfigs(currentSemester.id)}
        title="Create new topic"
        subTitle="Submit new topic to this capstone semester"
        onConfirmForm={handleCreate}
        fieldTemplate={fieldTemplate}
        isProcessing={isProcessing}
      />
    </>
  );
});
