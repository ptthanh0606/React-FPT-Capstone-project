import React from 'react';
import Table from 'components/Table';
import Filters from 'views/admin/Semesters/Filters.js';

import metaAtom from 'store/meta';
import userAtom from 'store/user';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';

import { useDebounce } from 'use-debounce';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';

import * as transformers from 'modules/semester/transformers';
import * as constants from 'modules/semester/constants';

import SemesterCard from 'views/admin/Semesters/SemesterCard';
import ScrollContainer from 'react-indiana-drag-scroll';
import styles from 'views/admin/Semesters/nearest.module.scss';

export default function SelectSemester() {
  const setMeta = useSetRecoilState(metaAtom);
  const user = useRecoilValue(userAtom);

  const [l] = React.useReducer(() => ({}), {});

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

  const columns = React.useMemo(() => constants.createColumns(), []);

  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    setIsLoading(true);
    const source = {};

    request({
      to: endpoints.LIST_SEMESTER.url,
      method: endpoints.LIST_SEMESTER.method,
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
  }, [l, debouncedFilters, page, pageSize, sortField, sortOrder]);

  React.useEffect(() => {
    setMeta({
      title: 'Select semesters',
    });
  }, [setMeta]);

  return (
    <div className="bg-white">
      <div className="container-fluid d-flex justify-content-between align-items-center mt-10">
        <div className="d-flex flex-column">
          <span className="font-weight-bolder font-size-h1">
            Welcome, {user.name}
          </span>
          <span className="text-muted">
            Please select a semester to perform the activities corresponding to
            the faculity role.
          </span>
        </div>
        <div className="">
          <Link
            className="btn btn-light-info font-weight-bold btn-sm ml-5"
            to="/logout"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
          </Link>
        </div>
      </div>

      <ScrollContainer
        className={styles['semester-scroll'] + ' alert-shadow gutter-b'}
      >
        {data.slice(0, 5).map(s => (
          <SemesterCard {...s} key={s.id} />
        ))}
      </ScrollContainer>

      <div className="container-fluid">
        <span className="font-weight-bolder font-size-h4">All semesters</span>
        <div className="mt-8">
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
        </div>
      </div>
    </div>
  );
}
