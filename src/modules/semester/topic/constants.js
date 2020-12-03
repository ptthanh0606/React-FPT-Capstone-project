import React from 'react';
import { Link } from 'react-router-dom';
import { columnsTransformer } from 'utils/common';

const statusClasses = ['warning', 'danger', 'success', 'primary', 'info'];
const statusTitles = ['Pending', 'Rejected', 'Approved', 'Ready', 'Matched'];
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
  },
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    smallLabel: 'Give this topic a name',
    placeholder: 'Name...',
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Description',
    smallLabel: 'Brief description for this topic',
    placeholder: 'Description...',
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
  },
  {
    name: 'maxMembers',
    type: 'number',
    label: 'Maximum team members',
    smallLabel: 'Maximum team member for this topic',
    placeholder: '4',
  },
  {
    name: 'department',
    type: 'selectBox',
    label: 'From department',
    smallLabel: 'Topic in which department',
    placeholder: 'Select a department',
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
    name: 'isByStudent',
    type: 'toggle',
    label: 'By student',
    smallLabel: 'Is this topic from student',
    isChecked: false,
  },
  {
    name: 'studentTeam',
    type: 'selectBoxAsync',
    label: 'Student team',
    smallLabel: 'Student team taking this topic',
    load: (studentInput, callback) => {
      setTimeout(() => {
        callback([
          {
            label: 'Phan Thong Thanh',
            value: 'Phan Thong Thanh',
          },
          {
            label: 'Tran Thai Trung',
            value: 'Tran Thai Trung',
          },
          {
            label: 'Nguyen Hoang Dung',
            value: 'Nguyen Hoang Dung',
          },
          {
            label: 'Le Huu Mon',
            value: 'Le Huu Mon',
          },
        ]);
      }, 2000);
    },
    isMulti: true,
  },
  {
    name: 'mentorGroup',
    type: 'selectBoxAsync',
    label: 'Mentor Group',
    smallLabel: 'Mentor group for this topic',
    load: (mentorInput, callback) => {
      setTimeout(() => {
        callback([
          {
            label: 'Huynh Duc Duy',
            value: 'Huynh Duc Duy',
          },
          {
            label: 'Tran Tuan Anh',
            value: 'Tran Tuan Anh',
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
    name: 'keywords',
    type: 'creatableSelectBoxAsync',
    label: 'Keywords',
    smallLabel: 'Some keywords for this topic',
    load: (keyword, callback) => {
      setTimeout(() => {
        callback([
          {
            label: 'capstone',
            value: 'capstone',
          },
          {
            label: 'management',
            value: 'management',
          },
          {
            label: 'system',
            value: 'system',
          },
        ]);
      }, 2000);
    },
  },
  {
    name: 'attachment',
    type: 'file',
    label: 'Attachment',
    smallLabel: '.pdf, .docx',
  },
];

export const createColumns = ({ handleEdit, handleRemove }) => {
  return columnsTransformer([
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
    },
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
      sort: true,
      formatter: function StatusColumnFormatter(cellContent, row) {
        return (
          <div
            className="text-dark font-weight-bold"
            data-id={row.id}
            onClick={handleEdit}
          >
            <div>
              <div className="text-nowrap text-dark-75 font-weight-bolder font-size-lg mb-0">
                {row.name}
              </div>
              <span className="text-muted font-weight-bold text-hover-primary">
                {row.abstract}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      dataField: 'attachment',
      text: 'Detail',
      formatter: (cellContent, row) => {
        return (
          <a
            href="null"
            title="Download"
            className="btn btn-icon btn-light btn-hover-primary btn-sm"
            onClick={event => {
              event.preventDefault();
            }}
          >
            <i className="fas fa-download my-2"></i>
          </a>
        );
      },
    },
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
                      className="text-dark font-weight-bold"
                      to={'/profile/student/' + i.value}
                    >
                      {i.label}
                    </Link>
                  ))
                  .reduce((prev, curr) => [prev, ', ', curr])
              : ''}
          </>
        );
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
    },
    {
      dataField: 'note',
      text: 'Note',
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
};
