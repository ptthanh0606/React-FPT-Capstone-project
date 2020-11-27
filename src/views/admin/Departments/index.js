import React from 'react';
import { Card, CardBody } from '_metronic/_partials/controls';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from './Filters';
import { Link } from 'react-router-dom';

import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import useConfirm from 'utils/confirm';
import CMSModal from 'components/CMSModal/CMSModal';

import toast from 'utils/toast';
import { useDebounce } from 'use-debounce';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';

import * as transformers from './transformers';
import * as constants from './constants';

const modalConfigs = [
  {
    name: 'name',
    type: 'text',
    label: 'Department name',
    placeholder: 'Give this department a name...',
  },
  {
    name: 'code',
    type: 'text',
    label: 'Department code',
    smallLabel: 'Ex: Software Engineer to be "SE"',
  },
  {
    name: 'approvers',
    type: 'selectBoxAsync',
    label: 'Approver',
    smallLabel: 'Approvers for this department',
    load: (input, callback) => {
      request({
        to: endpoints.LIST_LECTURER.url,
        method: endpoints.LIST_LECTURER.method,
        params: {
          q: input,
          pageSize: 10,
        },
      })
        .then(res => {
          callback(
            res.data.data?.map(i => ({
              label: i.code,
              value: i.lecturerID,
            })) || []
          );
        })
        .catch(() => callback([]));
    },
    isMulti: true,
  },
  {
    name: 'status',
    type: 'toggle',
    label: 'Active state',
    smallLabel: 'Is this department active',
  },
];

export default function Departments() {
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
  const [pageSize, setPageSize] = React.useState(
    constants.sizePerPageList[0].value
  );
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
      to: endpoints.LIST_DEPARTMENT.url,
      method: endpoints.LIST_DEPARTMENT.method,
      params: {
        ...debouncedFilters,
        pageNumber: page,
        pageSize: pageSize,
        sortField: sortField,
        sortOrder: sortOrder,
      },
    })
      .then(res => {
        setData(res.data.data?.map(transformers.down));
        setTotal(res.data.totalRecords);
        setPage(res.data.pageNumber);
        setPageSize(res.data.pageSize);
      })
      .catch(handleErrors)
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
    setIsProcessing(true);
    request({
      to: endpoints.CREATE_DEPARTMENT.url,
      method: endpoints.CREATE_DEPARTMENT.method,
      data: transformers.up(fieldData),
    })
      .then(res => {
        toast.success('Create department successfully');
        setShowCreate(false);
        forceReload();
        setFieldTemplate({});
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
        to: endpoints.UPDATE_DEPARTMENT(editId).url,
        method: endpoints.UPDATE_DEPARTMENT(editId).method,
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
      to: endpoints.READ_DEPARTMENT(id).url,
      method: endpoints.READ_DEPARTMENT(id).method,
    })
      .then(res => {
        setUpdateFieldTemplate(transformers.down(res.data?.data) || {});
        setShowUpdate(true);
      })
      .catch(handleErrors);
  }, []);

  const handleRemove = React.useCallback(
    e => {
      e.preventDefault();
      const id = e.currentTarget.getAttribute('data-id');
      confirm({
        title: 'Removal Confirmation',
        body: (
          <>
            Do you wanna remove this department?
            <br />
            This department will be <b>permanently removed</b>, and all
            historical data belong to this department too.
          </>
        ),
        onConfirm: () =>
          request({
            to: endpoints.DELETE_DEPARTMENT(id).url,
            method: endpoints.DELETE_DEPARTMENT(id).method,
          })
            .then(res => {
              loadData();
              toast.success('Successfully remove department');
            })
            .catch(handleErrors),
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
        formatter: (cellContent, row) => {
          const getLabelCssClasses = () => {
            return `label label-lg label-light-${
              constants.statusClasses[row.status === true ? 1 : 0]
            } label-inline text-nowrap`;
          };
          return (
            <span className={getLabelCssClasses()}>
              {constants.statusTitles[row.status === true ? 1 : 0]}
            </span>
          );
        },
        headerSortingClasses,
      },
      {
        dataField: 'approvers',
        text: 'Approvers',
        formatter: function (cellContent, row) {
          return (
            <>
              {cellContent.length > 0 &&
                cellContent
                  .map(i => (
                    <Link
                      className="text-dark font-weight-bold"
                      to={'/profile/lecturer/' + i.value}
                    >
                      {i.label}
                    </Link>
                  ))
                  .reduce((prev, curr) => [prev, ', ', curr])}
            </>
          );
        },
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
                <i className="fas fa-pencil-alt mx-2"></i>
              </a>
              <a
                href="/"
                title="Remove"
                className="btn btn-icon btn-light btn-hover-primary btn-sm"
                data-id={row.id}
                onClick={handleRemove}
              >
                <i className="fas fa-trash mx-2"></i>
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
      title: 'All departments',
      breadcrumb: [
        { title: 'Department', path: '/department' },
        { title: 'All departments', path: '/department/all' },
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
  }, [showCreateModal, setMeta]);

  React.useEffect(() => {
    loadData();
  }, [loadData, f]);
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
        title="Create department"
        subTitle="Add new department to this system"
        onConfirmForm={handleCreate}
        fieldTemplate={fieldTemplate}
        isProcessing={isProcessing}
      />
      <CMSModal
        isShowFlg={showUpdate}
        onHide={hideUpdateModal}
        configs={modalConfigs}
        title="Update this department"
        subTitle="Change this department info"
        onConfirmForm={edit}
        fieldTemplate={updateFieldTemplate}
        primaryButtonLabel="Update"
        isProcessing={isProcessing}
      />
    </Card>
  );
}
