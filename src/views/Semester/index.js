import React from 'react';
import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';

import SemesterCard from './SemesterCard';
import AllSemester from './AllSemester';
import ScrollContainer from 'react-indiana-drag-scroll';
import styles from './index.module.scss';

const semesters = [
  {
    title: 'Fall 2020',
    id: 1,
    status: 'In progress',
    color: 'danger',
  },
  {
    title: 'Summer 2020',
    id: 2,
    status: 'Planning',
    color: 'warning',
  },
  {
    title: 'Spring 2021',
    id: 3,
    status: 'Prepare',
    color: 'success',
  },
  {
    title: 'Spring 2022',
    id: 3,
    status: 'Ended',
    color: 'primary',
  },
  {
    title: 'Spring 2023',
    id: 3,
    status: 'Ended',
    color: 'info',
  },
];

export default React.memo(function DashboardPage() {
  const setMeta = useSetRecoilState(metaAtom);

  React.useEffect(() => {
    setMeta({
      title: 'All semesters',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'All semesters', path: '/semester' },
      ],
    });
  }, [setMeta]);

  return (
    <>
      <h2>Nearest semesters</h2>
      <ScrollContainer className={styles['semester-scroll']}>
        {semesters.map(s => (
          <SemesterCard {...s} key={s.title} />
        ))}
      </ScrollContainer>
      {/* <div className={styles['nav-box']}>
        <a href="./semester/all">View all semesters</a>
      </div> */}
      <AllSemester />
    </>
  );
});
