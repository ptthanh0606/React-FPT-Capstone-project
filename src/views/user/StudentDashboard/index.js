import React from 'react';

import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import TopicTeamPreview from 'components/CMSWidgets/TopicTeamPreview';
import Reports from 'components/CMSWidgets/Reports';
import Anouncement from 'components/CMSWidgets/Anouncement';
import CheckpointProgress from 'components/CMSWidgets/CheckpointProgress';
import FlowTimeline from 'components/CMSWidgets/FlowTimeline';
import QuickAction from 'components/CMSWidgets/QuickAction';
import { toAbsoluteUrl } from '_metronic/_helpers';
import NumberOfTopic from 'components/CMSWidgets/NumberOfTopic';

export default React.memo(function LecturerDashboard() {
  const setMeta = useSetRecoilState(metaAtom);

  React.useEffect(() => {
    setMeta({
      title: 'Dashboard',
      breadcrumb: [{ title: 'Dashboard', path: '/dashboard' }],
    });
  }, [setMeta]);

  return (
    <div className="row">
      <div className="col-lg-6 col-xxl-4">
        {/* Have team, have topic */}
        <TopicTeamPreview className="card-stretch gutter-b" />

        <Reports className="gutter-b" />

        {/* Have team */}
        <NumberOfTopic />

        {/* No team */}
        {/* <QuickAction
          className="gutter-b"
          title="Quick teams"
          actionsRows={[
            [
              {
                className: 'col px-6 py-8 rounded-xl mr-7 mb-7',
                type: 'info',
                iconSrc: toAbsoluteUrl('/media/svg/icons/Code/Lock-circle.svg'),
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
        /> */}
      </div>
      <div className="col-lg-6 col-xxl-4">
        {/* Have team, have topic */}
        <FlowTimeline className=" gutter-b" />

        {/* Have team || No team */}
        {/* <TopicPreviewList
            title={'Available public team'}
            expandbuttonlabel={'View all team'}
          /> */}
      </div>
      <div className="col-lg-6 col-xxl-4">
        {/* Have team, have topic */}
        <Anouncement body="This is an example anouncement" date="2020-06-06" />
        <Anouncement body="This is an example anouncement" date="2020-06-06" />
        <CheckpointProgress className=" gutter-b" />
      </div>
    </div>
  );
});
