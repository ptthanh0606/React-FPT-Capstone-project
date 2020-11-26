import React from 'react';
import { toAbsoluteUrl } from '_metronic/_helpers';
import MessageTile from './MessageTile';

const TopicTeamPreview = () => {
  return (
    <div className="card card-custom card-border gutter-b">
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center py-1">
          <div className="symbol symbol-80 symbol-light-success mr-5">
            <span className="symbol-label">
              <img src="#" className="h-50 align-self-center" alt="" />
            </span>
          </div>

          <div className="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3">
            <a
              href="/"
              className="text-dark font-weight-bolder text-hover-primary font-size-h5"
            >
              Capstone Management System
            </a>
            <span className="text-muted font-weight-bold font-size-lg">
              FA20SE13
            </span>
          </div>

          {/* <MessageTile className="flex-grow-1" /> */}

          <div className="d-flex flex-column mt-10">
            <span className="text-dark mr-2 font-size-lg font-weight-bolder pb-4">
              Team members
            </span>

            <div className="d-flex">
              <a
                href="/"
                className="symbol symbol-50 symbol-light-success mr-3"
              >
                <div className="symbol-label">
                  <img
                    src={toAbsoluteUrl('/media/svg/avatars/009-boy-4.svg')}
                    className="h-75 align-self-end"
                    alt=""
                  />
                </div>
              </a>

              <a
                href="/"
                className="symbol symbol-50 symbol-light-success mr-3"
              >
                <div className="symbol-label">
                  <img
                    src={toAbsoluteUrl('/media/svg/avatars/028-girl-16.svg')}
                    className="h-75 align-self-end"
                    alt=""
                  />
                </div>
              </a>

              <a
                href="/"
                className="symbol symbol-50 symbol-light-success mr-3"
              >
                <div className="symbol-label">
                  <img
                    src={toAbsoluteUrl('/media/svg/avatars/024-boy-9.svg')}
                    className="h-75 align-self-end"
                    alt=""
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TopicTeamPreview);
