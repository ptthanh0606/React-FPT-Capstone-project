import React from 'react';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const colourStyles = {
  container: styles => ({
    ...styles,
  }),
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: !isFocused ? '#f3f6f9' : '#ebedf3',
    border: 'none',
    boxShadow: isFocused ? '0 0 0 2px #69b3ff' : 'none',
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? '#3699ff'
        : isFocused
        ? '#f3f6f9'
        : null,
      color: isDisabled ? '#757575' : isSelected ? '#fff' : '#00003b',
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: isDisabled ? '#fff' : '#e2e8f0',
      },
    };
  },
  multiValue: styles => {
    return {
      ...styles,
      backgroundColor: '#3699ff',
      marginRight: 3,
      borderRadius: 3,
    };
  },
  multiValueLabel: styles => ({
    ...styles,
    color: '#fff',
    padding: '5px 6px 5px 6px',
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: '#fff',
    backgroundColor: '#3699ff',
    ':hover': {
      backgroundColor: '#fff',
      color: '#3699ff',
    },
  }),
};

// Creatable, async, multi-select
const SelectTagInput = ({
  onChange = function () {},
  k = '',
  hasLabel = false,
  label = '',
  id,
  required = false,
  value = '',
  name = '',
  autofocus = false,
  error = '',
  load = function () {},
  isClearable = true,
  placeholder = '',
  isMulti = false,
  readOnly = false,
}) => {
  return (
    <>
      {hasLabel && (
        <label className="block text-base text-gray-600" htmlFor={id}>
          {label}
        </label>
      )}

      <AsyncSelect
        isMulti={isMulti} // Not sure
        placeholder={placeholder}
        k={k}
        id={id}
        required={required}
        aria-label={label}
        value={value}
        autoFocus={autofocus}
        onChange={onChange}
        name={name}
        styles={colourStyles}
        components={animatedComponents}
        cacheOptions
        defaultOptions
        loadOptions={load}
        createOptionPosition="first"
        allowCreateWhileLoading={true}
        isClearable={isClearable && !readOnly}
        isSearchable={!readOnly}
        openMenuOnClick={!readOnly}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
};

export default React.memo(SelectTagInput);
