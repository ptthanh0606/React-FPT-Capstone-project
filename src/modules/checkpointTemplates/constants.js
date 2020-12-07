import React from 'react';

import { Link } from 'react-router-dom';
import { columnsTransformer } from 'utils/common';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { mDown as mDownLec } from 'modules/lecturer/transformers';

//------------------------------------------------------------------------------

const mockData = [
  {
    id: 0,
    name: 'Checkpoint 1',
    description: 'This is the first checkpoint',
    attachment: 'http://google.com',
    count: 10,
  },
];

export const defaultSorted = [{ dataField: 'id', order: 'desc' }];
export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
];
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
      dataField: 'isDisabled',
      text: 'Disabled',
      sort: true,
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
    name: 'isDisabled',
    type: 'toggle',
    label: 'Disabled',
    smallLabel: 'Is this checkpoint template available for future use?',
  },
];
