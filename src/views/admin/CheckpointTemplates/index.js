import React from 'react';
import { Card, CardBody } from '_metronic/_partials/controls';
import Table from 'components/Table';
import Filters from './Filters';

import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import useConfirm from 'utils/confirm';
import CMSModal from 'components/CMSModal/CMSModal';

import toast from 'utils/toast';
import { useDebounce } from 'use-debounce';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';
import Checkpoints from './Checkpoints';

import * as transformers from 'modules/checkpointTemplates/transformers';
import * as constants from 'modules/checkpointTemplates/constants';

export default function CheckpointTemplates() {
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

  const [isShowCheckpoints, setIsShowCheckpoints] = React.useState(false);
  const [showCheckpointsForId, setShowCheckpointsForId] = React.useState(0);

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
      to: endpoints.CREATE_CHECKPOINT_TEMPLATE.url,
      method: endpoints.CREATE_CHECKPOINT_TEMPLATE.method,
      data: transformers.up(fieldData),
    })
      .then(res => {
        toast.success('Create checkpoint template successfully');
        setShowCreate(false);
        loadData();
        setFieldTemplate({});
      })
      .catch(handleErrors)
      .finally(() => setIsProcessing(false));
  }, []);

  // ---------------------------------------------------------------------------

  const handleShowCheckpoints = React.useCallback(e => {
    e.preventDefault();
    const id = Number(e.currentTarget.getAttribute('data-id'));
    if (!Number.isInteger(id)) {
      toast.error('Internal Server Error');
      return;
    }
    setShowCheckpointsForId(id);
    setIsShowCheckpoints(true);
  }, []);

  const onEdit = React.useCallback(e => {
    loadData();
  }, []);

  // ---------------------------------------------------------------------------

  const hideUpdateModal = React.useCallback(() => {
    setShowUpdate(false);
  }, []);

  const edit = React.useCallback(
    fieldData => {
      setIsProcessing(true);
      request({
        to: endpoints.UPDATE_CHECKPOINT_TEMPLATE(editId).url,
        method: endpoints.UPDATE_CHECKPOINT_TEMPLATE(editId).method,
        data: transformers.up(fieldData),
      })
        .then(res => {
          toast.success('Update checkpoint template successfully');
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
      to: endpoints.READ_CHECKPOINT_TEMPLATE(id).url,
      method: endpoints.READ_CHECKPOINT_TEMPLATE(id).method,
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
            Do you wanna remove this checkpoint template?
            <br />
            This checkpoint template will be <b>permanently removed</b>, and all
            historical data belong to this checkpoint template too.
          </>
        ),
        onConfirm: () =>
          request({
            to: endpoints.DELETE_CHECKPOINT_TEMPLATE(id).url,
            method: endpoints.DELETE_CHECKPOINT_TEMPLATE(id).method,
          })
            .then(res => {
              loadData();
              toast.success('Successfully remove checkpoint template');
            })
            .catch(handleErrors),
      });
    },
    [confirm]
  );

  // ---------------------------------------------------------------------------

  const columns = React.useMemo(
    () =>
      constants.createColumns({
        handleEdit,
        handleRemove,
        handleShowCheckpoints,
      }),
    [handleEdit, handleRemove, handleShowCheckpoints]
  );

  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    setMeta({
      title: 'All checkpoint templates',
      breadcrumb: [
        { title: 'Checkpoint templates', path: '/checkpoint-tempalte' },
        { title: 'All', path: '/checkpoint template/#' },
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
    setIsLoading(true);
    const source = {};

    request({
      to: endpoints.LIST_CHECKPOINT_TEMPLATE.url,
      method: endpoints.LIST_CHECKPOINT_TEMPLATE.method,
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
        title="Create checkpoint template"
        subTitle="Add new checkpoint template to this system"
        onConfirmForm={handleCreate}
        fieldTemplate={fieldTemplate}
        isProcessing={isProcessing}
      />
      <CMSModal
        isShowFlg={showUpdate}
        onHide={hideUpdateModal}
        configs={constants.modalConfigs}
        title="Update this checkpoint template"
        subTitle="Change this checkpoint template info"
        onConfirmForm={edit}
        fieldTemplate={updateFieldTemplate}
        primaryButtonLabel="Update"
        isProcessing={isProcessing}
      />
      <Checkpoints
        isShowFlg={isShowCheckpoints}
        setIsShowFlg={setIsShowCheckpoints}
        id={showCheckpointsForId}
        onEdit={onEdit}
      />
    </Card>
  );
}
