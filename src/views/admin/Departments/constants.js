import React from 'react';

import { Link } from 'react-router-dom';
import { columnsTransformer } from 'utils/common';

//------------------------------------------------------------------------------

export const defaultSorted = [{ dataField: 'id', order: 'asc' }];

export const sizePerPageList = [
  { text: '5', value: 5 },
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
            {cellContent?.length > 0 &&
              cellContent
                .map(i => (
                  <Link
                    className="text-dark font-weight-bold"
                    to={'/profile/lecturer/' + i.value}
                  >
                    {i.label}
                  </Link>
                ))
                .reduce((prev, curr) => [prev, ', ', curr])}
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
