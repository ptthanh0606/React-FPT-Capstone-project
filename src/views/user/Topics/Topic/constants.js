import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import Button from 'components/Button';
import { toAbsoluteUrl } from '_metronic/_helpers';

export const rowActionFormatter = (handleApproveTeam, handleRejectTeam) => {
  return (
    <>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip>Approve selected team</Tooltip>}
      >
        <Button
          className="btn btn-primary btn-success font-weight-bold btn-sm mr-2"
          onClick={handleApproveTeam}
        >
          <span class="svg-icon mr-0">
            <SVG
              src={toAbsoluteUrl('/media/svg/icons/General/Smile.svg')}
            ></SVG>
          </span>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip>Reject selected team</Tooltip>}
      >
        <Button
          className="btn btn-light-danger font-weight-bold btn-sm "
          onClick={handleRejectTeam}
        >
          <span class="svg-icon mr-0 svg-icon-red">
            <SVG src={toAbsoluteUrl('/media/svg/icons/General/Sad.svg')}></SVG>
          </span>
        </Button>
      </OverlayTrigger>
    </>
  );
};

export const SETTING_MODAL_CONFIG = [
  {
    name: 'topicCode',
    type: 'text',
    label: 'Topic Code',
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
    type: 'text',
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
    name: 'minMem',
    type: 'number',
    label: 'Minimum team members',
    smallLabel: 'Minimum team member for this topic',
    placeholder: '0',
  },
  {
    name: 'maxMem',
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
    load: (mentorInput, callback) => {
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
