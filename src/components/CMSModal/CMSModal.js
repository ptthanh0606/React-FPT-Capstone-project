import React from 'react';
import { Form, Modal } from 'react-bootstrap';
import Button from 'components/Button';
import FormGroups from './FormGroups';

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
  isProcessing = false,
}) => {
  const [modalFieldData, setModalFieldData] = React.useState({});

  const handleOnSubmitForm = React.useCallback(event => {
    event.preventDefault();
  }, []);

  const handleChangeFields = React.useCallback(
    (value, fieldName) => {
      setModalFieldData(modalFieldData => ({
        ...modalFieldData,
        [fieldName]: value,
      }));
    },
    [setModalFieldData]
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
      <Modal.Body style={{}}>
        <Form id="test-form" onSubmit={handleOnSubmitForm}>
          {configs.map(config => (
            <FormGroups
              {...config}
              key={config.label}
              type={config.type}
              config={config}
              value={modalFieldData[config.name]}
              handleChangeFields={handleChangeFields}
            />
          ))}
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
          isLoading={isProcessing}
        >
          {primaryButtonLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(CMSModal);
