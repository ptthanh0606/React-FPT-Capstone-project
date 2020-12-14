import React from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import semesterAtom from 'store/semester';

import TopicTeamPreview from 'components/CMSWidgets/TopicTeamPreview';
import Reports from 'components/CMSWidgets/Reports';
import Anouncement from 'components/CMSWidgets/Anouncement';
import CheckpointProgress from 'components/CMSWidgets/CheckpointProgress';
import FlowTimeline from 'components/CMSWidgets/FlowTimeline';
import QuickAction from 'components/CMSWidgets/QuickAction';
import { toAbsoluteUrl } from '_metronic/_helpers';
import NumberOfTopic from 'components/CMSWidgets/NumberOfTopic';
import CMSList from 'components/CMSList';
import { Link } from 'react-router-dom';

export default React.memo(function LecturerDashboard() {
  const [currentTopicPreviews, setCurrentTopicPreviews] = React.useState([
    {
      label: 'Green implant project',
      subLabel: 'Abstract detail',
      actions: (
        <button className="btn btn-light-info font-weight-bolder">Apply</button>
      ),
    },
    {
      label: 'BSMC Management',
      subLabel: 'This is abstract',
      actions: (
        <button className="btn btn-light-info font-weight-bolder">Apply</button>
      ),
    },
    {
      label: 'Smart tracking',
      subLabel: 'Abstract told you everything',
      actions: (
        <button className="btn btn-light-info font-weight-bolder">Apply</button>
      ),
    },
  ]);
  const [
    currentPublicTeamPreviews,
    setCurrentPublicTeamPreviews,
  ] = React.useState([
    {
      label: 'UniDev team',
      subLabel: 'Leader: Dang Thanh Nam',
      actions: (
        <button className="btn btn-light-info font-weight-bolder">Apply</button>
      ),
    },
    {
      label: 'GoGreen team',
      subLabel: 'Leader: Nguyen Quoc Toan',
      actions: (
        <button className="btn btn-light-info font-weight-bolder">Apply</button>
      ),
    },
    {
      label: 'Full house team',
      subLabel: 'Leader: Tran Thanh Tam',
      actions: (
        <button className="btn btn-light-info font-weight-bolder">Apply</button>
      ),
    },
  ]);

  const [isStudentHaveTeam, setIsStudentHaveTeam] = React.useState(false);
  const [isStudentHaveTopic, setIsStudentHaveTopic] = React.useState(false);

  const setMeta = useSetRecoilState(metaAtom);
  const currentSemester = useRecoilValue(semesterAtom);

  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: 'Dashboard',
      breadcrumb: [{ title: 'Dashboard', path: '/dashboard' }],
    });
  }, [setMeta]);

  return (
    <div className="row">
      <div className="col-lg-6 col-xxl-4">
        {/* No team */}
        {!isStudentHaveTeam && (
          <QuickAction
            className="gutter-b"
            title="Quick team actions"
            actionsRows={[
              [
                {
                  className: 'col px-6 py-8 rounded-xl mr-7 mb-7',
                  type: 'info',
                  iconSrc: toAbsoluteUrl(
                    '/media/svg/icons/Code/Lock-circle.svg'
                  ),
                  label: 'Join team with code',
                  // onClick: handleRouteToTopics,
                },
                {
                  className: 'col px-6 py-8 rounded-xl mb-7',
                  type: 'primary',
                  iconSrc: toAbsoluteUrl('/media/svg/icons/Design/Join-1.svg'),
                  label: 'Join public team',
                  // onClick: handleRouteToTopics,
                },
              ],
            ]}
          />
        )}

        <TopicTeamPreview
          className="card-stretch gutter-b"
          isStudentHaveTeam={isStudentHaveTeam}
          isStudentHaveTopic={isStudentHaveTopic}
        />

        {isStudentHaveTeam && isStudentHaveTopic && (
          <Reports className="gutter-b" />
        )}

        {![0].includes(currentSemester.status) && (
          <NumberOfTopic className="gutter-b" />
        )}
      </div>
      <div className="col-lg-6 col-xxl-4">
        {isStudentHaveTeam && isStudentHaveTopic && (
          <FlowTimeline className=" gutter-b" />
        )}

        {!isStudentHaveTeam && (
          <>
            <CMSList
              title="Available public team"
              fallbackMsg="No team yet, be the first to create team now!"
              rows={currentPublicTeamPreviews}
              toolBar={<Link to="/team">View all teams</Link>}
            />
          </>
        )}

        {isStudentHaveTeam && !isStudentHaveTopic && (
          <>
            <CMSList
              title="Available public team"
              fallbackMsg="No team yet, be the first to create team now!"
              rows={currentTopicPreviews}
              toolBar={<Link to="/topic">View all topics</Link>}
            />
          </>
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
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur.{' '}
            </>
          }
          date="2020-06-06"
        />

        {isStudentHaveTeam && isStudentHaveTopic && (
          <CheckpointProgress className=" gutter-b" />
        )}
      </div>
    </div>
  );
});
