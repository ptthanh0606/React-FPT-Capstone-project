import React from 'react';
import { Card, CardBody } from '_metronic/_partials/controls';
import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from 'views/admin/Semesters/SemesterFilters';
import customers from 'utils/request/mocks/customer/customers';
import { Link } from 'react-router-dom';
import ConfirmRemoveModal from 'components/ConfirmRemoveModal/ConfirmRemoveModal';
import CreateSemesterModal from 'components/CreateSemesterModal/CreateSemesterModal';
import UpdateSemesterModal from 'components/UpdateSemesterModal/UpdateSemesterModal';

export const statusClasses = ['danger', 'success', 'info', ''];
export const statusTitles = ['Finished', 'In progress', 'Preparing', ''];
export const defaultSorted = [{ dataField: 'id', order: 'asc' }];
export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
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
  const [
    showedConfirmRemoveSelectedSemesterModalFlg,
    setShowedConfirmRemoveSelectedSemesterModalFlg,
  ] = React.useState(false);
  const [
    isShowUpdateSemesterModal,
    setIsShowUpdateSemesterModal,
  ] = React.useState(false);
  const [
    isShowCreateSemesterModal,
    setIsShowCreateSemesterModal,
  ] = React.useState(false);

  const setMeta = useSetRecoilState(metaAtom);

  const handleShowRemoveSelectedSemester = React.useCallback(() => {
    setShowedConfirmRemoveSelectedSemesterModalFlg(true);
  }, []);

  const handleHideRemoveSelectedSemester = React.useCallback(() => {
    setShowedConfirmRemoveSelectedSemesterModalFlg(false);
  }, []);

  const handleShowCreateSelectedSemester = React.useCallback(() => {
    setIsShowCreateSemesterModal(true);
  }, []);

  const handleHideCreateSelectedSemester = React.useCallback(() => {
    setIsShowCreateSemesterModal(false);
  }, []);

  const handleShowUpdateSelectedSemester = React.useCallback(() => {
    setIsShowUpdateSemesterModal(true);
  }, []);

  const handleHideUpdateSelectedSemester = React.useCallback(() => {
    setIsShowUpdateSemesterModal(false);
  }, []);

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
          onClick={handleShowCreateSelectedSemester}
        >
          <i class="fas fa-plus mr-2"></i>
          New
        </button>
      ),
    });
  }, [handleShowCreateSelectedSemester, setMeta]);

  React.useEffect(() => {
    setData(customers);
    setTotal(100);
  }, []);

  function ActionsColumnFormatter(
    cellContent,
    row,
    rowIndex,
    { openEditCustomerDialog, openDeleteCustomerDialog }
  ) {
    return (
      <span className="text-nowrap">
        <a
          href="/"
          title="Edit"
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          onClick={event => {
            event.preventDefault();
            handleShowUpdateSelectedSemester();
          }}
        >
          <i className="fas fa-pencil-alt mx-2"></i>
        </a>
        <a
          href="/"
          title="Remove"
          className="btn btn-icon btn-light btn-hover-primary btn-sm"
          onClick={event => {
            event.preventDefault();
            handleShowRemoveSelectedSemester();
          }}
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
          <Link
            className="text-dark font-weight-bold"
            to={'/semester/' + row.id}
          >
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
      <ConfirmRemoveModal
        onHide={handleHideRemoveSelectedSemester}
        isShowFlg={showedConfirmRemoveSelectedSemesterModalFlg}
        body={<h5>Are you sure you want to remove selected semester?</h5>}
        onConfirm={() => {}}
      />
      <UpdateSemesterModal
        onHide={handleHideUpdateSelectedSemester}
        isShowFlg={isShowUpdateSemesterModal}
      />
      <CreateSemesterModal
        onHide={handleHideCreateSelectedSemester}
        isShowFlg={isShowCreateSemesterModal}
      />
    </Card>
  );
}
