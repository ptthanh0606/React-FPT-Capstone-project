import React from 'react';
import { Card, CardBody } from '_metronic/_partials/controls';
import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from './Filters';
import { Link } from 'react-router-dom';
import ConfirmRemoveModal from 'components/ConfirmModal/ConfirmModal';
import CMSModal from 'components/CMSModal/CMSModal';

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
  const [showTestModalFlg, setShowTestModalFlg] = React.useState(true);
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
    setUpdateFieldTemplate({
      name: 'Huynh Duc Duy',
      email: 'duyhdse130491@fpt.edu.vn',
      code: 'SE130491',
      department: {
        label: 'SE',
        value: 'SE',
      },
    });
    setShowUpdateStudentsModalFlg(true);
  };

  const handleHideUpdateStudentsModal = () => {
    setShowUpdateStudentsModalFlg(false);
  };

  const handleOnCreateStudent = React.useCallback(fieldData => {
    console.log(fieldData);
  }, []);

  const handleOnUpdateStudent = React.useCallback(fieldData => {
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
            handleShowUpdateStudentsModal();
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
            setSelectedId(row.id);
            handleShowRemoveStudentsModal();
          }}
        >
          <i className="fas fa-trash mx-2"></i>
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
            onClick={() => setShowTestModalFlg(true)}
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
  }, [setMeta, showTestModalFlg]);

  React.useEffect(() => {
    setData(mockData);
    setTotal(100);
  }, []);

  React.useEffect(() => {
    setModalConfigs([
      {
        name: 'name',
        type: 'text',
        label: 'Student full name',
        placeholder: 'Full name...',
      },
      {
        name: 'code',
        type: 'text',
        label: 'Student code',
        placeholder: 'Enter student code...',
      },
      {
        name: 'email',
        type: 'text',
        label: 'Student email',
        placeholder: 'Enter student @fpt.edu.vn email...',
      },
      {
        name: 'department',
        type: 'selectBoxAsync',
        label: 'Department',
        smallLabel: 'Departments for this lecturer',
        load: (departmentInput, callback) => {
          setTimeout(() => {
            callback([
              {
                label: 'SE',
                value: 'SE',
              },
              {
                label: 'GD',
                value: 'GD',
              },
              {
                label: 'CC',
                value: 'CC',
              },
              {
                label: 'IA',
                value: 'IA',
              },
            ]);
          }, 2000);
        },
        isMulti: false,
      },
    ]);
    setFieldTemplate({
      name: '',
      code: '',
      email: '',
      department: [],
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
        isShowFlg={showRemoveStudentsConfirmModalFlg}
        onHide={handleHideRemoveStudentsModal}
        body={<h5>Are you sure you want to remove selected students?</h5>}
        // onConfirm={() => {}}
      />
      <CMSModal
        isShowFlg={showCreateStudentsModalFlg}
        onHide={handleHideCreateStudentsModal}
        configs={modalConfigs}
        title="Add new student"
        subTitle="Add student to the system"
        onConfirmForm={handleOnCreateStudent}
        fieldTemplate={fieldTemplate}
      />
      <CMSModal
        isShowFlg={showUpdateStudentsModalFlg}
        onHide={handleHideUpdateStudentsModal}
        configs={modalConfigs}
        title="Update this student"
        subTitle="Change this student info"
        onConfirmForm={handleOnUpdateStudent}
        fieldTemplate={updateFieldTemplate}
      />
    </Card>
  );
}
