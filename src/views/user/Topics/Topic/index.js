import BigButton from 'components/CMSWidgets/BigButton';
import TopicDetailCard from 'components/CMSWidgets/TopicDetailCard';
import React from 'react';

const Topic = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-xxl-12">
          <TopicDetailCard
            topicCode="FA20SE13"
            topicName="Capstone Management System"
            fromCompany="FPT University"
            fullDesc={(() => (
              <>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. <br />
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </>
            ))()}
          />
        </div>
        {/* <div className="col-lg-6 col-xxl-3">
          <BigButton />
        </div> */}
      </div>
    </>
  );
};
export default Topic;
