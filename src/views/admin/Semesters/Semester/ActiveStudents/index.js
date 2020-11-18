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

import { useParams } from 'react-router-dom';
import ConfirmRemoveModal from 'components/ConfirmRemoveModal/ConfirmRemoveModal';
import AddActiveStudentModal from 'components/AddActiveStudentModal/AddActiveStudentModal';
import UpdateActiveStudentModal from 'components/UpdateActiveStudentModal/UpdateActiveStudentModal';

export const statusClasses = ['danger', 'info', 'success', ''];
export const statusTitles = ['Not in a team', 'Matching', 'Matched', ''];
export const defaultSorted = [{ dataField: 'id', order: 'asc' }];
export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
];

const mockData = [
  {
    id: 0,
    department: 'SE',
    code: 'SE130491',
    name: 'Huynh Duc Duy',
    email: 'duyhdse130491@fpt.edu.vn',
    team: 'N6CJ9D',
    added_at: '11/11/1111',
    status: 1,
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
    showConfirmRemoveAllSelectedModalFlg,
    setShowConfirmRemoveAllSelectedModalFlg,
  ] = React.useState(false);
  const [
    showConfirmRemoveSelectedModalFlg,
    setShowConfirmRemoveSelectedModalFlg,
  ] = React.useState(false);
  const [
    showAddActiveStudentModalFlg,
    setShowAddActiveStudentModalFlg,
  ] = React.useState(false);
  const [
    showUpdateActiveStudentModalFlg,
    setShowUpdateActiveStudentModalFlg,
  ] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState();

  const { id } = useParams();
  const setMeta = useSetRecoilState(metaAtom);

  const handleShowRemoveAllSelectedConfirmModal = () => {
    setShowConfirmRemoveAllSelectedModalFlg(true);
  };

  const handleHideRemoveAllSelectedConfirmModal = () => {
    setShowConfirmRemoveAllSelectedModalFlg(false);
  };

  const handleShowRemoveSelectedConfirmModal = () => {
    setShowConfirmRemoveSelectedModalFlg(true);
  };

  const handleHideRemoveSelectedConfirmModal = () => {
    setShowConfirmRemoveSelectedModalFlg(false);
  };

  const handleShowAddActiveStudentModal = () => {
    setShowAddActiveStudentModalFlg(true);
  };

  const handleHideAddActiveStudentModal = () => {
    setShowAddActiveStudentModalFlg(false);
  };

  const handleShowUpdateActiveStudentModal = () => {
    setShowUpdateActiveStudentModalFlg(true);
  };

  const handleHideUpdateActiveStudentModal = () => {
    setShowUpdateActiveStudentModalFlg(false);
  };

  const handleAddSelectedStudents = () => {
    // API call ?
    setShowAddActiveStudentModalFlg(false);
  };

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Active students of Fall 2020',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'Fall 2020', path: '/semester/' + id },
        {
          title: 'Active student',
          path: '/semester/' + id + '/active-student',
        },
      ],
    }));
  }, [setMeta, id]);

  React.useEffect(() => {
    setData(mockData);
    setTotal(100);
  }, []);

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
            handleShowUpdateActiveStudentModal();
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
            handleShowRemoveSelectedConfirmModal();
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
      dataField: 'code',
      text: 'Code',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'department',
      text: 'DEP',
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
      dataField: 'team',
      text: 'Team',
      sort: true,
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
      dataField: 'added_at',
      text: 'Added at',
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

  return (
    <Card>
      <CardHeader title="All active students">
        <CardHeaderToolbar className="text-nowrap">
          <button
            type="button"
            className="btn btn-danger font-weight-bold"
            disabled={Array.isArray(selected) && selected.length === 0}
            onClick={handleShowRemoveAllSelectedConfirmModal}
          >
            <i class="fas fa-trash mr-2"></i>
            Remove ({(Array.isArray(selected) && selected.length) || 0})
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary font-weight-bold"
            onClick={handleShowAddActiveStudentModal}
          >
            <i class="fas fa-plus mr-2"></i>
            Add
          </button>
        </CardHeaderToolbar>
      </CardHeader>
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
          selectable
        />
      </CardBody>
      <ConfirmRemoveModal
        isShowFlg={showConfirmRemoveAllSelectedModalFlg}
        onHide={handleHideRemoveAllSelectedConfirmModal}
        body={<h5>Are you sure you want to remove all selected students?</h5>}
        // onConfirm={() => {}}
      />
      <ConfirmRemoveModal
        isShowFlg={showConfirmRemoveSelectedModalFlg}
        onHide={handleHideRemoveSelectedConfirmModal}
        body={<h5>Are you sure you want to remove selected students?</h5>}
        // onConfirm={() => {}}
      />
      <AddActiveStudentModal
        isShowFlg={showAddActiveStudentModalFlg}
        onHide={handleHideAddActiveStudentModal}
        onAdd={handleAddSelectedStudents}
      />
      <UpdateActiveStudentModal
        isShowFlg={showUpdateActiveStudentModalFlg}
        onHide={handleHideUpdateActiveStudentModal}
        onAdd={handleAddSelectedStudents}
        selectedId={selectedId}
      />
    </Card>
  );
}
