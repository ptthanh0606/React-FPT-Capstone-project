import React from 'react';
import { Card, CardBody } from '_metronic/_partials/controls';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from './Filters';
import { Link } from 'react-router-dom';

import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import ConfirmRemoveModal from 'components/ConfirmRemoveModal/ConfirmRemoveModal';
import CMSModal from 'components/CMSModal/CMSModal';

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

export default function CustomersCard() {
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortField, setSortField] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState(null);
  const [fieldTemplate, setFieldTemplate] = React.useState({});
  const [updateFieldTemplate, setUpdateFieldTemplate] = React.useState({});
  const [modalConfigs, setModalConfigs] = React.useState([]);
  const [
    showCreateDepartmentModal,
    setShowCreateDepartmentModal,
  ] = React.useState(false);
  const [
    showUpdateDepartmentModal,
    setShowUpdateDepartmentModal,
  ] = React.useState(false);
  const [
    showRemoveSelectedDepartmentModal,
    setShowRemoveSelectedDepartmentModal,
  ] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(false);

  const setMeta = useSetRecoilState(metaAtom);

  const handleShowCreateDepartmentModal = React.useCallback(() => {
    setShowCreateDepartmentModal(true);
  }, [setShowCreateDepartmentModal]);

  const handleHideCreateDepartmentModal = React.useCallback(() => {
    setShowCreateDepartmentModal(false);
  }, [setShowCreateDepartmentModal]);

  const handleShowUpdateDepartmentModal = React.useCallback(() => {
    setUpdateFieldTemplate({
      name: 'Software Engineer',
      code: 'SE',
      isActive: true,
    });
    setShowUpdateDepartmentModal(true);
  }, [setShowUpdateDepartmentModal]);

  const handleHideUpdateDepartmentModal = React.useCallback(() => {
    setShowUpdateDepartmentModal(false);
  }, [setShowUpdateDepartmentModal]);

  const handleShowRemoveSelectedDepartmentModal = React.useCallback(() => {
    setShowRemoveSelectedDepartmentModal(true);
  }, [setShowRemoveSelectedDepartmentModal]);

  const handleHideRemoveSelectedDepartmentModal = React.useCallback(() => {
    setShowRemoveSelectedDepartmentModal(false);
  }, [setShowRemoveSelectedDepartmentModal]);

  const handleOnCreateDepartment = React.useCallback(fieldData => {
    console.log(fieldData);
  }, []);

  const handleOnUpdateDepartment = React.useCallback(fieldData => {
    console.log(fieldData);
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
            handleShowUpdateDepartmentModal();
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
            handleShowRemoveSelectedDepartmentModal();
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
      dataField: 'approvers',
      text: 'Approvers',
      formatter: function StatusColumnFormatter(cellContent, row) {
        return (
          <Link
            className="text-dark font-weight-bold"
            to={'/semester/' + row.id}
          >
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
          onClick={handleShowCreateDepartmentModal}
        >
          <i className="fas fa-plus mr-2"></i>
          New
        </button>
      ),
    });
  }, [handleShowCreateDepartmentModal, setMeta]);

  React.useEffect(() => {
    setData(mockData);
    setTotal(100);
  }, []);

  React.useEffect(() => {
    setModalConfigs([
      {
        name: 'name',
        type: 'text',
        label: 'Team name',
        placeholder: 'Give this department a name...',
      },
      {
        name: 'code',
        type: 'text',
        label: 'Department code',
        smallLabel: 'Ex: Software Engineer to be "SE"',
      },
      {
        name: 'isActive',
        type: 'toggle',
        label: 'Active state',
        smallLabel: 'Is this department active',
      },
    ]);
    setFieldTemplate({
      name: '',
      code: '',
      isActive: false,
    });
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
      <ConfirmRemoveModal
        isShowFlg={showRemoveSelectedDepartmentModal}
        onHide={handleHideRemoveSelectedDepartmentModal}
        body={<h5>Are you sure you want to remove all selected department?</h5>}
        // onConfirm={() => {}}
      />
      <CMSModal
        isShowFlg={showCreateDepartmentModal}
        onHide={handleHideCreateDepartmentModal}
        configs={modalConfigs}
        title="Create department"
        subTitle="Add new department to this system"
        onConfirmForm={handleOnCreateDepartment}
        fieldTemplate={fieldTemplate}
      />
      <CMSModal
        isShowFlg={showUpdateDepartmentModal}
        onHide={handleHideUpdateDepartmentModal}
        configs={modalConfigs}
        title="Update this department"
        subTitle="Change this department info"
        onConfirmForm={handleOnUpdateDepartment}
        fieldTemplate={updateFieldTemplate}
      />
    </Card>
  );
}
