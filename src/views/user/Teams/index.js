import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';

import {
  sortCaret,
  headerSortingClasses,
  toAbsoluteUrl,
} from '_metronic/_helpers';
import Table from 'components/Table';
import SVG from 'react-inlinesvg';
import Filters from './Filters';
import { Link } from 'react-router-dom';
import metaAtom from 'store/meta';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { role } from 'auth/recoil/selectors';
import { useParams } from 'react-router-dom';
import CreateTeamStudentModal from 'components/CreateTeamStudentModal/CreateTeamStudentModal';
import CMSModal from 'components/CMSModal/CMSModal';
import { createTeamAsStudent } from 'modules/semester/team/constants';
import toast from 'utils/toast';

export const statusClasses = ['info', 'success', ''];
export const statusTitles = ['Matching', 'Matched', ''];
export const lockClasses = ['success', 'danger'];
export const lockTitles = ['Unlocked', 'Locked'];
export const privateClasses = ['success', 'danger'];
export const privateTitles = ['Public', 'Private'];

export const defaultSorted = [{ dataField: 'id', order: 'desc' }];
export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
];

const mockData = [
  {
    id: 0,
    name: 'HKT',
    code: 'JDNU8KD',
    department: 'SE',
    leader: ['Duy Duc Huynh'],
    members: ['Huynh Duc Duy', 'Phan Thong Thanh'],
    topic: 'FPT CMS',
    status: 0,
    lock: false,
    private: false,
  },
];

function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { openEditCustomerDialog, openDeleteCustomerDialog }
) {
  return (
    <span className="text-nowrap">
      <a
        href="/"
        title="Edit"
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={event => {
          event.preventDefault();
          openEditCustomerDialog(row.id);
        }}
      >
        <i className="fas fa-pencil-alt mx-2"></i>
      </a>
      <a
        href="/"
        title="Remove"
        className="btn btn-icon btn-light btn-hover-primary btn-sm"
        onClick={event => {
          event.preventDefault();
          openDeleteCustomerDialog(row.id);
        }}
      >
        <i className="fas fa-trash mx-2"></i>
      </a>
    </span>
  );
}

function ColumnFormatter(classes, titles) {
  return function (cellContent, row) {
    const getLabelCssClasses = () => {
      return `label label-lg label-light-${
        classes[row.status]
      } label-inline text-nowrap text-nowrap`;
    };
    return <span className={getLabelCssClasses()}>{titles[row.status]}</span>;
  };
}

const columns = [
  {
    dataField: 'department',
    text: 'DEP',
    sort: true,
    sortCaret: sortCaret,
    headerSortingClasses,
  },
  {
    dataField: 'code',
    text: 'Code',
    sort: true,
    sortCaret: sortCaret,
    headerSortingClasses,
  },
  {
    dataField: 'name',
    text: 'Name',
    sort: true,
    sortCaret: sortCaret,
    formatter: function StatusColumnFormatter(cellContent, row) {
      return (
        <Link className="text-dark font-weight-bold" to={'/team/' + row.id}>
          {cellContent}
        </Link>
      );
    },
    headerSortingClasses,
  },
  {
    dataField: 'leader',
    text: 'Leader',
    sort: true,
    sortCaret: sortCaret,
    headerSortingClasses,
  },
  {
    dataField: 'members',
    text: 'Members',
    formatter: function StatusColumnFormatter(cellContent, row) {
      return (
        <Link className="text-dark font-weight-bold" to={'/semester/' + row.id}>
          {cellContent.join(', ')}
        </Link>
      );
    },
  },
  {
    dataField: 'topic',
    text: 'Topic',
    sort: true,
    sortCaret: sortCaret,
    headerSortingClasses,
  },
  {
    dataField: 'status',
    text: 'Status',
    sort: true,
    sortCaret: sortCaret,
    formatter: ColumnFormatter(statusClasses, statusTitles),
    headerSortingClasses,
  },
  {
    dataField: 'lock',
    text: 'Lock',
    sort: true,
    sortCaret: sortCaret,
    formatter: ColumnFormatter(lockClasses, lockTitles),
    headerSortingClasses,
  },
  {
    dataField: 'private',
    text: 'Private',
    sort: true,
    sortCaret: sortCaret,
    formatter: ColumnFormatter(privateClasses, privateTitles),
    headerSortingClasses,
  },
];

export default function Teams() {
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortField, setSortField] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState(null);
  const currentRole = useRecoilValue(role);
  const [joinTeamModalShowFlg, setJoinTeamModalShowFlg] = React.useState(false);

  const [
    showCreateStudentTeamModalFlg,
    setShowCreateStudentTeamModalFlg,
  ] = React.useState(false);

  const { id } = useParams();
  const setMeta = useSetRecoilState(metaAtom);

  const handleShowCreateStudentTeamModal = () => {
    setShowCreateStudentTeamModalFlg(true);
  };

  const handleHideCreateStudentTeamModal = () => {
    setShowCreateStudentTeamModalFlg(false);
  };

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
              <span className="svg-icon svg-icon-md">
                <SVG
                  src={toAbsoluteUrl('/media/svg/icons/Media/Forward.svg')}
                ></SVG>
              </span>
              Join with code
            </button>
            <button
              type="button"
              className="btn btn-primary font-weight-bold"
              onClick={handleShowCreateStudentTeamModal}
            >
              <span className="svg-icon svg-icon-md">
                <SVG
                  src={toAbsoluteUrl('/media/svg/icons/Navigation/Plus.svg')}
                ></SVG>
              </span>
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
  }, [currentRole]);

  const handleConfirmCreate = React.useCallback(data => {
    toast.success('Created!');
  }, []);

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
    setData(mockData);
    setTotal(100);
  }, []);

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
