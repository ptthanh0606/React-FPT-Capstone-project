import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import roleSelector from 'auth/recoil/selectors/role';
import PersonalInfomation from './Infomation';
import ProfileActions from '../ProfileActions';
import metaAtom from 'store/meta';
import { useHistory, useParams } from 'react-router-dom';
import userStore from 'store/user';
import { ME } from 'endpoints';
import request from 'utils/request';

const ProfilePage = () => {
  const setMeta = useSetRecoilState(metaAtom);
  const [user, setUser] = useRecoilState(userStore);
  const setRole = useSetRecoilState(roleSelector);
  const { id } = useParams();
  const history = useHistory();

  // ----------------------------------------------------------------

  function fetchMe(setRole, setUser, history) {
    request({
      to: ME.url,
      method: ME.method,
    })
      .then(({ data }) => {
        let role;

        switch (data.data.role) {
          case 0:
            role = 'admin';
            break;
          case 1:
            role = 'student';
            break;
          case 2:
            role = 'lecturer';
            break;
          default:
        }

        setRole(role);

        setUser({
          id: data.data.id,
          code: data.data.code,
          email: data.data.email,
          name: data.data.name,
          department: data.data.department,
          role: role,
        });
      })
      .catch(err => {
        history.push('/logout');
      });
  }

  // ----------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: 'User profile',
      breadcrumb: [{ title: 'Profile', path: `/profile/myprofile` }],
    });
  }, [id, setMeta]);

  React.useEffect(() => {
    fetchMe(setRole, setUser, history);
  }, [history, setRole, setUser]);

  // ----------------------------------------------------------------

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-xxl-4">
          <ProfileActions
            fullName={user.name}
            departments={user.department}
            email={user.email}
          />
        </div>
        <div className="col-lg-6 col-xxl-8">
          <PersonalInfomation id={user.id} bio={user.bio} email={user.email} />
        </div>
      </div>
    </>
  );
};

export default React.memo(ProfilePage);
