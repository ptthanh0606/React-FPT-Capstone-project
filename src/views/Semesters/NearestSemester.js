import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import metaAtom from 'store/meta';

import SemesterCard from './SemesterCard';
import ScrollContainer from 'react-indiana-drag-scroll';
import styles from './NearestSemester.module.scss';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '_metronic/_helpers';

const semesters = [
  {
    title: 'Fall 2021',
    id: 1,
    status: 'Preparing',
    color: 'danger',
  },
  {
    title: 'Summer 2021',
    id: 2,
    status: 'Preparing',
    color: 'warning',
  },
  {
    title: 'Spring 2021',
    id: 3,
    status: 'In progress',
    color: 'success',
  },
  {
    title: 'Fall 2020',
    id: 3,
    status: 'Finished',
    color: 'primary',
  },
  {
    title: 'Summer 2020',
    id: 3,
    status: 'Finished',
    color: 'info',
  },
];

export default React.memo(function DashboardPage() {
  const setMeta = useSetRecoilState(metaAtom);

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
          // onClick={}
        >
          <span className="svg-icon svg-icon-md svg-icon-white mr-3">
            <SVG
              src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
            />
          </span>
          New semester
        </button>
      ),
    });
  }, [setMeta]);

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
    </>
  );
});
