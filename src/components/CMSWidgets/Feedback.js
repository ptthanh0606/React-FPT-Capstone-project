import React from 'react';
import { toAbsoluteUrl } from '_metronic/_helpers';

const FeedbackCard = ({ className }) => {
  return (
    <>
      <div
        className={className + ''}
        id="kt_apps_contacts_view_tab_1"
        role="tabpanel"
      >
        <div className="my-5">
          <span className="text-dark font-size-h5 font-weight-bold">
            Feedback
          </span>
        </div>

        <form className="form">
          <div className="form-group">
            <textarea
              className="form-control form-control-lg form-control-solid"
              id="exampleTextarea"
              rows="3"
              placeholder="What do you think about this topic"
            ></textarea>
          </div>
          <div className="row">
            <div className="col">
              <a href="/" className="btn btn-light-primary font-weight-bold">
                Submit
              </a>
              <a href="/" className="btn btn-clean font-weight-bold">
                Cancel
              </a>
            </div>
          </div>
        </form>

        <div className="separator separator-dashed my-10"></div>

        <div className="timeline timeline-3">
          <div className="timeline-items">
            <div className="timeline-item">
              <div className="timeline-media">
                <img alt="Pic" src={toAbsoluteUrl('/media/users/300_25.jpg')} />
              </div>
              <div className="timeline-content">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="mr-2">
                    <a
                      href="/"
                      className="text-dark-75 text-hover-primary font-weight-bolder"
                    >
                      Phan Thong Thanh
                    </a>
                    <span className="text-muted ml-2">Today</span>
                  </div>
                </div>
                <p className="p-0">Topic nay ok qua thay oi, admin nen duyet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackCard;
