import React, { useRef } from 'react';
import { Dropdown } from 'react-bootstrap';

const DropdownPopover = ({
  isShow = false,
  value = 'Submited',
  items = [
    {
      label: 'Submited',
      value: 'Submited',
    },
    {
      label: 'Mentoring',
      value: 'Mentoring',
    },
  ],
  onChange = () => {},
  baseColor = 'light',
}) => {
  const [selected, setSelected] = React.useState(value);
  const dropRef = useRef(null);

  // --------------------------------------------------------------

  const handleSelectItem = React.useCallback(
    e => {
      e.preventDefault();
      setSelected(e.currentTarget.getAttribute('data-label'));
      onChange(e.currentTarget.getAttribute('data-value'));
      dropRef.current.click();
    },
    [onChange]
  );

  // --------------------------------------------------------------

  return (
    <Dropdown
      id="cms-topic-choose"
      className="dropdown-inline"
      drop="down"
      alignRight
      ref={dropRef}
    >
      <Dropdown.Toggle
        id="dropdown-toggle-top2"
        variant="transparent"
        className={`btn btn-${baseColor} btn-sm font-weight-bolder dropdown-toggle`}
      >
        {selected}
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
        <ul className="navi navi-hover">
          <li className="navi-header pb-1">
            <span className="text-primary text-uppercase font-weight-bold font-size-sm">
              Select filter
            </span>
          </li>
          {items.length &&
            items.map(item => (
              <li className="navi-item" key={item.value}>
                <a
                  href="/"
                  onClick={handleSelectItem}
                  data-label={item.label}
                  data-value={item.value}
                  className="navi-link"
                >
                  <span className="navi-icon">
                    <i className="flaticon2-shopping-cart-1"></i>
                  </span>
                  <span className="navi-text">{item.label}</span>
                </a>
              </li>
            ))}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default React.memo(DropdownPopover);
