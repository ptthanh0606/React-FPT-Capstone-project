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
import CreateCheckpointModal from 'components/CreateCheckpointModal/CreateCheckpointModal';
import UpdateCheckpointModal from 'components/UpdateCheckpointModal/UpdateCheckpointModal';

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
    department: 'SE',
    name: 'Checkpoint 1',
    markCols: 2,
    dueDate: '11/11/1111',
    weight: '3/10',
  },
  {
    id: 1,
    department: 'SE',
    name: 'Checkpoint 2',
    markCols: 4,
    dueDate: '33/33/3333',
    weight: '4/10',
  },
  {
    id: 2,
    department: 'SE',
    name: 'Checkpoint 3',
    markCols: 5,
    dueDate: '22/22/2222',
    weight: '3/10',
  },
];

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
    showRemoveCheckpointConfirmModalFlg,
    setShowRemoveCheckpointConfirmModalFlg,
  ] = React.useState(false);
  const [
    showRemoveSelectedCheckpointModalFlg,
    setShowRemoveSelectedCheckpointModalFlg,
  ] = React.useState(false);
  const [
    showCreateCheckpointModalFlg,
    setShowCreateCheckpointModalFlg,
  ] = React.useState(false);
  const [
    showUpdateCheckpointModalFlg,
    setShowUpdateCheckpointModalFlg,
  ] = React.useState(false);

  const [selectedId, setSelectedId] = React.useState(0);

  const { id } = useParams();
  const setMeta = useSetRecoilState(metaAtom);

  // Remove all selected checkpoints handlers
  const handleShowRemoveCheckpointModal = React.useCallback(() => {
    setShowRemoveCheckpointConfirmModalFlg(true);
  }, []);

  const handleHideRemoveCheckpointModal = React.useCallback(() => {
    setShowRemoveCheckpointConfirmModalFlg(false);
  }, []);
  // --------------------------------------------

  // Remove selected checkpoint handlers
  const handleShowRemoveSelectedCheckpointModal = React.useCallback(() => {
    setShowRemoveSelectedCheckpointModalFlg(true);
  }, []);

  const handleHideSelectedCheckpointModal = React.useCallback(() => {
    setShowRemoveSelectedCheckpointModalFlg(false);
  }, []);
  // ---------------------------------------------

  // Create checkpoints handlers
  const handleShowCreateCheckpointModal = React.useCallback(() => {
    setShowCreateCheckpointModalFlg(true);
  }, []);

  const handleHideCreateCheckpointModal = React.useCallback(() => {
    setShowCreateCheckpointModalFlg(false);
  }, []);
  // --------------------------------------------

  // Update checkpoints handlers
  const handleShowUpdateCheckpointModal = React.useCallback(() => {
    setShowUpdateCheckpointModalFlg(true);
  }, []);

  const handleHideUpdateCheckpointModal = React.useCallback(() => {
    setShowUpdateCheckpointModalFlg(false);
  }, []);
  // ---------------------------------------------

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Checkpoints of Fall 2020',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'Fall 2020', path: '/semester/' + id },
        { title: 'Checkpoints', path: '/semester/' + id + '/checkpoint' },
      ],
    }));
  }, [id, setMeta]);

  React.useEffect(() => {
    setData(mockData);
    setTotal(100);
  }, []);

  const ActionsColumnFormatter = React.useCallback(
    (cellContent, row, rowIndex) => {
      return (
        <span className="text-nowrap">
          <a
            href="/"
            title="Edit"
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
            onClick={event => {
              event.preventDefault();
              handleShowUpdateCheckpointModal();
              setSelectedId(row.id);
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
              handleShowRemoveSelectedCheckpointModal();
              setSelectedId(row.id);
            }}
          >
            <i className="fas fa-trash mx-2"></i>
          </a>
        </span>
      );
    },
    [handleShowRemoveSelectedCheckpointModal, handleShowUpdateCheckpointModal]
  );

  const columns = React.useMemo(
    () => [
      {
        dataField: 'department',
        text: 'Dep',
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
            <Link
              className="text-dark font-weight-bold"
              to={'/semester/' + row.id}
            >
              {cellContent}
            </Link>
          );
        },
        headerSortingClasses,
      },
      {
        dataField: 'weight',
        text: 'Weight',
        sort: true,
        sortCaret: sortCaret,
        headerSortingClasses,
      },
      {
        dataField: 'dueDate',
        text: 'Due Date',
        sort: true,
        sortCaret: sortCaret,
        headerSortingClasses,
      },
      {
        dataField: 'markCols',
        text: 'Mark columns',
        sort: true,
        sortCaret: sortCaret,
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
    ],
    [ActionsColumnFormatter]
  );

  return (
    <Card>
      <CardHeader title="All checkpoints">
        <CardHeaderToolbar className="text-nowrap">
          <button
            type="button"
            className="btn btn-danger font-weight-bold"
            disabled={Array.isArray(selected) && selected.length === 0}
            onClick={handleShowRemoveCheckpointModal}
          >
            <i className="fas fa-trash mr-2"></i>
            Remove ({(Array.isArray(selected) && selected.length) || 0})
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary font-weight-bold"
            onClick={handleShowCreateCheckpointModal}
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
      {/* Remove all selected */}
      <ConfirmRemoveModal
        title="Confirm on remove"
        body={
          <h5>Are you sure you want to remove all selected checkpoints?</h5>
        }
        isShowFlg={showRemoveCheckpointConfirmModalFlg}
        onHide={handleHideRemoveCheckpointModal}
        onConfirm={() => {}}
      />
      {/* Remove selected checkpoints modal */}
      <ConfirmRemoveModal
        title="Confirm on remove"
        body={<h5>Are you sure you want to remove selected checkpoints?</h5>}
        isShowFlg={showRemoveSelectedCheckpointModalFlg}
        onHide={handleHideSelectedCheckpointModal}
        onConfirm={() => {}}
      />
      {/* Create checkpoint modal */}
      <CreateCheckpointModal
        isShowFlg={showCreateCheckpointModalFlg}
        onHide={handleHideCreateCheckpointModal}
      />
      {/* Update selected checkpoint modal */}
      <UpdateCheckpointModal
        isShowFlg={showUpdateCheckpointModalFlg}
        onHide={handleHideUpdateCheckpointModal}
        selectedId={selectedId}
      />
    </Card>
  );
}
