import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'utils/md5';
import MessageTile from './MessageTile';

import semesterAtom from 'store/semester';
import { useRecoilValue } from 'recoil';
import { toAbsoluteUrl } from '_metronic/_helpers';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { format } from 'date-fns';

const Checkpoint = ({
  status = 1,
  name = '',
  submissionDeadline = '',
  evaluateDate = '',
}) => {
  const [statusClass] = React.useState(['', '-primary', '-danger', '-success']);

  return (
    <div class="d-flex align-items-center mr-2">
      <div
        class={`symbol symbol-45 symbol-light${statusClass[status]} mr-4 flex-shrink-0`}
      >
        <div class="symbol-label">
          <span class={`svg-icon svg-icon-lg svg-icon${statusClass[status]}`}>
            {(status === 0 && (
              <i class={`fas fa-minus text${statusClass[status]}`}></i>
            )) ||
              (status === 1 && (
                <i class={`fas fa-circle-notch text${statusClass[status]}`}></i>
              )) ||
              (status === 2 && (
                <i class={`fas fa-slash text${statusClass[status]}`}></i>
              )) ||
              (status === 3 && (
                <i class={`fas fa-check text${statusClass[status]}`}></i>
              ))}
          </span>
        </div>
      </div>

      <div>
        <Link to={`/topic/`} class="text-dark-75 font-weight-bolder">
          {name}
        </Link>
        {status === 0 && (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>You finish all reports before this date</Tooltip>}
          >
            <div class="font-size-sm text-muted font-weight-bold mt-1">
              Due at {format(new Date(submissionDeadline), 'dd MMM')}
            </div>
          </OverlayTrigger>
        )}
        {status === 1 && (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip>
                Checkpoint is being evaluate, results will be publish after{' '}
                {format(new Date(submissionDeadline), 'dd MMM')}
              </Tooltip>
            }
          >
            <div class="font-size-sm text-muted font-weight-bold mt-1">
              Evaluate at {evaluateDate}
            </div>
          </OverlayTrigger>
        )}
      </div>
    </div>
  );
};

const TopicTeamPreview = ({
  isStudentHaveTeam = false,
  isStudentHaveTopic = false,
  members = [],
  topic = {
    value: '',
    label: '',
    code: '',
  },
  checkpoints = [
    {
      status: 0,
      name: '',
      submissionDeadline: '',
      evaluateDate: '',
    },
  ],
}) => {
  const currentSemester = useRecoilValue(semesterAtom);

  return (
    <div className="card card-custom card-border gutter-b">
      {isStudentHaveTeam && isStudentHaveTopic && (
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title font-weight-bolder align-items-start text-dark flex-column">
            Your topic
            <span className="text-muted mt-3 font-weight-bold font-size-sm">
              Assigned topic of team
            </span>
          </h3>
        </div>
      )}
      <div className="card-body">
        <div className="d-flex flex-column">
          {isStudentHaveTopic && (
            <div className="d-flex flex-column">
              <Link
                to={`/topic/${topic?.value}`}
                className="text-primary font-weight-bolder text-hover-primary font-size-h5"
              >
                {topic?.label}
              </Link>
              <span className="text-muted font-weight-bold font-size-lg">
                {topic?.code}
              </span>
            </div>
          )}

          {isStudentHaveTeam && !isStudentHaveTopic && (
            <MessageTile
              className="flex-grow-1"
              content={
                [0, 1].includes(currentSemester.status) ? (
                  <>
                    {currentSemester.status === 0 ? (
                      <>
                        Topic is being processing, please wait for the next
                        semester phase! <br />
                      </>
                    ) : (
                      <>
                        Now you can start applying for a capstone topic! <br />
                        <Link
                          className="font-weight-bolder text-info"
                          to="/topic"
                        >
                          Show me where
                        </Link>
                      </>
                    )}
                  </>
                ) : (
                  <>Assigning for topics session over!</>
                )
              }
              iconSrc={toAbsoluteUrl('/media/svg/icons/Code/Info-circle.svg')}
              baseColor="info"
            />
          )}

          {[0, 1].includes(currentSemester.status) && !isStudentHaveTeam && (
            <MessageTile
              className="m-0"
              iconSrc={toAbsoluteUrl('/media/svg/icons/Code/Info-circle.svg')}
              content={
                <>
                  <b>Create a team</b> or <b>join a team</b> to start assigning
                  for topic!
                </>
              }
              baseColor="warning"
            />
          )}

          {[2, 3].includes(currentSemester.status) && !isStudentHaveTeam && (
            <MessageTile
              className="m-0"
              iconSrc={toAbsoluteUrl('/media/svg/icons/Code/Info-circle.svg')}
              content={<>Capstone semester is running...</>}
              baseColor="warning"
            />
          )}

          {currentSemester.status === 2 &&
            isStudentHaveTeam &&
            isStudentHaveTopic && (
              <div className="d-flex flex-column mt-10">
                <span className="text-dark mr-2 font-size-lg font-weight-bolder pb-4">
                  Your team checkpoints status
                </span>
                <div class="row row-paddingless mb-10 mt-3">
                  {checkpoints.map(checkpoint => (
                    <div class="col-6 mb-8">
                      <Checkpoint {...checkpoint} />
                    </div>
                  ))}
                </div>
              </div>
            )}

          {isStudentHaveTeam && (
            <div className="d-flex flex-column mt-10">
              <span className="text-dark mr-2 font-size-lg font-weight-bolder pb-4">
                Team members
              </span>

              <div className="d-flex">
                {members.length &&
                  members.map(member => (
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip>{member.label}</Tooltip>}
                    >
                      <Link
                        to={`/profile/student/${member.value}`}
                        className="symbol symbol-50 mr-5"
                      >
                        <div
                          className="symbol-label"
                          style={{
                            backgroundImage: `url(https://www.gravatar.com/avatar/${
                              (member.email && md5(member.email)) || ''
                            })`,
                          }}
                        />
                      </Link>
                    </OverlayTrigger>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TopicTeamPreview);
