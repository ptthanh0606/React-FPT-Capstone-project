import React from 'react';
import { Link } from 'react-router-dom';
import { columnsTransformer } from 'utils/common';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { mDown as mDownDep } from 'modules/department/transformers';
import { mDown as mDownTeam } from 'modules/semester/team/transformers';
import { mDown as mDownLec } from 'modules/lecturer/transformers';

export const statusClasses = [
  'warning',
  'danger',
  'info',
  'primary',
  'info',
  'success',
  'danger',
];
export const statusTitles = [
  'Waiting',
  'Rejected',
  'Approved',
  'Ready',
  'Assigned',
  'Passed',
  'Failed',
];
export const defaultSorted = [{ dataField: 'id', order: 'desc' }];
export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
];

export const modalConfigs = [
  {
    name: 'code',
    type: 'text',
    label: 'Code',
    smallLabel: 'Specify a code for this topic',
    placeholder: 'Code...',
    required: true,
  },
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    smallLabel: 'Give this topic a name',
    placeholder: 'Name...',
    required: true,
  },
  {
    name: 'abstract',
    type: 'textarea',
    label: 'Abstract',
    smallLabel: 'Abstract for this topic',
    placeholder: 'Abstract...',
    required: true,
  },
  {
    name: 'description',
    type: 'markdown',
    label: 'Description',
    smallLabel: 'Brief description for this topic',
    placeholder: 'Description...',
    required: true,
  },
  {
    name: 'note',
    type: 'text',
    label: 'Note',
    smallLabel: 'Special note for this topic',
    placeholder: 'Note...',
  },
  {
    name: 'minMembers',
    type: 'number',
    label: 'Minimum team members',
    smallLabel: 'Minimum team member for this topic',
    placeholder: '0',
    required: true,
  },
  {
    name: 'maxMembers',
    type: 'number',
    label: 'Maximum team members',
    smallLabel: 'Maximum team member for this topic',
    placeholder: '4',
    required: true,
  },
  {
    name: 'department',
    type: 'selectBoxAsync',
    label: 'Department',
    smallLabel: 'This team belong to which department, cannot update',
    readOnlyWhenEdit: true,
    required: true,
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
    name: 'isByStudent',
    type: 'toggle',
    label: 'By student',
    smallLabel: 'Is this topic from student',
    isChecked: false,
  },
  {
    name: 'team',
    type: 'selectBoxAsync',
    label: 'Student team',
    smallLabel: 'Student team taking this topic',
    load: (input, callback) => {
      request({
        to: endpoints.LIST_TEAM.url,
        method: endpoints.LIST_TEAM.method,
        params: {
          term: input,
          pageSize: 10,
        },
      })
        .then(res => {
          callback(res.data.data?.map(mDownTeam) || []);
        })
        .catch(() => callback([]));
    },
  },
  {
    name: 'submitter',
    type: 'selectBoxAsync',
    label: 'Submitter',
    smallLabel: 'Owner of this topic',
    load: (input, callback) => {
      request({
        to: endpoints.LIST_LECTURER.url,
        method: endpoints.LIST_LECTURER.method,
        params: {
          term: input,
          pageSize: 10,
        },
      })
        .then(res => {
          callback(res.data.data?.map(mDownLec) || []);
        })
        .catch(() => callback([]));
    },
    isMulti: false,
    required: true,
  },
  {
    name: 'keywords',
    type: 'text',
    label: 'Keywords',
  },
  {
    name: 'attachment',
    type: 'file',
    label: 'Attachment',
    smallLabel: '.pdf, .docx',
  },
];

export const submitterModalConfigs = semId => [
  {
    name: 'code',
    type: 'text',
    label: 'Code',
    smallLabel: 'Specify a code for this topic',
    placeholder: 'Code...',
    required: true,
  },
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    smallLabel: 'Give this topic a name',
    placeholder: 'Name...',
    required: true,
  },
  {
    name: 'abstract',
    type: 'textarea',
    label: 'Abstract',
    smallLabel: 'Brief description for this topic',
    placeholder: 'Description...',
    required: true,
  },
  {
    name: 'description',
    type: 'markdown',
    label: 'Description',
    smallLabel: 'Brief description for this topic',
    placeholder: 'Description...',
    required: true,
  },
  {
    name: 'note',
    type: 'text',
    label: 'Note',
    smallLabel: 'Special note for this topic',
    placeholder: 'Note...',
  },
  {
    name: 'minMembers',
    type: 'number',
    label: 'Minimum team members',
    smallLabel: 'Minimum team member for this topic',
    placeholder: '0',
    required: true,
  },
  {
    name: 'maxMembers',
    type: 'number',
    label: 'Maximum team members',
    smallLabel: 'Maximum team member for this topic',
    placeholder: '4',
    required: true,
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
    required: true,
  },
  {
    name: 'team',
    type: 'selectBoxAsync',
    label: 'Student team',
    smallLabel: 'Student team taking this topic',
    load: (input, callback) => {
      request({
        to: endpoints.LIST_TEAM.url,
        method: endpoints.LIST_TEAM.method,
        params: {
          term: input,
          semesterId: semId,
          pageSize: 10,
        },
      })
        .then(res => {
          callback(res.data.data?.map(mDownTeam) || []);
        })
        .catch(() => callback([]));
    },
  },
  {
    name: 'keywords',
    type: 'text',
    label: 'Keywords',
  },
  {
    name: 'attachment',
    type: 'file',
    label: 'Attachment',
    smallLabel: '.pdf, .docx',
  },
];

export const createColumns = (
  { handleEdit = function () {}, handleRemove = function () {} },
  role = 'admin'
) => {
  const cols = [];
  if (role === 'admin')
    cols.push({
      dataField: 'id',
      text: 'No',
      sort: true,
    });
  cols.push(
    ...[
      {
        dataField: 'department',
        text: 'Dep',
        sort: true,
        formatter: (cellContent, row) => {
          return cellContent.label;
        },
      },
      {
        dataField: 'code',
        text: 'Code',
        sort: true,
      },
      {
        text: 'Information',
        dataField: 'topic',
        sort: true,
        formatter: function StatusColumnFormatter(cellContent, row) {
          return (
            <Link
              className="text-dark font-weight-bold"
              to={'./topic/' + row.id}
            >
              <div>
                <div className="text-nowrap text-dark-75 font-weight-bold font-size-lg mb-0">
                  {row.name}
                </div>
                <span className="text-muted font-weight-bold text-hover-primary">
                  {row.abstract}
                </span>
              </div>
            </Link>
          );
        },
      },
      {
        dataField: 'attachment',
        text: 'Detail',
        formatter: (cellContent, row) => {
          if (!cellContent?.name) return null;
          return (
            <a
              href={cellContent.name}
              title="Download"
              className="btn btn-icon btn-light btn-hover-primary btn-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-download my-2"></i>
            </a>
          );
        },
      },
    ]
  );

  if (role === 'admin')
    cols.push({
      dataField: 'checkpointTemplate',
      text: 'Checkpoint Template',
      formatter: function StatusColumnFormatter(cellContent, row) {
        return cellContent && cellContent.label;
      },
    });

  cols.push(
    ...[
      {
        dataField: 'submitter',
        text: 'Submitter',
        formatter: function StatusColumnFormatter(cellContent, row) {
          return (
            <Link
              className="text-dark font-weight-bold text-nowrap"
              to={'/profile/lecturer/' + cellContent.value}
            >
              {cellContent.label}
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
            } label-inline text-nowrap text-nowrap`;
          };
          return (
            <span className={getLabelCssClasses()}>
              {statusTitles[row.status]}
            </span>
          );
        },
      },
      {
        dataField: 'teamMembers',
        text: 'Members',
        formatter: (cellContent, row) => {
          return (
            <>
              {cellContent?.length > 0
                ? cellContent
                    .map(i => (
                      <Link
                        className="text-dark font-weight-bold text-nowrap"
                        to={'/profile/student/' + i.value}
                      >
                        {i.label}
                        {i?.isLeader && ' (Leader)'}
                      </Link>
                    ))
                    .reduce((prev, curr) => [prev, ', ', curr])
                : ''}
            </>
          );
        },
        style: {
          minWidth: '200px',
        },
      },
      {
        dataField: 'mentorMembers',
        text: 'Mentors',
        formatter: function StatusColumnFormatter(cellContent, row) {
          return (
            <>
              {cellContent?.length > 0
                ? cellContent
                    .map(i => (
                      <Link
                        className="text-dark font-weight-bold"
                        to={'/profile/lecturer/' + i.value}
                      >
                        {i.label}
                      </Link>
                    ))
                    .reduce((prev, curr) => [prev, ', ', curr])
                : ''}
            </>
          );
        },
        style: {
          minWidth: '200px',
        },
      },
    ]
  );

  if (role === 'admin') {
    cols.push(
      ...[
        {
          dataField: 'note',
          text: 'Note',
          style: {
            minWidth: '200px',
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
      ]
    );
  }

  return columnsTransformer(cols);
};
