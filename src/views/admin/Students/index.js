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
              value: i.id,
            })) || []
          );
        })
        .catch(() => callback([]));
    },
    isMulti: false,
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
      to: endpoints.LIST_STUDENT.url,
      method: endpoints.LIST_STUDENT.method,
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
      to: endpoints.CREATE_STUDENT.url,
      method: endpoints.CREATE_STUDENT.method,
      data: transformers.up(fieldData),
    })
      .then(res => {
        toast.success('Create student successfully');
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
        to: endpoints.UPDATE_STUDENT(editId).url,
        method: endpoints.UPDATE_STUDENT(editId).method,
        data: transformers.up(fieldData),
      })
        .then(res => {
          toast.success('Update student successfully');
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
      to: endpoints.READ_STUDENT(id).url,
      method: endpoints.READ_STUDENT(id).method,
    })
      .then(res => {
        setUpdateFieldTemplate(transformers.down(res.data?.data) || {});
        setShowUpdate(true);
        console.log(transformers.down(res.data?.data));
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
            Do you wanna remove this student?
            <br />
            This student will be <b>permanently removed</b>, and all historical
            data belong to this student too.
          </>
        ),
      }).then(() => {
        request({
          to: endpoints.DELETE_STUDENT(id).url,
          method: endpoints.DELETE_STUDENT(id).method,
        })
          .then(res => {
            loadData();
            toast.success('Successfully remove student');
          })
          .catch(err => {
            console.log(err);
            toast.error('Cannot remove this student');
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
        dataField: 'department',
        text: 'Department',
        sort: true,
        sortCaret: sortCaret,
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
            // onClick={() => setShowTestModalFlg(true)}
          >
            <i className="fas fa-file-import mr-2"></i>
            Import
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary font-weight-bold btn-sm"
            onClick={showCreateModal}
          >
            <i className="fas fa-plus mr-2"></i>
            New
          </button>
        </>
      ),
    });
  }, [setMeta, showCreateModal]);

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
        title="Add new student"
        subTitle="Add student to the system"
        onConfirmForm={handleCreate}
        fieldTemplate={fieldTemplate}
        isProcessing={isProcessing}
      />
      <CMSModal
        isShowFlg={showUpdate}
        onHide={hideUpdateModal}
        configs={modalConfigs}
        title="Update this student"
        subTitle="Change this student info"
        onConfirmForm={edit}
        fieldTemplate={updateFieldTemplate}
        primaryButtonLabel="Update"
        isProcessing={isProcessing}
      />
    </Card>
  );
}
