import React from 'react';
import { Link } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';

import SemesterCard from '../../../components/SemesterCard';
import ScrollContainer from 'react-indiana-drag-scroll';
import styles from './NearestSemester.module.scss';
import CreateSemesterModal from 'components/CreateSemesterModal/CreateSemesterModal';

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

  const hideNewModal = React.useCallback(() => {
    setShowedNewModal(false);
  }, []);

  const showNewModal = React.useCallback(() => {
    setShowedNewModal(true);
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
      <CreateSemesterModal isShowFlg={showedNewModal} onHide={hideNewModal} />
    </>
  );
});
