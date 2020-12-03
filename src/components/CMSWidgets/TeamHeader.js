import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const TeamHeader = () => {
  return (
    <>
      <div className="card card-custom gutter-b">
        <div className="card-body">
          <div className="d-flex">
            {/* <div className="flex-shrink-0 mr-7">
              <div className="symbol symbol-50 symbol-lg-120">
                <img alt="Pic" src="/media/users/300_1.jpg" />
              </div>
            </div> */}

            <div className="flex-grow-1">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="mr-3">
                  <div className="d-flex align-items-center mr-3">
                    <span className="d-flex align-items-center text-dark text-hover-primary font-size-h1 font-weight-bold mr-3">
                      Genshin Impact council
                    </span>
                  </div>

                  <div className="d-flex flex-wrap my-2 align-items-center">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="quick-user-tooltip">Department</Tooltip>
                      }
                    >
                      <div className="d-flex align-items-center">
                        <i class="fas fa-university icon-md mr-2" />
                        <span className="label label-light-success label-inline font-weight-bolder mr-1">
                          Software Engineer
                        </span>
                      </div>
                    </OverlayTrigger>
                  </div>
                </div>

                {/* <div className="mb-10">
                  <span className="btn btn-sm btn-light-primary font-weight-bolder text-uppercase mr-2">
                    contact
                  </span>
                  <div className="dropdown dropdown-inline">
                    <span
                      className="btn btn-primary btn-sm font-weight-bolder text-uppercase dropdown-toggle"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      export
                    </span>
                  </div>
                </div> */}
              </div>

              {/* <div className="d-flex align-items-center flex-wrap justify-content-between">
                <div className="flex-grow-1 font-weight-bold text-dark-50 py-2 py-lg-2 mr-5">
                  I distinguish three main text objectives could be merely to
                  inform people.
                  <br />A second could be persuade people. You want people to
                  bay objective.
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(TeamHeader);
