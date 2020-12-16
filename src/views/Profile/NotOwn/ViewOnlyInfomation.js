import React from 'react';
import Button from 'components/Button';
import { role } from 'auth/recoil/selectors';
import { useRecoilValue } from 'recoil';
import md5 from 'utils/md5';
import toast from 'utils/toast';

const PersonalInfomation = ({ id = '', email = '', bioProp = '' }) => {
  const userRole = useRecoilValue(role);

  const handleDisable = React.useCallback(e => {
    e.preventDefault();
    toast.success('Saved');
  }, []);

  return (
    <>
      <div className="card card-custom card-stretch">
        <div className="card-header py-3">
          <div className="card-title justify-content-center flex-column">
            <h3 className="card-label font-weight-bolder text-dark">
              Personal Information
            </h3>
          </div>
          <div className="card-toolbar">
            {userRole === 'admin' && (
              <>
                <Button className="btn btn-danger mr-2" onClick={handleDisable}>
                  Disable this user
                </Button>
              </>
            )}
          </div>
        </div>

        <form className="form" id="profileform">
          <div className="card-body">
            <div className="row">
              <label className="col-xl-3"></label>
              <div className="col-lg-9 col-xl-6">
                <h5 className="font-weight-bold mb-6">User Info</h5>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">Avatar</label>
              <div className="col-lg-9 col-xl-6">
                <div
                  className="image-input image-input-outline"
                  id="kt_profile_avatar"
                >
                  <div
                    className="image-input-wrapper"
                    style={{
                      backgroundImage: `url(https://www.gravatar.com/avatar/${
                        email && md5(email.toLowerCase())
                      })`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">My bio</label>
              <span className="col-lg-9 col-xl-6 col-form-label">
                {bioProp}
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default React.memo(PersonalInfomation);
