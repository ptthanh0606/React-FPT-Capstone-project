import React from 'react';

import { Link } from 'react-router-dom';
import { columnsTransformer } from 'utils/common';
import request from 'utils/request';
import * as endpoints from 'endpoints';

//------------------------------------------------------------------------------
export const defaultSorted = [{ dataField: 'id', order: 'asc' }];

export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
];

export const statusClasses = ['danger', 'success'];
export const statusTitles = ['Deactivated', 'Activated'];

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
      formatter: function (cellContent, row) {
        return (
          <Link
            className="text-dark font-weight-bold"
            to={'/profile/lecturer/' + row.id}
          >
            {cellContent}
          </Link>
        );
      },
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: true,
    },
    {
      dataField: 'departments',
      text: 'Department',
      sort: true,
      formatter: function (cellContent, row) {
        return (
          <>
            {cellContent?.length > 0 &&
              cellContent
                .map(i => (i.isApprover ? <u>{i.label}</u> : <>{i.label}</>))
                .reduce((prev, curr) => [prev, ', ', curr])}
          </>
        );
      },
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      formatter: (cellContent, row) => {
        const getLabelCssClasses = () => {
          return `label label-lg label-light-${
            statusClasses[row.status ? 1 : 0]
          } label-inline text-nowrap`;
        };
        return (
          <span className={getLabelCssClasses()}>
            {statusTitles[row.status ? 1 : 0]}
          </span>
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
    name: 'code',
    type: 'text',
    label: 'Lecturer code name',
    placeholder: 'Code name...',
  },
  {
    name: 'name',
    type: 'text',
    label: 'Lecturer full name',
    placeholder: 'Full name...',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Lecturer email',
    placeholder: 'Email...',
  },
  {
    name: 'departments',
    type: 'selectBoxAsync',
    label: 'Department',
    smallLabel: 'Departments for this lecturer',
    load: (input, callback) => {
      request({
        to: endpoints.LIST_DEPARTMENT.url,
        method: endpoints.LIST_DEPARTMENT.method,
        params: {
          q: input,
          pageSize: 10,
        },
      })
        .then(res => {
          callback(
            res.data.data?.map(i => ({
              label: i.code,
              value: i.id,
            })) || []
          );
        })
        .catch(() => callback([]));
    },
    isMulti: true,
  },
  {
    name: 'status',
    type: 'toggle',
    label: 'Active state',
    smallLabel: 'Is this lecturer active',
  },
];
