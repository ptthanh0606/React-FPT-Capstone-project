import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';
import * as endpoints from 'endpoints';
import * as transformers from '../../../modules/semester/team/transformers';
import Table from 'components/Table';
import Filters from './Filters';
import metaAtom from 'store/meta';
import semesterAtom from 'store/semester';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { role } from 'auth/recoil/selectors';
import { useHistory, useParams } from 'react-router-dom';
import CMSModal from 'components/CMSModal/CMSModal';
import {
  createColumnsForStudentRole,
  createTeamAsStudent,
  defaultSorted,
  sizePerPageList,
} from 'modules/semester/team/constants';
import toast from 'utils/toast';
import { useDebounce } from 'use-debounce/lib';
import { handleErrors } from 'utils/common';
import request from 'utils/request';

export default function Teams() {
  const history = useHistory();
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

  // ------------------------------------------------------------------

  const currentRole = useRecoilValue(role);
  const [joinTeamModalShowFlg, setJoinTeamModalShowFlg] = React.useState(false);

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

  const toolBar = React.useCallback(() => {
    let buttons = <></>;
    switch (currentRole) {
      case 'student':
        buttons = (
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
        );
        break;

      case 'lecturer':
        buttons = <></>;
        break;

      default:
        break;
    }
    return buttons;
  }, [currentRole, handleShowCreateStudentTeamModal]);

  const handleConfirmCreate = React.useCallback(data => {
    toast.success('Created!');
  }, []);

  const handleJoin = React.useCallback(
    e => {
      e.preventDefault();
      const teamId = e.currentTarget.getAttribute('data-id');
      const teamCode = e.currentTarget.getAttribute('data-code');
      request({
        to: endpoints.JOIN_TEAM(teamId).url,
        method: endpoints.JOIN_TEAM(teamId).method,
        params: {
          teamId: teamId,
          semesterId: currentSemester.id,
          teamCode: teamCode,
        },
      })
        .then(res => {
          console.log(res);
          history.push(`/team/${res.data.data.id}`);
          toast.success('Joined!');
        })
        .catch(err => {
          handleErrors(err);
          if (!err.isCancel) setIsLoading(false);
        });
    },
    [currentSemester.id, history]
  );

  // ---------------------------------------------------------------------------

  const columns = React.useMemo(
    () => createColumnsForStudentRole({ handleJoin }),
    [handleJoin]
  );

  // --------------------------------------------------------------------

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Teams of Fall 2020',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'Fall 2020', path: '/semester/' + id },
        { title: 'Team', path: '/semester/' + id + '/team' },
      ],
      toolbar: toolBar(),
    }));
  }, [setMeta, id, toolBar]);

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
  }, [currentSemester, debouncedFilters, page, pageSize, sortField, sortOrder]);

  return (
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
        configs={createTeamAsStudent}
        fieldTemplate={{
          name: '',
          isPrivate: false,
        }}
        onConfirmForm={handleConfirmCreate}
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
            smallLabel: 'Enter team code to quickly join a team',
          },
        ]}
        primaryButtonLabel="Join"
      />
    </Card>
  );
}
