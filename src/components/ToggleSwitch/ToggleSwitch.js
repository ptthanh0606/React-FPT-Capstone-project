import React from 'react';

const ToggleSwitch = ({ onChange = function () {}, name }) => {
  return (
    <span className="switch switch-success switch-sm">
      <label>
        <input type="checkbox" onChange={onChange} name={name} />
        <span></span>
      </label>
    </span>
  );
};

export default ToggleSwitch;
