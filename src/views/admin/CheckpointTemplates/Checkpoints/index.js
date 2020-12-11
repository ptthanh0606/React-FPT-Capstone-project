import React from 'react';
import Button from 'components/Button';
import { Modal } from 'react-bootstrap';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { columnsTransformer, handleErrors } from 'utils/common';
import BootstrapTable from 'react-bootstrap-table-next';
import Update from './Update';
import Add from './Add';

import * as transformers from 'modules/checkpointTemplates/transformers';

const ListCheckpoints = ({
  isShowFlg = false,
  setIsShowFlg = function () {},
  id,
  onEdit = function () {},
}) => {
  const [checkpoints, setCheckpoints] = React.useState([]);
  const [templateName, setTemplateName] = React.useState('...');

  const [l, loadData] = React.useReducer(() => ({}), {});

  const [isLoading, setIsLoading] = React.useState(false);
  const [isShowAdd, setIsShowAdd] = React.useState(false);
  const [isShowEdit, setIsShowEdit] = React.useState(false);
  const [editId, setEditId] = React.useState(0);
  const [updateData, setUpdateData] = React.useState(0);
  const [edited, setEdited] = React.useState(false);

  const onHide = React.useCallback(() => {
    setIsShowFlg(false);
    if (edited) onEdit();
  }, [edited, onEdit, setIsShowFlg]);
  //----------------------------------------------------------------------------

  const showAdd = React.useCallback(e => {
    e.preventDefault();
    setIsShowAdd(true);
  }, []);

  const onAdd = React.useCallback(
    data => {
      return request({
        to: endpoints.CREATE_CHECKPOINT(id).url,
        method: endpoints.CREATE_CHECKPOINT(id).method,
        data: transformers.upCheckpoints(data),
      })
        .then(() => {
          loadData();
          setEdited(true);
        })
        .catch(e => {
          handleErrors(e);
          throw e;
        });
    },
    [id]
  );

  //----------------------------------------------------------------------------

  const onEdit2 = React.useCallback(
    data => {
      return request({
        to: endpoints.UPDATE_CHECKPOINT(id, editId).url,
        method: endpoints.UPDATE_CHECKPOINT(id, editId).method,
        data: transformers.upCheckpoints(data),
      })
        .then(() => {
          loadData();
          setEdited(true);
        })
        .catch(e => {
          handleErrors(e);
          throw e;
        });
    },
    [editId, id]
  );

  const handleEdit = React.useCallback(
    e => {
      e.preventDefault();
      const cpId = Number(e.currentTarget.getAttribute('data-id'));
      request({
        to: endpoints.READ_CHECKPOINT(id, cpId).url,
        method: endpoints.READ_CHECKPOINT(id, cpId).method,
      })
        .then(res => {
          setUpdateData(transformers.downCheckpoints(res?.data?.data));
          setIsShowEdit(true);
          setEditId(cpId);
        })
        .catch(handleErrors);
    },
    [id]
  );

  const handleRemove = React.useCallback(
    e => {
      e.preventDefault();
      const cpId = Number(e.currentTarget.getAttribute('data-id'));
      setIsLoading(true);
      request({
        to: endpoints.DELETE_CHECKPOINT(id, cpId).url,
        method: endpoints.DELETE_CHECKPOINT(id, cpId).method,
      })
        .then(() => {
          loadData();
        })
        .catch(handleErrors)
        .finally(() => setIsLoading(false));
    },
    [id]
  );

  //----------------------------------------------------------------------------

  const columns = React.useMemo(
    () =>
      columnsTransformer([
        {
          dataField: 'name',
          text: 'Name',
        },
        {
          dataField: 'description',
          text: 'Description',
        },
        {
          dataField: 'count',
          text: 'Columns number',
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
          formatter: (cellContent, row, rowIndex) => {
            return (
              <span className="text-nowrap">
                <a
                  href="/"
                  title="Make leader"
                  className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                  data-id={row.id}
                  onClick={handleEdit}
                >
                  <i className="fas fa-pencil-alt mx-2"></i>
                </a>
                <a
                  href="/"
                  title="Remove"
                  className="btn btn-icon btn-light btn-hover-primary btn-sm"
                  data-id={row.id}
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

  React.useEffect(() => {
    if (id !== 0 && isShowFlg === true) {
      setIsLoading(true);
      setTemplateName('...');
      request({
        to: endpoints.READ_CHECKPOINT_TEMPLATE(id).url,
        method: endpoints.READ_CHECKPOINT_TEMPLATE(id).method,
      })
        .then(res => {
          const data = transformers.down(res.data?.data);
          setTemplateName(data.name);
          setCheckpoints(data.checkpoints);
        })
        .catch(handleErrors)
        .finally(() => setIsLoading(false));
    }
  }, [id, l, isShowFlg]);

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
            Checkpoints of {templateName}
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
            loading={isLoading}
            keyField="id"
            data={checkpoints && Array.isArray(checkpoints) ? checkpoints : []}
            columns={columns}
            noDataIndication={() => (
              <div style={{ textAlign: 'center' }} className="mt-5">
                No checkpoints found
              </div>
            )}
            headerClasses="text-nowrap"
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
        onOk={onAdd}
      />
      <Update
        isShowFlg={isShowEdit}
        setIsShowFlg={setIsShowEdit}
        data={updateData}
        onOk={onEdit2}
      />
    </>
  );
};

export default ListCheckpoints;
