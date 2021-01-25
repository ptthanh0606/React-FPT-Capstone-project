import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import { getSelectRow, getHandlerTableChange } from '_metronic/_helpers';

import { Pagination } from '_metronic/_partials/controls';

export default function Table({
  columns,
  data,
  total,
  isLoading,
  selected,
  setSelected,
  nonSelectable = [],
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
  clientPagination = false,
}) {
  const paginationOptions = {
    custom: true,
    totalSize: total,
    sizePerPageList: pageSizeList,
    sizePerPage: pageSize,
    page: page,
  };

  const innerSetSelected = React.useCallback(
    s => {
      setSelected(
        nonSelectable?.length > 0
          ? s.filter(v => !nonSelectable.some(e => e === v))
          : s
      );
    },
    [nonSelectable, setSelected]
  );

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
                data={
                  data && Array.isArray(data)
                    ? clientPagination
                      ? data.slice((page - 1) * pageSize, page * pageSize)
                      : data
                    : []
                }
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
                    ? {
                        ...getSelectRow({
                          entities: data,
                          ids: selected,
                          setIds: innerSetSelected,
                        }),
                        nonSelectableClasses: 'nonSelectable',
                        nonSelectable,
                      }
                    : undefined
                }
                noDataIndication={() => (
                  <div style={{ textAlign: 'center' }} className="mt-5">
                    No records found
                  </div>
                )}
                headerClasses="text-nowrap"
                {...paginationTableProps}
              />
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
