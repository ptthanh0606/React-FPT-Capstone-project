import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';
import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from './Filters';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import CreateTopicModal from 'components/CreateTopicModal/CreateTopicModal';
import ConfirmRemoveModal from 'components/ConfirmRemoveModal/ConfirmRemoveModal';
import UpdateTopicModal from 'components/UpdateTopicModal/UpdateTopicModal';

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
    code: 'FA20SE30',
    name: 'Capstone Management System for FPT University',
    description:
      'Hệ thống quản lý các đồ án của sinh viên ở trường đại học FPT.',
    status: 0,
    owner: [1, 'Huynh Duc Duy'],
    mentors: [
      [1, 'Huynh Duc Duy'],
      [2, 'Tran Tuan Anh'],
    ],
    members: [
      [3, 'Phan Thong Thanh'],
      [4, 'Tran Thai Trung'],
    ],
    semester_id: 1,
    department: [0, 'SE'],
    attachment: 'xxx',
  },
  {
    id: 1,
    code: 'FA20SE30',
    name: 'Capstone Management System for FPT University',
    description:
      'Hệ thống quản lý các đồ án của sinh viên ở trường đại học FPT.',
    status: 1,
    owner: [1, 'Huynh Duc Duy'],
    mentors: [
      [1, 'Huynh Duc Duy'],
      [2, 'Tran Tuan Anh'],
    ],
    members: [
      [3, 'Phan Thong Thanh'],
      [4, 'Tran Thai Trung'],
    ],
    semester_id: 1,
    department: [0, 'SE'],
    attachment: 'xxx',
  },
  {
    id: 2,
    code: 'FA20SE30',
    name: 'Capstone Management System for FPT University',
    description:
      'Hệ thống quản lý các đồ án của sinh viên ở trường đại học FPT.',
    status: 2,
    owner: [1, 'Huynh Duc Duy'],
    mentors: [
      [1, 'Huynh Duc Duy'],
      [2, 'Tran Tuan Anh'],
    ],
    members: [
      [3, 'Phan Thong Thanh'],
      [4, 'Tran Thai Trung'],
    ],
    semester_id: 1,
    department: [0, 'SE'],
    attachment: 'xxx',
  },
  {
    id: 3,
    code: 'FA20SE30',
    name: 'Capstone Management System for FPT University',
    description:
      'Hệ thống quản lý các đồ án của sinh viên ở trường đại học FPT.',
    status: 3,
    owner: [1, 'Huynh Duc Duy'],
    mentors: [
      [1, 'Huynh Duc Duy'],
      [2, 'Tran Tuan Anh'],
    ],
    members: [
      [3, 'Phan Thong Thanh'],
      [4, 'Tran Thai Trung'],
    ],
    semester_id: 1,
    department: [0, 'SE'],
    attachment: 'xxx',
  },
  {
    id: 4,
    code: 'FA20SE30',
    name: 'Capstone Management System for FPT University',
    description:
      'Hệ thống quản lý các đồ án của sinh viên ở trường đại học FPT.',
    status: 4,
    owner: [1, 'Huynh Duc Duy'],
    mentors: [
      [1, 'Huynh Duc Duy'],
      [2, 'Tran Tuan Anh'],
    ],
    members: [
      [3, 'Phan Thong Thanh'],
      [4, 'Tran Thai Trung'],
    ],
    semester_id: 1,
    department: [0, 'SE'],
    attachment: 'xxx',
  },
];

const classes = ['warning', 'danger', 'success', 'primary', 'info'];
const titles = ['Pending', 'Rejected', 'Approved', 'Ready', 'Matched'];

function StatusColumnFormatter(cellContent, row) {
  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      classes[row.status]
    } label-inline text-nowrap text-nowrap`;
  };
  return <span className={getLabelCssClasses()}>{titles[row.status]}</span>;
}

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
  const [showedNewModalFlg, setShowedNewModalFlg] = React.useState(false);
  const [showUpdateModalFlg, setShowUpdateModalFlg] = React.useState(false);
  const [
    showedConfirmRemoveAllSelectedTopicModalFlg,
    setShowConfirmRemoveAllSelectedTopicModalFlg,
  ] = React.useState(false);
  const [
    showedConfirmRemoveSelectedTopicModalFlg,
    setShowConfirmRemoveSelectedTopicModalFlg,
  ] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState('');

  const { id } = useParams();
  const setMeta = useSetRecoilState(metaAtom);

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Topics of Fall 2020',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'Fall 2020', path: '/semester/' + id },
        { title: 'Topic', path: '/semester/' + id + '/topic' },
      ],
    }));
  }, [setMeta, id]);

  React.useEffect(() => {
    setData(mockData);
    setTotal(100);
  }, []);

  const handleShowNewModal = React.useCallback(() => {
    setShowedNewModalFlg(true);
  }, []);

  const handleHideNewModal = React.useCallback(() => {
    setShowedNewModalFlg(false);
  }, []);

  const handleShowUpdateModal = React.useCallback(() => {
    setShowUpdateModalFlg(true);
  }, []);

  const handleHideUpdateModal = React.useCallback(() => {
    setShowUpdateModalFlg(false);
  }, []);

  const handleShowConfirmRemoveAllSelectedTopicModal = React.useCallback(() => {
    setShowConfirmRemoveAllSelectedTopicModalFlg(true);
  }, []);

  const handleHideConfirmRemoveAllSelectedTopicModal = React.useCallback(() => {
    setShowConfirmRemoveAllSelectedTopicModalFlg(false);
  }, []);

  const handleShowConfirmRemoveSelectedTopicModal = React.useCallback(() => {
    setShowConfirmRemoveSelectedTopicModalFlg(true);
  }, []);

  const handleHideConfirmRemoveSelectedTopicModal = React.useCallback(() => {
    setShowConfirmRemoveSelectedTopicModalFlg(false);
  }, []);

  const handleConfirmRemoveAllTopics = React.useCallback(() => {
    alert('Remove all selected!');
  }, []);

  const handleConfirmRemoveSelectedTopic = React.useCallback(() => {
    alert('Remove selected!');
  }, []);

  const ActionsColumnFormatter = React.useCallback(
    (cellContent, row, rowIndex) => {
      return (
        <>
          <span className="text-nowrap">
            <a
              href="/"
              title="Edit"
              className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
              onClick={event => {
                event.preventDefault();
                setSelectedId(row.id);
                handleShowUpdateModal();
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
                setSelectedId(row.id);
                handleShowConfirmRemoveSelectedTopicModal();
              }}
            >
              <i className="fas fa-trash mx-2"></i>
            </a>
          </span>
        </>
      );
    },
    [handleShowConfirmRemoveSelectedTopicModal, handleShowUpdateModal]
  );

  const columns = [
    {
      dataField: 'department',
      text: 'Dep',
      sort: true,
      sortCaret: sortCaret,
      formatter: function StatusColumnFormatter(cellContent, row) {
        return (
          <Link
            className="text-dark font-weight-bold"
            style={{ minWidth: '50px', display: 'block' }}
            to={'/semester/' + row.id + '/department/' + cellContent[0]}
          >
            {cellContent[1]}
          </Link>
        );
      },
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
      text: 'Information',
      sort: true,
      sortCaret: sortCaret,
      formatter: function StatusColumnFormatter(cellContent, row) {
        return (
          <Link
            className="text-dark font-weight-bold"
            to={'/semester/' + row.id}
          >
            <div>
              <div className="text-nowrap text-dark-75 font-weight-bolder font-size-lg mb-0">
                {row.name}
              </div>
              <span className="text-muted font-weight-bold text-hover-primary">
                {row.description}
              </span>
            </div>
          </Link>
        );
      },
      headerSortingClasses,
    },
    {
      dataField: 'attachment',
      text: 'Detail',
      formatter: function StatusColumnFormatter(cellContent, row) {
        return (
          <a
            href="null"
            title="Download"
            className="btn btn-icon btn-light btn-hover-primary btn-sm"
            onClick={event => {
              event.preventDefault();
            }}
          >
            <i className="fas fa-download my-2"></i>
          </a>
        );
      },
    },
    {
      dataField: 'owner',
      text: 'Owner',
      formatter: function StatusColumnFormatter(cellContent, row) {
        return (
          <Link
            className="text-dark font-weight-bold text-nowrap"
            to={'/semester/' + row.semester_id + '/user/' + cellContent[0]}
          >
            {cellContent[1]}
          </Link>
        );
      },
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      sortCaret: sortCaret,
      formatter: StatusColumnFormatter,
      headerSortingClasses,
    },
    {
      dataField: 'members',
      text: 'Members',
      formatter: function StatusColumnFormatter(cellContent, row) {
        return (
          <>
            {cellContent.map(i => (
              <>
                <Link
                  className="text-dark font-weight-bold text-nowrap"
                  to={'/semester/' + row.semester_id + '/user/' + i[0]}
                >
                  {i[1]}
                </Link>
                <br />
              </>
            ))}
          </>
        );
      },
    },
    {
      dataField: 'mentors',
      text: 'Mentors',
      formatter: function StatusColumnFormatter(cellContent, row) {
        return (
          <>
            {cellContent.map(i => (
              <>
                <Link
                  className="text-dark font-weight-bold text-nowrap"
                  to={'/semester/' + row.semester_id + '/user/' + i[0]}
                >
                  {i[1]}
                </Link>
                <br />
              </>
            ))}
          </>
        );
      },
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: ActionsColumnFormatter,
      formatExtraData: {},
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px',
      },
    },
  ];

  return (
    <Card>
      <CardHeader title="All topics">
        <CardHeaderToolbar className="text-nowrap">
          <button
            type="button"
            className="btn btn-danger font-weight-bold"
            disabled={Array.isArray(selected) && selected.length === 0}
            onClick={handleShowConfirmRemoveAllSelectedTopicModal}
          >
            <i className="fas fa-trash mr-2"></i>
            Remove ({(Array.isArray(selected) && selected.length) || 0})
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary font-weight-bold"
            onClick={handleShowNewModal}
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
          defaultSorted={defaultSorted}
          pageSizeList={sizePerPageList}
          selectable
        />
      </CardBody>
      <CreateTopicModal
        onHide={handleHideNewModal}
        isShowFlg={showedNewModalFlg}
      />
      <UpdateTopicModal
        onHide={handleHideUpdateModal}
        isShowFlg={showUpdateModalFlg}
        selectedId={selectedId}
      />
      <ConfirmRemoveModal
        onHide={handleHideConfirmRemoveAllSelectedTopicModal}
        isShowFlg={showedConfirmRemoveAllSelectedTopicModalFlg}
        body={<h5>Are you sure you want to remove all selected topics?</h5>}
        onConfirm={handleConfirmRemoveAllTopics}
      />
      <ConfirmRemoveModal
        onHide={handleHideConfirmRemoveSelectedTopicModal}
        isShowFlg={showedConfirmRemoveSelectedTopicModalFlg}
        body={<h5>Are you sure you want to remove selected topics?</h5>}
        onConfirm={handleConfirmRemoveSelectedTopic}
      />
    </Card>
  );
}
