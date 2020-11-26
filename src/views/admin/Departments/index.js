import React from 'react';
import { Card, CardBody } from '_metronic/_partials/controls';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';
import Table from 'components/Table';
import Filters from './Filters';
import { Link } from 'react-router-dom';

import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import useConfirm from 'utils/confirm';
import toast from 'utils/toast';
import CMSModal from 'components/CMSModal/CMSModal';

import request from 'utils/request';
import * as endpoints from 'endpoints';

import * as transformer from './transformer';
import * as constants from './constants';

export default function Departments() {
  const confirm = useConfirm();
  const setMeta = useSetRecoilState(metaAtom);

  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortField, setSortField] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState(null);
  const [fieldTemplate, setFieldTemplate] = React.useState({});
  const [updateFieldTemplate, setUpdateFieldTemplate] = React.useState({});
  const [modalConfigs, setModalConfigs] = React.useState([]);
  const [showCreate, setShowCreate] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);

  // ---------------------------------------------------------------------------

  const loadData = React.useCallback(() => {
    setIsLoading(true);
    request({
      to: endpoints.LIST_DEPARTMENT.url,
      method: endpoints.LIST_DEPARTMENT.method,
    })
      .then(res => {
        setData(res.data.data.map(transformer.down));
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleShowCreateDepartmentModal = React.useCallback(() => {
    setShowCreate(true);
  }, [setShowCreate]);

  const handleHideCreateDepartmentModal = React.useCallback(() => {
    setShowCreate(false);
  }, [setShowCreate]);

  const handleShowUpdateDepartmentModal = React.useCallback(() => {
    setUpdateFieldTemplate({
      name: 'Software Engineer',
      code: 'SE',
      isActive: true,
    });
    setShowUpdate(true);
  }, [setShowUpdate]);

  const handleHideUpdateDepartmentModal = React.useCallback(() => {
    setShowUpdate(false);
  }, [setShowUpdate]);

  const handleOnCreateDepartment = React.useCallback(fieldData => {
    console.log(fieldData);
  }, []);

  const handleOnUpdateDepartment = React.useCallback(fieldData => {
    console.log(fieldData);
  }, []);

  const handleRemove = React.useCallback(
    e => {
      e.preventDefault();
      const id = e.currentTarget.getAttribute('data-id');
      confirm({
        title: 'Removal Confirmation',
        body: (
          <>
            Do you wanna remove this department?
            <br />
            The status of this department will be changed to "Deactivated" and
            can not be use for future semester'
          </>
        ),
      }).then(() => {
        request({
          to: endpoints.DELETE_DEPARTMENT(id).url,
          method: endpoints.DELETE_DEPARTMENT(id).method,
        })
          .then(res => {
            loadData();
            toast.success('Successfully remove department');
          })
          .catch(err => {
            console.log(err);
            toast.error('Cannot remove this department');
          });
      });
    },
    [confirm, loadData]
  );

  const handleEdit = React.useCallback(
    e => {
      e.preventDefault();
      const id = e.currentTarget.getAttribute('data-id');
      handleShowUpdateDepartmentModal();
    },
    [handleShowUpdateDepartmentModal]
  );

  const columns = React.useMemo(
    () => [
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
        formatter: function (cellContent, row) {
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
        formatter: (cellContent, row) => {
          const getLabelCssClasses = () => {
            return `label label-lg label-light-${
              constants.statusClasses[row.status]
            } label-inline text-nowrap`;
          };
          return (
            <span className={getLabelCssClasses()}>
              {constants.statusTitles[row.status]}
            </span>
          );
        },
        headerSortingClasses,
      },
      {
        dataField: 'approvers',
        text: 'Approvers',
        formatter: function (cellContent, row) {
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
        formatter: (cellContent, row, rowIndex) => {
          return (
            <span className="text-nowrap">
              <a
                href="/"
                title="Edit"
                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                data-id={row.id}
                onClick={handleEdit}
              >
                <i class="fas fa-pencil-alt mx-2"></i>
              </a>
              <a
                href="/"
                title="Disable"
                className="btn btn-icon btn-light btn-hover-primary btn-sm"
                data-id={row.id}
                onClick={handleRemove}
              >
                <i class="fas fa-ban mx-2"></i>
              </a>
            </span>
          );
        },
        classes: 'text-right pr-0',
        headerClasses: 'text-right pr-3',
        style: {
          minWidth: '100px',
        },
      },
    ],
    [handleEdit, handleRemove]
  );

  React.useEffect(() => {
    setMeta({
      title: 'All departments',
      breadcrumb: [
        { title: 'Department', path: '/department' },
        { title: 'All departments', path: '/department/all' },
      ],
      toolbar: (
        <button
          type="button"
          className="btn btn-primary font-weight-bold btn-sm"
          onClick={handleShowCreateDepartmentModal}
        >
          <i className="fas fa-plus mr-2"></i>
          New
        </button>
      ),
    });
  }, [handleShowCreateDepartmentModal, setMeta]);

  React.useEffect(() => {
    loadData();
    setTotal(100);
  }, [loadData]);

  React.useEffect(() => {
    setModalConfigs([
      {
        name: 'name',
        type: 'text',
        label: 'Team name',
        placeholder: 'Give this department a name...',
      },
      {
        name: 'code',
        type: 'text',
        label: 'Department code',
        smallLabel: 'Ex: Software Engineer to be "SE"',
      },
      {
        name: 'isActive',
        type: 'toggle',
        label: 'Active state',
        smallLabel: 'Is this department active',
      },
    ]);
    setFieldTemplate({
      name: '',
      code: '',
      isActive: false,
    });
  }, []);

  React.useEffect(() => {
    console.log('confirm changed');
  }, [confirm]);

  return (
    <Card>
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
          defaultSorted={constants.defaultSorted}
          pageSizeList={constants.sizePerPageList}
        />
      </CardBody>
      <CMSModal
        isShowFlg={showCreate}
        onHide={handleHideCreateDepartmentModal}
        configs={modalConfigs}
        title="Create department"
        subTitle="Add new department to this system"
        onConfirmForm={handleOnCreateDepartment}
        fieldTemplate={fieldTemplate}
      />
      <CMSModal
        isShowFlg={showUpdate}
        onHide={handleHideUpdateDepartmentModal}
        configs={modalConfigs}
        title="Update this department"
        subTitle="Change this department info"
        onConfirmForm={handleOnUpdateDepartment}
        fieldTemplate={updateFieldTemplate}
      />
    </Card>
  );
}
