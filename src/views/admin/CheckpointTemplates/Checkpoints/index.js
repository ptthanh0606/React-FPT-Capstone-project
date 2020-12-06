import React from 'react';
import Button from 'components/Button';
import { Modal } from 'react-bootstrap';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { columnsTransformer } from 'utils/common';
import BootstrapTable from 'react-bootstrap-table-next';
import toast from 'utils/toast';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Update from './Update';
import Add from './Add';

const UpdateCouncil = ({
  isShowFlg = false,
  setIsShowFlg = function () {},
  id,
}) => {
  const onHide = React.useCallback(() => {
    setIsShowFlg(false);
  }, [setIsShowFlg]);

  const [checkpoints, setCheckpoints] = React.useState([]);

  const [isShowAdd, setIsShowAdd] = React.useState(false);
  const [isShowEdit, setIsShowEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(0);

  //----------------------------------------------------------------------------

  const showAdd = React.useCallback(e => {
    e.preventDefault();
    setIsShowAdd(true);
  }, []);

  const hideAdd = React.useCallback(e => {
    e.preventDefault();
    setIsShowAdd(false);
  }, []);

  //----------------------------------------------------------------------------

  const handleEdit = React.useCallback(e => {
    e.preventDefault();
  }, []);

  const handleRemove = React.useCallback(e => {
    e.preventDefault();
  }, []);

  //----------------------------------------------------------------------------

  const columns = React.useMemo(
    () =>
      columnsTransformer([
        {
          dataField: 'name',
          text: 'Name',
          editable: true,
        },
        {
          dataField: 'description',
          text: 'Description',
          editable: true,
        },
        {
          dataField: 'count',
          text: 'Columns number',
          editable: false,
        },
        {
          dataField: 'weight',
          text: 'Weight',
        },
        {
          dataField: 'marginPass',
          text: 'Margin Pass',
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
                  onClick={handleEdit}
                >
                  <i className="fas fa-flag mx-2"></i>
                </a>
                <a
                  href="/"
                  title="Remove"
                  className="btn btn-icon btn-light btn-hover-primary btn-sm"
                  data-id={row.value}
                  onClick={handleRemove}
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
    [handleEdit, handleRemove]
  );

  return (
    <>
      <Modal
        show={isShowFlg}
        onHide={onHide}
        aria-labelledby="example-modal-sizes-title-lg"
        dialogClassName="modal-xxl"
      >
        <Modal.Body style={{}}>
          <div
            style={{
              fontSize: '1.4rem',
              textAlign: 'center',
              borderBottom: '1.5px solid #eaedf2',
              paddingBottom: '1.5rem',
              marginTop: '.5rem',
            }}
          >
            Checkpoints of xxx
            <div
              style={{
                float: 'right',
                marginTop: '-0.25rem',
              }}
            >
              <span
                title="Remove"
                className="btn btn-icon btn-primary btn-hover-light btn-sm"
                onClick={showAdd}
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
            data={checkpoints && Array.isArray(checkpoints) ? checkpoints : []}
            columns={columns}
            noDataIndication={() => (
              <div style={{ textAlign: 'center' }} className="mt-5">
                No records found
              </div>
            )}
            headerClasses="text-nowrap"
            cellEdit={cellEditFactory({ mode: 'click', blurToSave: true })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Add
        isShowFlg={isShowAdd}
        setIsShowFlg={setIsShowAdd}
        parentId={id}
        onOk={() => console.log('added')}
      />
      <Update
        isShowFlg={isShowEdit}
        setIsShowFlg={setIsShowEdit}
        id={editId}
        onOk={() => console.log('updated')}
      />
    </>
  );
};

export default UpdateCouncil;
