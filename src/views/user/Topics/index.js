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

function ActionsColumnFormatter(cellContent, row, rowIndex) {
  // const [isShowUpdateModalFlg, setShowUpdateModalFlg] = React.useState(false); deo dc du ma no

  const onHideUpdateModal = () => {};
  const openEditCustomerDialog = id => {};
  const openDeleteCustomerDialog = id => {};

  return (
    <>
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
          <i className="fas fa-crosshairs mx-2"></i>
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
          <i className="fas fa-thumbs-up mx-2"></i>
        </a>
      </span>
      <UpdateTopicModal onHide={onHideUpdateModal} />
    </>
  );
}

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

const columns = [
  {
    dataField: 'department',
    text: 'Dep',
    sort: true,
    sortCaret: sortCaret,
    formatter: function StatusColumnFormatter(cellContent, row) {
      return cellContent[1];
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
        <Link className="text-dark font-weight-bold" to={'/topic/' + row.id}>
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
  const [showedNewModal, setShowedNewModal] = React.useState(false);

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

  const showNewModal = React.useCallback(() => {
    setShowedNewModal(true);
  });

  const hideNewModal = React.useCallback(() => {
    setShowedNewModal(false);
  });

  return (
    <Card>
      <CardHeader title="All topics">
        <CardHeaderToolbar className="text-nowrap">
          <button
            type="button"
            className="btn btn-primary font-weight-bold"
            onClick={showNewModal}
          >
            <i className="fas fa-paper-plane mr-2"></i>
            Submit
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
        />
      </CardBody>
      <CreateTopicModal onHide={hideNewModal} isShowFlg={showedNewModal} />
    </Card>
  );
}
