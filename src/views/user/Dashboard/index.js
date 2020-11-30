import React from 'react';

import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import TopicTeamPreview from 'components/CMSWidgets/TopicTeamPreview';
import Reports from 'components/CMSWidgets/Reports';
import Anouncement from 'components/CMSWidgets/Anouncement';
import CheckpointProgress from 'components/CMSWidgets/CheckpointProgress';
import FlowTimeline from 'components/CMSWidgets/FlowTimeline';

export default React.memo(function DashboardPage() {
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
        {/* <NumberOfTopic /> */}

        {/* No team */}
        {/* <QuickAction /> */}
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
        <Anouncement />
        <CheckpointProgress className=" gutter-b" />
      </div>
    </div>
  );
});
