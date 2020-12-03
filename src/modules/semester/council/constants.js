import React from 'react';

import { columnsTransformer } from 'utils/common';
import { Link } from 'react-router-dom';
import * as endpoints from 'endpoints';
import { mDown as mDownDep } from 'modules/department/transformers';
import { mDown as mDownLec } from 'modules/lecturer/transformers';
import request from 'utils/request';

//------------------------------------------------------------------------------

export const defaultSorted = [{ dataField: 'id', order: 'desc' }];

export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
];

export const statusClasses = ['danger', 'success', 'info'];
export const statusTitles = ['Finished', 'In progress', 'Preparing'];

export const createColumns = ({ handleEdit, handleRemove }) =>
  columnsTransformer([
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
    },
    {
      dataField: 'department',
      text: 'DEP',
      sort: true,
      formatter: (cellContent, row) => cellContent?.label,
    },
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
    },
    {
      dataField: 'members',
      text: 'Members',
      formatter: function StatusColumnFormatter(cellContent, row) {
        return (
          <>
            {cellContent?.length > 0
              ? cellContent
                  .map(i => (
                    <Link
                      className={'text-dark font-weight-bold'}
                      to={'/profile/lecturer/' + i.value}
                    >
                      {i.isLeader ? <u>{i.label}</u> : i.label}
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
    name: 'members',
    type: 'selectBoxAsync',
    label: 'Members',
    smallLabel: 'Member of this council, first member is leader',
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
];
