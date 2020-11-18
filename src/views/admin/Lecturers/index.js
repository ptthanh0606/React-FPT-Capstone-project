import React from 'react';
import { Card, CardBody } from '_metronic/_partials/controls';
import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from './Filters';
import { Link } from 'react-router-dom';
import AddLecturerModal from 'components/AddLecturerModal/AddLecturerModal';
import ConfirmRemoveModal from 'components/ConfirmRemoveModal/ConfirmRemoveModal';
import UpdateLecturerModal from 'components/UpdateLecturerModal/UpdateLecturerModal';

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
    email: 'duyhdse130491@fpt.edu.vn',
    name: 'Huynh Duc Duy',
    department: ['SE', 'BA'],
    status: 0,
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
  const [
    showRemoveLecturersConfirmModalFlg,
    setShowRemoveLecturersConfirmModalFlg,
  ] = React.useState(false);
  const [
    showCreateLecturersModalFlg,
    setShowCreateLecturersModalFlg,
  ] = React.useState(false);
  const [
    showUpdateLecturersModalFlg,
    setShowUpdateLecturersModalFlg,
  ] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState();

  const setMeta = useSetRecoilState(metaAtom);

  const handleShowRemoveLecturersModal = () => {
    setShowRemoveLecturersConfirmModalFlg(true);
  };

  const handleHideRemoveLecturersModal = () => {
    setShowRemoveLecturersConfirmModalFlg(false);
  };

  const handleShowCreateLecturersModal = () => {
    setShowCreateLecturersModalFlg(true);
  };

  const handleHideCreateLecturersModal = () => {
    setShowCreateLecturersModalFlg(false);
  };

  const handleShowUpdateLecturersModal = () => {
    setShowUpdateLecturersModalFlg(true);
  };

  const handleHideUpdateLecturersModal = () => {
    setShowUpdateLecturersModalFlg(false);
  };

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
            setSelectedId(row.id);
            handleShowUpdateLecturersModal();
          }}
        >
          <i class="fas fa-pencil-alt mx-2"></i>
        </a>
        <a
          href="/"
          title="Remove"
          className="btn btn-icon btn-light btn-hover-primary btn-sm"
          onClick={event => {
            event.preventDefault();
            setSelectedId(row.id);
            handleShowRemoveLecturersModal();
          }}
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
      dataField: 'email',
      text: 'Email',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'department',
      text: 'Department',
      sort: true,
      formatter: function StatusColumnFormatter(cellContent, row) {
        return (
          <>
            {cellContent &&
              Array.isArray(cellContent) &&
              cellContent.join(', ')}
          </>
        );
      },
      sortCaret: sortCaret,
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

  React.useEffect(() => {
    setMeta({
      title: 'All lecturers',
      breadcrumb: [
        { title: 'Lecturer', path: '/lecturer' },
        { title: 'All lecturers', path: '/lecturer/all' },
      ],
      toolbar: (
        <button
          type="button"
          className="btn btn-primary font-weight-bold btn-sm"
          onClick={handleShowCreateLecturersModal}
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
      <AddLecturerModal
        isShowFlg={showCreateLecturersModalFlg}
        onHide={handleHideCreateLecturersModal}
        onCreate={() => {}}
      />
      <UpdateLecturerModal
        isShowFlg={showUpdateLecturersModalFlg}
        onHide={handleHideUpdateLecturersModal}
        onCreate={() => {}}
        selectedId={selectedId}
      />
      <ConfirmRemoveModal
        isShowFlg={showRemoveLecturersConfirmModalFlg}
        onHide={handleHideRemoveLecturersModal}
        body={<h5>Are you sure you want to remove selected students?</h5>}
        // onConfirm={() => {}}
      />
    </Card>
  );
}
