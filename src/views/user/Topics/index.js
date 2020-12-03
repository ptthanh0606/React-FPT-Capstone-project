import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';
import metaAtom from 'store/meta';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from './Filters';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import CMSModal from 'components/CMSModal/CMSModal';
import { role } from 'auth/recoil/selectors';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';

export const statusClasses = ['danger', 'success', 'info', ''];
export const statusTitles = ['Finished', 'In progress', 'Preparing', ''];
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

export default function Topics() {
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortField, setSortField] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState(null);
  const [modalConfigs, setModalConfigs] = React.useState([]);
  const [fieldTemplate, setFieldTemplate] = React.useState({});
  const [updateFieldTemplate, setUpdateFieldTemplate] = React.useState({});
  const [showedNewTopicModal, setShowedNewTopicModal] = React.useState(false);
  const [showedUpdateTopicModal, setShowedUpdateTopicModal] = React.useState(
    false
  );
  const [selectedId, setSelectedId] = React.useState();
  const currentRole = useRecoilValue(role);
  const [mineTopicFlg, setMineTopicFlg] = React.useState(true);

  const { id } = useParams();
  const setMeta = useSetRecoilState(metaAtom);

  // ------------------------------------------------------------------

  const handleToggleChange = e => {
    setMineTopicFlg(e.currentTarget.checked);
    console.log(e.currentTarget.checked);
  };

  const showNewTopicModal = React.useCallback(() => {
    setShowedNewTopicModal(true);
  }, []);

  const hideNewTopicModal = React.useCallback(() => {
    setShowedNewTopicModal(false);
  }, []);

  const showUpdateTopicModal = React.useCallback(() => {
    setUpdateFieldTemplate({
      topicCode: 'FA20SE13',
      name: 'Capstone Management System for FPT University',
      description: 'Lorem ipsum dolor description',
      note: 'Lorem ipsum note dolor note',
      maxMem: 4,
      minMem: 0,
      department: 'se',
      isByStudent: false,
      mentorGroup: [
        {
          label: 'Huynh Duc Duy',
          value: 'Huynh Duc Duy',
        },
        {
          label: 'Tran Tuan Anh',
          value: 'Tran Tuan Anh',
        },
      ],
      studentTeam: [
        {
          label: 'Phan Thong Thanh',
          value: 'Phan Thong Thanh',
        },
        {
          label: 'Tran Thai Trung',
          value: 'Tran Thai Trung',
        },
      ],
      keywords: [
        {
          label: 'capstone',
          value: 'capstone',
        },
        {
          label: 'management',
          value: 'management',
        },
        {
          label: 'system',
          value: 'system',
        },
      ],
      attachment: {},
    });
    setShowedUpdateTopicModal(true);
  }, []);

  const hideUpdateTopicModal = React.useCallback(() => {
    setShowedUpdateTopicModal(false);
  }, []);

  const handleOnCreateTopic = React.useCallback(fieldData => {
    console.log(fieldData);
  }, []);

  const handleOnUpdateTopic = React.useCallback(fieldData => {
    console.log(fieldData);
  }, []);

  const toolBar = React.useCallback(() => {
    let buttons = <></>;
    switch (currentRole) {
      case 'student':
        buttons = <></>;
        break;

      case 'lecturer':
        buttons = (
          <>
            <button
              type="button"
              className="btn btn-primary font-weight-bold"
              onClick={showNewTopicModal}
            >
              <i className="fas fa-paper-plane mr-2"></i>
              Submit
            </button>
          </>
        );
        break;

      default:
        break;
    }
    return buttons;
  }, [currentRole, showNewTopicModal]);

  // ------------------------------------------------------------------

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Topics of Fall 2020',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'Fall 2020', path: '/semester/' + id },
        { title: 'Topic', path: '/semester/' + id + '/topic' },
      ],
      toolbar: toolBar(),
    }));
  }, [setMeta, id, toolBar]);

  React.useEffect(() => {
    setData(mockData);
    setTotal(100);
  }, []);

  React.useEffect(() => {
    setModalConfigs([
      {
        name: 'topicCode',
        type: 'text',
        label: 'Topic Code',
        smallLabel: 'Specify a code for this topic',
        placeholder: 'Code...',
      },
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        smallLabel: 'Give this topic a name',
        placeholder: 'Name...',
      },
      {
        name: 'description',
        type: 'text',
        label: 'Description',
        smallLabel: 'Brief description for this topic',
        placeholder: 'Description...',
      },
      {
        name: 'note',
        type: 'text',
        label: 'Note',
        smallLabel: 'Special note for this topic',
        placeholder: 'Note...',
      },
      {
        name: 'minMem',
        type: 'number',
        label: 'Minimum team members',
        smallLabel: 'Minimum team member for this topic',
        placeholder: '0',
      },
      {
        name: 'maxMem',
        type: 'number',
        label: 'Maximum team members',
        smallLabel: 'Maximum team member for this topic',
        placeholder: '4',
      },
      {
        name: 'department',
        type: 'selectBox',
        label: 'From department',
        smallLabel: 'Topic in which department',
        placeholder: 'Select a department',
        options: [
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
        ],
      },
      {
        name: 'isByStudent',
        type: 'toggle',
        label: 'By student',
        smallLabel: 'Is this topic from student',
        isChecked: false,
      },
      {
        name: 'studentTeam',
        type: 'selectBoxAsync',
        label: 'Student team',
        smallLabel: 'Student team taking this topic',
        load: (mentorInput, callback) => {
          setTimeout(() => {
            callback([
              {
                label: 'Phan Thong Thanh',
                value: 'Phan Thong Thanh',
              },
              {
                label: 'Tran Thai Trung',
                value: 'Tran Thai Trung',
              },
              {
                label: 'Nguyen Hoang Dung',
                value: 'Nguyen Hoang Dung',
              },
              {
                label: 'Le Huu Mon',
                value: 'Le Huu Mon',
              },
            ]);
          }, 2000);
        },
        isMulti: true,
      },
      {
        name: 'mentorGroup',
        type: 'selectBoxAsync',
        label: 'Mentor Group',
        smallLabel: 'Mentor group for this topic',
        load: (mentorInput, callback) => {
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
      {
        name: 'keywords',
        type: 'creatableSelectBoxAsync',
        label: 'Keywords',
        smallLabel: 'Some keywords for this topic',
        load: (keyword, callback) => {
          setTimeout(() => {
            callback([
              {
                label: 'capstone',
                value: 'capstone',
              },
              {
                label: 'management',
                value: 'management',
              },
              {
                label: 'system',
                value: 'system',
              },
            ]);
          }, 2000);
        },
      },
      {
        name: 'attachment',
        type: 'file',
        label: 'Attachment',
        smallLabel: '.pdf, .docx',
      },
    ]);
    setFieldTemplate({
      topicCode: '',
      name: '',
      description: '',
      note: '',
      maxMem: '',
      minMem: '',
      department: 'gd',
      isByStudent: true,
      mentorGroup: [],
      keywords: [],
      attachment: {},
    });
  }, []);

  function ActionsColumnFormatter(cellContent, row, rowIndex) {
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
              showUpdateTopicModal();
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
            }}
          >
            <i className="far fa-trash-alt mx-2"></i>
          </a>
        </span>
      </>
    );
  }

  function ApprovalColumnFormatter(cellContent, row, rowIndex) {
    return (
      <>
        <span className="text-nowrap">
          <a
            href="/"
            title="Approve selected topic"
            className="btn btn-icon btn-light btn-hover-success btn-sm mx-3"
            onClick={event => {
              event.preventDefault();
              setSelectedId(row.id);
              showUpdateTopicModal();
            }}
          >
            <i className="fas far fa-check-circle mx-2"></i>
          </a>
          <a
            href="/"
            title="Reject selected topic"
            className="btn btn-icon btn-light btn-hover-danger btn-sm"
            onClick={event => {
              event.preventDefault();
              setSelectedId(row.id);
            }}
          >
            <i className="fas far fa-times-circle mx-2"></i>
          </a>
        </span>
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
    // {
    //   dataField: 'approval',
    //   text: 'Approvals',
    //   formatter: ApprovalColumnFormatter,
    //   formatExtraData: {},
    //   classes: 'text-right pr-0',
    //   headerClasses: 'text-right pr-3',
    //   style: {
    //     minWidth: '100px',
    //   },
    // },
  ];

  return (
    <Card>
      <CardHeader title="All topics">
        <CardHeaderToolbar className="text-nowrap">
          <span className="mr-2">Show mine only</span>
          <ToggleSwitch
            onChange={handleToggleChange}
            isActive={mineTopicFlg}
            className={'switch-primary'}
          />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Filters filters={filters} setFilters={setFilters} />
        {mineTopicFlg ? (
          <Table
            key="1"
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
            selectable={currentRole === 'lecturer'}
          />
        ) : (
          <Table
            key="2"
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
        )}
      </CardBody>
      <CMSModal
        isShowFlg={showedNewTopicModal}
        onHide={hideNewTopicModal}
        configs={modalConfigs}
        title="Create new topic"
        subTitle="Submit new topic to this capstone semester"
        onConfirmForm={handleOnCreateTopic}
        fieldTemplate={fieldTemplate}
      />
      <CMSModal
        isShowFlg={showedUpdateTopicModal}
        onHide={hideUpdateTopicModal}
        configs={modalConfigs}
        title="Update topic"
        subTitle="Change this topic info"
        onConfirmForm={handleOnUpdateTopic}
        fieldTemplate={updateFieldTemplate}
      />
    </Card>
  );
}
