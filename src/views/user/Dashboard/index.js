import React from 'react';
// import {
//   MixedWidget1,
//   MixedWidget14,
//   ListsWidget9,
//   StatsWidget11,
//   StatsWidget12,
//   ListsWidget1,
//   AdvanceTablesWidget2,
//   AdvanceTablesWidget4,
//   ListsWidget3,
//   ListsWidget4,
//   ListsWidget8,
// } from '_metronic/_partials/widgets';

import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import TopicTeamPreview from 'components/CMSWidgets/TopicTeamPreview';
import Reports from 'components/CMSWidgets/Reports';
import Timeline from 'components/CMSWidgets/Timeline';
import Anouncement from 'components/CMSWidgets/Anouncement';
import CheckpointProgress from 'components/CMSWidgets/CheckpointProgress';

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
        <Timeline className="card-stretch gutter-b" />

        {/* Have team || No team */}
        {/* <TopicPreviewList
            title={'Available public team'}
            expandbuttonlabel={'View all team'}
          /> */}
      </div>
      <div className="col-lg-6 col-xxl-4">
        {/* Have team, have topic */}
        <Anouncement />
        <CheckpointProgress />
      </div>
    </div>
  );
});
