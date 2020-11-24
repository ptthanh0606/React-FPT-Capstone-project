import React from 'react';
import { Card, CardBody } from '_metronic/_partials/controls';
import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from 'views/admin/Semesters/SemesterFilters';
import { Link } from 'react-router-dom';
import ConfirmRemoveModal from 'components/ConfirmRemoveModal/ConfirmRemoveModal';
import CMSModal from 'components/CMSModal/CMSModal';

const semesters = [
  {
    id: 1,
    name: 'Spring 2021',
    status: 2,
  },
  {
    id: 2,
    name: 'Fall 2020',
    status: 1,
  },
  {
    id: 3,
    name: 'Summer 2020',
    status: 1,
  },
  {
    id: 3,
    name: 'Spring 2020',
    status: 0,
  },
  {
    id: 4,
    name: 'Fall 2019',
    status: 0,
  },
  {
    id: 5,
    name: 'Summer 2019',
    status: 0,
  },
  {
    id: 6,
    name: 'Spring 2019',
    status: 0,
  },
  {
    id: 7,
    name: 'Fall 2018',
    status: 0,
  },
  {
    id: 8,
    name: 'Summer 2018',
    status: 0,
  },
  {
    id: 9,
    name: 'Spring 2018',
    status: 0,
  },
];

export const statusClasses = ['info', 'primary', 'warning', 'danger'];
export const statusTitles = [
  'Preparing',
  'Matching',
  'In-progress',
  'Finished',
];
export const defaultSorted = [{ dataField: 'id', order: 'asc' }];
export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
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
  const [modalConfigs] = React.useState([
    {
      name: 'name',
      type: 'text',
      label: 'Semester name',
      placeholder: 'Semester name...',
    },
    {
      name: 'maxTopic',
      type: 'number',
      label: 'Maximum topic per mentor',
      smallLabel: 'Maximun number of topic that a lecturer can supervise',
      placeholder: '10',
    },
    {
      name: 'maxMentor',
      type: 'number',
      label: 'Maximum mentor per topic',
      smallLabel: 'Maximum number of lecturer to supervise a topic',
      placeholder: '10',
    },
    {
      name: 'maxApplications',
      type: 'number',
      label: 'Maximum applications per team',
      smallLabel:
        'Maximum number of application that a team can send at any-time',
      placeholder: '10',
    },
    {
      name: 'matchingDate',
      type: 'date',
      label: 'Matching',
      smallLabel:
        'Ending date of Matching-phase, all team must matched with a topic before this day',
    },
    {
      name: 'inprogressDate',
      type: 'date',
      label: 'In progress',
      smallLabel:
        'Ending date of In-progress-phase, all team must have done the capstone project and waiting for final evaluation',
    },
    {
      name: 'finishDate',
      type: 'date',
      label: 'Finished',
      smallLabel:
        'Ending date of Finished-phase (and semester as well), all evaluation is published.',
    },
  ]);
  const [fieldTemplate, setFieldTemplate] = React.useState({});
  const [updateFieldTemplate, setUpdateFieldTemplate] = React.useState({});
  const [
    showedConfirmRemoveSelectedSemesterModalFlg,
    setShowedConfirmRemoveSelectedSemesterModalFlg,
  ] = React.useState(false);
  const [
    isShowUpdateSemesterModal,
    setIsShowUpdateSemesterModal,
  ] = React.useState(false);
  const [
    isShowCreateSemesterModal,
    setIsShowCreateSemesterModal,
  ] = React.useState(false);

  const setMeta = useSetRecoilState(metaAtom);

  const handleShowRemoveSelectedSemester = React.useCallback(() => {
    setShowedConfirmRemoveSelectedSemesterModalFlg(true);
  }, []);

  const handleHideRemoveSelectedSemester = React.useCallback(() => {
    setShowedConfirmRemoveSelectedSemesterModalFlg(false);
  }, []);

  const handleShowCreateSelectedSemester = React.useCallback(() => {
    setIsShowCreateSemesterModal(true);
  }, []);

  const handleHideCreateSelectedSemester = React.useCallback(() => {
    setIsShowCreateSemesterModal(false);
  }, []);

  const handleShowUpdateSelectedSemester = React.useCallback(() => {
    const response = {
      name: 'Fall2020',
      maxTopic: 10,
      maxMentor: 20,
      maxApplications: 100,
      matchingDate: '2020-06-06',
      inprogressDate: '2020-06-06',
      finishDate: '2020-06-06',
    };
    setUpdateFieldTemplate(response);
    setIsShowUpdateSemesterModal(true);
  }, []);

  const handleHideUpdateSelectedSemester = React.useCallback(() => {
    setIsShowUpdateSemesterModal(false);
  }, []);

  const handleOnCreateSemester = React.useCallback(fieldData => {
    console.log(fieldData);
  }, []);

  const handleOnUpdateSemester = React.useCallback(fieldData => {
    console.log(fieldData);
  }, []);

  React.useEffect(() => {
    setMeta({
      title: 'All semesters',
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: 'All semesters', path: '/semester/all' },
      ],
      toolbar: (
        <button
          type="button"
          className="btn btn-primary font-weight-bold btn-sm"
          onClick={handleShowCreateSelectedSemester}
        >
          <i className="fas fa-plus mr-2"></i>
          New
        </button>
      ),
    });
  }, [handleShowCreateSelectedSemester, setMeta]);

  React.useEffect(() => {
    setData(semesters);
    setTotal(100);
  }, []);

  React.useEffect(() => {
    setFieldTemplate({
      name: '',
      maxTopic: 0,
      maxMentor: 0,
      maxApplications: 0,
      matchingDate: '2020-06-06',
      inprogressDate: '2020-06-06',
      finishDate: '2020-06-06',
    });
  }, []);

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
            handleShowUpdateSelectedSemester();
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
            handleShowRemoveSelectedSemester();
          }}
        >
          <i className="fas fa-trash mx-2"></i>
        </a>
      </span>
    );
  }

  function StatusColumnFormatter(cellContent, row) {
    const getLabelCssClasses = () => {
      return `label label-lg label-light-${
        statusClasses[row.status]
      } label-inline text-nowrap`;
    };
    return (
      <span className={getLabelCssClasses()}>{statusTitles[row.status]}</span>
    );
  }

  const columns = [
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
      dataField: 'status',
      text: 'Status',
      sort: true,
      sortCaret: sortCaret,
      formatter: StatusColumnFormatter,
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

  return (
    <Card style={{ marginTop: '1.5rem' }}>
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
      <ConfirmRemoveModal
        onHide={handleHideRemoveSelectedSemester}
        isShowFlg={showedConfirmRemoveSelectedSemesterModalFlg}
        body={<h5>Are you sure you want to remove selected semester?</h5>}
        onConfirm={() => {}}
      />
      <CMSModal
        isShowFlg={isShowUpdateSemesterModal}
        onHide={handleHideUpdateSelectedSemester}
        configs={modalConfigs}
        primaryButtonLabel="Confirm changes"
        title="Update this semester"
        subTitle="Change this semester info"
        onConfirmForm={handleOnUpdateSemester}
        fieldTemplate={updateFieldTemplate}
      />
      <CMSModal
        isShowFlg={isShowCreateSemesterModal}
        onHide={handleHideCreateSelectedSemester}
        configs={modalConfigs}
        primaryButtonLabel="Create"
        title="Create new semester"
        subTitle="Start a new capstone semester"
        onConfirmForm={handleOnCreateSemester}
        fieldTemplate={fieldTemplate}
      />
    </Card>
  );
}
