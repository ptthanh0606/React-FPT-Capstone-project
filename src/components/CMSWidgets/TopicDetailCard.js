import React from 'react';
import { toAbsoluteUrl } from '_metronic/_helpers';
import SVG from 'react-inlinesvg';
import Feedback from './Feedback';

const TopicDetailCard = ({
  className,
  topicCode,
  topicName,
  fromCompany,
  fullDesc,
}) => {
  return (
    <div className={className + ' card card-custom gutter-b'}>
      <div className="card-body">
        <div className="d-flex">
          <div className="flex-grow-1">
            <div className="d-flex align-items-center justify-content-between flex-wrap mb-10">
              <div className="mr-3">
                <a
                  href="/"
                  className="d-flex align-items-center text-dark text-hover-primary font-size-h5 font-weight-bold mr-3"
                >
                  {`${topicCode} - ${topicName}`}{' '}
                  <i className="flaticon2-correct text-success icon-md ml-2"></i>
                </a>
                <div className="d-flex flex-wrap my-2">
                  <a
                    href="/"
                    className="text-muted text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2"
                  >
                    <span className="svg-icon svg-icon-md svg-icon-gray-500 mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <mask fill="white">
                            <use></use>
                          </mask>
                          <g></g>
                          <path
                            d="M7,10 L7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 L17,10 L18,10 C19.1045695,10 20,10.8954305 20,12 L20,18 C20,19.1045695 19.1045695,20 18,20 L6,20 C4.8954305,20 4,19.1045695 4,18 L4,12 C4,10.8954305 4.8954305,10 6,10 L7,10 Z M12,5 C10.3431458,5 9,6.34314575 9,8 L9,10 L15,10 L15,8 C15,6.34314575 13.6568542,5 12,5 Z"
                            fill="#000000"
                          ></path>
                        </g>
                      </svg>
                    </span>{' '}
                    {fromCompany}
                  </a>
                </div>
              </div>
              <div className="my-lg-0 my-1">
                <a
                  href="/"
                  className="btn btn-sm btn-light-success font-weight-bolder text-uppercase mr-3"
                >
                  <span className="svg-icon svg-icon-md svg-icon-primary">
                    <SVG
                      className="h-75 align-self-end"
                      src={toAbsoluteUrl(
                        '/media/svg/icons/General/Attachment2.svg'
                      )}
                    ></SVG>
                  </span>
                  Attachment
                </a>
                {/* <a
                  href="/"
                  className="btn btn-md btn-info font-weight-bolder text-uppercase"
                >
                  Give feedback
                </a> */}
              </div>
            </div>

            <div className="d-flex align-items-center flex-wrap justify-content-between mb-10">
              <div className="flex-grow-1 font-weight-bold text-dark-50 py-5 py-lg-2 mr-5 mb-10">
                {fullDesc}
              </div>

              <div className="d-flex flex-wrap align-items-center py-2">
                <div className="d-flex align-items-center">
                  <div className="mr-6">
                    <div className="font-weight-bold mb-2">Department</div>
                    <span className="label label-xl label-light label-inline text-nowrap">
                      SE
                    </span>
                  </div>
                  <div className="mr-6">
                    <div className="font-weight-bold mb-2">Submit by</div>
                    <span className="label label-xl label-light label-inline text-nowrap">
                      Phan Thong Thanh
                    </span>
                  </div>
                  <div className="">
                    <div className="font-weight-bold mb-2">Status</div>
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
            <span className="mr-4">
              <i className="flaticon-network icon-2x text-muted font-weight-bold"></i>
            </span>
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
            <span className="mr-4">
              <i className="flaticon-network icon-2x text-muted font-weight-bold"></i>
            </span>
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
              <a href="/" className="text-primary font-weight-bolder">
                View
              </a>
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
