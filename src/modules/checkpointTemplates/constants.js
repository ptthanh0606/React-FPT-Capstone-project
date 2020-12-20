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

export const statusClasses = ['danger', 'success'];
export const statusTitles = ['Deactivated', 'Activated'];

export const createColumns = ({
  handleEdit,
  handleRemove,
  handleShowCheckpoints,
}) =>
  columnsTransformer([
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
    },
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
    },
    {
      dataField: 'description',
      text: 'Description',
      sort: false,
    },
    {
      dataField: 'attachment',
      text: 'Attachment',
      sort: false,
    },
    {
      dataField: 'count',
      text: 'Number of checkpoint',
      sort: true,
    },
    {
      dataField: 'status',
      text: 'status',
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
      dataField: 'action',
      text: 'Actions',
      formatter: (cellContent, row, rowIndex) => {
        return (
          <span className="text-nowrap">
            <a
              href="/"
              title="Manage"
              className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
              data-id={row.id}
              onClick={handleShowCheckpoints}
            >
              <i className="fas fa-list mx-2"></i>
            </a>
            <a
              href="/"
              title="Edit"
              className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
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
    label: 'Checkpoint template name',
    placeholder: 'Give this checkpoint template a name...',
    required: true,
  },
  {
    name: 'description',
    type: 'text',
    label: 'Description',
    smallLabel: 'A description for this checkpoint template',
  },
  {
    name: 'attachment',
    type: 'file',
    label: 'Attachment',
    smallLabel: '.pdf, .docx',
  },
  {
    name: 'status',
    type: 'toggle',
    label: 'Activated',
    smallLabel: 'Is this checkpoint template available for future use?',
  },
];
