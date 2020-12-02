import React from 'react';

import { Link } from 'react-router-dom';
import { columnsTransformer } from 'utils/common';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { mDown as mDownLec } from 'modules/lecturer/transformers';

//------------------------------------------------------------------------------

export const defaultSorted = [{ dataField: 'id', order: 'desc' }];

export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
];

export const statusClasses = ['danger', 'success'];
export const statusTitles = ['Deactivated', 'Activated'];

// export const createColumns = ({ handleEdit, handleRemove }) =>
//   columnsTransformer();
// xóa caret, sortheader, constant.

export const createColumns = ({ handleEdit, handleRemove }) =>
  columnsTransformer([
    {
      dataField: 'code',
      text: 'Code',
      sort: true,
    },
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      formatter: (cellContent, row) => {
        const getLabelCssClasses = () => {
          return `label label-lg label-light-${
            statusClasses[row.status === true ? 1 : 0]
          } label-inline text-nowrap`;
        };
        return (
          <span className={getLabelCssClasses()}>
            {statusTitles[row.status === true ? 1 : 0]}
          </span>
        );
      },
    },
    {
      dataField: 'approvers',
      text: 'Approvers',
      formatter: function (cellContent, row) {
        return (
          <>
            {cellContent?.length > 0
              ? cellContent
                  .map(i => (
                    <Link
                      className="text-dark font-weight-bold"
                      to={'/profile/lecturer/' + i.value}
                      style={{
                        textDecoration: i.isDisabled
                          ? 'line-through'
                          : undefined,
                      }}
                    >
                      {i.label}
                    </Link>
                  ))
                  .reduce((prev, curr) => [prev, ', ', curr])
              : ''}
          </>
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
              <i className="fas fa-pencil-alt mx-2"></i>
            </a>
            <a
              href="/"
              title="Remove"
              className="btn btn-icon btn-light btn-hover-primary btn-sm"
              data-id={row.id}
              onClick={handleRemove}
            >
              <i className="fas fa-trash mx-2"></i>
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
  ]);

export const modalConfigs = [
  {
    name: 'name',
    type: 'text',
    label: 'Department name',
    placeholder: 'Give this department a name...',
  },
  {
    name: 'code',
    type: 'text',
    label: 'Department code',
    smallLabel: 'Ex: Software Engineer to be "SE"',
  },
  {
    name: 'approvers',
    type: 'selectBoxAsync',
    label: 'Approver',
    smallLabel: 'Approvers for this department',
    load: (input, callback) => {
      request({
        to: endpoints.LIST_LECTURER.url,
        method: endpoints.LIST_LECTURER.method,
        params: {
          term: input,
          pageSize: 10,
        },
      })
        .then(res => {
          callback(res.data.data?.map(mDownLec) || []);
        })
        .catch(() => callback([]));
    },
    isMulti: true,
  },
  {
    name: 'status',
    type: 'toggle',
    label: 'Active state',
    smallLabel: 'Is this department active',
  },
];
