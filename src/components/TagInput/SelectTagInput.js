import React from 'react';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import { components } from 'react-select';

const animatedComponents = makeAnimated();

const colourStyles = {
  menuPortal: base => ({ ...base, zIndex: 9999 }),
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

const Option = props => {
  console.log(props.data);
  if (props.selectProps.lecturer === true)
    return (
      <div
        style={{
          ...props.getStyles('option', props),
          display: 'flex',
          flexDirection: 'column',
        }}
        class
        ref={(props, props.innerRef)}
        {...props.innerProps}
      >
        <div>
          {props.label} <span className="text-muted">[{props.data.name}]</span>
        </div>
        <span className="text-muted">{props.data.email}</span>
      </div>
    );

  if (props.selectProps.student === true)
    return (
      <div
        style={{
          ...props.getStyles('option', props),
          display: 'flex',
          flexDirection: 'column',
        }}
        class
        ref={(props, props.innerRef)}
        {...props.innerProps}
      >
        <div>{props.label}</div>
        <div className="text-muted">{props.data.email}</div>
      </div>
    );

  if (props.selectProps.department === true)
    return (
      <div
        style={{
          ...props.getStyles('option', props),
          display: 'flex',
          flexDirection: 'column',
        }}
        class
        ref={(props, props.innerRef)}
        {...props.innerProps}
      >
        <div>{props.label}</div>
        <div className="text-muted">{props.data.name}</div>
      </div>
    );

  if (props.selectProps.team === true)
    return (
      <div
        style={{
          ...props.getStyles('option', props),
          display: 'flex',
          flexDirection: 'column',
        }}
        class
        ref={(props, props.innerRef)}
        {...props.innerProps}
      >
        <div className="mb-1">
          {props.label}{' '}
          <span className="text-muted">[{props.data.department}]</span>
        </div>
        <div className="d-flex flex-wrap">
          {props.data.members.map(e => (
            <div className="label label-inline label-warning text-white mr-2 mb-1">
              {'[' + e.code + '] ' + e.name}
              <span className="ml-1">
                {e.id === props.leaderId ? 'leader' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    );

  if (props.selectProps.council === true)
    return (
      <div
        style={{
          ...props.getStyles('option', props),
          display: 'flex',
          flexDirection: 'column',
        }}
        class
        ref={(props, props.innerRef)}
        {...props.innerProps}
      >
        <div className="mb-1">{props.label} </div>
        <div className="d-flex flex-wrap">
          {props.data.members.map(e => (
            <div className="label label-inline label-warning text-white mr-2 mb-1">
              {e.code}
            </div>
          ))}
        </div>
      </div>
    );

  return <components.Option {...props} />;
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
  ...rest
}) => {
  return (
    <>
      {hasLabel && (
        <label className="block text-base text-gray-600" htmlFor={id}>
          {label}
        </label>
      )}
      <AsyncSelect
        {...rest}
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
        cacheOptions
        defaultOptions
        loadOptions={load}
        createOptionPosition="first"
        allowCreateWhileLoading={true}
        isClearable={isClearable && !readOnly}
        isSearchable={!readOnly}
        openMenuOnClick={!readOnly}
        components={{ Option }}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
};

export default React.memo(SelectTagInput);
