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

import * as transformers from 'modules/semester/team/transformers';
import * as constants from 'modules/semester/team/constants';

export default function Teams({ semester }) {
  const confirm = useConfirm();
  const setMeta = useSetRecoilState(metaAtom);
  const { id: semId } = useParams();
  const [modalConfigs, setModalConfigs] = React.useState([]);

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
    setShowCreate(true);
    if (semester.status === 3) {
      toast.warn('Semester is finished, cannot make any further changes.');
      return;
    }
  }, [semester.status]);

  const hideCreateModal = React.useCallback(() => {
    setShowCreate(false);
  }, []);

  const handleCreate = React.useCallback(
    fieldData => {
      try {
        setIsProcessing(true);
        request({
          to: endpoints.CREATE_TEAM.url,
          method: endpoints.CREATE_TEAM.method,
          data: { ...transformers.up(fieldData), semesterId: Number(semId) },
          params: {
            semesterId: semId,
          },
        })
          .then(res => {
            toast.success('Create team successfully');
            setShowCreate(false);
            loadData();
            setFieldTemplate({});
          })
          .catch(handleErrors)
          .finally(() => setIsProcessing(false));
      } catch (err) {
        handleErrors(err);
        setIsProcessing(false);
      }
    },
    [semId]
  );

  // ---------------------------------------------------------------------------

  const hideUpdateModal = React.useCallback(() => {
    setShowUpdate(false);
  }, []);

  const edit = React.useCallback(
    fieldData => {
      try {
        setIsProcessing(true);
        request({
          to: endpoints.UPDATE_TEAM(editId).url,
          method: endpoints.UPDATE_TEAM(editId).method,
          params: {
            teamId: editId,
            semesterId: semId,
          },
          data: { ...transformers.up(fieldData), teamId: editId },
        })
          .then(res => {
            toast.success('Update team successfully');
            setShowUpdate(false);
            loadData();
          })
          .catch(handleErrors)
          .finally(() => setIsProcessing(false));
      } catch (err) {
        handleErrors(err);
        setIsProcessing(false);
      }
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
        to: endpoints.READ_TEAM(id).url,
        method: endpoints.READ_TEAM(id).method,
        params: {
          teamId: id,
          semesterId: semId,
        },
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
      if (!Number.isInteger(id)) {
        toast.error('Internal Server Error');
        return;
      }
      confirm({
        title: 'Removal Confirmation',
        body: (
          <>
            Do you wanna remove this team?
            <br />
            This team will be <b>permanently removed</b>, and all historical
            data belong to this team too.
          </>
        ),
        onConfirm: () =>
          request({
            to: endpoints.DELETE_TEAM(id).url,
            method: endpoints.DELETE_TEAM(id).method,
            params: {
              teamId: id,
            },
          })
            .then(res => {
              loadData();
              toast.success('Successfully remove team');
            })
            .catch(handleErrors),
      });
    },
    [confirm, semester.status]
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
      to: endpoints.LIST_TEAM.url,
      method: endpoints.LIST_TEAM.method,
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
      title: 'Teams of ' + semester.name,
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: semester.name, path: '/semester/' + semId },
        { title: 'Team', path: '/semester/' + semId + '/team' },
      ],
    }));
    setModalConfigs(constants.createModalConfigs(semId));
  }, [semId, semester.name, setMeta]);

  return (
    <Card>
      <CardHeader title="All teams">
        <CardHeaderToolbar className="text-nowrap">
          <button
            type="button"
            className="btn btn-danger font-weight-bold"
            disabled={Array.isArray(selected) && selected.length === 0}
            // onClick={}
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
        configs={modalConfigs}
        title="Create student team"
        subTitle="Add a student team to this semester"
        onConfirmForm={handleCreate}
        fieldTemplate={fieldTemplate}
        isProcessing={isProcessing}
      />
      <CMSModal
        isShowFlg={showUpdate}
        onHide={hideUpdateModal}
        configs={modalConfigs}
        title="Update student team"
        subTitle="Change this team info"
        onConfirmForm={edit}
        fieldTemplate={updateFieldTemplate}
        primaryButtonLabel="Update"
        isProcessing={isProcessing}
      />
    </Card>
  );
}
