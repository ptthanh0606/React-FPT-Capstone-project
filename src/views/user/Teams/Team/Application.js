import React from 'react';
import { toAbsoluteUrl } from '_metronic/_helpers/AssetsHelpers';
import SVG from 'react-inlinesvg';

const Application = () => {
  return (
    <tr>
      <td className="pl-4">
        <a
          href="#"
          className="text-dark-75 text-nowrap font-weight-bolder text-hover-primary mb-1 font-size-lg"
        >
          Capstone Management System for FPT University
        </a>
        <div>
          <a className="text-muted font-weight-bold text-hover-primary">
            Hệ thống quản lý các đồ án của sinh viên ở trường đại học FPT.
          </a>
        </div>
      </td>
      <td className="text-left pl-0">
        <span className="text-muted font-weight-500">1/11/1111</span>
      </td>
      <td className="text-left pl-0">
        <span className="label label-lg label-light-primary label-inline">
          Approved
        </span>
      </td>
      <td className="text-left pl-0">
        <a href="#" className="btn btn-icon btn-light btn-sm">
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')}
            ></SVG>
          </span>
        </a>
      </td>
    </tr>
  );
};

export default Application;
