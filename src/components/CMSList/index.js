import React from 'react';
import SVG from 'react-inlinesvg';
import { useHistory } from 'react-router-dom';
import { toAbsoluteUrl } from '_metronic/_helpers';

const CMSList = ({
  className,
  label,
  subLabel,
  onApprove,
  onReject,
  buttonLabel,
}) => {
  const history = useHistory();

  const handleRoutToTeam = React.useCallback(
    event => {
      event.preventDefault();
      history.push('/team/0');
    },
    [history]
  );

  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-header border-0">
        <h3 className="card-title font-weight-bolder text-dark">
          Assigned team
        </h3>
      </div>
      <div className="card-body pt-2">
        <div className={'d-flex align-items-center mb-5 ' + className}>
          <div className="symbol symbol-40 symbol-light-success mr-5">
            <span className="symbol-label">
              <SVG
                className="h-75 align-self-end"
                src={toAbsoluteUrl('/media/svg/avatars/006-girl-3.svg')}
              ></SVG>
            </span>
          </div>
          <div className="d-flex flex-column flex-grow-1 font-weight-bold">
            <a
              href="/"
              className="text-dark text-hover-primary mb-1 font-size-lg"
              onClick={handleRoutToTeam}
            >
              {label}
            </a>
            <span className="text-muted">
              Lead by{' '}
              <span className="text-muted font-weight-bolder">{subLabel}</span>
            </span>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-success font-weight-bold btn-sm mr-2"
            onClick={onApprove}
          >
            <span class="svg-icon svg-icon-white">
              <SVG
                src={toAbsoluteUrl('/media/svg/icons/General/Smile.svg')}
              ></SVG>
            </span>{' '}
            {buttonLabel}
          </button>
          <button
            type="button"
            className="btn btn-light-danger font-weight-bold btn-sm "
            onClick={onReject}
          >
            <span class="svg-icon svg-icon-red">
              <SVG
                src={toAbsoluteUrl('/media/svg/icons/General/Sad.svg')}
              ></SVG>
            </span>{' '}
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CMSList;
