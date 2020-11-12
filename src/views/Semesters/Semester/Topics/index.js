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
import * as uiHelpers from '../../uiHelpers';
import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '_metronic/_helpers';

const departments = [
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

function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { openEditCustomerDialog, openDeleteCustomerDialog }
) {
  return (
    <span className="text-nowrap">
      <a
        title="Edit"
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => openEditCustomerDialog(row.id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG src={toAbsoluteUrl('/media/svg/icons/General/Edit.svg')} />
        </span>
      </a>
      <a
        title="Delete"
        className="btn btn-icon btn-light btn-hover-primary btn-sm"
        onClick={() => openDeleteCustomerDialog(row.id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} />
        </span>
      </a>
    </span>
  );
}

const classes = ['warning', 'danger', 'success', 'primary', 'info'];
const titles = ['Pending', 'Rejected', 'Approved', 'Ready', 'Matched'];

function StatusColumnFormatter(cellContent, row) {
  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      classes[row.status]
    } label-inline text-nowrap`;
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
        <Link className="text-dark font-weight-bold" to={'/semester/' + row.id}>
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
          title="Download"
          className="btn btn-icon btn-light btn-hover-primary btn-sm"
          onClick={() => {}}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG src={toAbsoluteUrl('/media/svg/icons/Files/Download.svg')} />
          </span>
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

  const setMeta = useSetRecoilState(metaAtom);

  React.useEffect(() => {
    setMeta({
      toolbar: (
        <>
          <button
            type="button"
            className="btn btn-danger font-weight-bold btn-sm"
            // onClick={}
          >
            <span className="svg-icon svg-icon-md svg-icon-white mr-3">
              <SVG src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} />
            </span>
            Delete
          </button>
        </>
      ),
    });
  }, [setMeta]);

  React.useEffect(() => {
    setData(departments);
    setTotal(100);
  }, []);

  return (
    <Card>
      <CardHeader title="All topics">
        <CardHeaderToolbar className="text-nowrap">
          <button
            type="button"
            className="btn btn-danger font-weight-bold"
            disabled={Array.isArray(selected) && selected.length === 0}
            // onClick={}
          >
            <span className="svg-icon svg-icon-md svg-icon-white mr-3">
              <SVG src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} />
            </span>
            Delete selected
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary font-weight-bold"
            // onClick={}
          >
            <span className="svg-icon svg-icon-md svg-icon-white mr-3">
              <SVG
                src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
              />
            </span>
            New
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Filters filters={filters} setFilters={setFilters} />
        {/* {selected.length > 0 && <CustomersGrouping />} */}
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
          defaultSorted={uiHelpers.defaultSorted}
          pageSizeList={uiHelpers.sizePerPageList}
          selectable
        />
      </CardBody>
    </Card>
  );
}
