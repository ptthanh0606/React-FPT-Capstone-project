import React from 'react';
import { Card, CardBody } from '_metronic/_partials/controls';
import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from './Filters';
import { Link } from 'react-router-dom';
import AddStudentModal from 'components/AddStudentModal/AddStudentModal';
import ConfirmRemoveModal from 'components/ConfirmRemoveModal/ConfirmRemoveModal';
import UpdateStudentModal from 'components/UpdateStudentModal/UpdateStudentModal';

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
    showRemoveStudentsConfirmModalFlg,
    setShowRemoveStudentsConfirmModalFlg,
  ] = React.useState(false);
  const [
    showCreateStudentsModalFlg,
    setShowCreateStudentsModalFlg,
  ] = React.useState(false);
  const [
    showUpdateStudentsModalFlg,
    setShowUpdateStudentsModalFlg,
  ] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState();

  const setMeta = useSetRecoilState(metaAtom);

  const handleShowRemoveStudentsModal = () => {
    setShowRemoveStudentsConfirmModalFlg(true);
  };

  const handleHideRemoveStudentsModal = () => {
    setShowRemoveStudentsConfirmModalFlg(false);
  };

  const handleShowCreateStudentsModal = () => {
    setShowCreateStudentsModalFlg(true);
  };

  const handleHideCreateStudentsModal = () => {
    setShowCreateStudentsModalFlg(false);
  };

  const handleShowUpdateStudentsModal = () => {
    setShowUpdateStudentsModalFlg(true);
  };

  const handleHideUpdateStudentsModal = () => {
    setShowUpdateStudentsModalFlg(false);
  };

  function ActionsColumnFormatter(cellContent, row, rowIndex) {
    return (
      <span className="text-nowrap">
        <a
          href="/"
          title="Edit"
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          onClick={event => {
            event.preventDefault();
            setSelectedId(row.id);
            handleShowUpdateStudentsModal();
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
            handleShowRemoveStudentsModal();
          }}
        >
          <i class="fas fa-trash mx-2"></i>
        </a>
      </span>
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

  React.useEffect(() => {
    setMeta({
      title: 'All students',
      breadcrumb: [
        { title: 'Student', path: '/student' },
        { title: 'All students', path: '/student/all' },
      ],
      toolbar: (
        <>
          <button
            type="button"
            className="btn btn-primary font-weight-bold btn-sm"
            // onClick={}
          >
            <i className="fas fa-file-import mr-2"></i>
            Import
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary font-weight-bold btn-sm"
            onClick={handleShowCreateStudentsModal}
          >
            <i className="fas fa-plus mr-2"></i>
            New
          </button>
        </>
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
      <AddStudentModal
        isShowFlg={showCreateStudentsModalFlg}
        onHide={handleHideCreateStudentsModal}
        onCreate={() => {}}
      />
      <UpdateStudentModal
        isShowFlg={showUpdateStudentsModalFlg}
        onHide={handleHideUpdateStudentsModal}
        onCreate={() => {}}
        selectedId={selectedId}
      />
      <ConfirmRemoveModal
        isShowFlg={showRemoveStudentsConfirmModalFlg}
        onHide={handleHideRemoveStudentsModal}
        body={<h5>Are you sure you want to remove selected students?</h5>}
        // onConfirm={() => {}}
      />
    </Card>
  );
}