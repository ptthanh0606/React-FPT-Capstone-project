import React from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import md5 from 'utils/md5';

const GroupMember = ({
  id,
  role,
  className,
  label,
  subLabel,
  email,
  booleanFlg,
  value,
}) => {
  const history = useHistory();
  const [textBoxValue, setTextBoxValue] = React.useState(value);

  const handleClick = React.useCallback(
    e => {
      e.preventDefault();
      history.push(`/profile/${role}/${id}`);
    },
    [history, id, role]
  );

  const rowTool = React.useCallback(() => {
    let el = <></>;

    if (role === 'lecturer') {
      if (!booleanFlg) {
        el = (
          <div className="d-flex justify-content-center flex-column font-weight-bold">
            <span>Weight</span>
            <span className="text-muted">{value}</span>
          </div>
        );
      } else {
        el = (
          <div className="d-flex justify-content-center flex-column font-weight-bold">
            <Form.Control
              type="number"
              value={textBoxValue}
              className="form-control form-control-solid"
              style={{ width: '80px' }}
            />
          </div>
        );
      }
    }
    return el;
  }, [booleanFlg, role, textBoxValue, value]);

  return (
    <div className={'d-flex justify-content-between mb-5 ' + className}>
      <div className="d-flex align-items-center">
        <div className="symbol spymbol-40 symbol-light-success mr-5">
          <div
            className="symbol-label"
            style={{
              backgroundImage: `url(https://www.gravatar.com/avatar/${md5(
                email ? email.toLowerCase() : ''
              )})`,
            }}
          ></div>
        </div>
        <div className="d-flex flex-column font-weight-bold">
          <a
            onClick={handleClick}
            href="/"
            className="text-dark text-hover-primary mb-1 font-size-lg"
          >
            {label}
          </a>
          <span className="text-muted">{subLabel}</span>
        </div>
      </div>
      {rowTool()}
    </div>
  );
};

export default React.memo(GroupMember);
