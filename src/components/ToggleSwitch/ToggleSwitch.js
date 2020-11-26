import React from 'react';

const ToggleSwitch = React.memo(
  ({ onChange = function () {}, isActive = false }) => {
    return (
      <span className="switch switch-success switch-sm">
        <label>
          <input type="checkbox" checked={isActive} onChange={onChange} />
          <span></span>
        </label>
      </span>
    );
  }
);

export default ToggleSwitch;
