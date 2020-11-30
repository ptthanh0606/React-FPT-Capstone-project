import React from 'react';
import SVG from 'react-inlinesvg';
import { useHistory } from 'react-router-dom';
import { toAbsoluteUrl } from '_metronic/_helpers';

const ApplicationRow = ({
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
    <div className={'d-flex align-items-center mb-10 ' + className}>
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
          <SVG src={toAbsoluteUrl('/media/svg/icons/General/Smile.svg')}></SVG>
        </span>{' '}
        {buttonLabel}
      </button>
      <button
        type="button"
        className="btn btn-light-danger font-weight-bold btn-sm "
        onClick={onReject}
      >
        <span class="svg-icon svg-icon-red">
          <SVG src={toAbsoluteUrl('/media/svg/icons/General/Sad.svg')}></SVG>
        </span>{' '}
        {buttonLabel}
      </button>
    </div>
  );
};

export default ApplicationRow;
