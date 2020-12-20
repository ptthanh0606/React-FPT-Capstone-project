import React from 'react';
import Button from 'components/Button';
import FormGroups from 'components/CMSModal/FormGroups';
import SelectTagInput from 'components/TagInput/SelectTagInput';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { mDown as mDownDep } from 'modules/department/transformers';
import { mDown as mDownLec } from 'modules/lecturer/transformers';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { columnsTransformer } from 'utils/common';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import toast from 'utils/toast';
import cellEditFactory from 'react-bootstrap-table2-editor';

class NumberEditor extends React.Component {
  static defaultProps = {
    value: 0,
  };
  getValue() {
    return parseInt(this.number.value, 10);
  }
  render() {
    const { value, onUpdate, ...rest } = this.props;
    return (
      <input
        {...rest}
        key="range"
        ref={node => (this.number = node)}
        type="number"
        className="form-control form-control-solid"
      />
    );
  }
}

const CreateCouncil = ({
  isShowFlg = false,
  onHide = () => {},
  onConfirmForm = () => {},
  isProcessing = false,
  fieldTemplate,
}) => {
  const [name, setName] = React.useState('');
  const [department, setDepartment] = React.useState();
  const [members, setMembers] = React.useState([]);
  const [lecturerToAdd, setLecturerToAdd] = React.useState();

  const [isShowAdd, setIsShowAdd] = React.useState(false);

  //----------------------------------------------------------------------------

  const handleTableChange = React.useCallback((type, { cellEdit = {} }) => {
    if (type === 'cellEdit') {
      setMembers(i => {
        const index = i.findIndex(x => x.value === cellEdit.rowId);
        if (index !== -1)
          i[index][cellEdit.dataField] = Number(cellEdit.newValue) || 0;
        return i;
      });
    }
  }, []);

  const addLecturerToMembers = React.useCallback(
    e => {
      e.preventDefault();
      setIsShowAdd(false);
      setLecturerToAdd();
      if (!members.some(i => i.value === lecturerToAdd.value))
        setMembers(i => {
          let newLecturerToAdd = {
            ...lecturerToAdd,
            weight: 10,
          };

          if (i && Array.isArray(i) && i.length === 0) {
            newLecturerToAdd = {
              ...newLecturerToAdd,
              isLeader: true,
            };
          }
          return [...i, newLecturerToAdd];
        });
      else toast.error('Lecturer already added!');
    },
    [lecturerToAdd, members]
  );

  const handleRemoveLecturer = React.useCallback(e => {
    e.preventDefault();
    const id = Number(e.currentTarget.getAttribute('data-id'));
    setMembers(i => {
      let isLeader = !!i.find(j => j.value === id)?.isLeader;
      let newI = i.filter(j => j.value !== id);
      if (isLeader && newI.length > 0) newI[0].isLeader = true;
      return newI;
    });
  }, []);

  const handleMakeLeader = React.useCallback(e => {
    e.preventDefault();
    const id = Number(e.currentTarget.getAttribute('data-id'));
    setMembers(i =>
      i.map(j => ({
        ...j,
        isLeader: j.value === id,
      }))
    );
  }, []);

  const showAddLecturer = React.useCallback(e => {
    e.preventDefault();
    setIsShowAdd(true);
  }, []);

  const hideAddLecturer = React.useCallback(() => {
    setIsShowAdd(false);
    setLecturerToAdd();
  }, []);

  React.useEffect(() => {
    setName(fieldTemplate.name);
    setDepartment(fieldTemplate.department);
    setMembers(fieldTemplate.members || []);
    setLecturerToAdd();
  }, [fieldTemplate]);

  const onCreate = React.useCallback(
    () =>
      onConfirmForm({
        name: name,
        department: department,
        members: members,
      }),
    [department, members, name, onConfirmForm]
  );
  //----------------------------------------------------------------------------

  const columns = React.useMemo(
    () =>
      columnsTransformer([
        {
          dataField: 'label',
          text: 'Code',
          editable: false,
        },
        {
          dataField: 'name',
          text: 'Name',
          editable: false,
          formatter: function (cellContent, row) {
            return (
              <Link
                className="text-dark font-weight-bold"
                to={'/profile/lecturer/' + row.value}
              >
                {cellContent}
              </Link>
            );
          },
        },
        {
          dataField: 'isLeader',
          text: 'Is leader',
          editable: false,
          formatter: (cellContent, row) => {
            return cellContent === true ? (
              <span className="label label-lg label-light-danger label-inline text-nowrap">
                Leader
              </span>
            ) : null;
          },
        },
        {
          dataField: 'weight',
          text: 'Weight',
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => <NumberEditor {...editorProps} value={value} />,
        },
        {
          dataField: 'action',
          text: 'Actions',
          editable: false,
          formatter: (cellContent, row, rowIndex) => {
            return (
              <span className="text-nowrap">
                <a
                  href="/"
                  title="Make leader"
                  className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                  data-id={row.value}
                  onClick={handleMakeLeader}
                >
                  <i className="fas fa-flag mx-2"></i>
                </a>
                <a
                  href="/"
                  title="Remove"
                  className="btn btn-icon btn-light btn-hover-primary btn-sm"
                  data-id={row.value}
                  onClick={handleRemoveLecturer}
                >
                  <i className="fas fa-trash mx-2"></i>
                </a>
              </span>
            );
          },
          classes: 'text-right pr-0',
          headerClasses: 'text-right pr-3',
          style: {
            minWidth: '100px',
          },
        },
      ]),
    [handleMakeLeader, handleRemoveLecturer]
  );

  const handleOnSubmitForm = React.useCallback(event => {
    event.preventDefault();
  }, []);

  return (
    <Modal
      size="xl"
      show={isShowFlg}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Create council
          <small className="form-text text-muted">Create a new countcil</small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{}}>
        <Form id="test-form" onSubmit={handleOnSubmitForm}>
          <FormGroups
            key="name"
            type="text"
            config={{
              name: 'name',
              type: 'text',
              label: 'Council name',
              placeholder: 'Give this council a name...',
              required: true,
            }}
            value={name}
            handleChangeFields={value => setName(value)}
          />
          <Form.Group as={Row}>
            <Form.Label column sm={3}>
              Department<span style={{ color: 'red' }}> *</span>
            </Form.Label>
            <Col sm={9}>
              <SelectTagInput
                onChange={value => setDepartment(value)}
                isMulti={false}
                load={(input, callback) => {
                  request({
                    to: endpoints.LIST_DEPARTMENT.url,
                    method: endpoints.LIST_DEPARTMENT.method,
                    params: {
                      term: input,
                      pageSize: 10,
                    },
                  })
                    .then(res => {
                      callback(res.data.data?.map(mDownDep) || []);
                    })
                    .catch(() => callback([]));
                }}
                value={department}
              />
              <small className="form-text text-muted">
                This team belong to which department
              </small>
            </Col>
          </Form.Group>
        </Form>
        <div
          style={{
            fontSize: '1.4rem',
            textAlign: 'center',
            borderBottom: '1.5px solid #eaedf2',
            paddingBottom: '1.5rem',
            marginTop: '2rem',
          }}
        >
          Council Members
          <div
            style={{
              float: 'right',
              marginTop: '-0.25rem',
            }}
          >
            <span
              title="Remove"
              className="btn btn-icon btn-primary btn-hover-light btn-sm"
              onClick={showAddLecturer}
            >
              <i className="fas fa-plus mx-2"></i>
            </span>
          </div>
        </div>
        <BootstrapTable
          wrapperClasses="table-responsive"
          bordered={false}
          classes="table table-head-custom table-vertical-center overflow-hidden"
          bootstrap4
          remote
          keyField="value"
          data={members && Array.isArray(members) ? members : []}
          columns={columns}
          noDataIndication={() => (
            <div style={{ textAlign: 'center' }} className="mt-5">
              No records found
            </div>
          )}
          onTableChange={handleTableChange}
          headerClasses="text-nowrap"
          cellEdit={cellEditFactory({ mode: 'click', blurToSave: true })}
        />
        {/* Modal add -------------------------------------------------------*/}
        <Modal
          size="lg"
          show={isShowAdd}
          onHide={hideAddLecturer}
          aria-labelledby="example-modal-sizes-title-lg"
          style={{
            marginTop: '2rem',
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Add member to council
              <small className="form-text text-muted">
                Add a new lecturer to this council
              </small>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{}}>
            <Form id="test-form" onSubmit={handleOnSubmitForm}>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Lecturer
                </Form.Label>
                <Col sm={9}>
                  <SelectTagInput
                    onChange={value => setLecturerToAdd(value)}
                    isMulti={false}
                    load={(input, callback) => {
                      request({
                        to: endpoints.LIST_LECTURER.url,
                        method: endpoints.LIST_LECTURER.method,
                        params: {
                          term: input,
                          pageSize: 10,
                        },
                      })
                        .then(res => {
                          callback(res.data.data?.map(mDownLec) || []);
                        })
                        .catch(() => callback([]));
                    }}
                    value={lecturerToAdd}
                  />
                  <small className="form-text text-muted">
                    Lecturer to add to this council
                  </small>
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideAddLecturer}>
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={addLecturerToMembers}
              form="test-form"
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Modal add -------------------------------------------------------*/}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={onCreate}
          form="test-form"
          isLoading={isProcessing}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCouncil;
