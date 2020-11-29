import React from 'react';
import toast from 'utils/toast';
import * as endpoints from 'endpoints';
import { handleErrors } from 'utils/common';
import request from 'utils/request';
import { useParams } from 'react-router-dom';

const PersonalInfomation = () => {
  const { id } = useParams();

  const handleUpdate = React.useCallback(e => {
    e.preventDefault();
    const id = Number(e.currentTarget.getAttribute('data-id'));
    if (!Number.isInteger(id)) {
      toast.error('Internal Server Error');
      return;
    }
    request({
      to: endpoints.READ_DEPARTMENT(id).url,
      method: endpoints.READ_DEPARTMENT(id).method,
    })
      .then(res => {})
      .catch(handleErrors);
  }, []);

  return (
    <>
      <div className="card card-custom card-stretch">
        <div className="card-header py-3">
          <div className="card-title align-items-start flex-column">
            <h3 className="card-label font-weight-bolder text-dark">
              Personal Information
            </h3>
            <span className="text-muted font-weight-bold font-size-sm mt-1">
              Update your personal informaiton
            </span>
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
                  // style="background-image: url(assets/media/users/blank.png)"
                >
                  <div
                    className="image-input-wrapper"
                    // style="background-image: url(assets/media/users/300_21.jpg)"
                  ></div>

                  <label
                    className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                    data-action="change"
                    data-toggle="tooltip"
                    title=""
                    data-original-title="Change avatar"
                  >
                    <i className="fa fa-pen icon-sm text-muted"></i>
                    <input
                      type="file"
                      name="profile_avatar"
                      accept=".png, .jpg, .jpeg"
                    />
                    <input type="hidden" name="profile_avatar_remove" />
                  </label>

                  <span
                    className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                    data-action="cancel"
                    data-toggle="tooltip"
                    title=""
                    data-original-title="Cancel avatar"
                  >
                    <i className="ki ki-bold-close icon-xs text-muted"></i>
                  </span>

                  <span
                    className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                    data-action="remove"
                    data-toggle="tooltip"
                    title=""
                    data-original-title="Remove avatar"
                  >
                    <i className="ki ki-bold-close icon-xs text-muted"></i>
                  </span>
                </div>
                <span className="form-text text-muted">
                  Allowed file types: png, jpg, jpeg.
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
