import SelectBox from 'components/SelectBox/SelectBox';
import CreateableTagInput from 'components/TagInput/CreateableTagInput';
import SelectTagInput from 'components/TagInput/SelectTagInput';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const FormGroups = ({ config, value, handleChangeFields, type }) => {
  const handleChange = React.useCallback(
    event => {
      handleChangeFields(event.currentTarget.value, config.name);
    },
    [config.name, handleChangeFields]
  );

  switch (type) {
    case 'text':
      return (
        <Form.Group as={Row}>
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
              onChange={handleChange}
            />
            <small className="form-text text-muted">{config.smallLabel}</small>
          </Col>
        </Form.Group>
      );
    case 'email':
      return (
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            {config.label}
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="email"
              placeholder={config.placeholder}
              value={value}
              defaultValue={config.defaultValue}
              name={config.name}
              onChange={handleChange}
            />
            <small className="form-text text-muted">{config.smallLabel}</small>
          </Col>
        </Form.Group>
      );
    case 'number':
      return (
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            {config.label}
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              placeholder={config.placeholder}
              value={value}
              defaultValue={config.defaultValue}
              name={config.name}
              onChange={handleChange}
            />
            <small className="form-text text-muted">{config.smallLabel}</small>
          </Col>
        </Form.Group>
      );
    case 'date':
      return (
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            {config.label}
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="date" value={value} onChange={handleChange} />
            <small className="form-text text-muted">{config.smallLabel}</small>
          </Col>
        </Form.Group>
      );
    case 'datetime-local':
      return (
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            {config.label}
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="datetime-local"
              value={value}
              onChange={handleChange}
            />
            <small className="form-text text-muted">{config.smallLabel}</small>
          </Col>
        </Form.Group>
      );
    case 'selectBox':
      return (
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            {config.label}
          </Form.Label>
          <Col sm={9}>
            <SelectBox
              onChange={event => handleChangeFields(event, config.name)}
              options={config.options}
              value={value}
            />
            <small className="form-text text-muted">{config.smallLabel}</small>
          </Col>
        </Form.Group>
      );
    case 'toggle':
      return (
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            {config.label}
          </Form.Label>
          <Col sm={9}>
            <ToggleSwitch
              onChange={event =>
                handleChangeFields(event.currentTarget.checked, config.name)
              }
              isActive={value}
            />
            <small className="form-text text-muted">{config.smallLabel}</small>
          </Col>
        </Form.Group>
      );
    case 'file':
      return (
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            {config.label}
          </Form.Label>
          <Col sm={9}>
            <Form.File
              onChange={event =>
                handleChangeFields(event.currentTarget.files, config.name)
              }
            />
            <small className="form-text text-muted">{config.smallLabel}</small>
          </Col>
        </Form.Group>
      );
    case 'selectBoxAsync':
      return (
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            {config.label}
          </Form.Label>
          <Col sm={9}>
            <SelectTagInput
              onChange={value => handleChangeFields(value, config.name)}
              isMulti={config.isMulti}
              load={config.load}
              value={value}
            />
            <small className="form-text text-muted">{config.smallLabel}</small>
          </Col>
        </Form.Group>
      );
    case 'creatableSelectBoxAsync':
      return (
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            {config.label}
          </Form.Label>
          <Col sm={9}>
            <CreateableTagInput
              onChange={value => handleChangeFields(value, config.name)}
              load={config.load}
              value={value}
            />
            <small className="form-text text-muted">{config.smallLabel}</small>
          </Col>
        </Form.Group>
      );
    default:
      return <></>;
  }
};

export default React.memo(FormGroups);
