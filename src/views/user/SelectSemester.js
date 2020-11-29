import React from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import metaAtom from 'store/meta';

import SemesterCard from 'views/admin/Semesters/SemesterCard';
import ScrollContainer from 'react-indiana-drag-scroll';
import styles from './SelectSemester.module.scss';

import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from 'views/admin/Semesters/SemesterFilters';

export const statusClasses = ['info', 'primary', 'warning', 'danger'];
export const statusTitles = [
  'Preparing',
  'Matching',
  'In-progress',
  'Finished',
];
export const defaultSorted = [{ dataField: 'id', order: 'desc' }];
export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
];

function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { openEditCustomerDialog, openDeleteCustomerDialog }
) {
  return (
    <span className="text-nowrap">
      <a
        title="Edit"
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => openEditCustomerDialog(row.id)}
      >
        <i className="fas fa-mouse-pointer mx-2"></i>
      </a>
    </span>
  );
}

function StatusColumnFormatter(cellContent, row) {
  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      statusClasses[row.status]
    } label-inline text-nowrap`;
  };
  return (
    <span className={getLabelCssClasses()}>{statusTitles[row.status]}</span>
  );
}

const columns = [
  {
    dataField: 'name',
    text: 'Name',
    sort: true,
    sortCaret: sortCaret,
    formatter: function StatusColumnFormatter(cellContent, row) {
      return (
        <Link className="text-dark font-weight-bold" to={'/semester/' + row.id}>
          {cellContent}
        </Link>
      );
    },
    headerSortingClasses,
  },
  {
    dataField: 'status',
    text: 'Status',
    sort: true,
    sortCaret: sortCaret,
    formatter: StatusColumnFormatter,
    headerSortingClasses,
  },
  {
    dataField: 'action',
    text: 'Actions',
    formatter: ActionsColumnFormatter,
    formatExtraData: {
      openEditCustomerDialog: () => {},
    },
    classes: 'text-right pr-0',
    headerClasses: 'text-right pr-3',
    style: {
      minWidth: '100px',
    },
  },
];

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
    status: 1,
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
    id: 4,
    status: 3,
    color: 'primary',
  },
  {
    name: 'Summer 2020',
    id: 5,
    status: 3,
    color: 'info',
  },
  {
    name: 'Fall 2021',
    id: 6,
    status: 0,
    color: 'danger',
  },
  {
    name: 'Summer 2021',
    id: 7,
    status: 1,
    color: 'warning',
  },
  {
    name: 'Spring 2021',
    id: 8,
    status: 2,
    color: 'success',
  },
  {
    name: 'Fall 2020',
    id: 9,
    status: 3,
    color: 'primary',
  },
  {
    name: 'Summer 2020',
    id: 10,
    status: 3,
    color: 'info',
  },
];

export default React.memo(function DashboardPage() {
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortField, setSortField] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState(null);

  React.useEffect(() => {
    setData(semesters);
    setTotal(100);
  }, []);
  const setMeta = useSetRecoilState(metaAtom);

  React.useEffect(() => {
    setMeta({
      title: 'Select semesters',
    });
  }, [setMeta]);

  return (
    <div
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        maxHeight: '100vh',
        overflow: 'auto',
        paddingBottom: '1rem',
        top: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          textAlign: 'right',
          padding: '1.5rem 1.5rem 0 0',
        }}
      >
        <Link
          className="btn btn-secondary font-weight-bold btn-sm"
          to="/logout"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          Logout
        </Link>
      </div>
      <ScrollContainer
        className={styles['semester-scroll'] + ' alert-shadow gutter-b'}
      >
        {semesters.map(s => (
          <SemesterCard {...s} key={s.id} />
        ))}
      </ScrollContainer>
      <div className="mx-8">
        <Filters filters={filters} setFilters={setFilters} />
        <Table
          columns={columns}
          data={data}
          total={total}
          isLoading={isLoading}
          selected={selected}
          setSelected={setSelected}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          sortField={sortField}
          setSortField={setSortField}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          defaultSorted={defaultSorted}
          pageSizeList={sizePerPageList}
        />
      </div>
    </div>
  );
});
