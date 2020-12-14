import React from 'react';
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
import CMSModal from 'components/CMSModal/CMSModal';

import toast from 'utils/toast';
import { useDebounce } from 'use-debounce';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';

import * as transformers from 'modules/semester/topic/transformers';
import * as constants from 'modules/semester/topic/constants';

import semesterStore from 'store/semester';
import userAtom from 'store/user';
import roleSelector from 'auth/recoil/selectors/role';
import { Button } from 'react-bootstrap';

export default function Topics() {
  const setMeta = useSetRecoilState(metaAtom);
  const semester = useRecoilValue(semesterStore);
  const currentUser = useRecoilValue(userAtom);
  const role = useRecoilValue(roleSelector);

  //----------------------------------------------------------------------------

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

  const [isAllTopics, setIsAllTopics] = React.useState(true);
  const [isMentoringTopics, setIsMentoringTopics] = React.useState(false);
  const [isSubmittedTopics, setIsSubmittedTopics] = React.useState(false);

  // ---------------------------------------------------------------------------

  const showCreateModal = React.useCallback(() => {
    setShowCreate(true);
  }, []);

  const hideCreateModal = React.useCallback(() => {
    setShowCreate(false);
  }, []);

  const loadTopics = React.useCallback(
    state => {
      const source = {};

      let callConfigs = {};
      switch (state) {
        case 'all':
          callConfigs = {
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
          };
          break;
        case 'mentoring':
          callConfigs = {
            to: endpoints.LIST_TOPIC.url,
            method: endpoints.LIST_TOPIC.method,
            params: {
              ...debouncedFilters,
              pageNumber: page,
              pageSize: pageSize,
              sortField: sortField,
              sortOrder: sortOrder,
              semesterId: semester.id,
              isOwnMentorTopic: true,
            },
            source,
          };
          break;
        case 'submitted':
          callConfigs = {
            to: endpoints.LIST_TOPIC.url,
            method: endpoints.LIST_TOPIC.method,
            params: {
              ...debouncedFilters,
              pageNumber: page,
              pageSize: pageSize,
              sortField: sortField,
              sortOrder: sortOrder,
              semesterId: semester.id,
              isOwnSubmit: true,
            },
            source,
          };
          break;

        default:
          break;
      }
      setIsLoading(true);

      request(callConfigs)
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
    },
    [debouncedFilters, page, pageSize, semester.id, sortField, sortOrder]
  );

  const handleCreate = React.useCallback(
    fieldData => {
      setIsProcessing(true);
      request({
        to: endpoints.CREATE_TOPIC.url,
        method: endpoints.CREATE_TOPIC.method,
        data: {
          ...transformers.up(fieldData),
          semesterId: Number(semester.id),
          submitterId: currentUser.id,
        },
        params: {
          semesterId: semester.id,
        },
      })
        .then(res => {
          toast.success('Create topic successfully');
          setShowCreate(false);
          setFieldTemplate({});
          loadTopics('all');
          loadTopics('submitted');
        })
        .catch(handleErrors)
        .finally(() => setIsProcessing(false));
    },
    [currentUser.id, loadTopics, semester.id]
  );

  const handleLoadAllSubmitted = React.useCallback(() => {
    setIsMentoringTopics(false);
    setIsAllTopics(false);
    setIsSubmittedTopics(true);
    loadTopics('submitted');
  }, [loadTopics]);

  const handleLoadAllMentoring = React.useCallback(() => {
    setIsMentoringTopics(true);
    setIsAllTopics(false);
    setIsSubmittedTopics(false);
    loadTopics('mentoring');
  }, [loadTopics]);

  const handleLoadAllTopics = React.useCallback(() => {
    setIsMentoringTopics(false);
    setIsAllTopics(true);
    setIsSubmittedTopics(false);
    loadTopics('all');
  }, [loadTopics]);

  // ---------------------------------------------------------------------------

  const columns = React.useMemo(() => constants.createColumns({}, role), [
    role,
  ]);

  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    loadTopics('all');
  }, [loadTopics]);

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Topics of ' + (semester?.name || ''),
      breadcrumb: [
        { title: 'Semester', path: '/select-semester' },
        { title: semester?.name, path: '/select-semester/#' },
        { title: 'Topic', path: '/topic' },
        { title: 'All topics', path: '/topic/#' },
      ],
      toolbar: (
        <>
          {role === 'lecturer' && [0, 1].includes(semester.status) ? (
            <button
              type="button"
              className="btn btn-primary font-weight-bold"
              onClick={showCreateModal}
            >
              <i className="fas fa-plus mr2"></i>
              Submit
            </button>
          ) : null}
        </>
      ),
    }));
  }, [role, semester.name, semester.status, setMeta, showCreateModal]);

  return (
    <Card>
      <CardHeader title="All topics">
        {role === 'lecturer' && (
          <CardHeaderToolbar className="text-nowrap">
            <Button
              className={`ml-2 ${
                isSubmittedTopics ? 'font-weight-bolder' : 'text-primary'
              }`}
              variant={isSubmittedTopics && 'primary'}
              onClick={handleLoadAllSubmitted}
            >
              Submitted
            </Button>
            <Button
              className={`ml-2 ${
                isMentoringTopics ? 'font-weight-bolder' : 'text-primary'
              }`}
              variant={isMentoringTopics && 'primary'}
              onClick={handleLoadAllMentoring}
            >
              Mentoring
            </Button>
            <Button
              className={`ml-2 ${
                isAllTopics ? 'font-weight-bolder' : 'text-primary'
              }`}
              variant={isAllTopics && 'primary'}
              onClick={handleLoadAllTopics}
            >
              All
            </Button>
          </CardHeaderToolbar>
        )}
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
        configs={constants.submitterModalConfigs}
        title="Create new topic"
        subTitle="Submit new topic to this capstone semester"
        onConfirmForm={handleCreate}
        fieldTemplate={fieldTemplate}
        isProcessing={isProcessing}
      />
    </Card>
  );
}
