import React from 'react';
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '_metronic/_helpers';
import MessageTile from './MessageTile';

const TeamHeader = ({
  teamName = '',
  department = '',
  teamType = '',
  teamStatus = '',
  withTopic = {},
}) => {
  return (
    <>
      <div className="card card-custom gutter-b">
        <div className="card-body">
          {teamName ? (
            <>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div className="mr-3">
                      <div className="d-flex align-items-center mr-3">
                        <span className="d-flex align-items-center text-dark font-size-h1 font-weight-bold mr-3">
                          {teamName || (
                            <>
                              <Spinner
                                className="font-size-h5"
                                animation="border"
                              />
                            </>
                          )}
                        </span>
                      </div>

                      <div className="d-flex flex-wrap my-2 align-items-center">
                        {department && (
                          <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Department</Tooltip>}
                          >
                            <div className="d-flex align-items-center mr-10">
                              <i class="fas fa-university icon-md mr-2" />
                              <span className="label label-light-success label-inline font-weight-bolder mr-1">
                                {department}
                              </span>
                            </div>
                          </OverlayTrigger>
                        )}

                        {teamType && (
                          <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Is this team private</Tooltip>}
                          >
                            <div className="d-flex align-items-center mr-10">
                              <i class="fas fa-shield-alt icon-md mr-2" />
                              <span className="label label-light-success label-inline font-weight-bolder mr-1">
                                {teamType} team
                              </span>
                            </div>
                          </OverlayTrigger>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {teamStatus === 'Assigned' ? (
                <>
                  {withTopic && (
                    <>
                      <div className="separator separator-solid my-7"></div>
                      <span className="text-muted font-size-h6 font-weight-bolder">
                        {`Assigned to`}{' '}
                      </span>
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <div className="mr-3">
                          <Link
                            to={`/topic/${withTopic?.value}`}
                            className="d-flex align-items-center text-dark text-hover-primary font-size-h3 font-weight-bolder mr-3"
                          >
                            {`${withTopic?.label || 'Awaiting...'}`}{' '}
                          </Link>
                          <div className="d-flex flex-wrap my-2">
                            <span className="text-muted font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2">
                              {withTopic?.code || '...'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-start flex-wrap justify-content-between">
                        <div className="flex-grow-1 font-weight-bold text-dark-50 py-5 py-lg-2 mr-5">
                          {withTopic?.abstract || '...'}
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                teamStatus && (
                  <>
                    <MessageTile
                      className="mt-10"
                      baseColor="warning"
                      content="Awaiting for topic match."
                      iconSrc={toAbsoluteUrl(
                        '/media/svg/icons/General/Other2.svg'
                      )}
                    />
                  </>
                )
              )}
            </>
          ) : (
            <div className="d-flex align-items-center">
              <Spinner
                className="mr-5"
                animation="border"
                variant="primary"
              ></Spinner>
              <span className="text text-primary">Loading...</span>
            </div>
          )}
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default React.memo(TeamHeader);
