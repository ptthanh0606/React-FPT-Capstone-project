import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '_metronic/_partials/controls';
import Table from 'components/Table';
import Filters from './Filters';

import metaAtom from 'store/meta';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import toast from 'utils/toast';
import { useDebounce } from 'use-debounce';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';

import * as transformers from 'modules/semester/council/transformers';
import * as constants from 'modules/semester/council/constants';

import semesterStore from 'store/semester';
import roleSelector from 'auth/recoil/selectors/role';

export default function Councils() {
  const setMeta = useSetRecoilState(metaAtom);
  const semester = useRecoilValue(semesterStore);
  const role = useRecoilValue(roleSelector);
  const [isMy, setIsMy] = React.useState(false);

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

  // ---------------------------------------------------------------------------

  const columns = React.useMemo(() => constants.createColumns({}, role), [
    role,
  ]);

  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    setIsLoading(true);
    const source = {};

    request({
      to: endpoints.LIST_COUNCIL(semester.id).url,
      method: endpoints.LIST_COUNCIL(semester.id).method,
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
  }, [l, debouncedFilters, page, pageSize, sortField, sortOrder, semester.id]);

  React.useEffect(() => {
    setMeta(meta => ({
      ...meta,
      title: 'Councils of ' + semester.name,
      breadcrumb: [
        { title: 'Semester', path: '/select-semester' },
        { title: semester.name, path: '/semester/#' },
        { title: 'Council', path: '/council' },
      ],
      toolbar: <></>,
    }));
  }, [semester.name, setMeta]);

  const myCouncilsOnly = React.useCallback(() => {
    setFilters(f => ({
      ...f,
      mine: true,
    }));
    setIsMy(true);
  }, []);

  const allCouncils = React.useCallback(() => {
    setFilters(f => ({
      ...f,
      mine: false,
    }));
    setIsMy(false);
  }, []);

  return (
    <Card>
      <CardHeader title="All councils">
        {role === 'lecturer' && (
          <CardHeaderToolbar className="text-nowrap">
            <div
              className={`rounded btn btn-lg ${
                isMy ? 'bg-primary text-white' : 'bg-white text-primary'
              }`}
              style={{
                height: '35px',
                lineHeight: '35px',
                padding: '0px 1rem',
                fontWeight: isMy ? 600 : undefined,
              }}
              onClick={myCouncilsOnly}
            >
              My council
            </div>
            <div
              className={`rounded btn btn-lg ${
                !isMy ? 'bg-primary text-white' : 'bg-white text-primary'
              }`}
              onClick={allCouncils}
              style={{
                height: '35px',
                lineHeight: '35px',
                padding: '0px 1rem',
                fontWeight: !isMy ? 600 : undefined,
              }}
            >
              All
            </div>
          </CardHeaderToolbar>
        )}
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
    </Card>
  );
}
