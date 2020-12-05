import React from 'react';
import TopicDetailCard from 'components/CMSWidgets/TopicDetailCard';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import userAtom from 'store/user';
import { role } from 'auth/recoil/selectors';
import CMSModal from 'components/CMSModal/CMSModal';
import CMSList from 'components/CMSList';
import GroupCard from 'components/GroupCard';
import toast from 'utils/toast';
import { SETTING_MODAL_CONFIG } from './constants';
import * as endpoints from 'endpoints';
import * as transformers from '../../../../modules/semester/topic/transformers';
import * as constants from '../../../../modules/semester/topic/constants';
import request from 'utils/request';
import { handleErrors } from 'utils/common';

const Topic = () => {
  const [l, loadData] = React.useReducer(() => ({}), {});
  // ----------------------------------------------------------

  const { id } = useParams();
  const setMeta = useSetRecoilState(metaAtom);
  const currentRole = useRecoilValue(role);
  const currentUser = useRecoilValue(userAtom);

  // ----------------------------------------------------------

  const [currentTopic, setCurrentTopic] = React.useState({});

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
        console.log(transformers.downRead(res.data.data));
        setCurrentTopic(transformers.downRead(res.data.data));
      })
      .catch(err => {
        handleErrors(err);
      });
  }, [id]);

  // ----------------------------------------------------------

  const handleApproveTeam = React.useCallback(id => {
    toast.success('Approved selected team to topic');
  }, []);

  const handleRejectTeam = React.useCallback(id => {
    toast.success('Rejected selected team');
  }, []);

  const handleMoreStudentTeamClick = React.useCallback(e => {
    e.preventDefault();
    // history.push(`/team/${teamId}`);
  }, []);

  const handleShowEditWeight = React.useCallback(e => {
    e.preventDefault();
    setEditWeightFlg(editWeightFlg => !editWeightFlg);
  }, []);

  const onFeedbackSuccess = React.useCallback(
    e => {
      toast.success('');
      fetchTopic();
    },
    [fetchTopic]
  );

  // ----------------------------------------------------------

  const toolBar = React.useCallback(() => {
    let buttons = <></>;
    switch (currentRole) {
      case 'student':
        buttons = (
          <>
            <button
              type="button"
              className="btn btn-primary btn-success font-weight-bold btn-sm "
              onClick={() => {}}
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Apply for matching
            </button>
          </>
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
              className="btn btn-primary btn-success font-weight-bold btn-sm "
              onClick={() => {}}
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Apply for matching
            </button>
          </>
        );
        break;

      case 'lecturer':
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
              className="btn btn-primary btn-success font-weight-bold btn-sm mr-2"
              onClick={() => {}}
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Apply for mentoring
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

      default:
        break;
    }
    return buttons;
  }, [currentRole]);

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
          title: 'Capstone Management System',
          path: '/semester/' + id + '/topic',
        },
      ],
      toolbar: toolBar(),
    }));
  });

  React.useEffect(() => {
    fetchTopic();
  }, [fetchTopic]);

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
            topicCode={currentTopic.code}
            topicName={currentTopic.name}
            fullDesc={currentTopic.description}
            department={currentTopic.department}
            status={currentTopic.status}
            maxMember={currentTopic.maxMembers}
            studentTeam={currentTopic.team}
            mentorGroup={currentTopic.mentorMembers}
            applications={currentTopic.applications}
            feedbacks={currentTopic.feedbacks}
            onFeedbackSuccess={onFeedbackSuccess}
          />
        </div>
        <div className="col-lg-6 col-xxl-3">
          {statusTitles[currentTopic.status] === 'Approved' && (
            <CMSList
              className="gutter-b"
              title="Applying teams"
              subTitle="Consider approve team to topic"
              rows={currentTopic.applications}
            />
          )}

          {/* <GroupCard
            className="gutter-b"
            title="Assigned team"
            group={currentTopic.team}
            toolBar={
              <a
                href="/"
                onClick={handleMoreStudentTeamClick}
                className="btn btn-sm btn-light-primary font-weight-bolder"
              >
                More
              </a>
            }
          /> */}

          <GroupCard
            title="Mentors"
            group={currentTopic.mentorMembers}
            toolBar={mentorCardToolbar()}
            role="lecturer"
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
