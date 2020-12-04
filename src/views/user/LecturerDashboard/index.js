import React from 'react';

import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import Anouncement from 'components/CMSWidgets/Anouncement';
import QuickAction from 'components/CMSWidgets/QuickAction';
import { toAbsoluteUrl } from '_metronic/_helpers';
import CMSList from 'components/CMSList';
import { applicationRowActionFormatter, rowActionFormatter } from './constants';
import StatTile from 'components/CMSWidgets/StatTile';
import { useHistory } from 'react-router-dom';
import DropdownPopover from 'components/DropdownPopover';
import FlowTimeline from 'components/CMSWidgets/FlowTimeline';
import CMSAnotherList from 'components/CMSAnotherList';

export default React.memo(function LecturerDashboard() {
  const setMeta = useSetRecoilState(metaAtom);
  const history = useHistory();
  const [topicType, setTopicType] = React.useState('Submited');
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

  // --------------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: 'Dashboard',
      breadcrumb: [{ title: 'Dashboard', path: '/dashboard' }],
    });
  }, [setMeta]);

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
              action: rowActionFormatter(1),
            },
            {
              id: 2,
              label: 'Web Checker System',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE11',
              action: rowActionFormatter(0),
            },
            {
              id: 3,
              label: 'Example topic name',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              action: rowActionFormatter(2),
            },
            {
              id: 4,
              label: 'Example topic name 2',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              action: rowActionFormatter(1),
            },
            {
              id: 5,
              label: 'Example topic name 3',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              action: rowActionFormatter(0),
            },
            {
              id: 6,
              label: 'Example topic name 4',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE11',
              action: rowActionFormatter(0),
            },
            {
              id: 7,
              label: 'Example topic name 5',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              action: rowActionFormatter(2),
            },
            {
              id: 8,
              label: 'Example topic name 5',
              onLabelClick: handleRouteToSpecificTopic(0),
              subLabel: 'FA20SE15',
              action: rowActionFormatter(2),
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
        action: applicationRowActionFormatter(10),
      },
      {
        id: 0,
        label: 'Web Checker System',
        onLabelClick: handleRouteToSpecificTopic(0),
        subLabel: 'FA20SE11',
        action: applicationRowActionFormatter(5),
      },
      {
        id: 0,
        label: 'Example topic name',
        onLabelClick: handleRouteToSpecificTopic(0),
        subLabel: 'FA20SE15',
        action: applicationRowActionFormatter(2),
      },
      {
        id: 0,
        label: 'Example topic name 2',
        onLabelClick: handleRouteToSpecificTopic(0),
        subLabel: 'FA20SE15',
        action: applicationRowActionFormatter(2),
      },
      {
        id: 0,
        label: 'Example topic name 3',
        onLabelClick: handleRouteToSpecificTopic(0),
        subLabel: 'FA20SE15',
        action: applicationRowActionFormatter(2),
      },
      {
        id: 0,
        label: 'Example topic name 4',
        onLabelClick: handleRouteToSpecificTopic(0),
        subLabel: 'FA20SE15',
        action: applicationRowActionFormatter(2),
      },
    ];
    setApplications(response);
  }, [handleRouteToSpecificTopic]);

  // Flow timelines
  React.useEffect(() => {
    setFlowTimelines([
      {
        date: '12 Jun',
        content: (
          <div className="font-weight-bolder font-size-lg timeline-content pl-3">
            Start in-capstone phase
          </div>
        ),
      },
      {
        date: '12 Jun',
        content: (
          <div className="timeline-content flex-row d-flex">
            <span className="font-weight-normal text-muted text-dark-75 pl-3 font-size-lg mr-5">
              Checkpoint meeting with{' '}
              <span className="font-weight-bolder text-dark-75">
                Lam Huu Khanh Phuong, Tran Tuan Anh
              </span>
            </span>
          </div>
        ),
      },
      {
        date: '12 Jun',
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
        date: '12 Jun',
        content: (
          <div className="timeline-content font-weight-mormal font-size-lg text-muted pl-3">
            Some thing to be on the timeline
          </div>
        ),
      },
    ]);
  }, []);

  // Topic need feedback
  React.useEffect(() => {
    const response = [
      {
        id: 0,
        label: 'Capstone Management System',
        onLabelClick: handleRouteToSpecificTopic(0),
        subLabel: 'Software Engineer',
        altLabel: 'Ho Hoan Kiem',
        emailAvatar: 'phanthongthanh0606@gmail.com',
      },
      {
        id: 0,
        label: 'Web Checker System',
        onLabelClick: handleRouteToSpecificTopic(0),
        subLabel: 'Graphic Design',
        altLabel: 'Le Vu Truong',
        emailAvatar: 'phanthongthanh0606@gmail.com',
      },
      {
        id: 0,
        label: 'Example topic name',
        onLabelClick: handleRouteToSpecificTopic(0),
        subLabel: 'International Business',
        altLabel: 'Tran Dinh Thanh',
        emailAvatar: 'phanthongthanh0606@gmail.com',
      },
    ];
    setTopicNeedFeedback(response);
  }, [handleRouteToSpecificTopic]);

  return (
    <div className="row">
      <div className="col-lg-6 col-xxl-4">
        <div className="row">
          <div className="col-lg-12 col-xxl-12">
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
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xxl-12">
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
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xxl-12">
            <CMSAnotherList
              className="gutter-b"
              title="Topic need feedback"
              rows={topicNeedFeedback}
              darkMode={true}
            />
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xxl-4">
        <div className="row">
          <div className="col-lg-12 col-xxl-12">
            <FlowTimeline className="gutter-b" items={flowTimelines} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xxl-12">
            <CMSList
              className="gutter-b card-stretch"
              title="Topic applications"
              rows={applications}
            />
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xxl-4">
        <div className="row">
          <div className="col-lg-6 col-xxl-6">
            <StatTile
              className="gutter-b"
              baseColor="primary"
              iconColor="white"
              dataText="790"
              desciption="Topics in this semester"
              iconSrc={toAbsoluteUrl(
                '/media/svg/icons/Communication/Clipboard-list.svg'
              )}
              onClick={handleRouteToTopics}
            />
          </div>
          <div className="col-lg-6 col-xxl-6">
            <StatTile
              className="gutter-b"
              baseColor="white"
              iconColor="primary"
              dataText="40"
              desciption="Topic you are mentoring"
              iconSrc={toAbsoluteUrl('/media/svg/icons/General/Half-star.svg')}
              onClick={handleRouteToTopics}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xxl-12">
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
      </div>
    </div>
  );
});
