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
import * as TeamTransformer from 'modules/semester/team/transformers';

import semesterStore from 'store/semester';
import userAtom from 'store/user';
import roleSelector from 'auth/recoil/selectors/role';
import { Button } from 'react-bootstrap';
import Engaging from 'components/CMSWidgets/Engaging';
import MessageTile from 'components/CMSWidgets/MessageTile';
import { toAbsoluteUrl } from '_metronic/_helpers';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

export default function Topics() {
  const location = useLocation();

  // ---------------------------------------------------------------------------

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
  const [isStudentHaveTeam, setIsStudentHaveTeam] = React.useState(false);
  const [isStudentHaveTopic, setIsStudentHaveTopic] = React.useState(false);
  const [isFromNeedFeedback, setIsFromNeedFeedback] = React.useState(false);
  const [isFromApplyMentor, setIsFromApplyMentor] = React.useState(false);

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
      const data = new FormData();
      fieldData = {
        ...transformers.up(fieldData),
        semesterId: Number(semester.id),
        submitterId: currentUser.id,
      };
      for (const i of Object.keys(fieldData)) {
        if (!fieldData?.[i]) continue;
        if (fieldData[i]?.constructor?.name !== 'File') {
          data.append(i, fieldData[i]);
        } else {
          data.append(i, fieldData[i], fieldData[i].name);
        }
      }
      request({
        to: endpoints.CREATE_TOPIC.url,
        method: endpoints.CREATE_TOPIC.method,
        data: data,
        params: {
          semesterId: semester.id,
        },
      })
        .then(res => {
          toast.success('Create topic successfully');
          setShowCreate(false);
          setFieldTemplate({});
          setIsMentoringTopics(false);
          setIsSubmittedTopics(true);
          setIsAllTopics(false);
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

  const checkUserInTeam = React.useCallback(() => {
    request({
      to: endpoints.READ_TEAM(0).url,
      method: endpoints.READ_TEAM(0).method,
      params: {
        semesterId: semester.id,
      },
    })
      .then(res => {
        const transformedRes = TeamTransformer.down(res.data.data);

        setIsStudentHaveTopic(!!transformedRes.topic.label);
        setIsStudentHaveTeam(true);
      })
      .catch(() => {
        setIsStudentHaveTeam(false);
      });
  }, [semester.id]);

  // ---------------------------------------------------------------------------

  const columns = React.useMemo(() => constants.createColumns({}, role), [
    role,
  ]);

  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    loadTopics('all');
    if (role === 'student') {
      checkUserInTeam();
    }
  }, [checkUserInTeam, loadTopics, location.search, role]);

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
              <i className="fas fa-paper-plane mr-2"></i>
              Submit
            </button>
          ) : null}
        </>
      ),
    }));
  }, [role, semester.name, semester.status, setMeta, showCreateModal]);

  React.useEffect(() => {
    const messageType = queryString.parse(location.search).type;
    switch (messageType) {
      case 'needfeedback':
        setIsFromNeedFeedback(true);
        break;
      case 'applymentor':
        setIsFromApplyMentor(true);
        break;

      default:
        break;
    }
  }, [location.search]);

  return (
    <>
      {isFromNeedFeedback && (
        <MessageTile
          iconSrc={toAbsoluteUrl('/media/svg/icons/Code/Info-circle.svg')}
          content={
            <>
              Select your assigned department with topic status <b>"Waiting"</b>{' '}
              filters to start feedback.
            </>
          }
          baseColor="info"
          className="gutter-b"
        />
      )}

      {isFromApplyMentor && (
        <Engaging
          className="gutter-b"
          bgColor="#8950FC"
          bgSize="25%"
          title="Quick guide"
          textColorTitle="white"
          textColorSubTitle="white"
          imageUrl="/media/svg/humans/custom-8.svg"
          subTitle={
            <>
              Pick a topic with status <b>"Approved"</b> and apply to become a
              mentor.
            </>
          }
        />
      )}

      {role === 'student' && isStudentHaveTeam && !isStudentHaveTopic && (
        <Engaging
          className="gutter-b"
          bgColor="#8950FC"
          bgSize="25%"
          title="Quick guide"
          textColorTitle="white"
          textColorSubTitle="white"
          imageUrl="/media/svg/humans/custom-8.svg"
          subTitle={
            <>
              Discuss with your team to find <b>the best topic</b> for you all
              to handle.
              <br />
              Pick one of the topic with the <b>"Ready"</b> status below to
              start.
            </>
          }
        />
      )}
      {role === 'student' && !isStudentHaveTeam && (
        <MessageTile
          iconSrc={toAbsoluteUrl('/media/svg/icons/Code/Info-circle.svg')}
          content={
            <>
              Looks like you are not in a team yet...
              <b>Create a team</b> or <b>join a team</b> to start assigning for
              topic!
            </>
          }
          baseColor="warning"
          className="gutter-b"
        />
      )}
      {semester.status === 0 &&
        role === 'student' &&
        isStudentHaveTeam &&
        isStudentHaveTopic && (
          <MessageTile
            iconSrc={toAbsoluteUrl('/media/svg/icons/Code/Info-circle.svg')}
            content={
              <>
                Topics are now in processing, wait for the next phase of
                semester to view and send applications.
              </>
            }
            baseColor="info"
            className="gutter-b"
          />
        )}
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
          configs={constants.submitterModalConfigs(semester.id)}
          title="Create new topic"
          subTitle="Submit new topic to this capstone semester"
          onConfirmForm={handleCreate}
          fieldTemplate={fieldTemplate}
          isProcessing={isProcessing}
        />
      </Card>
    </>
  );
}
