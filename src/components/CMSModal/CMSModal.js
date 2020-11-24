import SelectBox from 'components/SelectBox/SelectBox';
import CreateableTagInput from 'components/TagInput/CreateableTagInput';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import SelectTagInput from '../TagInput/SelectTagInput';

const CMSModal = ({
  isShowFlg = false,
  onHide = () => {},
  title = '',
  subTitle = '',
  primaryButtonLabel = 'Create',
  secondaryButtonLabel = 'Close',
  onConfirmForm = () => {},
  fieldTemplate = {},
  configs = [],
}) => {
  const [modalFieldData, setModalFieldData] = React.useState({});

  const handleOnSubmitForm = React.useCallback(event => {
    event.preventDefault();
  }, []);

  const handleOnChangeFields = React.useCallback(
    (value, fieldName) => {
      setModalFieldData({
        ...modalFieldData,
        [fieldName]: value,
      });
    },
    [setModalFieldData, modalFieldData]
  );

  React.useEffect(() => {
    setModalFieldData(fieldTemplate);
  }, [fieldTemplate]);

  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {title}
          <small className="form-text text-muted">{subTitle}</small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="test-form" onSubmit={handleOnSubmitForm}>
          {configs.map(config => {
            switch (config.type) {
              case 'text':
                return (
                  <Form.Group as={Row} key={config.label}>
                    <Form.Label column sm={3}>
                      {config.label}
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="text"
                        placeholder={config.placeholder}
                        value={modalFieldData[config.name]}
                        defaultValue={config.defaultValue}
                        name={config.name}
                        onChange={event =>
                          handleOnChangeFields(
                            event.currentTarget.value,
                            config.name
                          )
                        }
                      />
                      <small className="form-text text-muted">
                        {config.smallLabel}
                      </small>
                    </Col>
                  </Form.Group>
                );
              case 'number':
                return (
                  <Form.Group as={Row} key={config.label}>
                    <Form.Label column sm={3}>
                      {config.label}
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="number"
                        placeholder={config.placeholder}
                        value={modalFieldData[config.name]}
                        defaultValue={config.defaultValue}
                        name={config.name}
                        onChange={event =>
                          handleOnChangeFields(
                            event.currentTarget.value,
                            config.name
                          )
                        }
                      />
                      <small className="form-text text-muted">
                        {config.smallLabel}
                      </small>
                    </Col>
                  </Form.Group>
                );
              case 'date':
                return (
                  <Form.Group as={Row} key={config.label}>
                    <Form.Label column sm={3}>
                      {config.label}
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="date"
                        placeholder={config.placeholder}
                        value={modalFieldData[config.name]}
                      />
                      <small className="form-text text-muted">
                        {config.smallLabel}
                      </small>
                    </Col>
                  </Form.Group>
                );
              case 'selectBox':
                return (
                  <Form.Group as={Row} key={config.label}>
                    <Form.Label column sm={3}>
                      {config.label}
                    </Form.Label>
                    <Col sm={9}>
                      <SelectBox
                        onChange={event =>
                          handleOnChangeFields(event, config.name)
                        }
                        options={config.options}
                        value={modalFieldData[config.name]}
                      />
                      <small className="form-text text-muted">
                        {config.smallLabel}
                      </small>
                    </Col>
                  </Form.Group>
                );
              case 'toggle':
                return (
                  <Form.Group as={Row} key={config.label}>
                    <Form.Label column sm={3}>
                      {config.label}
                    </Form.Label>
                    <Col sm={9}>
                      <ToggleSwitch
                        onChange={event =>
                          handleOnChangeFields(
                            event.currentTarget.checked,
                            config.name
                          )
                        }
                        isActive={modalFieldData[config.name]}
                      />
                      <small className="form-text text-muted">
                        {config.smallLabel}
                      </small>
                    </Col>
                  </Form.Group>
                );
              case 'file':
                return (
                  <Form.Group as={Row} key={config.label}>
                    <Form.Label column sm={3}>
                      {config.label}
                    </Form.Label>
                    <Col sm={9}>
                      <Form.File
                        onChange={event =>
                          handleOnChangeFields(
                            event.currentTarget.files,
                            config.name
                          )
                        }
                      />
                      <small className="form-text text-muted">
                        {config.smallLabel}
                      </small>
                    </Col>
                  </Form.Group>
                );
              case 'selectBoxAsync':
                return (
                  <Form.Group as={Row} key={config.label}>
                    <Form.Label column sm={3}>
                      {config.label}
                    </Form.Label>
                    <Col sm={9}>
                      <SelectTagInput
                        onChange={value =>
                          handleOnChangeFields(value, config.name)
                        }
                        isMulti={config.isMulti}
                        load={config.load}
                        value={modalFieldData[config.name]}
                      />
                      <small className="form-text text-muted">
                        {config.smallLabel}
                      </small>
                    </Col>
                  </Form.Group>
                );
              case 'creatableSelectBoxAsync':
                return (
                  <Form.Group as={Row} key={config.label}>
                    <Form.Label column sm={3}>
                      {config.label}
                    </Form.Label>
                    <Col sm={9}>
                      <CreateableTagInput
                        onChange={value =>
                          handleOnChangeFields(value, config.name)
                        }
                        load={config.load}
                        value={modalFieldData[config.name]}
                      />
                      <small className="form-text text-muted">
                        {config.smallLabel}
                      </small>
                    </Col>
                  </Form.Group>
                );
              default:
                return <></>;
            }
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {secondaryButtonLabel}
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={() => onConfirmForm(modalFieldData)}
          form="test-form"
        >
          {primaryButtonLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CMSModal;
