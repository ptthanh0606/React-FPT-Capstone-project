import React from 'react';
import Table from 'components/Table';
import Filters from 'views/admin/Semesters/Filters.js';

import metaAtom from 'store/meta';
import { useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';

import { useDebounce } from 'use-debounce';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';

import * as transformers from 'views/admin/Semesters/transformers';
import * as constants from 'views/admin/Semesters/constants';

import SemesterCard from 'views/admin/Semesters/SemesterCard';
import ScrollContainer from 'react-indiana-drag-scroll';
import styles from 'views/admin/Semesters/nearest.module.scss';

export default function CustomersCard() {
  const setMeta = useSetRecoilState(metaAtom);

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
    <div
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        maxHeight: '100vh',
        overflow: 'auto',
        paddingBottom: '1rem',
        top: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          textAlign: 'right',
          padding: '1.5rem 1.5rem 0 0',
        }}
      >
        <Link
          className="btn btn-secondary font-weight-bold btn-sm"
          to="/logout"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          Logout
        </Link>
      </div>
      <ScrollContainer
        className={styles['semester-scroll'] + ' alert-shadow gutter-b'}
      >
        {data.slice(0, 5).map(s => (
          <SemesterCard {...s} key={s.id} />
        ))}
      </ScrollContainer>
      <div className="mx-8">
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
  );
}
