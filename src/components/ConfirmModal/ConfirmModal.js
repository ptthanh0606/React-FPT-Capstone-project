import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'components/Button';

const ConfirmRemoveModal = ({
  title = 'Confirm on removal',
  body,
  isShowFlg,
  onHide,
  onConfirm,
  isProcessing = false,
}) => {
  return (
    <Modal
      size="lg"
      show={isShowFlg}
      onHide={onHide}
      centered
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          I changed my mind
        </Button>
        <Button variant="primary" onClick={onConfirm} isLoading={isProcessing}>
          Sure
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmRemoveModal;
