import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';

import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from './Filters';
import { Link } from 'react-router-dom';
import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';

import { useParams } from 'react-router-dom';
import ConfirmRemoveModal from 'components/ConfirmRemoveModal/ConfirmRemoveModal';
import CreateTeamStudentModal from 'components/CreateTeamStudentModal/CreateTeamStudentModal';

export const statusClasses = ['danger', 'info', 'success', ''];
export const statusTitles = ['Not in a team', 'Matching', 'Matched', ''];
export const lockClasses = ['success', 'danger'];
export const lockTitles = ['Unlocked', 'Locked'];
export const privateClasses = ['success', 'danger'];
export const privateTitles = ['Public', 'Private'];

export const defaultSorted = [{ dataField: 'id', order: 'asc' }];
export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
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
        <i class="fas fa-pencil-alt mx-2"></i>
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
        <i class="fas fa-trash mx-2"></i>
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
        <Link className="text-dark font-weight-bold" to={'/semester/' + row.id}>
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
  {
    dataField: 'action',
    text: 'Actions',
    formatter: ActionsColumnFormatter,
    formatExtraData: {
      openEditCustomerDialog: () => {},
      openDeleteCustomerDialog: () => {},
    },
    classes: 'text-right pr-0',
    headerClasses: 'text-right pr-3',
    style: {
      minWidth: '100px',
    },
  },
];

export default function CustomersCard() {
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortField, setSortField] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState(null);
  const [
    showRemoveStudentTeamConfirmModalFlg,
    setShowRemoveStudentTeamConfirmModalFlg,
  ] = React.useState(false);
  const [
    showCreateStudentTeamModalFlg,
    setShowCreateStudentTeamModalFlg,
  ] = React.useState(false);

  const { id } = useParams();
  const setMeta = useSetRecoilState(metaAtom);

  const handleShowRemoveStudentTeamModal = () => {
    setShowRemoveStudentTeamConfirmModalFlg(true);
  };

  const handleHideRemoveStudentTeamModal = () => {
    setShowRemoveStudentTeamConfirmModalFlg(false);
  };

  const handleShowCreateStudentTeamModal = () => {
    setShowCreateStudentTeamModalFlg(true);
  };

  const handleHideCreateStudentTeamModal = () => {
    setShowCreateStudentTeamModalFlg(false);
  };

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Teams of Fall 2020',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'Fall 2020', path: '/semester/' + id },
        { title: 'Team', path: '/semester/' + id + '/team' },
      ],
    }));
  }, [setMeta, id]);

  React.useEffect(() => {
    setData(mockData);
    setTotal(100);
  }, []);

  return (
    <Card>
      <CardHeader title="All teams">
        <CardHeaderToolbar className="text-nowrap">
          <button
            type="button"
            className="btn btn-danger font-weight-bold"
            disabled={Array.isArray(selected) && selected.length === 0}
            onClick={handleShowRemoveStudentTeamModal}
          >
            <i class="fas fa-trash mr-2"></i>
            Remove ({(Array.isArray(selected) && selected.length) || 0})
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary font-weight-bold"
            onClick={handleShowCreateStudentTeamModal}
          >
            <i class="fas fa-plus mr-2"></i>
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
          defaultSorted={defaultSorted}
          pageSizeList={sizePerPageList}
          selectable
        />
      </CardBody>
      <ConfirmRemoveModal
        title="Confirm on remove"
        body={<h5>Are you sure you want to remove selected student teams?</h5>}
        isShowFlg={showRemoveStudentTeamConfirmModalFlg}
        onHide={handleHideRemoveStudentTeamModal}
        onConfirm={() => {}}
      />
      <CreateTeamStudentModal
        isShowFlg={showCreateStudentTeamModalFlg}
        onHide={handleHideCreateStudentTeamModal}
        onCreate={() => {}}
      />
    </Card>
  );
}
