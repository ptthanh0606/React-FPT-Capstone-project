import React from 'react';

const SelectBox = ({ placeholder, options }) => {
  return (
    <select
      className="form-control form-control-solid"
      name="status"
      placeholder={placeholder}
      onChange={e => {
        // setFieldValue('status', e.target.value);
        // handleSubmit();
      }}
      // onBlur={handleBlur}
      // value={values.status}
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
