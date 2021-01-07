import React from 'react';

const SelectBox = ({ placeholder, options, onChange, value, ...rest }) => {
  return (
    <select
      className="form-control form-control-md form-control-solid"
      name="status"
      placeholder={placeholder}
      onChange={e => {
        onChange(e.target.value);
      }}
      value={value}
      {...rest}
    >
      {options.length > 0 &&
        options.map(option => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
};

export default SelectBox;
