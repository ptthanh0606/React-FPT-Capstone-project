import React from 'react';

import { columnsTransformer, columnFormatter } from 'utils/common';
import { Link } from 'react-router-dom';

//------------------------------------------------------------------------------

export const defaultSorted = [{ dataField: 'id', order: 'desc' }];

export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
];

export const statusClasses = { true: 'success', false: 'warning' };
export const statusTitles = { true: 'Matched', false: 'Matching' };
export const lockClasses = { false: 'success', true: 'danger' };
export const lockTitles = { false: 'Unlocked', true: 'Locked' };
export const privacyClasses = { true: 'success', false: 'danger' };
export const privacyTitles = { true: 'Public', false: 'Private' };

export const createColumns = ({ handleEdit, handleRemove }) =>
  columnsTransformer([
    {
      dataField: 'department',
      text: 'DEP',
      sort: true,
      formatter: (cellContent, row) => cellContent?.label,
    },
    {
      dataField: 'code',
      text: 'Code',
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
      dataField: 'leader',
      text: 'Leader',
      formatter: function (cellContent, row) {
        return cellContent?.label;
      },
    },
    {
      dataField: 'members',
      text: 'Members',
      formatter: function (cellContent, row) {
        return cellContent?.length > 0
          ? cellContent
              ?.map(i => i.label)
              ?.reduce((prev, curr) => [prev, ', ', curr])
          : '';
      },
    },
    {
      dataField: 'topic',
      text: 'Topic',
      formatter: function (cellContent, row) {
        return (
          <div>
            <div className="text-nowrap text-dark-75 font-weight-bold font-size-lg mb-0">
              {cellContent.label}
            </div>
            <span className="text-muted font-weight-bold text-hover-primary">
              {cellContent.abstract}
            </span>
          </div>
        );
      },
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      formatter: columnFormatter(statusClasses, statusTitles),
    },
    {
      dataField: 'lock',
      text: 'Lock',
      sort: true,
      formatter: columnFormatter(lockClasses, lockTitles),
    },
    {
      dataField: 'privacy',
      text: 'privacy',
      sort: true,
      formatter: columnFormatter(privacyClasses, privacyTitles),
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
    name: 'name',
    type: 'text',
    label: 'Team name',
    placeholder: 'Give this team a name...',
  },
  {
    name: 'department',
    type: 'selectBox',
    label: 'Department',
    smallLabel: 'This team belong to which department',
    options: [
      {
        label: 'SE',
        value: 'se',
      },
      {
        label: 'GD',
        value: 'gd',
      },
      {
        label: 'CC',
        value: 'cc',
      },
    ],
  },
  {
    name: 'members',
    type: 'selectBoxAsync',
    label: 'Student members',
    smallLabel: 'First added user will be leader',
    load: (memberInput, callback) => {
      setTimeout(() => {
        callback([
          {
            label: 'Huynh Duc Duy',
            value: 'Huynh Duc Duy',
          },
          {
            label: 'Phan Thong Thanh',
            value: 'Phan Thong Thanh',
          },
          {
            label: 'Dinh Ngoc Hai',
            value: 'Dinh Ngoc Hai',
          },
          {
            label: 'Ly Phuoc Hiep',
            value: 'Ly Phuoc Hiep',
          },
        ]);
      }, 2000);
    },
    isMulti: true,
  },
  {
    name: 'topic',
    type: 'selectBoxAsync',
    label: 'Topic taken',
    smallLabel: 'Select a topic to assign to this student team',
    load: (memberInput, callback) => {
      setTimeout(() => {
        callback([
          {
            label: 'Capstone management system',
            value: 'Capstone management system',
          },
          {
            label: 'Traffic tracking',
            value: 'Traffic tracking',
          },
          {
            label: 'Web checker system',
            value: 'Web checker system',
          },
        ]);
      }, 2000);
    },
    isMulti: false,
  },
  {
    name: 'isPrivate',
    type: 'toggle',
    label: 'Private team',
    smallLabel: 'Is this team private',
  },
  {
    name: 'isLocked',
    type: 'toggle',
    label: 'Lock team',
    smallLabel: 'Lock this team',
  },
];
