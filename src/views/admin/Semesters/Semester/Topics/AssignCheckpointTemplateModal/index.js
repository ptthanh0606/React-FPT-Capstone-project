import React from 'react';
import Button from 'components/Button';
import { Modal } from 'react-bootstrap';
import request from 'utils/request';
import * as endpoints from 'endpoints';
import { columnsTransformer, handleErrors } from 'utils/common';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { addMinutes, format, subMinutes } from 'date-fns';
import SelectTagInput from 'components/TagInput/SelectTagInput';
import {
  mDown as mDownCt,
  downCheckpoints as downC,
} from 'modules/checkpointTemplates/transformers';
import { useParams } from 'react-router-dom';

export function convertDateDown(dateInput) {
  return format(
    subMinutes(new Date(dateInput), new Date().getTimezoneOffset()),
    "yyyy-MM-dd'T'HH:mm:ss.SSS"
  );
}

export function convertDateUp(dateInput) {
  return format(
    addMinutes(new Date(dateInput), new Date().getTimezoneOffset()),
    "yyyy-MM-dd'T'HH:mm:ss.SSS"
  );
}

class DateTimeEditor extends React.Component {
  static defaultProps = {
    value: 0,
  };
  getValue() {
    return this.dateTime.value;
  }
  render() {
    const { value, onUpdate, ...rest } = this.props;
    return (
      <input
        {...rest}
        key="range"
        ref={node => (this.dateTime = node)}
        type="datetime-local"
        step={3600}
        className="form-control form-control-solid"
      />
    );
  }
}

class CouncilEditor extends React.Component {
  static defaultProps = {
    value: undefined,
    semesterId: 0,
  };
  getValue() {
    return this.council.value;
  }
  render() {
    const { value, onUpdate } = this.props;
    return (
      <SelectTagInput
        onChange={value => onUpdate(value)}
        isMulti={false}
        load={(input, callback) => {
          request({
            to: endpoints.LIST_COUNCIL(this.props.semesterId).url,
            method: endpoints.LIST_COUNCIL(this.props.semesterId).method,
            params: {
              term: input,
              pageSize: 10,
            },
          })
            .then(res => {
              callback(
                [
                  { label: 'Topic mentors', value: 0 },
                  ...res.data.data?.map(mDownCt),
                ] || [{ label: 'Topic mentors', value: 0 }]
              );
            })
            .catch(() => callback([]));
        }}
        value={value}
        menuPortalTarget={document.body}
      />
    );
  }
}

const AssignCheckpointTemplateModal = ({
  isShowFlg = false,
  setIsShowFlg = function () {},
  onOk = function () {},
}) => {
  const { id: semId } = useParams();

  const onHide = React.useCallback(() => {
    setIsShowFlg(false);
  }, [setIsShowFlg]);

  const [checkpointTemplate, setCheckpointTemplate] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const [checkpoints, setCheckpoints] = React.useState([]);
  const handleSelectCheckpointTemplate = React.useCallback(
    v => setCheckpointTemplate(v),
    []
  );

  React.useEffect(() => {
    if (checkpointTemplate.value) {
      setIsLoading(true);
      request({
        to: endpoints.READ_CHECKPOINT_TEMPLATE(checkpointTemplate.value).url,
        method: endpoints.READ_CHECKPOINT_TEMPLATE(checkpointTemplate.value)
          .method,
      })
        .then(res => {
          setCheckpoints(res.data?.data?.checkpoints?.map(downC) || []);
        })
        .catch(handleErrors)
        .finally(_ => setIsLoading(false));
    }
  }, [checkpointTemplate.value]);

  //----------------------------------------------------------------------------

  const handleTableChange = React.useCallback((type, { cellEdit = {} }) => {
    if (type === 'cellEdit') {
      console.log(cellEdit);
      setCheckpoints(i => {
        const index = i.findIndex(x => x.id === cellEdit.rowId);
        const newI = [...i];
        if (index !== -1) newI[index][cellEdit.dataField] = cellEdit.newValue;
        return newI;
      });
    }
  }, []);

  const columns = React.useMemo(
    () =>
      columnsTransformer([
        {
          dataField: 'name',
          text: 'Name',
          editable: false,
        },
        {
          dataField: 'description',
          text: 'Description',
          editable: false,
        },
        {
          dataField: 'count',
          text: 'Columns number',
          editable: false,
        },
        {
          dataField: 'weight',
          text: 'Weight',
          editable: false,
        },
        {
          dataField: 'marginPass',
          text: 'Margin Pass',
          editable: false,
        },
        {
          dataField: 'submitDueDate',
          text: 'Submit Due Date',
          editable: true,
          formatter: (cellContent, row, rowIndex) => {
            return (
              (cellContent &&
                format(new Date(cellContent), "HH'h', dd/MM/yyyy")) ||
              ''
            );
          },
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => <DateTimeEditor {...editorProps} value={value} />,
          style: {
            width: '100px',
          },
        },
        {
          dataField: 'evaluateDueDate',
          text: 'Evaluate Due Date',
          editable: true,
          formatter: (cellContent, row, rowIndex) => {
            return (
              (cellContent &&
                format(new Date(cellContent), "HH'h', dd/MM/yyyy")) ||
              ''
            );
          },
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => <DateTimeEditor {...editorProps} value={value} />,
          style: {
            width: '100px',
          },
        },
        {
          dataField: 'council',
          text: 'Council',
          editable: true,
          formatter: (cellContent, row, rowIndex) => {
            return cellContent && cellContent.label;
          },
          editorRenderer: (
            editorProps,
            value,
            row,
            column,
            rowIndex,
            columnIndex
          ) => (
            <CouncilEditor {...editorProps} value={value} semesterId={semId} />
          ),
          classes: 'text-right',
          headerClasses: 'text-right pr-3',
          style: {
            minWidth: '200px',
          },
        },
      ]),
    [semId]
  );

  const onSubmit = React.useCallback(() => {
    setIsShowFlg(false);
    onOk({
      checkpointTemplateId: checkpointTemplate.value,
      checkpoints,
    });
  }, [checkpointTemplate.value, checkpoints, onOk, setIsShowFlg]);

  return (
    <>
      <Modal
        show={isShowFlg}
        onHide={onHide}
        aria-labelledby="example-modal-sizes-title-lg"
        dialogClassName="modal-xxl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Assign checkpoint template
            <small className="form-text text-muted">
              Assign a checkpoint template with due dates, council for these
              topics
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{}}>
          <SelectTagInput
            onChange={handleSelectCheckpointTemplate}
            isMulti={false}
            load={(input, callback) => {
              request({
                to: endpoints.LIST_CHECKPOINT_TEMPLATE.url,
                method: endpoints.LIST_CHECKPOINT_TEMPLATE.method,
                params: {
                  term: input,
                  pageSize: 10,
                },
              })
                .then(res => {
                  callback(res.data.data?.map(mDownCt) || []);
                })
                .catch(() => callback([]));
            }}
            value={checkpointTemplate}
          />
          {checkpointTemplate?.value && (
            <>
              <div
                style={{
                  fontSize: '1.4rem',
                  textAlign: 'center',
                  borderBottom: '1.5px solid #eaedf2',
                  paddingBottom: '1.5rem',
                  marginTop: '2rem',
                }}
              >
                Checkpoints of {checkpointTemplate?.label}
              </div>
              {isLoading ? (
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                  }}
                >
                  Loading...
                </div>
              ) : (
                <BootstrapTable
                  wrapperClasses="table-responsive"
                  bordered={false}
                  classes="table table-head-custom table-vertical-center overflow-hidden"
                  bootstrap4
                  remote
                  keyField="id"
                  data={
                    checkpoints && Array.isArray(checkpoints) ? checkpoints : []
                  }
                  columns={columns}
                  noDataIndication={() => (
                    <div style={{ textAlign: 'center' }} className="mt-5">
                      No checkpoints found
                    </div>
                  )}
                  onTableChange={handleTableChange}
                  headerClasses="text-nowrap"
                  cellEdit={cellEditFactory({
                    mode: 'click',
                    blurToSave: true,
                  })}
                />
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AssignCheckpointTemplateModal;
