import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { role } from 'auth/recoil/selectors';
import PersonalInfomation from './Infomation';
import ProfileActions from '../ProfileActions';
import metaAtom from 'store/meta';
import { useHistory } from 'react-router-dom';
import userAtom from 'store/user';
import request from 'utils/request';
import { READ_LECTURER, READ_STUDENT } from 'endpoints';
import { handleErrors } from 'utils/common';

const ProfilePage = () => {
  const setMeta = useSetRecoilState(metaAtom);
  const currentUser = useRecoilValue(userAtom);
  const currentRole = useRecoilValue(role);

  const history = useHistory();

  const [userInfo, setUserInfo] = React.useState({});
  const [userDepartment, setUserDepartment] = React.useState([]);

  // ----------------------------------------------------------------

  const fetchUser = React.useCallback(() => {
    if (currentRole) {
      let config = {};
      if (currentRole === 'student') {
        config = {
          to: READ_STUDENT(currentUser.id).url,
          method: READ_STUDENT(currentUser.id).method,
        };
      } else if (currentRole === 'lecturer') {
        config = {
          to: READ_LECTURER(currentUser.id).url,
          method: READ_LECTURER(currentUser.id).method,
        };
      }
      request(config)
        .then(res => {
          setUserInfo(res.data.data);
          if (currentRole === 'student') {
            setUserDepartment(oldValue => [
              ...oldValue,
              res.data.data.department.name,
            ]);
          } else {
            setUserDepartment(res.data.data.departments.map(dep => dep.name));
          }
        })
        .catch(err => {
          console.log('Own');
          handleErrors(err);
        });
    }
  }, [currentRole, currentUser.id]);

  // ----------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: 'User profile',
      breadcrumb: [{ title: 'My profile', path: `/profile/myprofile` }],
    });
  }, [setMeta]);

  React.useEffect(() => {
    fetchUser(currentRole);
  }, [currentRole, fetchUser, history]);

  // ----------------------------------------------------------------

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-xxl-4">
          <ProfileActions
            fullName={userInfo?.name}
            departments={userDepartment}
            email={userInfo?.email}
            code={userInfo?.code}
            className="gutter-b"
          />
        </div>
        <div className="col-lg-6 col-xxl-8">
          <PersonalInfomation
            id={userInfo?.id}
            bioProp={userInfo?.biography}
            email={userInfo?.email}
            className="gutter-b"
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(ProfilePage);
