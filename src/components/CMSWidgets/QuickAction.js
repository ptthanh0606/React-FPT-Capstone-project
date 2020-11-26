import React from 'react';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '_metronic/_helpers';

const QuickAction = ({ className }) => {
  return (
    <div className={`card card-custom bg-white ${className}`}>
      <div className="card-header border-0 py-5 bg">
        <h3 className="card-title font-weight-bolder">Quick team actions</h3>
      </div>
      <div className="card-body p-0 position-relative overflow-hidden">
        <div className="card-spacer mt-n25">
          <div className="row m-0">
            <div className="col bg-light-warning px-6 py-8 rounded-xl mr-7 mb-7">
              <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                <SVG
                  src={toAbsoluteUrl('/media/svg/icons/Media/Equalizer.svg')}
                ></SVG>
              </span>
              <a
                href="/"
                className="text-warning font-weight-bold font-size-h6"
              >
                Join public team
              </a>
            </div>
            <div className="col bg-light-primary px-6 py-8 rounded-xl mb-7">
              <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                <SVG
                  src={toAbsoluteUrl(
                    '/media/svg/icons/Communication/Add-user.svg'
                  )}
                ></SVG>
              </span>
              <a
                href="/"
                className="text-primary font-weight-bold font-size-h6 mt-2"
              >
                Create team
              </a>
            </div>
          </div>
          <div className="row m-0">
            <div className="col bg-light-danger px-6 py-8 rounded-xl mr-7">
              <span className="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
                <SVG
                  src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')}
                ></SVG>
              </span>
              <a
                href="/"
                className="text-danger font-weight-bold font-size-h6 mt-2"
              >
                Join team with code
              </a>
            </div>
            <div className="col bg-light-success px-6 py-8 rounded-xl">
              <span className="svg-icon svg-icon-3x svg-icon-success d-block my-2">
                <SVG
                  src={toAbsoluteUrl(
                    '/media/svg/icons/Communication/Urgent-mail.svg'
                  )}
                ></SVG>
              </span>
              <a
                href="/"
                className="text-success font-weight-bold font-size-h6 mt-2"
              >
                ???
              </a>
            </div>
          </div>
        </div>

        <div className="resize-triggers">
          <div className="expand-trigger">
            <div style={{ width: '411px', height: '461px' }} />
          </div>
          <div className="contract-trigger" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(QuickAction);
