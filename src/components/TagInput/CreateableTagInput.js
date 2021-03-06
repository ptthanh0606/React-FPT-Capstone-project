import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
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
    boxShadow: isFocused ? '0 0 0 2px #69b3ff' : 'none',
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? '#69b3ff'
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
      backgroundColor: 'rgba(0, 184, 217, 0.1)',
      marginRight: 3,
      borderRadius: 3,
    };
  },
  multiValueLabel: styles => ({
    ...styles,
    color: 'rgb(0, 184, 217)',
    padding: '5px 6px 5px 6px',
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: 'rgb(0, 184, 217)',
    ':hover': {
      backgroundColor: '#69b3ff',
      color: '#00003b',
    },
  }),
};

// Creatable, async, multi-select
const CreateableTagInput = ({
  onChange = function () {},
  k = '',
  hasLabel = false,
  label = '',
  id,
  required = false,
  value,
  name = '',
  autofocus = false,
  error = '',
  load = function () {},
  readOnly = false,
}) => {
  return (
    <>
      {hasLabel && (
        <label className="block text-base text-gray-600" htmlFor={id}>
          {label}
        </label>
      )}

      <AsyncCreatableSelect
        k={k}
        id={id}
        required={required}
        aria-label={label}
        value={value}
        autoFocus={autofocus}
        onChange={onChange}
        name={name}
        isMulti
        styles={colourStyles}
        components={animatedComponents}
        cacheOptions
        defaultOptions
        loadOptions={load}
        createOptionPosition="first"
        allowCreateWhileLoading={true}
        isClearable={!readOnly}
        isSearchable={!readOnly}
        openMenuOnClick={!readOnly}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
};

export default React.memo(CreateableTagInput);
