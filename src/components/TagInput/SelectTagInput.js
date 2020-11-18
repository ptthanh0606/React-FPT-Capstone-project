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
    backgroundColor: '#edf2f7',
    border: 'none',
    boxShadow: isFocused ? '0 0 0 2px #ffbb00' : 'none',
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? '#ffbb00'
        : isFocused
        ? '#edf2f7'
        : null,
      color: isDisabled ? '#757575' : '#00003b',
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
      backgroundColor: '#00003b',
      marginRight: 3,
      borderRadius: 3,
    };
  },
  multiValueLabel: styles => ({
    ...styles,
    color: '#ffbb00',
    padding: '0 6px 0 6px',
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: '#ffbb00',
    ':hover': {
      backgroundColor: '#ffbb00',
      color: '#00003b',
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
  placeholder,
  isMulti,
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
        isClearable={isClearable}
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
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
};

export default SelectTagInput;
