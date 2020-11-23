import React from 'react';
import { Card, CardBody } from '_metronic/_partials/controls';
import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from './Filters';
import { Link } from 'react-router-dom';
import AddAdminModal from 'components/AddAdminModal/AddAdminModal';
import ConfirmRemoveModal from 'components/ConfirmRemoveModal/ConfirmRemoveModal';
import UpdateAdminModal from 'components/UpdateAdminModal/UpdateAdminModal';

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
    code: 'SE130491',
    email: 'duyhdse130491@fpt.edu.vn',
    name: 'Huynh Duc Duy',
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
    showRemoveAdminConfirmModalFlg,
    setShowRemoveAdminConfirmModalFlg,
  ] = React.useState(false);
  const [showCreateAdminModalFlg, setShowCreateAdminModalFlg] = React.useState(
    false
  );
  const [showUpdateAdminModalFlg, setShowUpdateAdminModalFlg] = React.useState(
    false
  );
  const [selectedId, setSelectedId] = React.useState(null);

  const setMeta = useSetRecoilState(metaAtom);

  const handleShowRemoveAdminModal = () => {
    setShowRemoveAdminConfirmModalFlg(true);
  };

  const handleHideRemoveAdminModal = () => {
    setShowRemoveAdminConfirmModalFlg(false);
  };

  const handleShowCreateAdminModal = () => {
    setShowCreateAdminModalFlg(true);
  };

  const handleHideCreateAdminModal = () => {
    setShowCreateAdminModalFlg(false);
  };

  const handleShowUpdateAdminModal = () => {
    setShowUpdateAdminModalFlg(true);
  };

  const handleHideUpdateAdminModal = () => {
    setShowUpdateAdminModalFlg(false);
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
            handleShowUpdateAdminModal();
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
            handleShowRemoveAdminModal();
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
      title: 'All administrators',
      breadcrumb: [
        { title: 'Admin', path: '/admin' },
        { title: 'All administrators', path: '/admin/all' },
      ],
      toolbar: (
        <button
          type="button"
          className="btn btn-primary font-weight-bold btn-sm"
          onClick={handleShowCreateAdminModal}
        >
          <i className="fas fa-plus mr-2"></i>
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
          selectable
        />
      </CardBody>
      <AddAdminModal
        isShowFlg={showCreateAdminModalFlg}
        onHide={handleHideCreateAdminModal}
        onCreate={() => {}}
      />
      <UpdateAdminModal
        isShowFlg={showUpdateAdminModalFlg}
        onHide={handleHideUpdateAdminModal}
        onCreate={() => {}}
        selectedId={selectedId}
      />
      <ConfirmRemoveModal
        isShowFlg={showRemoveAdminConfirmModalFlg}
        onHide={handleHideRemoveAdminModal}
        body={<h5>Are you sure you want to remove selected admin?</h5>}
        // onConfirm={() => {}}
      />
    </Card>
  );
}