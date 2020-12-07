import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';
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

import * as transformers from '../../../../../modules/semester/topic/transformers';
import * as constants from '../../../../../modules/semester/topic/constants';

import AssignCheckpointTemplateModal from './AssignCheckpointTemplateModal';

export default function Topics({ semester }) {
  const confirm = useConfirm();
  const setMeta = useSetRecoilState(metaAtom);
  const { id: semId } = useParams();
  // const [modalConfigs, setModalConfigs] = React.useState([]);

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

  const [
    isShowAssignCheckpointTemplate,
    setIsShowAssignCheckpointTemplate,
  ] = React.useState(false);

  // ---------------------------------------------------------------------------

  const showCreateModal = React.useCallback(() => {
    setShowCreate(true);
  }, []);

  const hideCreateModal = React.useCallback(() => {
    setShowCreate(false);
  }, []);

  const handleCreate = React.useCallback(
    fieldData => {
      setIsProcessing(true);
      request({
        to: endpoints.CREATE_TOPIC.url,
        method: endpoints.CREATE_TOPIC.method,
        data: { ...transformers.up(fieldData), semesterId: Number(semId) },
        params: {
          semesterId: semId,
        },
      })
        .then(res => {
          toast.success('Create topic successfully');
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
        to: endpoints.UPDATE_TOPIC(editId).url,
        method: endpoints.UPDATE_TOPIC(editId).method,
        params: {
          topicId: editId,
        },
        data: transformers.up(fieldData),
      })
        .then(res => {
          toast.success('Update topic successfully');
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
      to: endpoints.READ_TOPIC(id).url,
      method: endpoints.READ_TOPIC(id).method,
      params: {
        topicId: id,
      },
    })
      .then(res => {
        setEditId(id);
        setUpdateFieldTemplate(transformers.downRead(res.data?.data) || {});
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
            Do you wanna remove this topic?
            <br />
            This topic will be <b>permanently removed</b>, and all historical
            data belong to this topic too.
          </>
        ),
        onConfirm: () =>
          request({
            to: endpoints.DELETE_TOPIC(id).url,
            method: endpoints.DELETE_TOPIC(id).method,
            params: {
              topicId: id,
            },
          })
            .then(res => {
              loadData();
              toast.success('Successfully remove topic');
            })
            .catch(handleErrors),
      });
    },
    [confirm]
  );

  // ---------------------------------------------------------------------------

  const handleAssignCheckpointTemplate = React.useCallback(e => {
    e.preventDefault();
    setIsShowAssignCheckpointTemplate(true);
  }, []);

  const columns = React.useMemo(
    () => constants.createColumns({ handleEdit, handleRemove }),
    [handleEdit, handleRemove]
  );

  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    setIsLoading(true);
    const source = {};

    request({
      to: endpoints.LIST_TOPIC.url,
      method: endpoints.LIST_TOPIC.method,
      params: {
        ...debouncedFilters,
        pageNumber: page,
        pageSize: pageSize,
        sortField: sortField,
        sortOrder: sortOrder,
        semesterId: semId,
      },
      source,
    })
      .then(res => {
        setData(res.data?.data?.map(transformers.downList));
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
      title: 'Topics of ' + semester.name,
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: semester.name, path: '/semester/' + semId },
        { title: 'Topic', path: '/semester/' + semId + '/topic' },
      ],
    }));
  }, [setMeta, semId, semester.name]);

  return (
    <Card>
      <CardHeader title="All topics">
        <CardHeaderToolbar className="text-nowrap">
          <button
            type="button"
            className="btn btn-success font-weight-bold"
            disabled={Array.isArray(selected) && selected.length === 0}
            onClick={handleAssignCheckpointTemplate}
          >
            <i className="fas fa-puzzle-piece mr-2"></i>
            Assign checkpoint template (
            {(Array.isArray(selected) && selected.length) || 0})
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary font-weight-bold"
            onClick={showCreateModal}
          >
            <i className="fas fa-plus mr2"></i>
            New
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
      <CMSModal
        isShowFlg={showCreate}
        onHide={hideCreateModal}
        configs={constants.modalConfigs}
        title="Create new topic"
        subTitle="Submit new topic to this capstone semester"
        onConfirmForm={handleCreate}
        fieldTemplate={fieldTemplate}
        isProcessing={isProcessing}
      />
      <CMSModal
        isShowFlg={showUpdate}
        onHide={hideUpdateModal}
        configs={constants.modalConfigs}
        title="Update topic"
        subTitle="Change this topic info"
        onConfirmForm={edit}
        fieldTemplate={updateFieldTemplate}
        primaryButtonLabel="Update"
        isProcessing={isProcessing}
      />
      <AssignCheckpointTemplateModal
        isShowFlg={isShowAssignCheckpointTemplate}
        setIsShowFlg={setIsShowAssignCheckpointTemplate}
        onOk={data => console.log(data)}
      />
    </Card>
  );
}
