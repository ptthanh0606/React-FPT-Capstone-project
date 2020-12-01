import React from 'react';

const ToggleSwitch = React.memo(
  ({
    onChange = function () {},
    isActive = false,
    className = 'switch-success',
  }) => {
    return (
      <span className={'switch switch-sm ' + className}>
        <label>
          <input type="checkbox" checked={isActive} onChange={onChange} />
          <span></span>
        </label>
      </span>
    );
  }
);

export default ToggleSwitch;
