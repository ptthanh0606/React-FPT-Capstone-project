import React from 'react';
import { toAbsoluteUrl } from '_metronic/_helpers';
import SVG from 'react-inlinesvg';
import Feedback from './Feedback';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const TopicDetailCard = ({ className, topicCode, topicName, fullDesc }) => {
  const handleShowTeamDetail = React.useCallback(event => {
    event.preventDefault();
  }, []);

  const handleShowMentorDetail = React.useCallback(event => {
    event.preventDefault();
  }, []);

  return (
    <div className={className + ' card card-custom gutter-b'}>
      <div className="card-body">
        <div className="d-flex">
          <div className="flex-grow-1">
            <div className="d-flex align-items-center justify-content-between flex-wrap mb-10">
              <div className="mr-3">
                <a
                  href="/"
                  className="d-flex align-items-center text-dark text-hover-primary font-size-h3 font-weight-bolder mr-3"
                >
                  {`${topicName}`}{' '}
                </a>
                <div className="d-flex flex-wrap my-2">
                  <a
                    href="/"
                    className="text-muted text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2"
                  >
                    {topicCode}
                  </a>
                </div>
              </div>
              <div className="my-lg-0 my-1">
                <a
                  href="/"
                  className="btn btn-sm btn-light-primary font-weight-bolder text-uppercase"
                >
                  <span className="svg-icon svg-icon-md">
                    <SVG
                      src={toAbsoluteUrl(
                        '/media/svg/icons/General/Attachment2.svg'
                      )}
                    ></SVG>
                  </span>
                  Attachment
                </a>
              </div>
            </div>

            <div className="d-flex align-items-center flex-wrap justify-content-between mb-10">
              <div className="flex-grow-1 font-weight-bold text-dark-50 py-5 py-lg-2 mr-5 mb-10">
                {fullDesc}
              </div>

              <div className="d-flex flex-wrap align-items-center py-2">
                <div className="d-flex align-items-center">
                  <div className="mr-10">
                    <div className="font-weight-bolder mb-2">Department</div>
                    <span className="label label-xl label-light label-inline text-nowrap mr-2">
                      Software Engineer
                    </span>
                    <span className="label label-xl label-light label-inline text-nowrap">
                      Software Engineer
                    </span>
                  </div>
                  <div className="">
                    <div className="font-weight-bolder mb-2">Status</div>
                    <span className="label label-xl label-light-danger label-inline text-nowrap">
                      Rejected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="separator separator-solid my-7"></div>

        <div className="d-flex align-items-center justify-content-between flex-wrap my-7">
          <div className="d-flex align-items-center flex-lg-fill my-1">
            <span className="mr-4">
              <i className="flaticon-pie-chart icon-2x text-muted font-weight-bold"></i>
            </span>
            <div className="d-flex flex-column text-dark-75">
              <span className="font-weight-bolder font-size-sm">
                Max members
              </span>
              <span className="font-weight-bolder font-size-h5">
                <span className="text-dark-50 font-weight-bold">5</span>
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center flex-lg-fill my-1">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="quick-user-tooltip">Team members</Tooltip>}
            >
              <a href="/" className="mr-4" onClick={handleShowTeamDetail}>
                <i className="flaticon-users icon-2x text-muted font-weight-bold"></i>
              </a>
            </OverlayTrigger>
            <div className="symbol-group symbol-hover">
              <div
                className="symbol symbol-30 symbol-circle"
                data-toggle="tooltip"
                title=""
                data-original-title="Mark Stone"
              >
                <img alt="Pic" src="/media/users/300_25.jpg" />
              </div>
              <div
                className="symbol symbol-30 symbol-circle"
                data-toggle="tooltip"
                title=""
                data-original-title="Charlie Stone"
              >
                <img alt="Pic" src="/media/users/300_19.jpg" />
              </div>
              <div
                className="symbol symbol-30 symbol-circle"
                data-toggle="tooltip"
                title=""
                data-original-title="Luca Doncic"
              >
                <img alt="Pic" src="/media/users/300_22.jpg" />
              </div>
              <div
                className="symbol symbol-30 symbol-circle"
                data-toggle="tooltip"
                title=""
                data-original-title="Nick Mana"
              >
                <img alt="Pic" src={toAbsoluteUrl('/media/users/300_23.jpg')} />
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center flex-lg-fill my-1">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="quick-user-tooltip">Mentors</Tooltip>}
            >
              <a href="/" className="mr-4" onClick={handleShowMentorDetail}>
                <i className="flaticon-profile-1 icon-2x text-muted font-weight-bold"></i>
              </a>
            </OverlayTrigger>
            <div className="symbol-group symbol-hover">
              <div
                className="symbol symbol-30 symbol-circle"
                data-toggle="tooltip"
                title=""
                data-original-title="Mark Stone"
              >
                <img alt="Pic" src="/media/users/300_25.jpg" />
              </div>
              <div
                className="symbol symbol-30 symbol-circle"
                data-toggle="tooltip"
                title=""
                data-original-title="Charlie Stone"
              >
                <img alt="Pic" src="/media/users/300_19.jpg" />
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center flex-lg-fill my-1">
            <span className="mr-4">
              <i className="flaticon-file-2 icon-2x text-muted font-weight-bold"></i>
            </span>
            <div className="d-flex flex-column flex-lg-fill">
              <span className="text-dark-75 font-weight-bolder font-size-sm">
                73 Applications
              </span>
              {/* <a
                href="/"
                className="text-primary font-weight-bolder"
                onClick={handleShowApplicationModal}
              >
                View
              </a> */}
            </div>
          </div>
        </div>

        <div className="separator separator-solid my-7"></div>

        <Feedback className="" />
      </div>
    </div>
  );
};

export default React.memo(TopicDetailCard);
