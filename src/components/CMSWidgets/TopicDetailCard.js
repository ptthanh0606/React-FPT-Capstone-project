import React from 'react';
import { Link } from 'react-router-dom';

import { toAbsoluteUrl } from '_metronic/_helpers';
import md5 from 'utils/md5';

import * as constants from 'modules/semester/topic/constants';
import * as semesterConstants from 'modules/semester/constants';

import { useRecoilValue } from 'recoil';
import userAtom from 'store/user';
import semesterAtom from 'store/semester';
import { role } from 'auth/recoil/selectors';

import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import ReactMarkdown from 'react-markdown';
import FeedbackSection from './FeedbackSection';
import GradingSection from './GradingSection';

const TopicDetailCard = ({
  className = '',
  topicId = '',
  topicCode = '',
  topicName = '',
  fullDesc = '',
  department = '',
  status = '',
  note = '',
  minMembers = 0,
  maxMember = 0,
  mentorMembers = [],
  studentMembers = [],
  applications = [],
  feedbacks = [],
  evaluations = [],
  attachmentLinkName = '',
  onFeedbackSuccess = () => {},
  submitter = {},
  isUserApprover = false,
  isUserMentor = false,
  isTeamInTopic = false,
  isLoading = true,
}) => {
  const currentUser = useRecoilValue(userAtom);
  const currentSemester = useRecoilValue(semesterAtom);
  const currentRole = useRecoilValue(role);

  // -----------------------------------------------------------------------------

  return (
    <div className={className + ' card card-custom gutter-b'}>
      <div className="card-body">
        {!isLoading ? (
          <>
            <div className="d-flex">
              <div className="flex-grow-1">
                <div className="d-flex align-items-center justify-content-between flex-wrap mb-10">
                  <div className="mr-3">
                    <Link
                      to={`/topic/${topicId}`}
                      className="d-flex align-items-center text-dark text-hover-primary font-size-h3 font-weight-bolder mr-3"
                    >
                      {`${topicName}`}{' '}
                    </Link>
                    <div className="d-flex flex-wrap my-2">
                      <Link
                        to={`/topic/${topicId}`}
                        className="text-muted text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2"
                      >
                        {topicCode}
                      </Link>
                    </div>
                  </div>
                  <div className="my-lg-0 my-1">
                    <a
                      href={attachmentLinkName}
                      title="Download"
                      target="_blank"
                      rel="noopener noreferrer"
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

                <div className="d-flex flex-column align-items-start flex-wrap justify-content-between mb-10">
                  <div className="flex-grow-1 py-5 py-lg-2 mr-5 mb-10">
                    <div className="font-weight-bolder mb-2">Description</div>
                    <ReactMarkdown>{fullDesc}</ReactMarkdown>
                  </div>

                  <div className="d-flex flex-wrap align-items-center py-2">
                    <div className="d-flex align-items-center">
                      <div className="mr-10">
                        <div className="font-weight-bolder mb-2">
                          Department
                        </div>
                        {department && (
                          <span className="label label-xl label-light label-inline text-nowrap mr-2">
                            {department.fullName}
                          </span>
                        )}
                      </div>
                      <div className="mr-10">
                        <div className="font-weight-bolder mb-2">Submit by</div>
                        <Link
                          to={`/profile/lecturer/${submitter.value}`}
                          className={`text-dark-50 text-hover-primary`}
                        >
                          {submitter.label}
                        </Link>
                      </div>
                      <div className="mr-10">
                        <div className="font-weight-bolder mb-2">Status</div>
                        <span
                          className={`label label-xl label-light-${constants.statusClasses[status]} label-inline text-nowrap`}
                        >
                          {constants.statusTitles[status]}
                        </span>
                      </div>
                      <div className="mr-10">
                        <div className="font-weight-bolder mb-2">Note</div>
                        <span>{note}</span>
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
                  <i className="flaticon-exclamation-2 icon-2x text-muted font-weight-bold"></i>
                </span>
                <div className="d-flex flex-column text-dark-75">
                  <span className="font-weight-bolder font-size-sm">
                    Minimum members
                  </span>
                  <span className="font-weight-bolder font-size-h5">
                    <span className="text-dark-50 font-weight-bold">
                      {minMembers}
                    </span>
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center flex-lg-fill my-1">
                <span className="mr-4">
                  <i className="flaticon-exclamation-2 icon-2x text-muted font-weight-bold"></i>
                </span>
                <div className="d-flex flex-column text-dark-75">
                  <span className="font-weight-bolder font-size-sm">
                    Maximum members
                  </span>
                  <span className="font-weight-bolder font-size-h5">
                    <span className="text-dark-50 font-weight-bold">
                      {maxMember}
                    </span>
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center flex-lg-fill my-1">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Team</Tooltip>}
                >
                  <span className="mr-4">
                    <i className="flaticon-users icon-2x text-muted font-weight-bold"></i>
                  </span>
                </OverlayTrigger>
                <div className="symbol-group symbol-hover">
                  {studentMembers?.length ? (
                    studentMembers.map(student => (
                      <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>{student.name}</Tooltip>}
                      >
                        <Link
                          to={`/profile/student/${student.id}`}
                          className="symbol symbol-30 symbol-circle"
                          data-toggle="tooltip"
                        >
                          <img
                            alt="Pic"
                            src={`https://www.gravatar.com/avatar/${md5(
                              student.email ? student.email.toLowerCase() : ''
                            )}`}
                          />
                        </Link>
                      </OverlayTrigger>
                    ))
                  ) : (
                    <>Not yet</>
                  )}
                </div>
              </div>

              <div className="d-flex align-items-center flex-lg-fill my-1">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Mentors</Tooltip>}
                >
                  <span className="mr-4">
                    <i className="flaticon-profile-1 icon-2x text-muted font-weight-bold"></i>
                  </span>
                </OverlayTrigger>
                <div className="symbol-group symbol-hover">
                  {mentorMembers?.length ? (
                    mentorMembers.map(mentor => (
                      <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>{mentor.name}</Tooltip>}
                      >
                        <Link
                          to={`/profile/lecturer/${mentor.id}`}
                          className="symbol symbol-30 symbol-circle"
                          data-toggle="tooltip"
                        >
                          <img
                            alt="Pic"
                            src={`https://www.gravatar.com/avatar/${md5(
                              mentor.email ? mentor.email.toLowerCase() : ''
                            )}`}
                          />
                        </Link>
                      </OverlayTrigger>
                    ))
                  ) : (
                    <>Not yet</>
                  )}
                </div>
              </div>

              {constants.statusTitles[status] !== 'Assigned' && (
                <div className="d-flex align-items-center flex-lg-fill my-1">
                  <span className="mr-4">
                    <i className="flaticon-file-2 icon-2x text-muted font-weight-bold"></i>
                  </span>
                  <div className="d-flex flex-column flex-lg-fill">
                    <span className="text-dark-75 font-weight-bolder font-size-sm">
                      {applications?.length} Applications
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="separator separator-solid my-7"></div>

            {['Waiting', 'Approved'].includes(
              constants.statusTitles[status]
            ) && (
              <FeedbackSection
                className=""
                feedbacks={feedbacks}
                onSuccess={onFeedbackSuccess}
                topicStatus={constants.statusTitles[status]}
                isInDep={currentUser.department.some(
                  ({ name }) => name === department.fullName
                )}
                isUserApprover={isUserApprover}
              />
            )}

            {semesterConstants.statusTitles[currentSemester.status] ===
              'In-progress' && (
              <>
                {['Assigned', 'Passed', 'Failed'].includes(
                  constants.statusTitles[status]
                ) &&
                  currentRole === 'lecturer' && (
                    <GradingSection
                      evaluations={evaluations || []}
                      isUserMentor={isUserMentor}
                    />
                  )}

                {['Assigned', 'Passed', 'Failed'].includes(
                  constants.statusTitles[status]
                ) &&
                  isTeamInTopic && (
                    <GradingSection
                      evaluations={evaluations || []}
                      isUserMentor={isUserMentor}
                    />
                  )}
              </>
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
    </div>
  );
};

export default React.memo(TopicDetailCard);
