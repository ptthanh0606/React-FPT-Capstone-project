import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from 'views/Semester/SemesterFilters';
import customers from 'utils/request/mocks/customer/customers';
import * as columnFormatters from './column-formatters';
import * as uiHelpers from './uiHelpers';

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    sort: true,
    sortCaret: sortCaret,
    headerSortingClasses,
  },
  {
    dataField: 'firstName',
    text: 'Name',
    sort: true,
    sortCaret: sortCaret,
    headerSortingClasses,
  },
  {
    dataField: 'status',
    text: 'Status',
    sort: true,
    sortCaret: sortCaret,
    formatter: columnFormatters.StatusColumnFormatter,
    headerSortingClasses,
  },
  {
    dataField: 'type',
    text: 'Type',
    sort: true,
    sortCaret: sortCaret,
    formatter: columnFormatters.TypeColumnFormatter,
  },
  {
    dataField: 'action',
    text: 'Actions',
    formatter: columnFormatters.ActionsColumnFormatter,
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
    setData(customers);
    setTotal(100);
  }, []);

  return (
    <Card style={{ marginTop: '1.5rem' }}>
      <CardHeader title="All semesters">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            // onClick={}
          >
            New semester
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
        />
      </CardBody>
    </Card>
  );
}
