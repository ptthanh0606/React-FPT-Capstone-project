import React from 'react';
import { Card, CardBody } from '_metronic/_partials/controls';
import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from 'views/admin/Semesters/SemesterFilters';
import { Link } from 'react-router-dom';

const semesters = [
  {
    id: 1,
    name: 'Spring 2021',
    status: 2,
  },
  {
    id: 2,
    name: 'Fall 2020',
    status: 1,
  },
  {
    id: 3,
    name: 'Summer 2020',
    status: 1,
  },
  {
    id: 3,
    name: 'Spring 2020',
    status: 0,
  },
  {
    id: 4,
    name: 'Fall 2019',
    status: 0,
  },
  {
    id: 5,
    name: 'Summer 2019',
    status: 0,
  },
  {
    id: 6,
    name: 'Spring 2019',
    status: 0,
  },
  {
    id: 7,
    name: 'Fall 2018',
    status: 0,
  },
  {
    id: 8,
    name: 'Summer 2018',
    status: 0,
  },
  {
    id: 9,
    name: 'Spring 2018',
    status: 0,
  },
];

export const statusClasses = ['info', 'primary', 'warning', 'danger'];
export const statusTitles = [
  'Preparing',
  'Matching',
  'In-progress',
  'Finished',
];
export const defaultSorted = [{ dataField: 'id', order: 'asc' }];
export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
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
      <a
        title="Remove"
        className="btn btn-icon btn-light btn-hover-primary btn-sm"
        onClick={() => openDeleteCustomerDialog(row.id)}
      >
        <i className="fas fa-trash mx-2"></i>
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
      openDeleteCustomerDialog: () => {},
    },
    classes: 'text-right pr-0',
    headerClasses: 'text-right pr-3',
    style: {
      minWidth: '100px',
    },
  },
];

export default function CustomersCard() {
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortField, setSortField] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState(null);

  const setMeta = useSetRecoilState(metaAtom);

  React.useEffect(() => {
    setMeta({
      title: 'All semesters',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'All semesters', path: '/semester/all' },
      ],
      toolbar: (
        <button
          type="button"
          className="btn btn-primary font-weight-bold btn-sm"
          // onClick={}
        >
          <i className="fas fa-plus mr-2"></i>
          New
        </button>
      ),
    });
  }, [setMeta]);

  React.useEffect(() => {
    setData(semesters);
    setTotal(100);
  }, []);

  return (
    <Card style={{ marginTop: '1.5rem' }}>
      <CardBody>
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
      </CardBody>
    </Card>
  );
}
