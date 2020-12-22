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

import toast from 'utils/toast';
import { useDebounce } from 'use-debounce';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';

import * as transformers from 'modules/semester/announcement/transformers';
import * as constants from 'modules/semester/announcement/constants';
import CMSModal from 'components/CMSModal/CMSModal';

export default function Announcements({ semester }) {
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

  const [fieldTemplate, setFieldTemplate] = React.useState({});
  const [updateFieldTemplate, setUpdateFieldTemplate] = React.useState({});
  const [showCreate, setShowCreate] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [editId, setEditId] = React.useState(0);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // ---------------------------------------------------------------------------

  const showCreateModal = React.useCallback(() => {
    if (semester.status === 3) {
      toast.warn('Semester is finished, cannot make any further changes.');
      return;
    }
    setShowCreate(true);
    setFieldTemplate({
      role: 1,
    });
  }, [semester.status]);

  const hideCreateModal = React.useCallback(() => {
    setShowCreate(false);
  }, []);

  const handleCreate = React.useCallback(
    fieldData => {
      setIsProcessing(true);
      request({
        to: endpoints.CREATE_ANNOUNCEMENT(semId).url,
        method: endpoints.CREATE_ANNOUNCEMENT(semId).method,
        data: transformers.up(fieldData),
      })
        .then(res => {
          toast.success('Create announcement successfully');
          setShowCreate(false);
          loadData();
          setFieldTemplate({});
        })
        .catch(handleErrors)
        .finally(() => setIsProcessing(false));
    },
    [semId]
  );

  // ---------------------------------------------------------------------------

  const hideUpdateModal = React.useCallback(() => {
    setShowUpdate(false);
  }, []);

  const edit = React.useCallback(
    fieldData => {
      setIsProcessing(true);
      request({
        to: endpoints.UPDATE_ANNOUNCEMENT(semId, editId).url,
        method: endpoints.UPDATE_ANNOUNCEMENT(semId, editId).method,
        data: transformers.up(fieldData),
      })
        .then(res => {
          toast.success('Update announcement successfully');
          setShowUpdate(false);
          loadData();
        })
        .catch(handleErrors)
        .finally(() => setIsProcessing(false));
    },
    [editId, semId]
  );

  const handleEdit = React.useCallback(
    e => {
      e.preventDefault();
      if (semester.status === 3) {
        toast.warn('Semester is finished, cannot make any further changes.');
        return;
      }
      const id = Number(e.currentTarget.getAttribute('data-id'));
      if (!Number.isInteger(id)) {
        toast.error('Internal Server Error');
        return;
      }
      request({
        to: endpoints.READ_ANNOUNCEMENT(semId, id).url,
        method: endpoints.READ_ANNOUNCEMENT(semId, id).method,
      })
        .then(res => {
          setEditId(id);
          setUpdateFieldTemplate(transformers.down(res.data?.data) || {});
          setShowUpdate(true);
        })
        .catch(handleErrors);
    },
    [semId, semester.status]
  );

  const handleRemove = React.useCallback(
    e => {
      e.preventDefault();
      if (semester.status === 3) {
        toast.warn('Semester is finished, cannot make any further changes.');
        return;
      }
      const id = Number(e.currentTarget.getAttribute('data-id'));
      console.log(id);
      if (!Number.isInteger(id)) {
        toast.error('Internal Server Error');
        return;
      }
      confirm({
        title: 'Removal Confirmation',
        body: <>Do you wanna remove this announcement?</>,
        onConfirm: () =>
          request({
            to: endpoints.DELETE_ANNOUNCEMENT(semId).url,
            method: endpoints.DELETE_ANNOUNCEMENT(semId).method,
            data: {
              announcementIds: [id],
            },
          })
            .then(res => {
              loadData();
              toast.success('Successfully remove announcement');
            })
            .catch(handleErrors),
      });
    },
    [confirm, semId, semester.status]
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
      to: endpoints.LIST_ANNOUNCEMENT(semId).url,
      method: endpoints.LIST_ANNOUNCEMENT(semId).method,
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
  }, [l, debouncedFilters, page, pageSize, sortField, sortOrder, semId]);

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Announcements of ' + semester.name,
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: semester.name, path: '/semester/' + semId },
        {
          title: 'Announcement',
          path: '/semester/' + semId + '/announcement',
        },
      ],
    }));
  }, [semId, semester.name, setMeta]);

  return (
    <Card>
      <CardHeader title="All announcements">
        <CardHeaderToolbar className="text-nowrap">
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
        />
      </CardBody>
      <CMSModal
        isShowFlg={showCreate}
        onHide={hideCreateModal}
        configs={constants.modalConfigs}
        title="Create announcement"
        subTitle="Add a announcement to this semester"
        onConfirmForm={handleCreate}
        fieldTemplate={fieldTemplate}
        isProcessing={isProcessing}
      />
      <CMSModal
        isShowFlg={showUpdate}
        onHide={hideUpdateModal}
        configs={constants.modalConfigs}
        title="Update announcement"
        subTitle="Change this announcement"
        onConfirmForm={edit}
        fieldTemplate={updateFieldTemplate}
        primaryButtonLabel="Update"
        isProcessing={isProcessing}
      />
    </Card>
  );
}
