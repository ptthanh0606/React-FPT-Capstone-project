import React from 'react';
import Anouncement from './Anouncement';
import CheckpointProgress from './CheckpointProgress';
import Reports from './Reports';
import Timeline from './Timeline';
import TopicTeamPreview from './TopicTeamPreview';

const TestWidgets = () => {
  return (
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
  );
};

export default React.memo(TestWidgets);
