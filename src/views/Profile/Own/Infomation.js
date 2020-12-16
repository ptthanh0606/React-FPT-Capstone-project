import React from 'react';
import toast from 'utils/toast';
import md5 from 'utils/md5';

const PersonalInfomation = ({ id = '', email = '', bioProp = '' }) => {
  const [bio, setBio] = React.useState('');

  const handleUpdate = React.useCallback(e => {
    e.preventDefault();
    toast.success('Saved');
  }, []);

  React.useEffect(() => {
    setBio(bioProp);
  }, [bioProp]);

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
            <button
              type="button"
              className="btn btn-success mr-2"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
            <button
              type="reset"
              className="btn btn-secondary"
              form="profileform"
            >
              Cancel
            </button>
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
                <span className="form-text text-muted">
                  You can change avatar on{' '}
                  <span className="font-weight-bolder">Google Account</span>
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">My bio</label>
              <div className="col-lg-9 col-xl-6">
                <textarea
                  class="form-control border-0 form-control-solid pl-6 font-size-lg font-weight-bolder min-h-130px"
                  name="memo"
                  rows="10"
                  placeholder="Tell people what you are..."
                  id="kt_forms_widget_7_input"
                  style={{
                    overflow: 'hidden',
                    overflowWrap: 'break-word',
                    resize: 'none',
                    height: '130px',
                  }}
                  onChange={e => setBio(e.currentTarget.value)}
                  value={bio}
                ></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default React.memo(PersonalInfomation);
