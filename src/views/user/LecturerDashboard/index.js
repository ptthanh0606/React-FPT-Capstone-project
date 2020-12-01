import React from 'react';

import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import TopicTeamPreview from 'components/CMSWidgets/TopicTeamPreview';
import Reports from 'components/CMSWidgets/Reports';
import Anouncement from 'components/CMSWidgets/Anouncement';
import CheckpointProgress from 'components/CMSWidgets/CheckpointProgress';
import FlowTimeline from 'components/CMSWidgets/FlowTimeline';
import QuickAction from 'components/CMSWidgets/QuickAction';

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
        <QuickAction />
      </div>
      <div className="col-lg-6 col-xxl-4">
        <FlowTimeline className=" gutter-b" />
      </div>
      <div className="col-lg-6 col-xxl-4">
        <Anouncement />
      </div>
    </div>
  );
});
