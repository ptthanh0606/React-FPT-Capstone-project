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
import { useSetRecoilState, useRecoilValue } from 'recoil';
import useConfirm from 'utils/confirm';
import CMSModal from 'components/CMSModal/CMSModal';

import toast from 'utils/toast';
import { useDebounce } from 'use-debounce';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';

import * as transformers from 'modules/semester/topic/transformers';
import * as constants from 'modules/semester/topic/constants';

import semesterStore from 'store/semester';
import roleSelector from 'auth/recoil/selectors/role';

export default function Topics() {
  const confirm = useConfirm();
  const setMeta = useSetRecoilState(metaAtom);
  const semester = useRecoilValue(semesterStore);
  const role = useRecoilValue(roleSelector);

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
  const [showCreate, setShowCreate] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

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
        data: {
          ...transformers.up(fieldData),
          semesterId: Number(semester.id),
        },
        params: {
          semesterId: semester.id,
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
    [semester.id]
  );

  // ---------------------------------------------------------------------------

  const columns = React.useMemo(() => constants.createColumns({}, role), [
    role,
  ]);

  // ---------------------------------------------------------------------------

  const onAssignCheckpointTemplate = React.useCallback(
    data => {
      console.log({
        ...data,
        topicIds: selected,
      });
    },
    [selected]
  );

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
        semesterId: semester.id,
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
  }, [l, debouncedFilters, page, pageSize, sortField, sortOrder, semester.id]);
  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Topics',
      breadcrumb: [
        { title: 'Semester', path: '/select-semester' },
        { title: semester.name, path: '/select-semester/#' },
        { title: 'Topic', path: '/topic' },
        { title: 'All topics', path: '/topic/#' },
      ],
    }));
  }, [semester.name, setMeta]);

  return (
    <Card>
      <CardHeader title="All topics">
        <CardHeaderToolbar className="text-nowrap">
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
    </Card>
  );
}
