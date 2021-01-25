import React from 'react';

import { Link } from 'react-router-dom';
import { columnsTransformer } from 'utils/common';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { mDown as mDownDep } from '../department/transformers';

//------------------------------------------------------------------------------

export const defaultSorted = [{ dataField: 'id', order: 'desc' }];

export const sizePerPageList = [
  { text: '5', value: 5 },
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
];

export const createColumns = ({ handleEdit, handleRemove }) => {
  const cols = [
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
    },
    {
      dataField: 'code',
      text: 'Code',
      sort: true,
    },
    {
      dataField: 'email',
      text: 'Email',
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
            to={'/semester/' + row.id}
          >
            {cellContent}
          </Link>
        );
      },
    },
    {
      dataField: 'department',
      text: 'Department',
      sort: true,
      formatter: function (cellContent, row) {
        return cellContent?.label;
      },
    },
  ];

  if (handleEdit && handleRemove) {
    cols.push({
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
    });
  }

  return columnsTransformer(cols);
};

export const createBaseColumns = () => {
  return columnsTransformer([
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
    },
    {
      dataField: 'code',
      text: 'Code',
      sort: true,
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: true,
    },
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
    },
    {
      dataField: 'department',
      text: 'Department',
      sort: true,
    },
  ]);
};

export const modalConfigs = [
  {
    name: 'name',
    type: 'text',
    label: 'Student full name',
    placeholder: 'Full name...',
    required: true,
  },
  {
    name: 'code',
    type: 'text',
    label: 'Student code',
    placeholder: 'Enter student code...',
    required: true,
  },
  {
    name: 'email',
    type: 'text',
    label: 'Student email',
    placeholder: 'Enter student @fpt.edu.vn email...',
    required: true,
  },
  {
    name: 'department',
    type: 'selectBoxAsync',
    label: 'Department',
    smallLabel: 'Departments for this lecturer',
    department: true,
    load: (input, callback) => {
      request({
        to: endpoints.LIST_DEPARTMENT.url,
        method: endpoints.LIST_DEPARTMENT.method,
        params: {
          term: input,
          pageSize: 10,
        },
      })
        .then(res => {
          callback(res?.data?.data?.map(mDownDep) || []);
        })
        .catch(() => callback([]));
    },
    isMulti: false,
    required: true,
  },
  {
    name: 'biography',
    type: 'textarea',
    label: 'Biography',
    placeholder: '...',
  },
];
