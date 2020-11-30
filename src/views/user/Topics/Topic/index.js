import TopicDetailCard from 'components/CMSWidgets/TopicDetailCard';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';
import { role } from 'auth/recoil/selectors';
import CMSModal from 'components/CMSModal/CMSModal';
import CMSList from 'components/CMSList';
import GroupCard from 'components/GroupCard';

const Topic = () => {
  const { id } = useParams();
  const setMeta = useSetRecoilState(metaAtom);
  const currentRole = useRecoilValue(role);
  const [showSettingFlg, setShowSettingFlg] = React.useState(false);
  const [updateFieldTemplate, setUpdateFieldTemplate] = React.useState({});
  const [modalConfigs, setModalConfigs] = React.useState([]);
  const [studentTeam, setStudentTeam] = React.useState({});
  const [mentors, setMentors] = React.useState({});
  // ----------------------------------------------------------

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
              className="btn btn-primary btn-success font-weight-bold btn-sm "
              onClick={() => {}}
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Apply for matching
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
    setModalConfigs([
      {
        name: 'topicCode',
        type: 'text',
        label: 'Topic Code',
        smallLabel: 'Specify a code for this topic',
        placeholder: 'Code...',
      },
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        smallLabel: 'Give this topic a name',
        placeholder: 'Name...',
      },
      {
        name: 'description',
        type: 'text',
        label: 'Description',
        smallLabel: 'Brief description for this topic',
        placeholder: 'Description...',
      },
      {
        name: 'note',
        type: 'text',
        label: 'Note',
        smallLabel: 'Special note for this topic',
        placeholder: 'Note...',
      },
      {
        name: 'minMem',
        type: 'number',
        label: 'Minimum team members',
        smallLabel: 'Minimum team member for this topic',
        placeholder: '0',
      },
      {
        name: 'maxMem',
        type: 'number',
        label: 'Maximum team members',
        smallLabel: 'Maximum team member for this topic',
        placeholder: '4',
      },
      {
        name: 'department',
        type: 'selectBox',
        label: 'From department',
        smallLabel: 'Topic in which department',
        placeholder: 'Select a department',
        options: [
          {
            label: 'SE',
            value: 'se',
          },
          {
            label: 'GD',
            value: 'gd',
          },
          {
            label: 'CC',
            value: 'cc',
          },
        ],
      },
      {
        name: 'isByStudent',
        type: 'toggle',
        label: 'By student',
        smallLabel: 'Is this topic from student',
        isChecked: false,
      },
      {
        name: 'studentTeam',
        type: 'selectBoxAsync',
        label: 'Student team',
        smallLabel: 'Student team taking this topic',
        load: (mentorInput, callback) => {
          setTimeout(() => {
            callback([
              {
                label: 'Phan Thong Thanh',
                value: 'Phan Thong Thanh',
              },
              {
                label: 'Tran Thai Trung',
                value: 'Tran Thai Trung',
              },
              {
                label: 'Nguyen Hoang Dung',
                value: 'Nguyen Hoang Dung',
              },
              {
                label: 'Le Huu Mon',
                value: 'Le Huu Mon',
              },
            ]);
          }, 2000);
        },
        isMulti: true,
      },
      {
        name: 'mentorGroup',
        type: 'selectBoxAsync',
        label: 'Mentor Group',
        smallLabel: 'Mentor group for this topic',
        load: (mentorInput, callback) => {
          setTimeout(() => {
            callback([
              {
                label: 'Huynh Duc Duy',
                value: 'Huynh Duc Duy',
              },
              {
                label: 'Tran Tuan Anh',
                value: 'Tran Tuan Anh',
              },
              {
                label: 'Dinh Ngoc Hai',
                value: 'Dinh Ngoc Hai',
              },
              {
                label: 'Ly Phuoc Hiep',
                value: 'Ly Phuoc Hiep',
              },
            ]);
          }, 2000);
        },
        isMulti: true,
      },
      {
        name: 'keywords',
        type: 'creatableSelectBoxAsync',
        label: 'Keywords',
        smallLabel: 'Some keywords for this topic',
        load: (keyword, callback) => {
          setTimeout(() => {
            callback([
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
            ]);
          }, 2000);
        },
      },
      {
        name: 'attachment',
        type: 'file',
        label: 'Attachment',
        smallLabel: '.pdf, .docx',
      },
    ]);
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
  }, []);

  React.useEffect(() => {
    setStudentTeam({
      name: 'SKT T1',
      department: 'Software Engineer',
      leader: 'Huynh Duc Duy',
      members: [
        {
          name: 'Huynh Duc Duy',
          code: 'SE130491',
        },
        {
          name: 'Phan Thong Thanh',
          code: 'SE130491',
        },
        {
          name: 'Tran Tuan Anh',
          code: 'SE130491',
        },
        {
          name: 'Tran Thai Trung',
          code: 'SE130491',
        },
      ],
    });
    setMentors({
      name: 'Mentor team 1',
      department: 'Software Engineer',
      leader: 'Tran Tuan Anh',
      members: [
        {
          name: 'Tran Tuan Anh',
          code: '',
        },
        {
          name: 'Lam Huu Khanh Phuong',
          code: '',
        },
      ],
    });
  }, []);

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
          <GroupCard
            className="gutter-b"
            title="Assigned team"
            members={studentTeam.members}
            name={studentTeam.name}
            department={studentTeam.department}
            leader={studentTeam.leader}
          />
          <GroupCard
            title="Mentors"
            members={mentors.members}
            name={mentors.name}
            department={mentors.department}
            leader={mentors.leader}
          />
        </div>
        <CMSModal
          isShowFlg={showSettingFlg}
          onHide={() => setShowSettingFlg(false)}
          configs={modalConfigs}
          title="Setting"
          subTitle="Change or see this topic info"
          onConfirmForm={handleOnUpdateTopic}
          fieldTemplate={updateFieldTemplate}
        />
        {/* <div className="col-lg-6 col-xxl-3">
          <BigButton />
        </div> */}
      </div>
    </>
  );
};
export default Topic;
