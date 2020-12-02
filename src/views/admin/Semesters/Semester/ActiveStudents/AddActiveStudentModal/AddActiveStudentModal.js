import React from 'react';
import Table from 'components/Table';
import Filters from 'views/admin/Students/Filters';
import { useParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import request from 'utils/request';
import { handleErrors } from 'utils/common';
import * as endpoints from 'endpoints';

import * as transformers from 'views/admin/Students/transformers';
import * as constants from 'views/admin/Students/constants';
import { Modal } from 'react-bootstrap';
import Button from 'components/Button';

const AddActiveStudentModal = ({ isShowFlg, onHide, onAdd }) => {
  const { id: semId } = useParams();
  const [l, loadData] = React.useReducer(() => ({}), {});

  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [filters, setFilters] = React.useState({});
  const [debouncedFilters] = useDebounce(filters, 500);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(
    constants.sizePerPageList[0].value
  );
  const [sortField, setSortField] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  // ---------------------------------------------------------------------------

  const columns = React.useMemo(() => constants.createColumns({}), []);

  // ---------------------------------------------------------------------------

  React.useEffect(() => {
    setIsLoading(true);
    const source = {};

    request({
      to: endpoints.LIST_ACTIVE_STUDENTS(semId).url,
      method: endpoints.LIST_ACTIVE_STUDENTS(semId).method,
      params: {
        ...debouncedFilters,
        pageNumber: page,
        pageSize: pageSize,
        sortField: sortField,
        sortOrder: sortOrder,
        isActive: false,
      },
      source,
    })
      .then(res => {
        setData(res.data?.data?.map(transformers.down));
        setTotal(res.data?.totalRecords);
        setPage(res.data?.pageNumber);
        setPageSize(res.data?.pageSize);
        setIsLoading(false);
      })
      .catch(err => {
        handleErrors(err);
        if (!err.isCancel) setIsLoading(false);
      });

    return () => {
      source.cancel();
    };
  }, [l, debouncedFilters, page, pageSize, sortField, sortOrder, semId]);

  const handleAddStudent = () => {
    setIsProcessing(true);
    onAdd(selected).finally(() => setIsProcessing(false));
  };

  const onHideModal = React.useCallback(() => {
    setFilters({});
    setSelected([]);
    setPage(1);
    setPageSize(constants.sizePerPageList[0].value);
    onHide();
  }, [onHide]);

  React.useEffect(() => {
    if (isShowFlg) {
      loadData();
    }
  }, [isShowFlg]);

  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHideModal}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Available students
          <small className="form-text text-muted">
            Add students to this capstone semester
          </small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Filters filters={filters} setFilters={setFilters} />
        <Table
          columns={columns}
          data={data}
          total={total}
          isLoading={isLoading}
          selected={selected}
          setSelected={setSelected}
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

export default AddActiveStudentModal;
