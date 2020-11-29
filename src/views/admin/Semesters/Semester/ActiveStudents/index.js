import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';
import Table from 'components/Table';
import Filters from './Filters';
import { useParams } from 'react-router-dom';

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
import AddActiveStudentModal from 'components/AddActiveStudentModal/AddActiveStudentModal';

export const statusClasses = ['danger', 'info', 'success', ''];
export const statusTitles = ['Not in a team', 'Matching', 'Matched', ''];

export default function CustomersCard() {
  const confirm = useConfirm();
  const setMeta = useSetRecoilState(metaAtom);
  const { id: semId } = useParams();

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

  const [updateFieldTemplate, setUpdateFieldTemplate] = React.useState({});
  const [showCreate, setShowCreate] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [editId, setEditId] = React.useState(0);
  const [isProcessing, setIsProcessing] = React.useState(false);

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
      to: endpoints.CREATE_DEPARTMENT.url,
      method: endpoints.CREATE_DEPARTMENT.method,
      data: transformers.up(fieldData),
    })
      .then(res => {
        toast.success('Create department successfully');
        setShowCreate(false);
        loadData();
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
        to: endpoints.UPDATE_DEPARTMENT(editId).url,
        method: endpoints.UPDATE_DEPARTMENT(editId).method,
        data: transformers.up(fieldData),
      })
        .then(res => {
          toast.success('Update department successfully');
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
      to: endpoints.READ_DEPARTMENT(id).url,
      method: endpoints.READ_DEPARTMENT(id).method,
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
      console.log(id);
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
            This student will be <b>permanently removed from this semester</b>.
          </>
        ),
        onConfirm: () =>
          request({
            to: endpoints.DELETE_ACTIVE_STUDENTS(semId).url,
            method: endpoints.DELETE_ACTIVE_STUDENTS(semId).method,
            data: {
              studentIDs: [id],
            },
          })
            .then(res => {
              loadData();
              toast.success('Successfully remove department');
            })
            .catch(handleErrors),
      });
    },
    [confirm, semId]
  );

  const handleRemoveAllSelected = React.useCallback(
    e => {
      e.preventDefault();
      const id = Number(e.currentTarget.getAttribute('data-id'));
      console.log(id);
      if (!Number.isInteger(id)) {
        toast.error('Internal Server Error');
        return;
      }
      confirm({
        title: 'Removal Confirmation',
        body: (
          <>
            Do you wanna remove all selected students?
            <br />
            All students will be <b>permanently removed from this semester</b>.
          </>
        ),
        onConfirm: () =>
          request({
            to: endpoints.DELETE_ACTIVE_STUDENTS(semId).url,
            method: endpoints.DELETE_ACTIVE_STUDENTS(semId).method,
            data: {
              studentIDs: selected,
            },
          })
            .then(res => {
              loadData();
              toast.success('Successfully remove department');
            })
            .catch(handleErrors),
      });
    },
    [confirm, selected, semId]
  );

  // ---------------------------------------------------------------------------

  const columns = React.useMemo(
    () => constants.createColumns({ handleEdit, handleRemove }),
    [handleEdit, handleRemove]
  );

  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    setIsLoading(true);
    const source = {};
    request({
      to: endpoints.LIST_ACTIVE_STUDENTS(semId).url,
      method: endpoints.LIST_ACTIVE_STUDENTS(semId).method,
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
        console.log(res);
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
  }, [l, debouncedFilters, page, pageSize, sortField, sortOrder, semId]);

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Active students of Fall 2020',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'Fall 2020', path: '/semester/' + semId },
        {
          title: 'Active student',
          path: '/semester/' + semId + '/active-student',
        },
      ],
    }));
  }, [semId, setMeta]);

  return (
    <Card>
      <CardHeader title="All active students">
        <CardHeaderToolbar className="text-nowrap">
          <button
            type="button"
            className="btn btn-danger font-weight-bold"
            disabled={Array.isArray(selected) && selected.length === 0}
            onClick={handleRemoveAllSelected}
          >
            <i className="fas fa-trash mr-2"></i>
            Remove ({(Array.isArray(selected) && selected.length) || 0})
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary font-weight-bold"
            onClick={showCreateModal}
          >
            <i className="fas fa-plus mr-2"></i>
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
          defaultSorted={constants.defaultSorted}
          pageSizeList={constants.sizePerPageList}
          selectable
        />
      </CardBody>

      <AddActiveStudentModal
        isShowFlg={showCreate}
        onHide={hideCreateModal}
        onAdd={handleCreate}
      />

      <CMSModal
        isShowFlg={showUpdate}
        onHide={hideUpdateModal}
        configs={constants.modalConfigs}
        title="Create new checkpoint"
        subTitle="Add a checkpoint to this semester"
        onConfirmForm={edit}
        fieldTemplate={updateFieldTemplate}
        primaryButtonLabel="Update"
        isProcessing={isProcessing}
      />
    </Card>
  );
}
