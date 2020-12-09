import React from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import md5 from 'utils/md5';

const GroupMember = ({
  id = '',
  role = '',
  className = '',
  label = '',
  subLabel = '',
  email = '',
  booleanFlg,
  value,
}) => {
  const [textBoxValue, setTextBoxValue] = React.useState(value);

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
              data-weight={textBoxValue}
              data-weight-id={id}
              onChange={e => setTextBoxValue(e.currentTarget.value)}
            />
          </div>
        );
      }
    }
    return el;
  }, [booleanFlg, id, role, textBoxValue, value]);

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
          <Link
            to={`/profile/${role}/${id}`}
            className="text-dark text-hover-primary mb-1 font-size-lg"
          >
            {label}
          </Link>
          <span className="text-muted">{subLabel}</span>
        </div>
      </div>
      {rowTool()}
    </div>
  );
};

export default React.memo(GroupMember);
