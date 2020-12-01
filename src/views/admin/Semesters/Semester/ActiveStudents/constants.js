import React from 'react';

import { Link } from 'react-router-dom';
import { columnsTransformer } from 'utils/common';

//------------------------------------------------------------------------------

export const defaultSorted = [{ dataField: 'id', order: 'desc' }];

export const sizePerPageList = [
  { text: '5', value: 5 },
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
];

export const statusClasses = ['danger', 'warning', 'success'];
export const statusTitles = ['Not in a team', 'Matching', 'Matched'];

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
      dataField: 'department',
      text: 'DEP',
      sort: true,
    },
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      formatter: (cellContent, row) => {
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
      dataField: 'team',
      text: 'Team',
      sort: true,
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      formatter: (cellContent, row) => {
        const getLabelCssClasses = () => {
          return `label label-lg label-light-${
            statusClasses[row.status]
          } label-inline text-nowrap`;
        };
        return (
          <span className={getLabelCssClasses()}>
            {statusTitles[row.status]}
          </span>
        );
      },
    },
    {
      dataField: 'addedAt',
      text: 'Added at',
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
              className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
              onClick={handleEdit}
              data-id={row.id}
            >
              <i className="fas fa-pencil-alt mx-2"></i>
            </a>
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
    name: 'code',
    type: 'text',
    label: 'Team code',
    smallLabel: 'Assign this student to a team by changing team code',
    placeholder: 'Team code...',
  },
];
