import React from 'react';
import { Card, CardBody } from '_metronic/_partials/controls';
import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from './Filters';
import { Link } from 'react-router-dom';
import CMSModal from 'components/CMSModal/CMSModal';

import useConfirm from 'utils/confirm';
import toast from 'utils/toast';
import { useDebounce } from 'use-debounce';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';

import * as transformers from './transformers';
import * as constants from './constants';

const modalConfigs = [
  {
    name: 'code',
    type: 'text',
    label: 'Lecturer code name',
    placeholder: 'Code name...',
  },
  {
    name: 'name',
    type: 'text',
    label: 'Lecturer full name',
    placeholder: 'Full name...',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Lecturer email',
    placeholder: 'Email...',
  },
  {
    name: 'departments',
    type: 'selectBoxAsync',
    label: 'Department',
    smallLabel: 'Departments for this lecturer',
    load: (input, callback) => {
      request({
        to: endpoints.LIST_DEPARTMENT.url,
        method: endpoints.LIST_DEPARTMENT.method,
        params: {
          q: input,
          pageSize: 10,
        },
      })
        .then(res => {
          callback(
            res.data.data?.map(i => ({
              label: i.code,
              value: i.departmentID,
            })) || []
          );
        })
        .catch(() => callback([]));
    },
    isMulti: true,
  },
  {
    name: 'isActive',
    type: 'toggle',
    label: 'Active state',
    smallLabel: 'Is this lecturer active',
  },
];

export default function Lecturers() {
  const confirm = useConfirm();
  const setMeta = useSetRecoilState(metaAtom);

  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  const [f, forceReload] = React.useReducer(() => ({}), {});
  const [debouncedFilters] = useDebounce(filters, 500);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortField, setSortField] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState(null);

  //----------------------------------------------------------------------------

  const [fieldTemplate, setFieldTemplate] = React.useState({});
  const [updateFieldTemplate, setUpdateFieldTemplate] = React.useState({});
  const [showCreate, setShowCreate] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [editId, setEditId] = React.useState(0);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // ---------------------------------------------------------------------------

  const loadData = React.useCallback(() => {
    setIsLoading(true);
    request({
      to: endpoints.LIST_LECTURER.url,
      method: endpoints.LIST_LECTURER.method,
      params: {
        ...debouncedFilters,
        pageNumber: page,
        pageSize: pageSize,
        sortField: sortField,
        sortOrder: sortOrder,
      },
    })
      .then(res => {
        // setData(res.data.data?.map(transformers.down));
        setData(res.data.map(transformers.down));
        setTotal(res.data.totalRecords);
        setPage(res.data.pageNumber);
        setPageSize(res.data.pageSize);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [debouncedFilters, page, pageSize, sortField, sortOrder]);

  // ---------------------------------------------------------------------------

  const showCreateModal = React.useCallback(() => {
    setShowCreate(true);
  }, [setShowCreate]);

  const hideCreateModal = React.useCallback(() => {
    setShowCreate(false);
  }, [setShowCreate]);

  const handleCreate = React.useCallback(fieldData => {
    console.log(fieldData);
    setIsProcessing(true);
    request({
      to: endpoints.CREATE_LECTURER.url,
      method: endpoints.CREATE_LECTURER.method,
      data: transformers.up(fieldData),
    })
      .then(res => {
        toast.success('Create department successfully');
        setShowCreate(false);
        forceReload();
      })
      .catch(handleErrors)
      .finally(() => setIsProcessing(false));
  }, []);

  // ---------------------------------------------------------------------------

  const hideUpdateModal = React.useCallback(() => {
    setShowUpdate(false);
  }, [setShowUpdate]);

  const edit = React.useCallback(
    fieldData => {
      setIsProcessing(true);
      request({
        to: endpoints.UPDATE_LECTURER(editId).url,
        method: endpoints.UPDATE_LECTURER(editId).method,
        data: transformers.up(fieldData),
      })
        .then(res => {
          toast.success('Update department successfully');
          setShowUpdate(false);
          forceReload();
        })
        .catch(handleErrors)
        .finally(() => setIsProcessing(false));
    },
    [editId]
  );

  const handleEdit = React.useCallback(e => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('data-id');
    setEditId(id);
    request({
      to: endpoints.READ_LECTURER(id).url,
      method: endpoints.READ_LECTURER(id).method,
    })
      .then(res => {
        setUpdateFieldTemplate(transformers.down(res.data?.data) || {});
        setShowUpdate(true);
      })
      .catch(err => {
        toast.error(err.response.data.data?.message || 'Internal server error');
      });
  }, []);

  const handleRemove = React.useCallback(
    e => {
      e.preventDefault();
      const id = e.currentTarget.getAttribute('data-id');
      confirm({
        title: 'Removal Confirmation',
        body: (
          <>
            Do you wanna remove this lecturer?
            <br />
            This lecturer will be <b>permanently removed</b>, and all historical
            data belong to this lecturer too.
          </>
        ),
      }).then(() => {
        request({
          to: endpoints.DELETE_LECTURER(id).url,
          method: endpoints.DELETE_LECTURER(id).method,
        })
          .then(res => {
            loadData();
            toast.success('Successfully remove department');
          })
          .catch(err => {
            console.log(err);
            toast.error('Cannot remove this department');
          });
      });
    },
    [confirm, loadData]
  );

  // ---------------------------------------------------------------------------

  const columns = React.useMemo(
    () => [
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
        formatter: function (cellContent, row) {
          return (
            <Link
              className="text-dark font-weight-bold"
              to={'/profile/lecturer/' + row.id}
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
        formatter: function (cellContent, row) {
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
        formatter: (cellContent, row) => {
          const getLabelCssClasses = () => {
            return `label label-lg label-light-${
              constants.statusClasses[row.status ? 1 : 0]
            } label-inline text-nowrap`;
          };
          return (
            <span className={getLabelCssClasses()}>
              {constants.statusTitles[row.status ? 1 : 0]}
            </span>
          );
        },
        headerSortingClasses,
      },
      {
        dataField: 'action',
        text: 'Actions',
        formatter: (cellContent, row, rowIndex) => {
          return (
            <span className="text-nowrap">
              <a
                href="/"
                title="Edit"
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                data-id={row.id}
                onClick={handleEdit}
              >
                <i class="fas fa-pencil-alt mx-2"></i>
              </a>
              <a
                href="/"
                title="Remove"
                className="btn btn-icon btn-light btn-hover-primary btn-sm"
                data-id={row.id}
                onClick={handleRemove}
              >
                <i class="fas fa-trash mx-2"></i>
              </a>
            </span>
          );
        },
        classes: 'text-right pr-0',
        headerClasses: 'text-right pr-3',
        style: {
          minWidth: '100px',
        },
      },
    ],
    [handleEdit, handleRemove]
  );

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
          onClick={showCreateModal}
        >
          <i className="fas fa-plus mr-2"></i>
          New
        </button>
      ),
    });
  }, [setMeta, showCreateModal]);

  React.useEffect(() => {
    loadData();
  }, [loadData, f]);

  React.useEffect(() => {
    setFieldTemplate({
      name: '',
      email: '',
      code: '',
      departments: [],
      status: false,
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
          defaultSorted={constants.defaultSorted}
          pageSizeList={constants.sizePerPageList}
        />
      </CardBody>
      <CMSModal
        isShowFlg={showCreate}
        onHide={hideCreateModal}
        configs={modalConfigs}
        title="Add new lecturer"
        subTitle="Assign lecturer to the system"
        onConfirmForm={handleCreate}
        fieldTemplate={fieldTemplate}
        isProcessing={isProcessing}
      />
      <CMSModal
        isShowFlg={showUpdate}
        onHide={hideUpdateModal}
        configs={modalConfigs}
        title="Update this lecturer"
        subTitle="Change this lecturer info"
        onConfirmForm={edit}
        fieldTemplate={updateFieldTemplate}
        primaryButtonLabel="Update"
        isProcessing={isProcessing}
      />
    </Card>
  );
}
