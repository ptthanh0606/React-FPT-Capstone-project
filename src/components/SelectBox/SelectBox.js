import React from 'react';

const SelectBox = ({ placeholder, options, onChange, value }) => {
  return (
    <select
      className="form-control form-control-solid"
      name="status"
      placeholder={placeholder}
      onChange={e => {
        onChange(e.target.value);
      }}
      value={value}
    >
      {options.length &&
        options.map(option => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
};

export default SelectBox;
