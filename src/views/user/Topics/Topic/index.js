import React from 'react';

import { useHistory, useParams } from 'react-router-dom';

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
import { rowActionFormatter, SETTING_MODAL_CONFIG } from './constants';

import CMSModal from 'components/CMSModal/CMSModal';
import CMSList from 'components/CMSList';
import GroupCard from 'components/GroupCard';
import TopicDetailCard from 'components/CMSWidgets/TopicDetailCard';

const Topic = () => {
  const history = useHistory();
  const { id } = useParams();

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

  // ----------------------------------------------------------

  const [showSettingFlg, setShowSettingFlg] = React.useState(false);
  const [editWeightFlg, setEditWeightFlg] = React.useState(false);
  const [updateFieldTemplate, setUpdateFieldTemplate] = React.useState({});
  const [modalConfigs, setModalConfigs] = React.useState([]);

  // ----------------------------------------------------------

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
        console.log(
          !!transformedRes.mentorMembers?.filter(
            ({ value }) => value === currentUser.id
          ).length
            ? 'User is mentor'
            : 'User not mentor'
        );
        console.log(
          transformedRes.mentorMembers?.filter(
            ({ isLeader }) => isLeader === true
          )[0]?.id === currentUser.id
            ? 'User is lead mentor'
            : 'Not lead mentor'
        );
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
        console.log(err);
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

  const handleMoreStudentTeamClick = React.useCallback(
    id => {
      return () => {
        console.log(id);
        history.push(`/team/${id}`);
      };
    },
    [history]
  );

  const handleShowEditWeight = React.useCallback(e => {
    e.preventDefault();
    setEditWeightFlg(editWeightFlg => !editWeightFlg);
  }, []);

  const onFeedbackSuccess = React.useCallback(
    e => {
      fetchTopic();
    },
    [fetchTopic]
  );

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
                onClick={() => setShowSettingFlg(true)}
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
                  <button
                    type="button"
                    className="btn btn-primary font-weight-bold btn-sm btn-light mr-2"
                    onClick={() => setShowSettingFlg(true)}
                  >
                    <i className="fas fa-cog mr-2"></i>
                    Settings
                  </button>
                )}
              {statusTitles[currentTopic.status] === 'Approved' && (
                <button
                  type="button"
                  className="btn btn-primary btn-success font-weight-bold btn-sm mr-2"
                  onClick={() => {}}
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
                    onClick={() => {}}
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
    isStudentUserHaveTeam,
    statusTitles,
  ]);

  const mentorCardToolbar = React.useCallback(() => {
    if (currentTopic?.mentorMembers?.length) {
      return currentTopic.mentorMembers.filter(mentor => mentor.id === 3) ? (
        <>
          <a
            href="/"
            onClick={handleShowEditWeight}
            className={`btn btn-sm btn-${
              editWeightFlg ? 'success' : 'light-primary'
            } font-weight-bolder`}
          >
            {editWeightFlg ? 'Save' : 'Edit weight'}
          </a>
        </>
      ) : (
        <></>
      );
    }

    return <></>;
  }, [currentTopic.mentorMembers, editWeightFlg, handleShowEditWeight]);

  const handleOnUpdateTopic = React.useCallback(() => {}, []);

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

  React.useEffect(() => {
    setModalConfigs(SETTING_MODAL_CONFIG);
    setUpdateFieldTemplate({
      topicCode: 'FA20SE13',
      name: 'Capstone Management System for FPT University',
      description: 'Lorem ipsum dolor description',
      note: 'Lorem ipsum note dolor note',
      maxMem: 4,
      minMem: 0,
      department: 'se',
      isByStudent: false,
      mentorGroup: [
        {
          label: 'Huynh Duc Duy',
          value: 'Huynh Duc Duy',
        },
        {
          label: 'Tran Tuan Anh',
          value: 'Tran Tuan Anh',
        },
      ],
      studentTeam: [
        {
          label: 'Phan Thong Thanh',
          value: 'Phan Thong Thanh',
        },
        {
          label: 'Tran Thai Trung',
          value: 'Tran Thai Trung',
        },
      ],
      keywords: [
        {
          label: 'capstone',
          value: 'capstone',
        },
        {
          label: 'management',
          value: 'management',
        },
        {
          label: 'system',
          value: 'system',
        },
      ],
      attachment: {},
    });
  }, [modalConfigs]);

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-xxl-9">
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
                rowActions={isUserMentorLeader ? rowActionFormatter() : <></>}
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
                  <button
                    onClick={handleMoreStudentTeamClick(
                      currentTopic.team?.value
                    )}
                    className="btn btn-sm btn-light-primary font-weight-bolder"
                  >
                    More
                  </button>
                )
              }
            />
          )}

          <GroupCard
            title="Mentors"
            subTitle="Mentor of this topic"
            role="lecturer"
            fallbackMsg={'Become a leader mentor for this topic now!'}
            group={currentTopic.mentorMembers}
            toolBar={isUserMentorLeader ? mentorCardToolbar() : <></>}
            booleanFlg={editWeightFlg}
          />
        </div>
        <CMSModal
          isShowFlg={showSettingFlg}
          onHide={() => setShowSettingFlg(false)}
          configs={modalConfigs}
          title="Setting"
          subTitle="Change this topic info"
          onConfirmForm={handleOnUpdateTopic}
          fieldTemplate={updateFieldTemplate}
        />
      </div>
    </>
  );
};
export default Topic;
