import React from 'react';

import { Link } from 'react-router-dom';
import { columnsTransformer } from 'utils/common';

//------------------------------------------------------------------------------

export const defaultSorted = [{ dataField: 'id', order: 'desc' }];

export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
];

export const statusTitles = [
  'Preparing',
  'Assigning',
  'In-progress',
  'Finished',
];
export const statusClasses = [
  'danger',
  'warning',
  'info',
  'success',
  'primary',
];

export const createColumns = (props = {}) => {
  const { handleEdit, handleRemove } = props;

  const newCols = [
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      formatter: function StatusColumnFormatter(cellContent, row) {
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
  ];

  if (handleEdit && handleRemove) {
    newCols.push({
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

  return columnsTransformer(newCols);
};

export const modalConfigs = [
  {
    name: 'name',
    type: 'text',
    label: 'Semester name',
    placeholder: 'Semester name...',
    required: true,
  },
  {
    name: 'maxApplication',
    type: 'number',
    label: 'Maximum applications per team',
    smallLabel:
      'Maximum number of application that a team can send at any-time',
    placeholder: '10',
    required: true,
  },

  {
    name: 'marginPass',
    type: 'number',
    step: 0.01,
    label: 'Margin pass',
    smallLabel: 'Minimum grade for student to pass this semester',
    placeholder: '5',
    required: true,
  },
  {
    name: 'matchingDate',
    type: 'datetime-local',
    label: 'Assigning',
    smallLabel:
      'Ending date of Assigning-phase, all team must matched with a topic before this day',
    step: 3600,
    required: true,
  },
  {
    name: 'inprogressDate',
    type: 'datetime-local',
    label: 'In progress',
    smallLabel:
      'Ending date of In-progress-phase, all team must have done the capstone project and waiting for final evaluation',
    step: 3600,
    required: true,
  },
  {
    name: 'finishedDate',
    type: 'datetime-local',
    label: 'Finished',
    smallLabel:
      'Ending date of Finished-phase (and semester as well), all evaluation is published.',
    step: 3600,
    required: true,
  },
];
