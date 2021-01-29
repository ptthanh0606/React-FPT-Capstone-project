import React from 'react';

import { Form, Modal } from 'react-bootstrap';
import Button from 'components/Button';

const Import = ({ isShowFlg, onHide, result }) => {
  return (
    <Modal
      size="xl"
      show={isShowFlg}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Import active student result
          <small className="form-text text-muted">
            Add active students to the semester
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          as="textarea"
          className="form-control form-control-md form-control-solid"
          rows="15"
          readonly
          type="text"
          value={result}
          name={''}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Import;
