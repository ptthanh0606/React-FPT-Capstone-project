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
import CreateCouncilModal from 'components/CreateCouncilModal/CreateCouncilModal';

export const statusClasses = ['danger', 'success', 'info', ''];
export const statusTitles = ['Finished', 'In progress', 'Preparing', ''];
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
    department: 'SE',
    leader: ['Duy Duc Huynh'],
    members: ['Huynh Duc Duy', 'Phan Thong Thanh'],
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

// function StatusColumnFormatter(cellContent, row) {
//   const getLabelCssClasses = () => {
//     return `label label-lg label-light-${
//       statusClasses[row.status]
//     } label-inline text-nowrap`;
//   };
//   return (
//     <span className={getLabelCssClasses()}>{statusTitles[row.status]}</span>
//   );
// }

const columns = [
  {
    dataField: 'department',
    text: 'DEP',
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
    showRemoveCouncilsConfirmModalFlg,
    setShowRemoveCouncilsConfirmModalFlg,
  ] = React.useState(false);
  const [
    showCreateCouncilsModalFlg,
    setShowCreateCouncilsModalFlg,
  ] = React.useState(false);

  const { id } = useParams();
  const setMeta = useSetRecoilState(metaAtom);

  const handleShowRemoveCouncilsModal = () => {
    setShowRemoveCouncilsConfirmModalFlg(true);
  };

  const handleHideRemoveCouncilsModal = () => {
    setShowRemoveCouncilsConfirmModalFlg(false);
  };

  const handleShowCreateCouncilsModal = () => {
    setShowCreateCouncilsModalFlg(true);
  };

  const handleHideCreateCouncilsModal = () => {
    setShowCreateCouncilsModalFlg(false);
  };

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Councils of Fall 2020',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'Fall 2020', path: '/semester/' + id },
        { title: 'Council', path: '/semester/' + id + '/council' },
      ],
    }));
  }, [setMeta, id]);

  React.useEffect(() => {
    setData(mockData);
    setTotal(100);
  }, []);

  return (
    <Card>
      <CardHeader title="All councils">
        <CardHeaderToolbar className="text-nowrap">
          <button
            type="button"
            className="btn btn-danger font-weight-bold"
            disabled={Array.isArray(selected) && selected.length === 0}
            onClick={handleShowRemoveCouncilsModal}
          >
            <i className="fas fa-trash mr-2"></i>
            Remove ({(Array.isArray(selected) && selected.length) || 0})
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary font-weight-bold"
            onClick={handleShowCreateCouncilsModal}
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
          defaultSorted={defaultSorted}
          pageSizeList={sizePerPageList}
          selectable
        />
      </CardBody>
      <ConfirmRemoveModal
        title="Confirm on remove"
        body={<h5>Are you sure you want to remove selected councils?</h5>}
        isShowFlg={showRemoveCouncilsConfirmModalFlg}
        onHide={handleHideRemoveCouncilsModal}
        onConfirm={() => {}}
      />
      <CreateCouncilModal
        isShowFlg={showCreateCouncilsModalFlg}
        onHide={handleHideCreateCouncilsModal}
        onCreate={() => {}}
      />
    </Card>
  );
}
