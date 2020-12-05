import React from 'react';

const TextInputSecondary = ({
  setFieldValue,
  handleBlur,
  value,
  smallText,
  placeholder,
  name,
  type,
  withIcon,
}) => {
  const switchTypeInput = React.useCallback(() => {
    switch (type) {
      case 'search':
        return (
          <span>
            <i class="flaticon2-search-1 text-muted"></i>
          </span>
        );
      default:
        return <></>;
    }
  }, [type]);

  return (
    <>
      <div className={withIcon && 'input-icon'}>
        <input
          type="text"
          className="form-control form-control-md form-control-solid"
          name={name}
          placeholder={placeholder}
          onBlur={handleBlur}
          value={value}
          onChange={e => {
            setFieldValue(e.target.value);
          }}
        />
        {withIcon && switchTypeInput()}
      </div>
      <small className="form-text text-muted">{smallText}</small>
    </>
  );
};

export default TextInputSecondary;
