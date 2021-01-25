import React from 'react';
import Table from 'components/Table';

import { Form } from 'react-bootstrap';
import * as constants from 'modules/student/constants';
import { Modal } from 'react-bootstrap';
import Button from 'components/Button';

const Import = ({ isShowFlg, onHide, onAdd, data, nonSelectable = [] }) => {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(
    constants.sizePerPageList[0].value
  );
  const [sortField, setSortField] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // ---------------------------------------------------------------------------

  const columns = React.useMemo(() => constants.createBaseColumns(), []);

  // ---------------------------------------------------------------------------

  const handleAddStudent = React.useCallback(() => {
    setIsProcessing(true);
    onAdd(selected).finally(() => {
      setIsProcessing(false);
      setSelected([]);
    });
  }, [onAdd, selected]);

  const onHideModal = React.useCallback(() => {
    setSelected([]);
    setPage(1);
    setPageSize(constants.sizePerPageList[0].value);
    onHide();
  }, [onHide]);

  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHideModal}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Students to import
          <small className="form-text text-muted">
            Add students to the system
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table
          columns={columns}
          data={data}
          total={data?.length || 0}
          isLoading={false}
          selected={selected}
          setSelected={setSelected}
          nonSelectable={nonSelectable}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          sortField={sortField}
          setSortField={setSortField}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          defaultSorted={constants.defaultSorted}
          pageSizeList={constants.sizePerPageList}
          selectable
          clientPagination={true}
        />
        <Form.Control
          as="textarea"
          className="form-control form-control-md form-control-solid"
          style={{ marginTop: 15 }}
          rows="6"
          readonly
          type="text"
          value={
            "[Row 1] Student already exist\n[Row 2] Invalid department 'VL'"
          }
          name={''}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHideModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleAddStudent}
          isLoading={isProcessing}
        >
          Add ({selected.length}) selected
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Import;
