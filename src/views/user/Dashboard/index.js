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
    <>
      {/* <div className="row">
        <div className="col-lg-6 col-xxl-4">
          <MixedWidget1 className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-6 col-xxl-4">
          <ListsWidget9 className="card-stretch gutter-b" />
        </div>

        <div className="col-lg-6 col-xxl-4">
          <StatsWidget11 className="card-stretch card-stretch-half gutter-b" />
          <StatsWidget12 className="card-stretch card-stretch-half gutter-b" />
        </div>

        <div className="col-lg-6 col-xxl-4 order-1 order-xxl-1">
          <ListsWidget1 className="card-stretch gutter-b" />
        </div>
        <div className="col-xxl-8 order-2 order-xxl-1">
          <AdvanceTablesWidget2 className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-6 col-xxl-4 order-1 order-xxl-2">
          <ListsWidget3 className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-6 col-xxl-4 order-1 order-xxl-2">
          <ListsWidget4 className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-12 col-xxl-4 order-1 order-xxl-2">
          <ListsWidget8 className="card-stretch gutter-b" />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <MixedWidget14 className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-8">
          <AdvanceTablesWidget4 className="card-stretch gutter-b" />
        </div>
      </div> */}
      <div className="row">
        <div className="col-lg-6 col-xxl-4">
          {/* Have team, have topic */}
          <TopicTeamPreview />
          <Reports />

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
    </>
  );
});
