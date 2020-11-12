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
import Filters from 'views/Semesters/SemesterFilters';
import customers from 'utils/request/mocks/customer/customers';
import * as uiHelpers from './uiHelpers';
import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '_metronic/_helpers';
import { CustomerStatusCssClasses, CustomerStatusTitles } from './uiHelpers';

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
          <SVG src={toAbsoluteUrl('/media/svg/icons/Media/Play.svg')} />
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
      CustomerStatusCssClasses[row.status]
    } label-inline`;
  };
  return (
    <span className={getLabelCssClasses()}>
      {CustomerStatusTitles[row.status]}
    </span>
  );
}

const columns = [
  // {
  //   dataField: 'id',
  //   text: 'ID',
  //   sort: true,
  //   sortCaret: sortCaret,
  //   headerSortingClasses,
  // },
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

  React.useEffect(() => {
    setData(customers);
    setTotal(100);
  }, []);

  return (
    <Card style={{ marginTop: '1.5rem' }}>
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
        />
      </CardBody>
    </Card>
  );
}
