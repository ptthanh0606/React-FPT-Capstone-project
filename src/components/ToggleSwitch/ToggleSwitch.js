import React from 'react';

const ToggleSwitch = ({ onChange, isActive }) => {
  return (
    <span className="switch switch-success switch-sm">
      <label>
        <input type="checkbox" checked={isActive} onChange={onChange} />
        <span></span>
      </label>
    </span>
  );
};

export default ToggleSwitch;
