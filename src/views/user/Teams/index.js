import React from 'react';

import { useHistory, useLocation, useParams } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import * as endpoints from 'endpoints';
import * as transformers from 'modules/semester/team/transformers';
import {
  createColumns,
  createTeamAsStudentModalConfigs,
  defaultSorted,
  sizePerPageList,
} from 'modules/semester/team/constants';

import Table from 'components/Table';
import Filters from './Filters';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import semesterAtom from 'store/semester';
import metaAtom from 'store/meta';
import { role } from 'auth/recoil/selectors';

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';
import CMSModal from 'components/CMSModal/CMSModal';
import toast from 'utils/toast';
import { useDebounce } from 'use-debounce/lib';
import { handleErrors } from 'utils/common';
import request from 'utils/request';
import useConfirm from 'utils/confirm';
import queryString from 'query-string';
import Engaging from 'components/CMSWidgets/Engaging';
import { toAbsoluteUrl } from '_metronic/_helpers';

export default function Teams() {
  const history = useHistory();
  const location = useLocation();
  const confirm = useConfirm();
  const [l, loadData] = React.useReducer(() => ({}), {});
  // ------------------------------------------------------------------

  const currentSemester = useRecoilValue(semesterAtom);

  // ------------------------------------------------------------------

  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  const [debouncedFilters] = useDebounce(filters, 500);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(sizePerPageList[0].value);
  const [sortField, setSortField] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // ------------------------------------------------------------------

  const [fieldTemplate, setFieldTemplate] = React.useState({});
  const [modalConfigs, setModalConfigs] = React.useState([]);

  // ------------------------------------------------------------------

  const currentRole = useRecoilValue(role);
  const [joinTeamModalShowFlg, setJoinTeamModalShowFlg] = React.useState(false);
  const [isFromTeamGuide, setIsFromTeamGuide] = React.useState(false);

  const [
    showCreateStudentTeamModalFlg,
    setShowCreateStudentTeamModalFlg,
  ] = React.useState(false);

  const { id } = useParams();
  const setMeta = useSetRecoilState(metaAtom);

  const handleShowCreateStudentTeamModal = React.useCallback(() => {
    setShowCreateStudentTeamModalFlg(true);
  }, []);

  const handleHideCreateStudentTeamModal = React.useCallback(() => {
    setShowCreateStudentTeamModalFlg(false);
  }, []);

  // --------------------------------------------------------------------

  const fetchTeams = React.useCallback(() => {
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
        semesterId: currentSemester.id,
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
  }, [
    currentSemester.id,
    debouncedFilters,
    page,
    pageSize,
    sortField,
    sortOrder,
  ]);

  const toolBar = React.useCallback(() => {
    let buttons = <></>;
    switch (currentRole) {
      case 'student':
        buttons = [0, 1].includes(currentSemester.status) ? (
          <>
            <button
              type="button"
              className="btn btn-light-info font-weight-bold mr-2"
              onClick={() => setJoinTeamModalShowFlg(true)}
            >
              <i className="fas fa-arrow-circle-right mr-2"></i>
              Join with code
            </button>
            <button
              type="button"
              className="btn btn-primary font-weight-bold"
              onClick={handleShowCreateStudentTeamModal}
            >
              <i className="fas fa-plus-circle mr-2"></i>
              Create a team
            </button>
          </>
        ) : (
          <>
            <span class="svg-icon svg-icon-lg svg-icon-warning mr-1">
              <SVG
                src={toAbsoluteUrl(
                  '/media/svg/icons/Code/Warning-1-circle.svg'
                )}
              ></SVG>
            </span>
            <span className="text-warning font-weight-bolder mr-1">
              You cannot create or join a team in this semester phase.
            </span>
          </>
        );
        break;

      case 'lecturer':
        buttons = <></>;
        break;

      default:
        break;
    }
    return buttons;
  }, [currentRole, currentSemester.status, handleShowCreateStudentTeamModal]);

  const handleConfirmCreate = React.useCallback(
    fieldData => {
      setIsProcessing(true);
      try {
        request({
          to: endpoints.CREATE_TEAM.url,
          method: endpoints.CREATE_TEAM.method,
          data: transformers.upFromStudent({
            ...fieldData,
            semesterId: Number(currentSemester.id),
          }),
          params: {
            semesterId: currentSemester.id,
          },
        })
          .then(res => {
            toast.success('Create team successfully');
            setShowCreateStudentTeamModalFlg(false);
            loadData();
            fetchTeams();
            setFieldTemplate({});
          })
          .catch(handleErrors)
          .finally(() => setIsProcessing(false));
      } catch (error) {
        handleErrors(error);
      }
      setIsProcessing(false);
    },
    [currentSemester.id, fetchTeams]
  );

  const onJoinPublicConfirm = React.useCallback(
    e => {
      const teamId = e.currentTarget.getAttribute('data-id');
      const teamCode = e.currentTarget.getAttribute('data-code');
      const teamName = e.currentTarget.getAttribute('data-name');
      return () => {
        request({
          to: endpoints.JOIN_TEAM(teamId).url,
          method: endpoints.JOIN_TEAM(teamId).method,
          params: {
            teamId: teamId,
            semesterId: currentSemester.id,
            teamCode: teamCode,
          },
        })
          .then(() => {
            history.push(`/team/${teamId}`);
            toast.success(`Joined, you are now a member of ${teamName}!`);
          })
          .catch(err => {
            handleErrors(err);
            if (!err.isCancel) setIsLoading(false);
          });
      };
    },
    [currentSemester.id, history]
  );

  const handleJoin = React.useCallback(
    e => {
      e.preventDefault();
      confirm({
        title: 'Confirm required',
        body: 'Are you sure you want to join this team?',
        onConfirm: onJoinPublicConfirm(e),
      });
    },
    [confirm, onJoinPublicConfirm]
  );

  const handleJoinWithCode = React.useCallback(
    data => {
      setIsProcessing(true);
      if (data.code) {
        request({
          to: endpoints.JOIN_TEAM(0).url,
          method: endpoints.JOIN_TEAM(0).method,
          params: {
            semesterId: currentSemester.id,
            teamCode: data.code,
          },
        })
          .then(res => {
            setJoinTeamModalShowFlg(false);
            history.push(`/team/${res.data.data}`);
            toast.success(`Joined!`);
            setIsProcessing(false);
          })
          .catch(err => {
            handleErrors(err);
            setIsProcessing(false);
          });
      }
      setIsProcessing(false);
    },
    [currentSemester.id, history]
  );

  // ---------------------------------------------------------------------------

  const columns = React.useMemo(
    () => createColumns({ handleJoin }, currentRole),
    [currentRole, handleJoin],
    []
  );

  // --------------------------------------------------------------------

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: `Teams of ${currentSemester.name}`,
      breadcrumb: [
        { title: 'Semester', path: '/select-semester' },
        {
          title: currentSemester.name,
          path: '/select-semester/#',
        },
        { title: 'Team', path: '/team' },
      ],
      toolbar: toolBar(),
    }));
    setModalConfigs(createTeamAsStudentModalConfigs(currentSemester.id));
    setFieldTemplate({
      name: '',
      maxMembers: 0,
      isLocked: false,
      isPublic: false,
    });
  }, [setMeta, id, toolBar, currentSemester.name, currentSemester.id]);

  React.useEffect(() => {
    fetchTeams();
  }, [l, fetchTeams]);

  React.useEffect(() => {
    const messageType = queryString.parse(location.search).type;
    switch (messageType) {
      case 'teamguide':
        setIsFromTeamGuide(true);
        break;

      default:
        break;
    }
  }, [location.search]);

  return (
    <>
      {isFromTeamGuide && (
        <>
          <Engaging
            className="gutter-b"
            bgColor="#FFF4DE"
            bgSize="25%"
            title="Quick guide"
            textColorTitle="danger"
            textColorSubTitle="dark"
            imageUrl="/media/svg/illustrations/login-visual-4.svg"
            subTitle={
              <>
                Select 1 of the 2 options above to be a member of a team.
                <br />
                You can either <b>Join</b> or <b>Create a team</b> to start. You
                can also press join button icon in the available public teams
                table below.
              </>
            }
          />
        </>
      )}
      <Card>
        <CardHeader title="All teams">
          <CardHeaderToolbar className="text-nowrap"></CardHeaderToolbar>
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
            defaultSorted={defaultSorted}
            pageSizeList={sizePerPageList}
          />
        </CardBody>
        <CMSModal
          isShowFlg={showCreateStudentTeamModalFlg}
          onHide={handleHideCreateStudentTeamModal}
          title="Create your team"
          subTitle="Before you can match a topic in this semester is you have to have a team"
          configs={modalConfigs}
          fieldTemplate={fieldTemplate}
          onConfirmForm={handleConfirmCreate}
          isProcessing={isProcessing}
        />
        <CMSModal
          isShowFlg={joinTeamModalShowFlg}
          onHide={() => setJoinTeamModalShowFlg(false)}
          title="Join team with code"
          fieldTemplate={{
            code: '',
          }}
          configs={[
            {
              type: 'text',
              name: 'code',
              label: 'Code',
              required: true,
              smallLabel: 'Enter team code to quickly join a team',
            },
          ]}
          onConfirmForm={handleJoinWithCode}
          primaryButtonLabel="Join"
        />
      </Card>
    </>
  );
}
