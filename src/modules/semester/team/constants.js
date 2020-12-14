import React from 'react';

import { columnsTransformer, columnFormatter } from 'utils/common';
import { Link } from 'react-router-dom';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { mDown as mDownDep } from 'modules/department/transformers';
import { mDown as mDownAStu } from 'modules/semester/activeStudent/transformers';
import { mDown as mDownTopic } from 'modules/semester/topic/transformers';

//------------------------------------------------------------------------------

export const defaultSorted = [{ dataField: 'id', order: 'desc' }];

export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
];

export const statusClasses = { true: 'success', false: 'warning' };
export const statusTitles = { true: 'Assigned', false: 'Assigning' };
export const lockClasses = { false: 'success', true: 'danger' };
export const lockTitles = { false: 'Unlocked', true: 'Locked' };
export const privacyClasses = { true: 'success', false: 'danger' };
export const privacyTitles = { true: 'Public', false: 'Private' };

export const createColumns = (
  { handleJoin, handleRemove, handleEdit },
  role = 'admin'
) => {
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
      formatter: cellContent => cellContent?.label,
    },
    {
      dataField: 'code',
      text: 'Code',
      sort: true,
      hidden: true,
    },
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      formatter: function (cellContent, row) {
        return (
          <Link
            className={'text-dark font-weight-bold'}
            to={'/team/' + row?.id}
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
        return (
          cellContent?.label &&
          cellContent?.value && (
            <Link
              className={'text-dark font-weight-bold'}
              to={'/profile/student/' + cellContent?.value}
            >
              {cellContent?.label}
            </Link>
          )
        );
      },
    },
    {
      dataField: 'members',
      text: 'Members',
      formatter: function (cellContent, row) {
        return cellContent?.length > 0
          ? cellContent
              ?.map(i => (
                <Link
                  className={'text-dark font-weight-bold text-nowrap'}
                  to={'/profile/student/' + i?.value}
                >
                  {i?.label}
                </Link>
              ))
              ?.reduce((prev, curr) => [prev, ', ', curr])
          : '';
      },
    },
    {
      dataField: 'topic',
      text: 'Topic',
      formatter: function (cellContent, row) {
        return (
          <div className="d-flex flex-column">
            <Link
              to={`/topic/${row.topic.value}`}
              className="text-nowrap text-dark-75 font-weight-bold font-size-lg mb-0"
            >
              {cellContent?.label}
            </Link>
            <span className="text-muted font-weight-bold text-hover-primary">
              {cellContent?.abstract}
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
  ];

  if (role !== 'student') {
    cols.push({
      dataField: 'privacy',
      text: 'privacy',
      sort: true,
      formatter: columnFormatter(privacyClasses, privacyTitles),
    });
  } else
    cols.push({
      dataField: 'action',
      text: 'Action',
      formatter: (cellContent, row) => {
        return (
          <a
            href="/"
            title="Join team"
            className="btn btn-icon btn-light btn-hover-primary btn-sm"
            data-id={row.id}
            data-code={row.code}
            data-name={row.name}
            onClick={handleJoin}
          >
            <i className="fas fa-play icon-sm"></i>
          </a>
        );
      },
    });

  if (role === 'admin') {
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
    smallLabel: 'Maximum member can join this team',
    placeholder: '10',
  },
  {
    name: 'department',
    type: 'selectBoxAsync',
    label: 'Department',
    smallLabel: 'This team belong to which department, cannot update',
    readOnlyWhenEdit: true,
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
    name: 'privacy',
    type: 'toggle',
    label: 'Public team',
    smallLabel: 'Is this team public?',
  },
  {
    name: 'lock',
    type: 'toggle',
    label: 'Lock team',
    smallLabel: 'Lock this team',
  },
];

export const createTeamAsStudentModalConfigs = semId => [
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
    smallLabel: 'Maximum member can join this team',
    placeholder: '10',
  },
  {
    name: 'isPublic',
    type: 'toggle',
    label: 'Privacy',
    smallLabel: 'Is this team public',
  },
  {
    name: 'isLocked',
    type: 'toggle',
    label: 'Lock team',
    smallLabel: 'Lock this team',
  },
];
