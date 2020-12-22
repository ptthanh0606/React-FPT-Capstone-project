import React from 'react';

import { Link, useHistory, useParams } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import semesterAtom from 'store/semester';
import userAtom from 'store/user';
import { role } from 'auth/recoil/selectors';

import toast from 'utils/toast';
import request from 'utils/request';
import { handleErrors } from 'utils/common';

import * as endpoints from 'endpoints';
import * as transformers from 'modules/semester/topic/transformers';
import * as constants from 'modules/semester/topic/constants';
import * as teamTransformers from 'modules/semester/team/transformers';
import * as departmentTransformers from 'modules/department/transformers';

import CMSModal from 'components/CMSModal/CMSModal';
import CMSList from 'components/CMSList';
import GroupCard from 'components/GroupCard';
import TopicDetailCard from 'components/CMSWidgets/TopicDetailCard';
import useConfirm from 'utils/confirm';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toAbsoluteUrl } from '_metronic/_helpers';
import { transformToGrid } from 'modules/semester/topic/checkpoints/transformers';
import { convertDateDown } from 'modules/semester/team/application/transformers';
import Button from 'components/Button';

const Topic = () => {
  const history = useHistory();
  const { id } = useParams();
  const confirm = useConfirm();
  const [l, loadData] = React.useReducer(() => ({}));

  // ----------------------------------------------------------

  const setMeta = useSetRecoilState(metaAtom);
  const currentSemester = useRecoilValue(semesterAtom);
  const currentUser = useRecoilValue(userAtom);
  const currentRole = useRecoilValue(role);

  // ----------------------------------------------------------

  const [currentTopic, setCurrentTopic] = React.useState({});
  const [reports, setReports] = React.useState([]);
  const [evals, setEvals] = React.useState([]);
  const [isStudentUserHaveTeam, setIsStudentUserHaveTeam] = React.useState(
    false
  );
  const [isTeamInTopic, setIsTeamInTopic] = React.useState(false);
  const [isStudentTeamLead, setIsStudentTeamLead] = React.useState(false);
  const [isTeamApplied, setIsTeamApplied] = React.useState(false);
  const [isTeamLocked, setIsTeamLocked] = React.useState(false);

  const [isUserMentor, setIsUserMentor] = React.useState(false);
  const [isUserMentorLeader, setIsUserMentorLeader] = React.useState(false);
  const [isUserApprover, setIsUserApprover] = React.useState(false);

  const [mentorLeaderId, setMentorLeaderId] = React.useState();
  const [studentLeaderId, setStudentLeaderId] = React.useState();
  const [guestStudentTeamId, setGuestStudentTeamId] = React.useState();
  const [studentApplicationId, setStudentApplicationId] = React.useState();

  const [editWeightFlg, setEditWeightFlg] = React.useState(false);

  //----------------------------------------------------------------------------

  const [updateFieldTemplate, setUpdateFieldTemplate] = React.useState({});
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isButtonProcessing, setIsButtonProcessing] = React.useState(false);
  const [isGradingProcessing, setIsGradingProcessing] = React.useState(false);

  // ----------------------------------------------------------

  const fetchDepartment = React.useCallback(
    depId => {
      request({
        to: endpoints.READ_DEPARTMENT(depId).url,
        method: endpoints.READ_DEPARTMENT(depId).method,
      })
        .then(res => {
          const transformedRes = departmentTransformers.down(res.data.data);
          setIsUserApprover(
            transformedRes.approvers.some(
              approver => approver.value === currentUser.id
            )
          );
        })
        .catch(err => {
          handleErrors(err);
        });
    },
    [currentUser.id]
  );

  const fetchLeaderTeam = React.useCallback(
    teamId => {
      request({
        to: endpoints.READ_TEAM(teamId).url,
        method: endpoints.READ_TEAM(teamId).method,
        params: {
          semesterId: currentSemester.id,
        },
      })
        .then(res => {
          const transformedRes = teamTransformers.down(res.data.data);
          setStudentLeaderId(transformedRes.leader.value);
        })
        .catch(err => {});
    },
    [currentSemester.id]
  );

  const checkPreConditions = React.useCallback(
    data => {
      setMentorLeaderId(
        data.mentorMembers?.filter(({ isLeader }) => isLeader === true)[0]?.id
      );
      if (currentRole === 'lecturer') {
        setIsUserMentor(
          data.mentorMembers?.some(({ value }) => value === currentUser.id)
        );

        setIsUserMentorLeader(
          data.mentorMembers?.filter(({ isLeader }) => isLeader === true)[0]
            ?.id === currentUser.id
        );

        fetchDepartment(data.department.value);
      } else {
        if (![0, 1, 2, 3].includes(data.status)) {
          fetchLeaderTeam(data.team.value);
        }
      }
    },
    [currentRole, currentUser.id, fetchDepartment, fetchLeaderTeam]
  );

  const fetchCouncil = React.useCallback(() => {
    // fetch Topic
    request({
      to: endpoints.READ_TOPIC(id).url,
      method: endpoints.READ_TOPIC(id).method,
    })
      .then(res => {
        const transformedRes = transformers.downRead(res.data.data);
        checkPreConditions(transformedRes);

        setCurrentTopic(transformedRes);
      })
      .catch(err => {
        history.push('/topic');
        handleErrors(err);
      });
  }, [checkPreConditions, history, id]);

  const fetchTopic = React.useCallback(() => {
    // fetch Topic
    setIsProcessing(true);
    request({
      to: endpoints.READ_TOPIC(id).url,
      method: endpoints.READ_TOPIC(id).method,
    })
      .then(res => {
        const transformedRes = transformers.downRead(res.data.data);
        checkPreConditions(transformedRes);
        setCurrentTopic(transformedRes);
        setIsProcessing(false);
      })
      .catch(err => {
        history.push('/topic');
        setIsProcessing(false);
        handleErrors(err);
      });
  }, [checkPreConditions, history, id]);

  const fetchUserTeam = React.useCallback(() => {
    request({
      to: endpoints.READ_TEAM(0).url,
      method: endpoints.READ_TEAM(0).method,
      params: {
        semesterId: currentSemester.id,
      },
    })
      .then(res => {
        setIsStudentUserHaveTeam(true);
        const transformedRes = teamTransformers.down(res.data.data);

        if (
          transformedRes.applications.some(
            app => id * 1 === app.topic.id && app.status === 0
          )
        ) {
          setIsTeamApplied(true);
          setStudentApplicationId(
            transformedRes.applications.filter(
              app => id * 1 === app.topic.id && app.status === 0
            )[0].id
          );
        }
        setGuestStudentTeamId(transformedRes.id);
        setIsStudentTeamLead(currentUser.id === transformedRes.leader.value);
        setIsTeamInTopic(id * 1 === transformedRes.topic?.value);
        setIsTeamLocked(transformedRes.lock);
      })
      .catch(err => {
        setIsStudentUserHaveTeam(false);
      });
  }, [currentSemester.id, currentUser.id, id]);

  const fetchEvaluation = React.useCallback(() => {
    if (id) {
      request({
        to: endpoints.GET_EVALUATION(id).url,
        method: endpoints.GET_EVALUATION(id).method,
      })
        .then(res => {
          const evals = transformToGrid(
            res.data.data,
            currentUser.id,
            currentRole === 'lecturer'
          );
          if (evals.some(e => e.status === 2)) {
            setEvals(evals.filter(e => e.status === 2));
          } else {
            setEvals(evals);
          }
        })
        .catch(err => {
          handleErrors(err);
        });
    }
  }, [currentRole, currentUser.id, id]);

  const fetchReport = React.useCallback(() => {
    request({
      to: endpoints.READ_REPORT.url,
      method: endpoints.READ_REPORT.method,
      params: {
        topicId: id,
      },
    })
      .then(res => {
        setReports(
          res.data.data.map(report => ({
            label: report.title,
            subLabel: convertDateDown(report.updatedAt),
            attachmentLink: report.attachmentLink,
          }))
        );
      })
      .catch(handleErrors)
      .finally(() => setIsProcessing(false));
  }, [id]);

  // ----------------------------------------------------------

  const handleConfirmApproveTeam = React.useCallback(
    appId => {
      return () => {
        request({
          to: endpoints.APPROVE_APPLICATION(appId).url,
          method: endpoints.APPROVE_APPLICATION(appId).method,
        })
          .then(res => {
            toast.success('Approved selected team to topic.');
            fetchTopic();
          })
          .catch(err => {
            handleErrors(err);
          });
      };
    },
    [fetchTopic]
  );

  const handleConfirmRejectTeam = React.useCallback(
    appId => {
      return () => {
        request({
          to: endpoints.REJECT_APPLICATION(appId).url,
          method: endpoints.REJECT_APPLICATION(appId).method,
        })
          .then(res => {
            toast.success('Rejected selected team.');
            fetchTopic();
          })
          .catch(err => {
            handleErrors(err);
          });
      };
    },
    [fetchTopic]
  );

  const handleApproveTeam = React.useCallback(
    appId => {
      confirm({
        title: 'Confirm required',
        body: 'Are you sure you want to match this team to topic?',
        onConfirm: handleConfirmApproveTeam(appId),
      });
    },
    [confirm, handleConfirmApproveTeam]
  );

  const handleRejectTeam = React.useCallback(
    appId => {
      confirm({
        title: 'Confirm required',
        body: 'Are you sure you want to reject this team to application?',
        onConfirm: handleConfirmRejectTeam(appId),
      });
    },
    [confirm, handleConfirmRejectTeam]
  );

  const handleShowEditWeight = React.useCallback(e => {
    e.preventDefault();
    setEditWeightFlg(editWeightFlg => !editWeightFlg);
  }, []);

  const handleChangeWeight = React.useCallback(
    weightData => {
      request({
        to: endpoints.UPDATE_WEIGHT(id).url,
        method: endpoints.UPDATE_WEIGHT(id).method,
        data: {
          topicId: currentTopic?.id,
          mentorMembers: weightData,
        },
      })
        .then(res => {
          fetchTopic();
          toast.success('Mentor weights updated!');
          setEditWeightFlg(editWeightFlg => !editWeightFlg);
        })
        .catch(err => {
          handleErrors(err);
        });
    },
    [currentTopic.id, fetchTopic, id]
  );

  const onFeedbackSuccess = React.useCallback(
    e => {
      fetchTopic();
    },
    [fetchTopic]
  );

  const handleConfirmSettingModal = React.useCallback(
    fieldData => {
      setIsProcessing(true);

      fieldData = transformers.up(fieldData);

      const data = new FormData();
      for (const i of Object.keys(fieldData)) {
        if (!fieldData?.[i]) continue;
        if (fieldData[i]?.constructor?.name !== 'File') {
          data.append(i, fieldData[i]);
        } else {
          data.append(i, fieldData[i], fieldData[i].name);
        }
      }

      request({
        to: endpoints.UPDATE_TOPIC(id).url,
        method: endpoints.UPDATE_TOPIC(id).method,
        params: {
          topicId: id,
        },
        data: data,
      })
        .then(res => {
          toast.success('Update topic successfully');
          setShowUpdate(false);
          fetchTopic();
        })
        .catch(handleErrors)
        .finally(() => setIsProcessing(false));
    },
    [fetchTopic, id]
  );

  const handleShowSettingModal = React.useCallback(
    e => {
      e.preventDefault();
      request({
        to: endpoints.READ_TOPIC(id).url,
        method: endpoints.READ_TOPIC(id).method,
        params: {
          topicId: id,
        },
      })
        .then(res => {
          setUpdateFieldTemplate(transformers.downRead(res.data?.data) || {});
          setShowUpdate(true);
        })
        .catch(handleErrors);
    },
    [id]
  );

  const onDumpConfirm = React.useCallback(() => {
    request({
      to: endpoints.DELETE_TOPIC(id).url,
      method: endpoints.DELETE_TOPIC(id).method,
    })
      .then(res => {
        fetchTopic();
      })
      .catch(handleErrors);
  }, [fetchTopic, id]);

  const handleConfirmDumpTopic = React.useCallback(() => {
    confirm({
      title: 'Confirm required',
      body: 'Are you sure you want to dump this selected topic?',
      onConfirm: onDumpConfirm,
    });
  }, [confirm, onDumpConfirm]);

  const onConfirmApplyMentor = React.useCallback(() => {
    request({
      to: endpoints.APPLY_MENTOR(id).url,
      method: endpoints.APPLY_MENTOR(id).method,
    })
      .then(res => {
        toast.success('You are now a mentor of this topic!');
        fetchTopic();
      })
      .catch(handleErrors);
  }, [fetchTopic, id]);

  const handleApplyMentor = React.useCallback(() => {
    confirm({
      title: 'Confirm required',
      body: 'Are you sure you want to be a mentor of this topic?',
      onConfirm: onConfirmApplyMentor,
    });
  }, [confirm, onConfirmApplyMentor]);

  const onConfirmApplyMatching = React.useCallback(() => {
    request({
      to: endpoints.SEND_APPLICATION.url,
      method: endpoints.SEND_APPLICATION.method,
      data: {
        teamId: guestStudentTeamId,
        topicId: id,
      },
    })
      .then(() => {
        fetchTopic();
        fetchUserTeam();
        toast.success(
          'Your team application sent, please wait for mentor to confirm!'
        );
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [fetchTopic, fetchUserTeam, guestStudentTeamId, id]);

  const onConfirmCancelApplication = React.useCallback(() => {
    request({
      to: endpoints.CANCEL_APPLICATION(studentApplicationId).url,
      method: endpoints.CANCEL_APPLICATION(studentApplicationId).method,
    })
      .then(() => {
        fetchTopic();
        fetchUserTeam();
        setIsTeamApplied(false);
        toast.success('Application canceled.');
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [fetchTopic, fetchUserTeam, studentApplicationId]);

  const handleCancelApplication = React.useCallback(() => {
    confirm({
      title: 'Confirm required',
      body: 'Are you sure you want to cancel this application?',
      onConfirm: onConfirmCancelApplication,
    });
  }, [confirm, onConfirmCancelApplication]);

  const handleStudentApplyForMatching = React.useCallback(() => {
    confirm({
      title: 'Confirm required',
      body: 'Are you sure you want to apply matching for this topic?',
      onConfirm: onConfirmApplyMatching,
    });
  }, [confirm, onConfirmApplyMatching]);

  const fileRef = React.useRef(null);

  const handleClickFile = React.useCallback(e => {
    e.preventDefault();
    fileRef.current.click();
  }, []);

  const handleFileChange = React.useCallback(
    event => {
      setIsGradingProcessing(true);
      const data = new FormData();
      data.append(
        'attachment',
        event.currentTarget.files[0],
        event.currentTarget.files[0].name
      );
      data.append('topicId', id);
      data.append('title', event.currentTarget.files[0].name);
      request({
        to: endpoints.SEND_REPORT.url,
        method: endpoints.SEND_REPORT.method,
        data: data,
      })
        .then(res => {
          toast.success('Report sent!');
          loadData();
        })
        .catch(handleErrors)
        .finally(() => setIsGradingProcessing(false));
    },
    [id]
  );

  // ----------------------------------------------------------

  const toolBar = React.useCallback(() => {
    let buttons = <></>;
    if (currentTopic) {
      switch (currentRole) {
        case 'student':
          buttons = (
            <>
              {constants.statusTitles[currentTopic?.status] === 'Ready' &&
                isStudentUserHaveTeam &&
                !isTeamInTopic &&
                !isStudentTeamLead && (
                  <>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip>Only leader can send applications.</Tooltip>
                      }
                    >
                      <span class="svg-icon svg-icon-lg svg-icon-warning mr-2">
                        <SVG
                          src={toAbsoluteUrl(
                            '/media/svg/icons/Code/Warning-1-circle.svg'
                          )}
                        ></SVG>
                      </span>
                    </OverlayTrigger>
                  </>
                )}
              {constants.statusTitles[currentTopic?.status] === 'Ready' &&
                isStudentUserHaveTeam &&
                !isTeamInTopic &&
                isStudentTeamLead &&
                (!isTeamApplied ? (
                  <>
                    {isTeamLocked ? (
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip>
                            Apply matching for this topic, mentor will consider
                            your application after you sent.
                          </Tooltip>
                        }
                      >
                        <button
                          type="button"
                          className="btn btn-primary btn-success font-weight-bold btn-sm "
                          onClick={handleStudentApplyForMatching}
                          disabled={!isTeamLocked}
                        >
                          <i className="fas fa-sign-in-alt mr-1"></i>
                          Send application
                        </button>
                      </OverlayTrigger>
                    ) : (
                      <>
                        <span class="svg-icon svg-icon-lg svg-icon-warning mr-1">
                          <SVG
                            src={toAbsoluteUrl(
                              '/media/svg/icons/Code/Warning-1-circle.svg'
                            )}
                          ></SVG>
                        </span>
                        <span className="text-warning font-weight-bold mr-1">
                          You must lock your team before send application for
                          topic.
                        </span>
                        <Link
                          to="/my-team"
                          className="text-warning font-weight-bolder"
                        >
                          Take me there
                        </Link>
                      </>
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary btn-danger font-weight-bold btn-sm "
                    onClick={handleCancelApplication}
                  >
                    <i className="fas fa-ban mr-1"></i>
                    Cancel application
                  </button>
                ))}
            </>
          );
          break;

        case 'lecturer':
          buttons = (
            <>
              {constants.statusTitles[currentTopic.status] === 'Waiting' &&
                currentTopic.submitter.value === currentUser.id && (
                  <>
                    <button
                      type="button"
                      className="btn btn-primary font-weight-bold btn-sm btn-light mr-2 ml-2"
                      onClick={handleShowSettingModal}
                    >
                      <i className="fas fa-cog mr-1"></i>
                      Settings
                    </button>
                    <CMSModal
                      isShowFlg={showUpdate}
                      onHide={() => setShowUpdate(false)}
                      configs={constants.submitterModalConfigs(
                        currentSemester.id
                      )}
                      title="Update topic"
                      subTitle="Change this topic info"
                      onConfirmForm={handleConfirmSettingModal}
                      fieldTemplate={updateFieldTemplate}
                      primaryButtonLabel="Update"
                      isProcessing={isProcessing}
                    />
                  </>
                )}
              {[0, 1].includes(currentSemester.status) &&
                [2, 3, 4].includes(currentTopic.status) &&
                !isUserMentor && (
                  <button
                    type="button"
                    className="btn btn-primary btn-success font-weight-bold btn-sm ml-2"
                    onClick={handleApplyMentor}
                  >
                    <i className="fas fa-sign-in-alt mr-1"></i>
                    Become a mentor
                  </button>
                )}

              {constants.statusTitles[currentTopic.status] === 'Waiting' &&
                currentTopic.submitter.value === currentUser.id && (
                  <button
                    type="button"
                    className="btn btn-primary btn-danger font-weight-bold btn-sm "
                    onClick={handleConfirmDumpTopic}
                  >
                    <i className="far fa-trash-alt mr-2"></i>
                    Dump
                  </button>
                )}
            </>
          );
          break;

        default:
          break;
      }
    }
    return buttons;
  }, [
    currentRole,
    currentSemester.id,
    currentSemester.status,
    currentTopic,
    currentUser.id,
    handleApplyMentor,
    handleCancelApplication,
    handleConfirmDumpTopic,
    handleConfirmSettingModal,
    handleShowSettingModal,
    handleStudentApplyForMatching,
    isProcessing,
    isStudentTeamLead,
    isStudentUserHaveTeam,
    isTeamApplied,
    isTeamInTopic,
    isTeamLocked,
    isUserMentor,
    showUpdate,
    updateFieldTemplate,
  ]);

  const mentorCardToolbar = React.useCallback(() => {
    return editWeightFlg ? (
      <button
        type="submit"
        form="change-weight-form"
        className="btn btn-sm font-weight-bolder btn-success mt-2"
      >
        Save
      </button>
    ) : (
      <button
        type="button"
        onClick={handleShowEditWeight}
        className="btn btn-sm font-weight-bolder btn-light-primary mt-2"
      >
        Edit weight
      </button>
    );
  }, [editWeightFlg, handleShowEditWeight]);

  // ----------------------------------------------------------

  const setViewMeta = React.useCallback(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Topic detail',
      breadcrumb: [
        { title: 'Semester', path: '/select-semester' },
        { title: 'Fall 2020', path: '/select-semester#' + id },
        { title: 'Topic', path: '/topic/' },
        {
          title: currentTopic.name,
          path: '/topic/' + id,
        },
      ],
      toolbar: toolBar(),
    }));
  }, [currentTopic.name, id, setMeta, toolBar]);

  React.useEffect(() => {
    setViewMeta();
  });

  React.useEffect(() => {
    if (currentRole === 'student') {
      fetchUserTeam();
    }
    fetchTopic();
    if (currentSemester.status === 2 && isTeamInTopic) {
      fetchEvaluation();
      fetchReport();
    }
    if (currentSemester.status === 2 && isUserMentor) {
      fetchEvaluation();
      fetchReport();
    }
  }, [
    l,
    currentRole,
    currentSemester.status,
    fetchCouncil,
    fetchEvaluation,
    fetchReport,
    fetchTopic,
    fetchUserTeam,
    isTeamInTopic,
    isUserMentor,
  ]);

  const applicationsMap = React.useCallback(
    applications => {
      return applications
        .filter(application => application.status === 0)
        .map(application => ({
          id: application.id,
          label: application.team?.name,
          labelLinkTo: `/team/${application.team.id}`,
          subLabel: (
            <>
              <span className="font-weight-bolder">Leader: </span>
              {
                application.team?.members?.filter(
                  member => member.id === application.team.leaderId
                )[0]?.name
              }
            </>
          ),
          actions: (() => (
            <>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Approve selected team</Tooltip>}
              >
                <Button
                  className="btn btn-primary btn-light-success font-weight-bold btn-sm mr-2"
                  onClick={() => handleApproveTeam(application.id)}
                >
                  <i class="far fa-thumbs-up p-0"></i>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Reject selected team</Tooltip>}
              >
                <Button
                  className="btn btn-light-danger font-weight-bold btn-sm "
                  onClick={() => handleRejectTeam(application.id)}
                >
                  <i class="far fa-thumbs-down p-0"></i>
                </Button>
              </OverlayTrigger>
            </>
          ))(),
        }));
    },
    [handleApproveTeam, handleRejectTeam]
  );

  return (
    <>
      <div className="row">
        <div
          className={`col-lg-12 col-xxl-${
            [0, 1].includes(currentTopic.status) ? '12' : '9'
          }`}
        >
          <TopicDetailCard
            isButtonProcessing={isGradingProcessing}
            attachmentLinkName={currentTopic.attachment?.name || ''}
            topicId={currentTopic.id || ''}
            topicCode={currentTopic.code || ''}
            topicName={currentTopic.name || ''}
            fullDesc={currentTopic.description || ''}
            department={currentTopic.department || ''}
            note={currentTopic.note || ''}
            status={currentTopic.status}
            minMembers={currentTopic.minMembers || ''}
            maxMember={currentTopic.maxMembers || ''}
            studentMembers={currentTopic.team?.members}
            mentorMembers={currentTopic.mentorMembers}
            applications={currentTopic.applications}
            feedbacks={currentTopic.feedbacks}
            submitter={currentTopic.submitter}
            isUserApprover={isUserApprover}
            isUserMentor={isUserMentor}
            isTeamInTopic={isTeamInTopic}
            onFeedbackSuccess={onFeedbackSuccess}
            isLoading={isProcessing}
            evaluations={evals || []}
          />
        </div>
        <div className="col-lg-12 col-xxl-3">
          <div className="row">
            {currentRole === 'lecturer' &&
              isUserMentor &&
              currentTopic.status === 3 && (
                <div className="col-lg-6 col-xxl-12">
                  <CMSList
                    className="gutter-b"
                    title="Applying teams"
                    subTitle="Consider approve team to topic"
                    rows={applicationsMap(currentTopic.applications)}
                    fallbackMsg="Awaiting for application..."
                  />
                </div>
              )}

            {currentTopic.status === 4 && (
              <div className="col-lg-6 col-xxl-12">
                <GroupCard
                  className="gutter-b"
                  title="Assigned team"
                  subTitle="Team currently matched to this topic"
                  role="student"
                  group={currentTopic.team?.members}
                  leaderId={studentLeaderId}
                  fallbackMsg={
                    'Assigned but no team? This might be a problem...'
                  }
                  toolBar={
                    !!currentTopic.team?.members.length && (
                      <Link
                        to={`/team/${currentTopic.team?.value}`}
                        className="btn btn-light-primary font-weight-bolder mt-2"
                      >
                        More
                      </Link>
                    )
                  }
                />
              </div>
            )}

            {![0, 1].includes(currentTopic.status) && (
              <div className="col-lg-6 col-xxl-12">
                <GroupCard
                  className="gutter-b"
                  title="Mentors"
                  subTitle="Mentor of this topic"
                  role="lecturer"
                  leaderId={mentorLeaderId}
                  fallbackMsg={
                    currentRole === 'lecturer'
                      ? 'Become a leader mentor for this topic now!'
                      : 'This topic currently not have mentor'
                  }
                  group={currentTopic.mentorMembers}
                  handleSubmitRowData={handleChangeWeight}
                  toolBar={
                    (currentTopic?.mentorMembers?.length &&
                      isUserMentorLeader &&
                      mentorCardToolbar()) || <></>
                  }
                  booleanFlg={editWeightFlg}
                />
              </div>
            )}

            {currentSemester.status === 2 &&
              [4, 5, 6].includes(currentTopic.status) &&
              (isUserMentor || isTeamInTopic) && (
                <div className="col-lg-6 col-xxl-12">
                  <GroupCard
                    className="gutter-b"
                    title="Progress reports"
                    subTitle="Submitted by students"
                    fallbackMsg={
                      currentRole === 'lecturer'
                        ? 'No report by team yet...'
                        : 'Awaiting for report submission...'
                    }
                    group={reports}
                    type="report"
                    toolBar={
                      currentRole === 'student' && isStudentTeamLead ? (
                        <>
                          <Button
                            isLoading={isButtonProcessing}
                            className="btn btn-sm btn-light-info mt-2 font-weight-bolder"
                            onClick={handleClickFile}
                          >
                            <i class="far fa-file-archive icon-md mr-1"></i>
                            Submit
                          </Button>
                          <Form.File
                            ref={fileRef}
                            label={undefined}
                            onChange={handleFileChange}
                            className="d-none"
                          />
                        </>
                      ) : (
                        <></>
                      )
                    }
                    booleanFlg={editWeightFlg}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Topic;
