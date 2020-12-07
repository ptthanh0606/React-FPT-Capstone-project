import React from 'react';

import { Link, useHistory, useParams } from 'react-router-dom';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import semesterAtom from 'store/semester';
import userAtom from 'store/user';
import { role } from 'auth/recoil/selectors';

import toast from 'utils/toast';
import request from 'utils/request';
import { handleErrors } from 'utils/common';

import * as endpoints from 'endpoints';
import * as transformers from '../../../../modules/semester/topic/transformers';
import * as constants from '../../../../modules/semester/topic/constants';
import { rowActionFormatter } from './constants';

import CMSModal from 'components/CMSModal/CMSModal';
import CMSList from 'components/CMSList';
import GroupCard from 'components/GroupCard';
import TopicDetailCard from 'components/CMSWidgets/TopicDetailCard';
import useConfirm from 'utils/confirm';

const Topic = () => {
  const history = useHistory();
  const { id } = useParams();
  const confirm = useConfirm();

  // ----------------------------------------------------------

  const setMeta = useSetRecoilState(metaAtom);
  const currentSemester = useRecoilValue(semesterAtom);
  const currentUser = useRecoilValue(userAtom);
  const currentRole = useRecoilValue(role);

  // ----------------------------------------------------------

  const [currentTopic, setCurrentTopic] = React.useState({});
  const [isStudentUserHaveTeam, setIsStudentUserHaveTeam] = React.useState(
    true
  );
  const [isUserMentor, setIsUserMentor] = React.useState(false);
  const [isUserMentorLeader, setIsUserMentorLeader] = React.useState(false);
  const [editWeightFlg, setEditWeightFlg] = React.useState(false);

  //----------------------------------------------------------------------------

  const [updateFieldTemplate, setUpdateFieldTemplate] = React.useState({});
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // ---------------------------------------------------------------------------

  const statusTitles = React.useMemo(() => constants.statusTitles, []);

  // ----------------------------------------------------------

  const fetchTopic = React.useCallback(() => {
    // fetch Topic
    request({
      to: endpoints.READ_TOPIC(id).url,
      method: endpoints.READ_TOPIC(id).method,
    })
      .then(res => {
        const transformedRes = transformers.downRead(res.data.data);
        console.log(transformedRes);

        setIsUserMentor(
          !!transformedRes.mentorMembers?.filter(
            ({ value }) => value === currentUser.id
          ).length
        );
        setIsUserMentorLeader(
          transformedRes.mentorMembers?.filter(
            ({ isLeader }) => isLeader === true
          )[0]?.id === currentUser.id
        );
        setCurrentTopic(transformedRes);
      })
      .catch(err => {
        history.push('/topic');
        handleErrors(err);
      });
  }, [currentUser.id, history, id]);

  const fetchUserTeam = React.useCallback(() => {
    request({
      to: endpoints.READ_TEAM(1).url,
      method: endpoints.READ_TEAM(1).method,
      params: {
        semesterId: currentSemester.id,
      },
    })
      .then(res => {
        setIsStudentUserHaveTeam(true);
      })
      .catch(err => {
        setIsStudentUserHaveTeam(false);
      });
  }, [currentSemester.id]);

  // ----------------------------------------------------------

  const handleApproveTeam = React.useCallback(id => {
    toast.success('Approved selected team to topic');
  }, []);

  const handleRejectTeam = React.useCallback(id => {
    toast.success('Rejected selected team');
  }, []);

  const handleShowEditWeight = React.useCallback(e => {
    e.preventDefault();
    setEditWeightFlg(editWeightFlg => !editWeightFlg);
  }, []);

  const handleChangeWeight = React.useCallback(weightData => {
    console.log(weightData);
    setEditWeightFlg(editWeightFlg => !editWeightFlg);
  }, []);

  const onFeedbackSuccess = React.useCallback(
    e => {
      fetchTopic();
    },
    [fetchTopic]
  );

  const handleConfirmSettingModal = React.useCallback(
    fieldData => {
      setIsProcessing(true);
      request({
        to: endpoints.UPDATE_TOPIC(id).url,
        method: endpoints.UPDATE_TOPIC(id).method,
        params: {
          topicId: id,
        },
        data: transformers.up(fieldData),
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
        history.push('/topic');
      })
      .catch(handleErrors);
  }, [history, id]);

  const handleConfirmDumpTopic = React.useCallback(() => {
    confirm({
      title: 'Confirm required',
      body: 'Are you sure you want to dump this selected topic?',
      onConfirm: onDumpConfirm,
    });
  }, [confirm, onDumpConfirm]);

  const onConfirmApply = React.useCallback(() => {
    // request({
    //   to: endpoints.APP(id).url,
    //   method: endpoints.DELETE_TOPIC(id).method,
    // })
    //   .then(res => {
    //     history.push('/topic');
    //   })
    //   .catch(handleErrors);
    toast.success('You are now a mentor of this topic!');
  }, []);

  const handleApplyMentor = React.useCallback(() => {
    confirm({
      title: 'Confirm required',
      body: 'Are you sure you want to be a mentor of this topic?',
      onConfirm: onConfirmApply,
    });
  }, [confirm, onConfirmApply]);

  // ----------------------------------------------------------

  const toolBar = React.useCallback(() => {
    let buttons = <></>;
    if (currentTopic) {
      switch (currentRole) {
        case 'student':
          buttons =
            !isStudentUserHaveTeam &&
            statusTitles[currentTopic.status] ===
              'Ready'(
                <button
                  type="button"
                  className="btn btn-primary btn-success font-weight-bold btn-sm "
                  onClick={() => {}}
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Apply for matching
                </button>
              );
          break;

        case 'admin':
          buttons = (
            <>
              <button
                type="button"
                className="btn btn-primary font-weight-bold btn-sm btn-light mr-2"
                onClick={() => setShowUpdate(true)}
              >
                <i className="fas fa-cog mr-2"></i>
                Settings
              </button>
              <button
                type="button"
                className="btn btn-primary btn-danger font-weight-bold btn-sm "
                onClick={() => {}}
              >
                <i className="far fa-trash-alt mr-2"></i>
                Dump
              </button>
            </>
          );
          break;

        case 'lecturer':
          buttons = (
            <>
              {statusTitles[currentTopic.status] === 'Pending' &&
                currentTopic.submitter.value === currentUser.id && (
                  <>
                    <button
                      type="button"
                      className="btn btn-primary font-weight-bold btn-sm btn-light mr-2"
                      onClick={handleShowSettingModal}
                    >
                      <i className="fas fa-cog mr-2"></i>
                      Settings
                    </button>
                    <CMSModal
                      isShowFlg={showUpdate}
                      onHide={() => setShowUpdate(false)}
                      configs={constants.submitterModalConfigs}
                      title="Update topic"
                      subTitle="Change this topic info"
                      onConfirmForm={handleConfirmSettingModal}
                      fieldTemplate={updateFieldTemplate}
                      primaryButtonLabel="Update"
                      isProcessing={isProcessing}
                    />
                  </>
                )}
              {statusTitles[currentTopic.status] === 'Approved' && (
                <button
                  type="button"
                  className="btn btn-primary btn-success font-weight-bold btn-sm mr-2"
                  onClick={handleApplyMentor}
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Apply for mentoring
                </button>
              )}
              {statusTitles[currentTopic.status] === 'Pending' &&
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
    currentTopic,
    currentUser.id,
    handleApplyMentor,
    handleConfirmDumpTopic,
    handleConfirmSettingModal,
    handleShowSettingModal,
    isProcessing,
    isStudentUserHaveTeam,
    showUpdate,
    statusTitles,
    updateFieldTemplate,
  ]);

  const mentorCardToolbar = React.useCallback(() => {
    return editWeightFlg ? (
      <button
        type="submit"
        form="change-weight-form"
        className="btn btn-sm font-weight-bolder btn-success"
      >
        Save
      </button>
    ) : (
      <button
        type="button"
        onClick={handleShowEditWeight}
        className="btn btn-sm font-weight-bolder btn-light-primary"
      >
        Edit weight
      </button>
    );
  }, [editWeightFlg, handleShowEditWeight]);

  // ----------------------------------------------------------

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Topic detail',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'Fall 2020', path: '/semester/' + id },
        { title: 'Topic', path: '/semester/' + id + '/topic' },
        {
          title: currentTopic.name,
          path: '/semester/' + id + '/topic',
        },
      ],
      toolbar: toolBar(),
    }));
  });

  React.useEffect(() => {
    fetchTopic();
    fetchUserTeam();
  }, [fetchTopic, fetchUserTeam]);

  return (
    <>
      <div className="row">
        <div
          className={`col-lg-12 col-xxl-${
            ['Pending', 'Rejected'].includes(statusTitles[currentTopic.status])
              ? '12'
              : '9'
          }`}
        >
          <TopicDetailCard
            topicId={currentTopic.id || ''}
            topicCode={currentTopic.code || ''}
            topicName={currentTopic.name || ''}
            fullDesc={currentTopic.description || ''}
            department={currentTopic.department || ''}
            status={currentTopic.status}
            maxMember={currentTopic.maxMembers || ''}
            studentMembers={currentTopic.team?.members}
            mentorMembers={currentTopic.mentorMembers}
            applications={currentTopic.applications}
            feedbacks={currentTopic.feedbacks}
            submitter={currentTopic.submitter}
            onFeedbackSuccess={onFeedbackSuccess}
          />
        </div>
        <div className="col-lg-6 col-xxl-3">
          {currentRole === 'lecturer' &&
            isUserMentor &&
            statusTitles[currentTopic.status] === 'Ready' && (
              <CMSList
                className="gutter-b"
                title="Applying teams"
                subTitle="Consider approve team to topic"
                rows={currentTopic.applications}
                rowActions={
                  isUserMentorLeader ? (
                    rowActionFormatter(handleApproveTeam, handleRejectTeam)
                  ) : (
                    <></>
                  )
                }
                fallbackMsg="Awaiting for application..."
              />
            )}

          {statusTitles[currentTopic.status] === 'Matched' && (
            <GroupCard
              className="gutter-b"
              title="Assigned team"
              role="student"
              group={currentTopic.team?.members}
              fallbackMsg={'Matched but no team? This might be a problem...'}
              toolBar={
                !!currentTopic.team?.members.length && (
                  <Link
                    to={`/team/${currentTopic.team?.value}`}
                    className="btn btn-sm btn-light-primary font-weight-bolder"
                  >
                    More
                  </Link>
                )
              }
            />
          )}

          {!['Pending', 'Rejected'].includes(
            statusTitles[currentTopic.status]
          ) && (
            <GroupCard
              title="Mentors"
              subTitle="Mentor of this topic"
              role="lecturer"
              fallbackMsg={'Become a leader mentor for this topic now!'}
              group={currentTopic.mentorMembers}
              handleSubmitRowData={handleChangeWeight}
              toolBar={
                currentTopic?.mentorMembers?.length && isUserMentorLeader ? (
                  mentorCardToolbar()
                ) : (
                  <></>
                )
              }
              booleanFlg={editWeightFlg}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default Topic;
