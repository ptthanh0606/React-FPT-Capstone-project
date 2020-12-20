import React from 'react';
import { Card, CardBody } from '_metronic/_partials/controls';
import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import Table from 'components/Table';
import Filters from './Filters';
import CMSModal from 'components/CMSModal/CMSModal';

import useConfirm from 'utils/confirm';
import toast from 'utils/toast';
import { useDebounce } from 'use-debounce';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';

import * as transformers from 'modules/student/transformers';
import * as constants from 'modules/student/constants';
import Button from 'components/Button';

export default function Lecturers() {
  const confirm = useConfirm();
  const setMeta = useSetRecoilState(metaAtom);

  const [l, loadData] = React.useReducer(() => ({}), {});

  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [filters, setFilters] = React.useState({});
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

  const fileRef = React.useRef(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleClickFile = React.useCallback(e => {
    e.preventDefault();
    fileRef.current.click();
  }, []);

  const handleFileChange = React.useCallback(event => {
    event.preventDefault();
    const data = new FormData();
    data.append(
      'file',
      event.currentTarget.files[0],
      event.currentTarget.files[0].name
    );
    setIsUploading(true);
    request({
      to: endpoints.IMPORT_STUDENT.url,
      method: endpoints.IMPORT_STUDENT.method,
      data: data,
    })
      .then(res => {
        toast.success('Import student successfully');
        loadData();
      })
      .catch(handleErrors)
      .finally(() => setIsUploading(false));
  }, []);

  // ---------------------------------------------------------------------------

  const showCreateModal = React.useCallback(() => {
    setShowCreate(true);
  }, []);

  const hideCreateModal = React.useCallback(() => {
    setShowCreate(false);
  }, []);

  const handleCreate = React.useCallback(fieldData => {
    setIsProcessing(true);
    request({
      to: endpoints.CREATE_STUDENT.url,
      method: endpoints.CREATE_STUDENT.method,
      data: transformers.up(fieldData),
    })
      .then(res => {
        toast.success('Create student successfully');
        setShowCreate(false);
        loadData();
        setFieldTemplate({});
      })
      .catch(handleErrors)
      .finally(() => setIsProcessing(false));
  }, []);

  // ---------------------------------------------------------------------------

  const hideUpdateModal = React.useCallback(() => {
    setShowUpdate(false);
  }, []);

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
          loadData();
        })
        .catch(handleErrors)
        .finally(() => setIsProcessing(false));
    },
    [editId]
  );

  const handleEdit = React.useCallback(e => {
    e.preventDefault();
    const id = Number(e.currentTarget.getAttribute('data-id'));
    if (!Number.isInteger(id)) {
      toast.error('Internal Server Error');
      return;
    }
    request({
      to: endpoints.READ_STUDENT(id).url,
      method: endpoints.READ_STUDENT(id).method,
    })
      .then(res => {
        setEditId(id);
        setUpdateFieldTemplate(transformers.down(res.data?.data) || {});
        setShowUpdate(true);
      })
      .catch(handleErrors);
  }, []);

  const handleRemove = React.useCallback(
    e => {
      e.preventDefault();
      const id = Number(e.currentTarget.getAttribute('data-id'));
      if (!Number.isInteger(id)) {
        toast.error('Internal Server Error');
        return;
      }
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
        onConfirm: () =>
          request({
            to: endpoints.DELETE_STUDENT(id).url,
            method: endpoints.DELETE_STUDENT(id).method,
          })
            .then(res => {
              loadData();
              toast.success('Successfully remove student');
            })
            .catch(handleErrors),
      });
    },
    [confirm]
  );

  // ---------------------------------------------------------------------------

  const columns = React.useMemo(
    () => constants.createColumns({ handleEdit, handleRemove }),
    [handleEdit, handleRemove]
  );

  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: 'All students',
      breadcrumb: [
        { title: 'Department', path: '/student' },
        { title: 'All students', path: '/student/all' },
      ],
      toolbar: (
        <>
          <Button
            type="button"
            className="btn btn-primary font-weight-bold btn-sm"
            onClick={handleClickFile}
            isLoading={isUploading}
          >
            <i className="fas fa-file-import mr-2"></i>
            Import
          </Button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary font-weight-bold btn-sm"
            onClick={showCreateModal}
          >
            <i className="fas fa-plus mr-2"></i>
            New
          </button>
          <input
            ref={fileRef}
            type="file"
            onChange={handleFileChange}
            className="d-none"
          />
        </>
      ),
    });
  }, [
    handleClickFile,
    handleFileChange,
    isUploading,
    setMeta,
    showCreateModal,
  ]);

  React.useEffect(() => {
    setIsLoading(true);
    const source = {};

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
      source,
    })
      .then(res => {
        setData(res.data?.data?.map(transformers.down));
        setTotal(res.data?.totalRecords);
        setPage(res.data?.pageNumber);
        setPageSize(res.data?.pageSize);
        setIsLoading(false);
      })
      .catch(err => {
        handleErrors(err);
        if (!err.isCancel) setIsLoading(false);
      });

    return () => {
      source.cancel();
    };
  }, [l, debouncedFilters, page, pageSize, sortField, sortOrder]);

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
        configs={constants.modalConfigs}
        title="Add new student"
        subTitle="Add student to the system"
        onConfirmForm={handleCreate}
        fieldTemplate={fieldTemplate}
        isProcessing={isProcessing}
      />
      <CMSModal
        isShowFlg={showUpdate}
        onHide={hideUpdateModal}
        configs={constants.modalConfigs}
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
