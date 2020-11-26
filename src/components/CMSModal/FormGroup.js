import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const FormGroup = ({ config, value, handleChangeFields }) => {
  const handleOnChange = React.useCallback(
    event => {
      console.log(event);
      handleChangeFields(event.currentTarget.value, config.name);
    },
    [config.name, handleChangeFields]
  );

  return (
    <Form.Group as={Row} key={config.label}>
      <Form.Label column sm={3}>
        {config.label}
      </Form.Label>
      <Col sm={9}>
        <Form.Control
          type="text"
          placeholder={config.placeholder}
          value={value}
          defaultValue={config.defaultValue}
          name={config.name}
          onChange={handleOnChange}
        />
        <small className="form-text text-muted">{config.smallLabel}</small>
      </Col>
    </Form.Group>
  );
};

export default React.memo(FormGroup);
