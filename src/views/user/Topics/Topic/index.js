import React from 'react';
import TopicDetailCard from 'components/CMSWidgets/TopicDetailCard';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import { role } from 'auth/recoil/selectors';
import CMSModal from 'components/CMSModal/CMSModal';
import CMSList from 'components/CMSList';
import GroupCard from 'components/GroupCard';
import toast from 'utils/toast';
import { rowActionFormatter, SETTING_MODAL_CONFIG } from './constants';

const Topic = () => {
  const { id } = useParams();
  const setMeta = useSetRecoilState(metaAtom);
  const currentRole = useRecoilValue(role);
  const [showSettingFlg, setShowSettingFlg] = React.useState(false);
  const [updateFieldTemplate, setUpdateFieldTemplate] = React.useState({});
  const [modalConfigs, setModalConfigs] = React.useState([]);
  const [studentTeam, setStudentTeam] = React.useState({});
  const [mentors, setMentors] = React.useState({});
  const [applications, setApplications] = React.useState([]);

  // ----------------------------------------------------------

  const handleApproveTeam = React.useCallback(id => {
    toast.success('Approved selected team to topic');
  }, []);

  const handleRejectTeam = React.useCallback(id => {
    toast.success('Rejected selected team');
  }, []);

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

  React.useEffect(() => {
    setApplications([
      {
        label: 'Team name example 1',
        subLabel: (
          <>
            Lead by{' '}
            <span className="text-muted font-weight-bolder">Huynh Duc Duy</span>
          </>
        ),
        action: rowActionFormatter(handleApproveTeam, handleRejectTeam),
      },
      {
        label: 'Team name example 2',
        subLabel: 'Huynh Duc Duy',
        action: rowActionFormatter(handleApproveTeam, handleRejectTeam),
      },
      {
        label: 'Team name example 3',
        subLabel: 'Huynh Duc Duy',
        action: rowActionFormatter(handleApproveTeam, handleRejectTeam),
      },
    ]);
    setStudentTeam({
      id: '',
      name: 'SKT T1',
      department: 'Software Engineer',
      leader: 'Huynh Duc Duy',
      members: [
        {
          id: '1',
          role: '1',
          name: 'Huynh Duc Duy',
          code: 'SE130491',
        },
        {
          id: '2',
          role: '1',
          name: 'Phan Thong Thanh',
          code: 'SE130491',
        },
        {
          id: '3',
          role: '1',
          name: 'Tran Tuan Anh',
          code: 'SE130491',
        },
        {
          id: '4',
          role: '1',
          name: 'Tran Thai Trung',
          code: 'SE130491',
        },
      ],
    });
    setMentors({
      id: '',
      name: 'Mentor team 1',
      department: 'Software Engineer',
      leader: 'Tran Tuan Anh',
      members: [
        {
          id: '1',
          role: '2',
          name: 'Tran Tuan Anh',
          code: '',
        },
        {
          id: '2',
          role: '2',
          name: 'Lam Huu Khanh Phuong',
          code: '',
        },
      ],
    });
  }, [handleApproveTeam, handleRejectTeam]);

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-xxl-9">
          <TopicDetailCard
            topicCode="FA20SE13"
            topicName="Capstone Management System"
            fromCompany="FPT University"
            fullDesc={(() => (
              <>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. <br />
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </>
            ))()}
          />
        </div>
        <div className="col-lg-6 col-xxl-3">
          <CMSList
            className="gutter-b"
            title="Applying teams"
            subTitle="Consider approve team to topic"
            rows={applications}
          />
          <GroupCard
            className="gutter-b"
            title="Assigned team"
            group={studentTeam}
          />
          <GroupCard title="Mentors" group={mentors} />
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
