import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from './Filters';
import { Link } from 'react-router-dom';

import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';

const defaultSorted = [{ dataField: 'id', order: 'asc' }];

const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
];

const statusClasses = ['danger', 'success'];
const statusTitles = ['Deactivated', 'Activated'];

const mockData = [
  {
    id: 0,
    code: 'SE',
    name: 'Software Engineering',
    status: 1,
    approvers: ['Huynh Duc Duy', 'Phan Thong Thanh'],
  },
  {
    id: 1,
    code: 'SE',
    name: 'Software Engineering',
    status: 1,
    approvers: ['Huynh Duc Duy', 'Phan Thong Thanh'],
  },
  {
    id: 3,
    code: 'SE',
    name: 'Software Engineering',
    status: 0,
    approvers: ['Huynh Duc Duy', 'Phan Thong Thanh'],
  },
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
        <i class="fas fa-pencil-alt mx-2"></i>
      </a>
      <a
        title="Remove"
        className="btn btn-icon btn-light btn-hover-primary btn-sm"
        onClick={() => openDeleteCustomerDialog(row.id)}
      >
        <i class="fas fa-trash mx-2"></i>
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
    dataField: 'code',
    text: 'Code',
    sort: true,
    sortCaret: sortCaret,
    headerSortingClasses,
  },
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
    dataField: 'approvers',
    text: 'Approvers',
    formatter: function StatusColumnFormatter(cellContent, row) {
      return (
        <Link className="text-dark font-weight-bold" to={'/semester/' + row.id}>
          {cellContent.join(', ')}
        </Link>
      );
    },
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
      title: 'All departments',
      breadcrumb: [
        { title: 'Department', path: '/department' },
        { title: 'All departments', path: '/department/all' },
      ],
      toolbar: (
        <button
          type="button"
          className="btn btn-primary font-weight-bold btn-sm"
          // onClick={}
        >
          <i class="fas fa-plus mr-2"></i>
          New
        </button>
      ),
    });
  }, [setMeta]);

  React.useEffect(() => {
    setData(mockData);
    setTotal(100);
  }, []);

  return (
    <Card>
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