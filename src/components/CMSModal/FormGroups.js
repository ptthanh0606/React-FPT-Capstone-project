import SelectBox from 'components/SelectBox/SelectBox';
import CreateableTagInput from 'components/TagInput/CreateableTagInput';
import SelectTagInput from 'components/TagInput/SelectTagInput';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import { Col, Form, Row } from 'react-bootstrap';
import MarkdownIt from 'markdown-it';

const mdParser = new MarkdownIt();

const FormGroups = ({
  config = {},
  value = '',
  handleChangeFields = function () {},
  type = '',
}) => {
  const handleChange = React.useCallback(
    event => {
      handleChangeFields(event.currentTarget.value, config.name);
    },
    [config.name, handleChangeFields]
  );

  const handleEditorChange = React.useCallback(
    event => {
      handleChangeFields(event.text, config.name);
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
              {...config}
              type="text"
              className="form-control form-control-md form-control-solid"
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
    case 'textarea':
      return (
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            {config.label}
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              {...config}
              as="textarea"
              className="form-control form-control-md form-control-solid"
              rows="4"
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
    case 'markdown':
      return (
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            {config.label}
          </Form.Label>
          <Col sm={9}>
            <MdEditor
              style={{ height: '200px' }}
              value={value}
              defaultValue={config.defaultValue}
              renderHTML={text => mdParser.render(text)}
              onChange={handleEditorChange}
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
              {...config}
              type="email"
              className="form-control form-control-md form-control-solid"
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
              {...config}
              type="number"
              className="form-control form-control-md form-control-solid"
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
            <Form.Control
              {...config}
              type="date"
              className="form-control form-control-md form-control-solid"
              value={value}
              onChange={handleChange}
            />
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
              {...config}
              type="datetime-local"
              className="form-control form-control-md form-control-solid"
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
              {...config}
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
              {...config}
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
              {...config}
              label={undefined}
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
              {...config}
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
              {...config}
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
