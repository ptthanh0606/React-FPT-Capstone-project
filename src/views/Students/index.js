import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';
import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from './Filters';
import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '_metronic/_helpers';

export const statusClasses = ['danger', 'success', 'info', ''];
export const statusTitles = ['Finished', 'In progress', 'Preparing', ''];
export const defaultSorted = [{ dataField: 'id', order: 'asc' }];
export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
];

const mockData = [
  {
    id: 0,
    code: 'SE130491',
    department: 'SE',
    email: 'duyhdse130491@fpt.edu.vn',
    name: 'Huynh Duc Duy',
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
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG src={toAbsoluteUrl('/media/svg/icons/General/Edit.svg')} />
        </span>
      </a>
      <a
        title="Delete"
        className="btn btn-icon btn-light btn-hover-primary btn-sm"
        onClick={() => openDeleteCustomerDialog(row.id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} />
        </span>
      </a>
    </span>
  );
}

function StatusColumnFormatter(cellContent, row) {
  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      statusClasses[row.status]
    } label-inline`;
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
    dataField: 'email',
    text: 'Email',
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
    dataField: 'department',
    text: 'Department',
    sort: true,
    sortCaret: sortCaret,
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
    });
  }, [setMeta]);

  React.useEffect(() => {
    setData(mockData);
    setTotal(100);
  }, []);

  return (
    <Card>
      <CardHeader title="All departments">
        <CardHeaderToolbar className="text-nowrap">
          <button
            type="button"
            className="btn btn-danger font-weight-bold"
            disabled={Array.isArray(selected) && selected.length === 0}
            // onClick={}
          >
            <span className="svg-icon svg-icon-md svg-icon-white mr-3">
              <SVG src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} />
            </span>
            Delete selected
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary font-weight-bold"
            // onClick={}
          >
            <span className="svg-icon svg-icon-md svg-icon-white mr-3">
              <SVG
                src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
              />
            </span>
            New
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Filters filters={filters} setFilters={setFilters} />
        {/* {selected.length > 0 && <CustomersGrouping />} */}
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
          selectable
        />
      </CardBody>
    </Card>
  );
}
