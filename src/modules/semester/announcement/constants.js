import React from 'react';

import { columnsTransformer } from 'utils/common';

//------------------------------------------------------------------------------

export const defaultSorted = [{ dataField: 'id', order: 'desc' }];

export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
];

export const roleClasses = ['', 'info', 'primary'];
export const roleTitles = ['', 'Students', 'Lecturers'];

export const createColumns = ({ handleRemove, handleEdit }) =>
  columnsTransformer([
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
    },
    {
      dataField: 'title',
      text: 'Title',
    },
    {
      dataField: 'role',
      text: 'Role',
      sort: true,
      formatter: (cellContent, row) => {
        const getLabelCssClasses = () => {
          return `label label-lg label-light-${
            roleClasses[row.role]
          } label-inline text-nowrap`;
        };
        return (
          <span className={getLabelCssClasses()}>{roleTitles[row.role]}</span>
        );
      },
    },
    {
      dataField: 'createdAt',
      text: 'Created at',
      sort: true,
      formatter: (cellContent, row) => new Date(cellContent).toLocaleString(),
    },
    {
      dataField: 'updatedAt',
      text: 'Updated at',
      sort: true,
      formatter: (cellContent, row) => new Date(cellContent).toLocaleString(),
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
              className="btn btn-icon btn-light btn-hover-primary btn-sm"
              onClick={handleEdit}
              data-id={row.id}
            >
              <i className="fas fa-pencil-alt mx-2"></i>
            </a>
            &nbsp;
            <a
              href="/"
              title="Remove"
              className="btn btn-icon btn-light btn-hover-primary btn-sm"
              onClick={handleRemove}
              data-id={row.id}
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
    name: 'role',
    type: 'selectBox',
    label: 'Role',
    smallLabel: 'This announcement is for',
    options: [
      {
        label: 'Student',
        value: 1,
      },
      {
        label: 'Lecturer',
        value: 2,
      },
    ],
  },
  {
    name: 'title',
    type: 'text',
    label: 'Title',
    smallLabel: 'Title of this announcement',
  },
  {
    name: 'content',
    type: 'markdown',
    label: 'Content',
  },
];
