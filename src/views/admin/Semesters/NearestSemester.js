import React from 'react';
import { Link } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';

import SemesterCard from '../../../components/SemesterCard';
import ScrollContainer from 'react-indiana-drag-scroll';
import styles from './NearestSemester.module.scss';
import CMSModal from 'components/CMSModal/CMSModal';

const semesters = [
  {
    name: 'Fall 2021',
    id: 1,
    status: 0,
    color: 'danger',
  },
  {
    name: 'Summer 2021',
    id: 2,
    status: 0,
    color: 'warning',
  },
  {
    name: 'Spring 2021',
    id: 3,
    status: 2,
    color: 'success',
  },
  {
    name: 'Fall 2020',
    id: 3,
    status: 3,
    color: 'primary',
  },
  {
    name: 'Summer 2020',
    id: 3,
    status: 3,
    color: 'info',
  },
];

export default React.memo(function DashboardPage() {
  const setMeta = useSetRecoilState(metaAtom);
  const [showedNewModal, setShowedNewModal] = React.useState(false);
  const [modalConfigs] = React.useState([
    {
      name: 'name',
      type: 'text',
      label: 'Semester name',
      placeholder: 'Semester name...',
    },
    {
      name: 'maxTopic',
      type: 'number',
      label: 'Maximum topic per mentor',
      smallLabel: 'Maximun number of topic that a lecturer can supervise',
      placeholder: '10',
    },
    {
      name: 'maxMentor',
      type: 'number',
      label: 'Maximum mentor per topic',
      smallLabel: 'Maximum number of lecturer to supervise a topic',
      placeholder: '10',
    },
    {
      name: 'maxApplications',
      type: 'number',
      label: 'Maximum applications per team',
      smallLabel:
        'Maximum number of application that a team can send at any-time',
      placeholder: '10',
    },
    {
      name: 'matchingDate',
      type: 'date',
      label: 'Matching',
      smallLabel:
        'Ending date of Matching-phase, all team must matched with a topic before this day',
    },
    {
      name: 'inprogressDate',
      type: 'date',
      label: 'In progress',
      smallLabel:
        'Ending date of In-progress-phase, all team must have done the capstone project and waiting for final evaluation',
    },
    {
      name: 'finishDate',
      type: 'date',
      label: 'Finished',
      smallLabel:
        'Ending date of Finished-phase (and semester as well), all evaluation is published.',
    },
  ]);
  const [fieldTemplate, setFieldTemplate] = React.useState({});

  const hideNewModal = React.useCallback(() => {
    setShowedNewModal(false);
  }, []);

  const showNewModal = React.useCallback(() => {
    setShowedNewModal(true);
  }, []);

  const handleOnCreateSemester = React.useCallback(fieldData => {
    console.log(fieldData);
  }, []);

  React.useEffect(() => {
    setMeta({
      title: 'Nearest semesters',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'Nearest semesters', path: '/semester/nearest' },
      ],
      toolbar: (
        <button
          type="button"
          className="btn btn-primary font-weight-bold btn-sm"
          onClick={showNewModal}
        >
          <i className="fas fa-plus mr-2"></i>
          New
        </button>
      ),
    });
  }, [setMeta, showNewModal]);

  React.useEffect(() => {
    setFieldTemplate({
      name: '',
      maxTopic: 0,
      maxMentor: 0,
      maxApplications: 0,
      matchingDate: '2020-06-06',
      inprogressDate: '2020-06-06',
      finishDate: '2020-06-06',
    });
  }, []);

  return (
    <>
      <ScrollContainer
        className={styles['semester-scroll'] + ' alert-shadow gutter-b'}
      >
        {semesters.map(s => (
          <SemesterCard {...s} key={s.title} />
        ))}
      </ScrollContainer>
      <div className={styles['nav-box']}>
        <Link to="/semester/all">View all semesters</Link>
      </div>
      <CMSModal
        isShowFlg={showedNewModal}
        onHide={hideNewModal}
        configs={modalConfigs}
        primaryButtonLabel="Create"
        title="Create new semester"
        subTitle="Start a new capstone semester"
        onConfirmForm={handleOnCreateSemester}
        fieldTemplate={fieldTemplate}
      />
    </>
  );
});
