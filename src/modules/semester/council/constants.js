import React from 'react';

import { columnsTransformer } from 'utils/common';
import { Link } from 'react-router-dom';

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

export const createColumns = ({ handleEdit, handleRemove }, role = 'admin') => {
  const cols = [
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
      formatter: (cellContent, row) => {
        if (role === 'admin') return cellContent;
        return (
          <Link
            className={'text-dark font-weight-bold'}
            to={'/council/' + row.id}
          >
            {cellContent}
          </Link>
        );
      },
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
  ];

  if (role === 'admin')
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

  return columnsTransformer(cols);
};
