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
import * as uiHelpers from '../../uiHelpers';
import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '_metronic/_helpers';

const departments = [
  {
    id: 0,
    department: 'SE',
    name: 'Checkpoint 1',
    markCols: 2,
    dueDate: '11/11/1111',
    weight: '3/10',
  },
  {
    id: 1,
    department: 'SE',
    name: 'Checkpoint 2',
    markCols: 4,
    dueDate: '33/33/3333',
    weight: '4/10',
  },
  {
    id: 2,
    department: 'SE',
    name: 'Checkpoint 3',
    markCols: 5,
    dueDate: '22/22/2222',
    weight: '3/10',
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
      uiHelpers.CustomerStatusCssClasses[row.status]
    } label-inline`;
  };
  return (
    <span className={getLabelCssClasses()}>
      {uiHelpers.CustomerStatusTitles[row.status]}
    </span>
  );
}

const columns = [
  {
    dataField: 'department',
    text: 'Dep',
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
    dataField: 'weight',
    text: 'Weight',
    sort: true,
    sortCaret: sortCaret,
    headerSortingClasses,
  },
  {
    dataField: 'dueDate',
    text: 'Due Date',
    sort: true,
    sortCaret: sortCaret,
    headerSortingClasses,
  },
  {
    dataField: 'markCols',
    text: 'Mark columns',
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

  React.useEffect(() => {
    setData(departments);
    setTotal(100);
  }, []);

  return (
    <Card>
      <CardHeader title="All checkpoints">
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
          defaultSorted={uiHelpers.defaultSorted}
          pageSizeList={uiHelpers.sizePerPageList}
          selectable
        />
      </CardBody>
    </Card>
  );
}
