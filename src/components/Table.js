import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import { getSelectRow, getHandlerTableChange } from '_metronic/_helpers';

import { Pagination } from '_metronic/_partials/controls';

const Table = React.memo(function ({
  columns,
  data,
  total,
  isLoading,
  selected,
  setSelected,
  page,
  setPage,
  pageSize,
  setPageSize,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  defaultSorted,
  pageSizeList,
  selectable = false,
}) {
  const paginationOptions = {
    custom: true,
    totalSize: total,
    sizePerPageList: pageSizeList,
    sizePerPage: pageSize,
    page: page,
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination isLoading={isLoading} paginationProps={paginationProps}>
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={data && Array.isArray(data) ? data : []}
                columns={columns}
                defaultSorted={defaultSorted}
                onTableChange={getHandlerTableChange(
                  setPage,
                  setPageSize,
                  setSortField,
                  setSortOrder
                )}
                selectRow={
                  selectable
                    ? getSelectRow({
                        entities: data,
                        ids: selected,
                        setIds: setSelected,
                      })
                    : undefined
                }
                noDataIndication={() => (
                  <div style={{ textAlign: 'center' }} className="mt-5">
                    No records found
                  </div>
                )}
                {...paginationTableProps}
              />
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
});

export default Table;
