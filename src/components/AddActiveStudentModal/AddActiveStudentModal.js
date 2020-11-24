import Table from 'components/Table';
import TextInputSecondary from 'components/TextInput/TextInputSecondary';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { sortCaret, headerSortingClasses } from '_metronic/_helpers';

export const statusClasses = ['danger', 'info', 'success', ''];
export const statusTitles = ['Not in a team', 'Matching', 'Matched', ''];
export const defaultSorted = [{ dataField: 'id', order: 'asc' }];
export const sizePerPageList = [
  { text: '10', value: 10 },
  { text: '20', value: 20 },
  { text: '50', value: 50 },
];

const mockData = [
  {
    id: 0,
    department: 'SE',
    code: 'SE130491',
    name: 'Huynh Duc Duy',
    email: 'duyhdse130491@fpt.edu.vn',
  },
  {
    id: 1,
    department: 'SE',
    code: 'SE130359',
    name: 'Phan Thong Thanh',
    email: 'duyhdse130491@fpt.edu.vn',
  },
  {
    id: 2,
    department: 'SE',
    code: 'SE130491',
    name: 'Tran Thai Trung',
    email: 'duyhdse130491@fpt.edu.vn',
  },
  {
    id: 3,
    department: 'SE',
    code: 'SE130491',
    name: 'Tran Tuan Anh',
    email: 'duyhdse130491@fpt.edu.vn',
  },
  {
    id: 4,
    department: 'SE',
    code: 'SE130491',
    name: 'Huynh My Tram',
    email: 'duyhdse130491@fpt.edu.vn',
  },
  {
    id: 5,
    department: 'SE',
    code: 'SE130491',
    name: 'Tran Tuan Anh',
    email: 'duyhdse130491@fpt.edu.vn',
  },
  {
    id: 6,
    department: 'SE',
    code: 'SE130491',
    name: 'Huynh My Tram',
    email: 'duyhdse130491@fpt.edu.vn',
  },
  {
    id: 7,
    department: 'SE',
    code: 'SE130491',
    name: 'Tran Tuan Anh',
    email: 'duyhdse130491@fpt.edu.vn',
  },
  {
    id: 8,
    department: 'SE',
    code: 'SE130491',
    name: 'Huynh My Tram',
    email: 'duyhdse130491@fpt.edu.vn',
  },
  {
    id: 9,
    department: 'SE',
    code: 'SE130491',
    name: 'Huynh My Tram',
    email: 'duyhdse130491@fpt.edu.vn',
  },
];

const columns = [
  {
    dataField: 'code',
    text: 'Code',
    sort: true,
    sortCaret: sortCaret,
    headerSortingClasses,
  },
  {
    dataField: 'name',
    text: 'Name',
    sort: true,
    sortCaret: sortCaret,
    formatter: cellContent => {
      return <>{cellContent}</>;
    },
    headerSortingClasses,
  },
  {
    dataField: 'department',
    text: 'DEP',
    sort: true,
    sortCaret: sortCaret,
    headerSortingClasses,
  },
];

const AddActiveStudentModal = ({ isShowFlg, onHide, onAdd }) => {
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isLoading] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [sortField, setSortField] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    setData(mockData);
    setTotal(100);
  }, []);

  const handleAddStudent = () => {
    // Do stuffs?
    onAdd();
  };

  const setSearchValueProp = React.useCallback(
    value => {
      setSearchValue(value);
    },
    [setSearchValue]
  );

  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
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
        <TextInputSecondary
          type="search"
          withIcon
          value={searchValue}
          setFieldValue={setSearchValueProp}
        />
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
          defaultSorted={defaultSorted}
          pageSizeList={sizePerPageList}
          selectable
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddStudent}>
          Add selected
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddActiveStudentModal;
