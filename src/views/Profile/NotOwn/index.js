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

  // ----------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: 'User profile',
      breadcrumb: [{ title: 'Profile', path: `/profile/${role}/${id}` }],
    });
  }, [id, role, setMeta]);

  React.useEffect(() => {
    if (role === 'lecturer') {
      request({
        to: READ_LECTURER(id).url,
        method: READ_LECTURER(id).method,
      })
        .then(res => {
          console.log(res.data.data);
        })
        .catch(err => {
          handleErrors(err);
        });
    }
    if (role === 'student') {
      request({
        to: READ_STUDENT(id).url,
        method: READ_STUDENT(id).method,
      })
        .then(res => {
          console.log(res.data.data);
        })
        .catch(err => {
          handleErrors(err);
        });
    }
  }, [id, role]);

  // ----------------------------------------------------------------

  React.useEffect(() => {
    setUser({
      id: 4,
      name: 'Phan Thong Thanh',
      email: 'phanthongthanh0606@gmail.com',
      code: 'ThanhPTLecturer',
      role: 2,
      department: [
        { id: 3, code: 'IB', name: 'International Business' },
        { id: 4, code: 'IZ', name: 'International Businessz' },
      ],
    });
  }, []);

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
          <ViewOnlyInfomation id={user.id} bio={user.bio} email={user.email} />
        </div>
      </div>
    </>
  );
};

export default React.memo(ProfilePage);
