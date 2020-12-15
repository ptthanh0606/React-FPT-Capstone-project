import React from 'react';
import { useSetRecoilState } from 'recoil';
import ProfileActions from '../ProfileActions';
import metaAtom from 'store/meta';
import { useParams } from 'react-router-dom';
import ViewOnlyInfomation from './ViewOnlyInfomation';
import request from 'utils/request';
import { READ_LECTURER, READ_STUDENT } from 'endpoints';
import { handleErrors } from 'utils/common';

const ProfilePage = () => {
  const setMeta = useSetRecoilState(metaAtom);
  const { id, role } = useParams();

  const [user, setUser] = React.useState({});
  const [userDepartment, setUserDepartment] = React.useState([]);

  // ----------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: 'User profile',
      breadcrumb: [{ title: 'Profile', path: `/profile/${role}/${id}` }],
    });
  }, [id, role, setMeta]);

  React.useEffect(() => {
    let config = {};

    if (role === 'lecturer') {
      config = {
        to: READ_LECTURER(id).url,
        method: READ_LECTURER(id).method,
      };
    }
    if (role === 'student') {
      config = {
        to: READ_STUDENT(id).url,
        method: READ_STUDENT(id).method,
      };
    }
    request(config)
      .then(res => {
        setUser(res.data.data);
        if (role === 'student') {
          setUserDepartment(oldValue => [
            ...oldValue,
            res.data.data.department.name,
          ]);
        } else {
          setUserDepartment(res.data.data.departments.map(dep => dep.name));
        }
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [id, role]);

  // ----------------------------------------------------------------

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-xxl-4">
          <ProfileActions
            fullName={user?.name}
            departments={userDepartment}
            email={user?.email}
            code={user?.code}
            className="gutter-b"
          />
        </div>
        <div className="col-lg-6 col-xxl-8">
          <ViewOnlyInfomation
            id={user?.id}
            bioProp={user?.biography}
            email={user?.email}
            className="gutter-b"
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(ProfilePage);
