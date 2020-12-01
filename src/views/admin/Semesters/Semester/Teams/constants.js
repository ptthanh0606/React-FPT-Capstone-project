import React from 'react';

import { columnsTransformer, columnFormatter } from 'utils/common';
import { Link } from 'react-router-dom';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { mDown as mDownDep } from 'views/admin/Departments/transformers';
import { mDown as mDownAStu } from 'views/admin/Semesters/Semester/ActiveStudents/transformers';
import { mDown as mDownTopic } from 'views/admin/Semesters/Semester/Topics/transformers';

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

export const createModalConfigs = semId => [
  {
    name: 'name',
    type: 'text',
    label: 'Team name',
    placeholder: 'Give this team a name...',
  },
  {
    name: 'maxMembers',
    type: 'number',
    label: 'Maximum member',
    placeholder: 'Maximum member can join this team',
  },
  {
    name: 'department',
    type: 'selectBoxAsync',
    label: 'Department',
    smallLabel: 'This team belong to which department',
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
          callback(res.data.data?.map(mDownDep) || []);
        })
        .catch(() => callback([]));
    },
  },
  {
    name: 'members',
    type: 'selectBoxAsync',
    label: 'Student members',
    smallLabel: 'First added user will be leader',
    load: (input, callback) => {
      request({
        to: endpoints.LIST_ACTIVE_STUDENTS(semId).url,
        method: endpoints.LIST_ACTIVE_STUDENTS(semId).method,
        params: {
          term: input,
          pageSize: 10,
        },
      })
        .then(res => {
          callback(res.data.data?.map(mDownAStu) || []);
        })
        .catch(() => callback([]));
    },
    isMulti: true,
  },
  {
    name: 'topic',
    type: 'selectBoxAsync',
    label: 'Topic taken',
    smallLabel: 'Select a topic to assign to this student team',
    load: (input, callback) => {
      request({
        to: endpoints.LIST_TOPIC.url,
        method: endpoints.LIST_TOPIC.method,
        params: {
          term: input,
          pageSize: 10,
          semesterId: semId,
        },
      })
        .then(res => {
          callback(res.data.data?.map(mDownTopic) || []);
        })
        .catch(() => callback([]));
    },
    isMulti: false,
  },
  {
    name: 'isPublic',
    type: 'toggle',
    label: 'Public team',
    smallLabel: 'Is this team private',
  },
  {
    name: 'isLocked',
    type: 'toggle',
    label: 'Lock team',
    smallLabel: 'Lock this team',
  },
];
