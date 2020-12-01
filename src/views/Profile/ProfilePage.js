import React from 'react';
import PersonalInfomation from './PersonalInfomation';
import ProfileActions from './ProfileActions';

const ProfilePage = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-xxl-4">
          <ProfileActions />
        </div>
        <div className="col-lg-6 col-xxl-8">
          <PersonalInfomation />
        </div>
      </div>
    </>
  );
};

export default React.memo(ProfilePage);
