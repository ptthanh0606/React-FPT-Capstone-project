import React from 'react';
import { toAbsoluteUrl } from '_metronic/_helpers';
import SVG from 'react-inlinesvg';
import { useHistory } from 'react-router-dom';

const ProfileActions = () => {
  const history = useHistory();

  const logoutClick = () => {
    const toggle = document.getElementById('kt_quick_user_toggle');
    if (toggle) {
      toggle.click();
    }
    history.push('/logout');
  };

  return (
    <div class="card card-custom card-stretch">
      <div className="card-body pt-4">
        <div className="d-flex align-items-center">
          <div className="symbol symbol-60 symbol-xxl-100 mr-5 align-self-start align-self-xxl-center">
            <div
              className="symbol-label"
              // style="background-image:url('assets/media/users/300_21.jpg')"
            ></div>
            <i className="symbol-badge bg-success"></i>
          </div>
          <div>
            <a
              href="/"
              className="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary"
            >
              Phan Thong Thanh
            </a>
            <div className="text-muted">Admin</div>
          </div>
        </div>

        <div className="py-9">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="font-weight-bold mr-2">Email:</span>
            <a href="/" className="text-muted text-hover-primary">
              thanhptse130359@fpt.edu.vn
            </a>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="font-weight-bold mr-2">Department:</span>
            <span className="text-muted">Software Engineer</span>
          </div>
          {/* <div className="d-flex align-items-center justify-content-between">
            <span className="font-weight-bold mr-2">Location:</span>
            <span className="text-muted">Melbourne</span>
          </div> */}
        </div>

        <div className="navi navi-bold navi-hover navi-active navi-link-rounded">
          <div className="navi-item mb-2">
            <a href="/" className="navi-link py-4 active">
              <span className="navi-icon mr-2">
                <span className="svg-icon">
                  <svg
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
                      <polygon points="0 0 24 0 24 24 0 24"></polygon>
                      <path
                        d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                        fill="#000000"
                        fill-rule="nonzero"
                        opacity="0.3"
                      ></path>
                      <path
                        d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                        fill="#000000"
                        fill-rule="nonzero"
                      ></path>
                    </g>
                  </svg>
                </span>{' '}
              </span>
              <span className="navi-text font-size-lg">
                Personal Information
              </span>
            </a>
          </div>

          {/* <div className="navi-item mb-2">
            <a href="/" className="navi-link py-4 ">
              <span className="navi-icon mr-2">
                <span className="svg-icon">
                  <svg
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
                      <rect x="0" y="0" width="24" height="24"></rect>
                      <path
                        d="M2.56066017,10.6819805 L4.68198052,8.56066017 C5.26776695,7.97487373 6.21751442,7.97487373 6.80330086,8.56066017 L8.9246212,10.6819805 C9.51040764,11.267767 9.51040764,12.2175144 8.9246212,12.8033009 L6.80330086,14.9246212 C6.21751442,15.5104076 5.26776695,15.5104076 4.68198052,14.9246212 L2.56066017,12.8033009 C1.97487373,12.2175144 1.97487373,11.267767 2.56066017,10.6819805 Z M14.5606602,10.6819805 L16.6819805,8.56066017 C17.267767,7.97487373 18.2175144,7.97487373 18.8033009,8.56066017 L20.9246212,10.6819805 C21.5104076,11.267767 21.5104076,12.2175144 20.9246212,12.8033009 L18.8033009,14.9246212 C18.2175144,15.5104076 17.267767,15.5104076 16.6819805,14.9246212 L14.5606602,12.8033009 C13.9748737,12.2175144 13.9748737,11.267767 14.5606602,10.6819805 Z"
                        fill="#000000"
                        opacity="0.3"
                      ></path>
                      <path
                        d="M8.56066017,16.6819805 L10.6819805,14.5606602 C11.267767,13.9748737 12.2175144,13.9748737 12.8033009,14.5606602 L14.9246212,16.6819805 C15.5104076,17.267767 15.5104076,18.2175144 14.9246212,18.8033009 L12.8033009,20.9246212 C12.2175144,21.5104076 11.267767,21.5104076 10.6819805,20.9246212 L8.56066017,18.8033009 C7.97487373,18.2175144 7.97487373,17.267767 8.56066017,16.6819805 Z M8.56066017,4.68198052 L10.6819805,2.56066017 C11.267767,1.97487373 12.2175144,1.97487373 12.8033009,2.56066017 L14.9246212,4.68198052 C15.5104076,5.26776695 15.5104076,6.21751442 14.9246212,6.80330086 L12.8033009,8.9246212 C12.2175144,9.51040764 11.267767,9.51040764 10.6819805,8.9246212 L8.56066017,6.80330086 C7.97487373,6.21751442 7.97487373,5.26776695 8.56066017,4.68198052 Z"
                        fill="#000000"
                      ></path>
                    </g>
                  </svg>
                </span>{' '}
              </span>
              <span className="navi-text font-size-lg">
                Account Information
              </span>
            </a>
          </div> */}

          {/* <div className="navi-item mb-2">
            <a
              href="custom/apps/profile/profile-1/change-password.html"
              className="navi-link py-4 "
            >
              <span className="navi-icon mr-2">
                <span className="svg-icon">
                  <svg
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
                      <rect x="0" y="0" width="24" height="24"></rect>
                      <path
                        d="M4,4 L11.6314229,2.5691082 C11.8750185,2.52343403 12.1249815,2.52343403 12.3685771,2.5691082 L20,4 L20,13.2830094 C20,16.2173861 18.4883464,18.9447835 16,20.5 L12.5299989,22.6687507 C12.2057287,22.8714196 11.7942713,22.8714196 11.4700011,22.6687507 L8,20.5 C5.51165358,18.9447835 4,16.2173861 4,13.2830094 L4,4 Z"
                        fill="#000000"
                        opacity="0.3"
                      ></path>
                      <path
                        d="M12,11 C10.8954305,11 10,10.1045695 10,9 C10,7.8954305 10.8954305,7 12,7 C13.1045695,7 14,7.8954305 14,9 C14,10.1045695 13.1045695,11 12,11 Z"
                        fill="#000000"
                        opacity="0.3"
                      ></path>
                      <path
                        d="M7.00036205,16.4995035 C7.21569918,13.5165724 9.36772908,12 11.9907452,12 C14.6506758,12 16.8360465,13.4332455 16.9988413,16.5 C17.0053266,16.6221713 16.9988413,17 16.5815,17 C14.5228466,17 11.463736,17 7.4041679,17 C7.26484009,17 6.98863236,16.6619875 7.00036205,16.4995035 Z"
                        fill="#000000"
                        opacity="0.3"
                      ></path>
                    </g>
                  </svg>
                </span>{' '}
              </span>
              <span className="navi-text font-size-lg">Change Password</span>
              <span className="navi-label">
                <span className="label label-light-danger label-rounded font-weight-bold">
                  5
                </span>
              </span>
            </a>
          </div> */}

          {/* <div className="navi-item mb-2">
            <a
              href="custom/apps/profile/profile-1/email-settings.html"
              className="navi-link py-4 "
            >
              <span className="navi-icon mr-2">
                <span className="svg-icon">
                  <svg
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
                      <rect x="0" y="0" width="24" height="24"></rect>
                      <path
                        d="M6,2 L18,2 C18.5522847,2 19,2.44771525 19,3 L19,12 C19,12.5522847 18.5522847,13 18,13 L6,13 C5.44771525,13 5,12.5522847 5,12 L5,3 C5,2.44771525 5.44771525,2 6,2 Z M7.5,5 C7.22385763,5 7,5.22385763 7,5.5 C7,5.77614237 7.22385763,6 7.5,6 L13.5,6 C13.7761424,6 14,5.77614237 14,5.5 C14,5.22385763 13.7761424,5 13.5,5 L7.5,5 Z M7.5,7 C7.22385763,7 7,7.22385763 7,7.5 C7,7.77614237 7.22385763,8 7.5,8 L10.5,8 C10.7761424,8 11,7.77614237 11,7.5 C11,7.22385763 10.7761424,7 10.5,7 L7.5,7 Z"
                        fill="#000000"
                        opacity="0.3"
                      ></path>
                      <path
                        d="M3.79274528,6.57253826 L12,12.5 L20.2072547,6.57253826 C20.4311176,6.4108595 20.7436609,6.46126971 20.9053396,6.68513259 C20.9668779,6.77033951 21,6.87277228 21,6.97787787 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,6.97787787 C3,6.70173549 3.22385763,6.47787787 3.5,6.47787787 C3.60510559,6.47787787 3.70753836,6.51099993 3.79274528,6.57253826 Z"
                        fill="#000000"
                      ></path>
                    </g>
                  </svg>
                </span>{' '}
              </span>
              <span className="navi-text font-size-lg">Email settings</span>
            </a>
          </div> */}

          {/* <div className="navi-item mb-2">
            <a
              href="/"
              className="navi-link py-4"
              data-toggle="tooltip"
              title=""
              data-placement="right"
              data-original-title="Coming soon..."
            >
              <span className="navi-icon mr-2">
                <span className="svg-icon">
                  <svg
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
                      <rect x="0" y="0" width="24" height="24"></rect>
                      <rect
                        fill="#000000"
                        x="2"
                        y="5"
                        width="19"
                        height="4"
                        rx="1"
                      ></rect>
                      <rect
                        fill="#000000"
                        opacity="0.3"
                        x="2"
                        y="11"
                        width="19"
                        height="10"
                        rx="1"
                      ></rect>
                    </g>
                  </svg>
                </span>{' '}
              </span>
              <span className="navi-text font-size-lg">Saved Credit Cards</span>
            </a>
          </div> */}

          {/* <div className="navi-item mb-2">
            <a
              href="/"
              className="navi-link py-4"
              data-toggle="tooltip"
              title=""
              data-placement="right"
              data-original-title="Coming soon..."
            >
              <span className="navi-icon mr-2">
                <span className="svg-icon">
                  <svg
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
                      <polygon points="0 0 24 0 24 24 0 24"></polygon>
                      <path
                        d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z"
                        fill="#000000"
                        fill-rule="nonzero"
                        opacity="0.3"
                      ></path>
                      <rect
                        fill="#000000"
                        x="6"
                        y="11"
                        width="9"
                        height="2"
                        rx="1"
                      ></rect>
                      <rect
                        fill="#000000"
                        x="6"
                        y="15"
                        width="5"
                        height="2"
                        rx="1"
                      ></rect>
                    </g>
                  </svg>
                </span>{' '}
              </span>
              <span className="navi-text font-size-lg">Tax information</span>
              <span className="navi-label">
                <span className="label label-light-primary label-inline font-weight-bold">
                  new
                </span>
              </span>
            </a>
          </div> */}

          <div className="navi-item mb-2">
            <a
              href="/"
              className="navi-link py-4"
              data-toggle="tooltip"
              title=""
              data-placement="right"
              data-original-title="Coming soon..."
              onClick={logoutClick}
            >
              <span className="navi-icon mr-2">
                <span className="svg-icon">
                  <SVG
                    className="h-75 align-self-end"
                    src={toAbsoluteUrl('/media/svg/icons/Home/Door-open.svg')}
                  ></SVG>
                </span>{' '}
              </span>
              <span className="navi-text">Logout</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfileActions);
