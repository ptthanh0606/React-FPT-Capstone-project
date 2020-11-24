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
import CMSModal from 'components/CMSModal/CMSModal';

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

export default function CustomersCard() {
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortField, setSortField] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState(null);
  const [fieldTemplate, setFieldTemplate] = React.useState({});
  const [updateFieldTemplate, setUpdateFieldTemplate] = React.useState({});
  const [modalConfigs, setModalConfigs] = React.useState([]);
  const [
    showRemoveAllSelectedCouncilsConfirmModalFlg,
    setShowRemoveAllSelectedCouncilsConfirmModalFlg,
  ] = React.useState(false);
  const [
    showRemoveSelectedCouncilsConfirmModalFlg,
    setShowRemoveSelectedCouncilsConfirmModalFlg,
  ] = React.useState(false);
  const [
    showCreateCouncilsModalFlg,
    setShowCreateCouncilsModalFlg,
  ] = React.useState(false);
  const [
    showUpdateCouncilsModalFlg,
    setShowUpdateCouncilsModalFlg,
  ] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState();

  const { id } = useParams();
  const setMeta = useSetRecoilState(metaAtom);

  const handleShowRemoveCouncilsModal = () => {
    setShowRemoveAllSelectedCouncilsConfirmModalFlg(true);
  };

  const handleHideRemoveCouncilsModal = () => {
    setShowRemoveAllSelectedCouncilsConfirmModalFlg(false);
  };

  const handleShowRemoveSelectedCouncilsModal = () => {
    setShowRemoveSelectedCouncilsConfirmModalFlg(true);
  };

  const handleHideRemoveSelectedCouncilsModal = () => {
    setShowRemoveSelectedCouncilsConfirmModalFlg(false);
  };

  const handleShowCreateCouncilsModal = () => {
    setShowCreateCouncilsModalFlg(true);
  };

  const handleHideCreateCouncilsModal = () => {
    setShowCreateCouncilsModalFlg(false);
  };

  const handleShowUpdateCouncilsModal = () => {
    setUpdateFieldTemplate({
      name: 'HKT',
      department: 'gd',
      councilMembers: [
        {
          label: 'Huynh Duc Duy',
          value: 'Huynh Duc Duy',
        },
        {
          label: 'Phan Thong Thanh',
          value: 'Phan Thong Thanh',
        },
      ],
    });
    setShowUpdateCouncilsModalFlg(true);
  };

  const handleHideUpdateCouncilsModal = () => {
    setShowUpdateCouncilsModalFlg(false);
  };

  const handleOnCreateCouncil = React.useCallback(fieldData => {
    console.log(fieldData);
  }, []);

  const handleOnUpdateCouncil = React.useCallback(fieldData => {
    console.log(fieldData);
  }, []);

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

  React.useEffect(() => {
    const response = [
      {
        label: 'SE',
        value: 'se',
      },
      {
        label: 'GD',
        value: 'gd',
      },
      {
        label: 'CC',
        value: 'cc',
      },
    ];
    setModalConfigs([
      {
        name: 'name',
        type: 'text',
        label: 'Council name',
        placeholder: 'Give this council a name...',
      },
      {
        name: 'department',
        type: 'selectBox',
        label: 'Department',
        smallLabel: 'This council belong to which department',
        options: response,
      },
      {
        name: 'councilMembers',
        type: 'selectBoxAsync',
        label: 'Council members',
        smallLabel: 'Member in this council',
        load: (memberInput, callback) => {
          setTimeout(() => {
            callback([
              {
                label: 'Huynh Duc Duy',
                value: 'Huynh Duc Duy',
              },
              {
                label: 'Tran Tuan Anh',
                value: 'Tran Tuan Anh',
              },
              {
                label: 'Dinh Ngoc Hai',
                value: 'Dinh Ngoc Hai',
              },
              {
                label: 'Ly Phuoc Hiep',
                value: 'Ly Phuoc Hiep',
              },
            ]);
          }, 2000);
        },
        isMulti: true,
      },
    ]);
    setFieldTemplate({
      name: '',
      department: '',
      councilMembers: [],
    });
  }, []);

  function ActionsColumnFormatter(cellContent, row, rowIndex) {
    return (
      <span className="text-nowrap">
        <a
          href="/"
          title="Edit"
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          onClick={event => {
            event.preventDefault();
            setSelectedId(row.id);
            handleShowUpdateCouncilsModal();
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
            setSelectedId(row.id);
            handleShowRemoveSelectedCouncilsModal();
          }}
        >
          <i class="fas fa-trash mx-2"></i>
        </a>
      </span>
    );
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
          <Link
            className="text-dark font-weight-bold"
            to={'/semester/' + row.id}
          >
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
        body={<h5>Are you sure you want to remove all selected councils?</h5>}
        isShowFlg={showRemoveAllSelectedCouncilsConfirmModalFlg}
        onHide={handleHideRemoveCouncilsModal}
        onConfirm={() => {}}
      />
      <ConfirmRemoveModal
        title="Confirm on remove"
        body={<h5>Are you sure you want to remove selected councils?</h5>}
        isShowFlg={showRemoveSelectedCouncilsConfirmModalFlg}
        onHide={handleHideRemoveSelectedCouncilsModal}
        onConfirm={() => {}}
      />
      <CMSModal
        isShowFlg={showCreateCouncilsModalFlg}
        onHide={handleHideCreateCouncilsModal}
        configs={modalConfigs}
        title="Create council"
        subTitle="Assign council to this semester"
        onConfirmForm={handleOnCreateCouncil}
        fieldTemplate={fieldTemplate}
      />
      <CMSModal
        isShowFlg={showUpdateCouncilsModalFlg}
        onHide={handleHideUpdateCouncilsModal}
        configs={modalConfigs}
        title="Update council"
        subTitle="Change this council info"
        onConfirmForm={handleOnUpdateCouncil}
        fieldTemplate={updateFieldTemplate}
      />
    </Card>
  );
}
