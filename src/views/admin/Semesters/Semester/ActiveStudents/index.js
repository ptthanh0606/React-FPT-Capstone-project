import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';
import Table from 'components/Table';
import Filters from './Filters';
import { useParams } from 'react-router-dom';

import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import useConfirm from 'utils/confirm';

import toast from 'utils/toast';
import { useDebounce } from 'use-debounce';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';

import * as transformers from 'modules/semester/activeStudent/transformers';
import * as constants from 'modules/semester/activeStudent/constants';
import AddActiveStudentModal from './AddActiveStudentModal';

export const statusClasses = ['danger', 'info', 'success', ''];
export const statusTitles = ['Not in a team', 'Matching', 'Matched', ''];

export default function ActiveStudents({ semester }) {
  const confirm = useConfirm();
  const setMeta = useSetRecoilState(metaAtom);
  const { id: semId } = useParams();

  const [l, loadData] = React.useReducer(() => ({}), {});

  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  const [debouncedFilters] = useDebounce(filters, 500);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(
    constants.sizePerPageList[0].value
  );
  const [sortField, setSortField] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState(null);

  //----------------------------------------------------------------------------

  const [showCreate, setShowCreate] = React.useState(false);

  // ---------------------------------------------------------------------------

  const showCreateModal = React.useCallback(() => {
    setShowCreate(true);
  }, []);

  const hideCreateModal = React.useCallback(() => {
    setShowCreate(false);
  }, []);

  const handleCreate = React.useCallback(
    fieldData => {
      return request({
        to: endpoints.CREATE_ACTIVE_STUDENTS(semId).url,
        method: endpoints.CREATE_ACTIVE_STUDENTS(semId).method,
        data: transformers.cUp(fieldData),
      })
        .then(res => {
          toast.success('Add active students successfully');
          setShowCreate(false);
          loadData();
        })
        .catch(handleErrors);
    },
    [semId]
  );

  const handleRemove = React.useCallback(
    e => {
      e.preventDefault();
      const id = Number(e.currentTarget.getAttribute('data-id'));
      if (!Number.isInteger(id)) {
        toast.error('Internal Server Error');
        return;
      }
      confirm({
        title: 'Removal Confirmation',
        body: (
          <>
            Do you wanna remove this student?
            <br />
            This student will be <b>permanently removed from this semester</b>.
          </>
        ),
        onConfirm: () =>
          request({
            to: endpoints.DELETE_ACTIVE_STUDENTS(semId).url,
            method: endpoints.DELETE_ACTIVE_STUDENTS(semId).method,
            data: {
              studentIDs: [id],
            },
          })
            .then(res => {
              loadData();
              toast.success('Successfully remove active student');
            })
            .catch(handleErrors),
      });
    },
    [confirm, semId]
  );

  // const handleRemoveAllSelected = React.useCallback(
  //   e => {
  //     e.preventDefault();
  //     const id = Number(e.currentTarget.getAttribute('data-id'));
  //     if (!Number.isInteger(id)) {
  //       toast.error('Internal Server Error');
  //       return;
  //     }
  //     confirm({
  //       title: 'Removal Confirmation',
  //       body: (
  //         <>
  //           Do you wanna remove all selected students?
  //           <br />
  //           All students will be <b>permanently removed from this semester</b>.
  //         </>
  //       ),
  //       onConfirm: () =>
  //         request({
  //           to: endpoints.DELETE_ACTIVE_STUDENTS(semId).url,
  //           method: endpoints.DELETE_ACTIVE_STUDENTS(semId).method,
  //           data: {
  //             studentIDs: selected,
  //           },
  //         })
  //           .then(res => {
  //             loadData();
  //             toast.success('Successfully remove active student');
  //           })
  //           .catch(handleErrors),
  //     });
  //   },
  //   [confirm, selected, semId]
  // );

  // ---------------------------------------------------------------------------

  const columns = React.useMemo(
    () => constants.createColumns({ handleRemove }),
    [handleRemove]
  );

  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    setIsLoading(true);
    const source = {};
    request({
      to: endpoints.LIST_ACTIVE_STUDENTS(semId).url,
      method: endpoints.LIST_ACTIVE_STUDENTS(semId).method,
      params: {
        ...debouncedFilters,
        pageNumber: page,
        pageSize: pageSize,
        sortField: sortField,
        sortOrder: sortOrder,
      },
      source,
    })
      .then(res => {
        setData(res.data?.data?.map(transformers.down));
        setTotal(res.data?.totalRecords);
        setPage(res.data?.pageNumber);
        setPageSize(res.data?.pageSize);
        setIsLoading(false);
      })
      .catch(err => {
        handleErrors(err);
        if (!err.isCancel) setIsLoading(false);
      });

    return () => {
      source.cancel();
    };
  }, [l, debouncedFilters, page, pageSize, sortField, sortOrder, semId]);

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Active students of ' + semester.name,
      breadcrumb: [
        { title: 'Semester', path: '/semester' },
        { title: semester.name, path: '/semester/' + semId },
        {
          title: 'Active student',
          path: '/semester/' + semId + '/active-student',
        },
      ],
    }));
  }, [semId, semester.name, setMeta]);

  return (
    <Card>
      <CardHeader title="All active students">
        <CardHeaderToolbar className="text-nowrap">
          {/* <button
            type="button"
            className="btn btn-danger font-weight-bold"
            disabled={Array.isArray(selected) && selected.length === 0}
            onClick={handleRemoveAllSelected}
          >
            <i className="fas fa-trash mr-2"></i>
            Remove ({(Array.isArray(selected) && selected.length) || 0})
          </button>
          &nbsp; */}
          <button
            type="button"
            className="btn btn-primary font-weight-bold"
            onClick={showCreateModal}
          >
            <i className="fas fa-plus mr-2"></i>
            Add
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
          defaultSorted={constants.defaultSorted}
          pageSizeList={constants.sizePerPageList}
        />
      </CardBody>
      <AddActiveStudentModal
        isShowFlg={showCreate}
        onHide={hideCreateModal}
        onAdd={handleCreate}
      />
    </Card>
  );
}
